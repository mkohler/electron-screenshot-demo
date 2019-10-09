const electron = require('electron');

const { app, BrowserWindow, globalShortcut } = electron;

let mainWindow;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 900,
        resizable: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.openDevTools();

    mainWindow.loadURL(`file://${__dirname}/capture.html`)

    mainWindow.on('close', _ => {
        mainWindow = null;
    })

    globalShortcut.register('Ctrl+Alt+Shift+D', _ => {
        console.log('Got shortcut');
        mainWindow.webContents.send('capture', app.getPath('pictures'));
    });

});
