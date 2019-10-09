const electron = require('electron');
const fs = require('fs');
const path = require('path');

const { desktopCapturer, ipcRenderer: ipc } = electron;


function onCapture(evt, targetDir, size) {
    const options = {
        types: ['screen'],
        thumbnailSize: size};

    desktopCapturer.getSources(options, (err, sources) => {
        if (err) {
            return console.log('Cannot capture screen:', err)
        }
        const source = sources.filter(isMainSource)[0];
        const png = source.thumbnail.toPNG();
        const filePath = path.join(targetDir, new Date() + '.png')
        writeScreenshot(png, filePath);
    });
}

function isMainSource(source) {
    return source.name === 'Entire Screen' || source.name == 'Screen 1'
}


function writeScreenshot(png, filePath) {
    fs.writeFile(filePath, png, err => {
        if (err) {
            return console.log("Failed to write screenshot", err);
        }
    });
}

ipc.on('capture', onCapture);
