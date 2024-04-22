const electron = require('electron');
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () =>
{
    mainWindow = new BrowserWindow(
    {
        // height: 600,
        // width: 800,
        webPreferences:
        {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },        
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, filePath) =>
{
    ffmpeg.ffprobe(filePath, (err, metadata) =>
    {
      event.sender.send("video:metadata", metadata.format.duration);
    });
});