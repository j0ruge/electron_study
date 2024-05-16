const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;
const path = require('path');

let mainWindow;
let tray;

app.on('ready', () => 
{
    mainWindow = new BrowserWindow(
    {
        height: 500,
        width: 300,
        frame: false,
        resizable: false
    });
    mainWindow.loadURL(`file://${__dirname}${path.sep}src${path.sep}/index.html`)
});

// tray = new Tray('');