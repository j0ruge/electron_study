const { app, ipcMain } = require('electron');
const path = require('path');
const ffmeg = require('fluent-ffmpeg');
const MainWindow = require('./app/main_window');

let mainWindow;
let url = `file://${__dirname}${path.sep}src${path.sep}/index.html`

app.on('ready', () => 
{
    mainWindow = new MainWindow(url);
});

ipcMain.on('videos:added', (event, videos) =>
{
    const promise = new Promise((resolve, reject) =>
    {
        ffmeg.ffprobe(videos[0].path, (err, metadata) =>
        {
            resolve(metadata);
        });
    });

    
    promise.then((metadata) => { console.log(metadata);})
 
})