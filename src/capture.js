const electron = require('electron');
const fs = require('fs');
const path = require('path');

const { desktopCapturer, ipcRenderer: ipc, screen } = electron;

function sources_callback(err, sources) {
    if (err) {
        return console.log('Cannot capture screen:', err)
    }
    console.log("sources are", sources);

}

function onCapture(evt, targetPath) {
    console.log('capture');
    const options = {
        types: ['screen'],
        thumbnailSize: electron.screen.getPrimaryDisplay().workAreaSize };

    desktopCapturer.getSources(options, sources_callback);
}

function writeScreenshot(png, filePath) {
    fs.writeFile(filePath, png, err => {
        if (err) {
            return console.log("Failed to write screenshot", err);
        }
    });
}

ipc.on('capture', onCapture);
