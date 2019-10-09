const electron = require('electron');

const { app, BrowserWindow, globalShortcut } = electron;

let mainWindow;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 0,
        height: 0,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    const size = electron.screen.getPrimaryDisplay().workAreaSize;

    mainWindow.loadURL(`file://${__dirname}/capture.html`)

    mainWindow.on('close', _ => {
        mainWindow = null;
    })

    globalShortcut.register('Ctrl+Alt+Shift+D', _ => {
        console.log('Taking screenshot...');
        mainWindow.webContents.send('capture', app.getPath('pictures'), size);
    });

});
