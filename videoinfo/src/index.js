const electron = require('electron');
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow; 
let webContents;

app.on('ready', () =>
{    
    mainWindow = new BrowserWindow(
    {
        width: 800, minWidth: 640,
        height: 600, minHeight: 480,        
        x: 0, y: 0,
        webPreferences:
        {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },        
    });
    mainWindow.loadFile(`${__dirname}${path.sep}index.html`);
    
    webContents = mainWindow.webContents;
    webContents.openDevTools();
});

ipcMain.on("video:submit", (event, filePath) =>
{
    ffmpeg.ffprobe(filePath, (err, metadata) =>
    {
      event.sender.send(
        "video:metadata", 
        metadata.format.duration);
    });
});