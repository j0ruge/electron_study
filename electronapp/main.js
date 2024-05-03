const { app, BrowserWindow } = require('electron');
const url = require('node:url');
const path = require('node:path');


function createMainWindow ()
{
  const mainWindow = new BrowserWindow(
  {
    title: 'Electron',
    width: 1000,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, './app/build/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  mainWindow.webContents.openDevTools();

}



app.whenReady().then(createMainWindow);


