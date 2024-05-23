const { app, ipcMain } = require('electron');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');
const MainWindow = require('./app/main_window');

let mainWindow;
let url = `file://${__dirname}${path.sep}src${path.sep}/index.html`

app.on('ready', () => 
{
    mainWindow = new MainWindow(url);
});

ipcMain.on("videos:added", (event, videos) =>
{
    const promises = _.map(videos, (video) =>
        {
            return new Promise((resolve, reject) =>
                {
                    ffmpeg.ffprobe(video.path, (err, metadata) =>
                    {
                    video.duration = metadata.format.duration;
                    video.format = 'avi';
                    resolve(video);
                    });
                });
        });
    Promise.all(promises)
        .then((results) => 
        {
            mainWindow.webContents.send('metadata:complete', results)
        });
});

ipcMain.on('conversion:start', (event, videos) => 
{    
    _.each(videos, video =>
    {
        const outputDirectory = video.path.split(video.name)[0];
        const outputName = video.name.split('.')[0];
        const outputPath = `${outputDirectory}${outputName}.${video.format}`;    

        ffmpeg(video.path)
            .output(outputPath)
            .on('end', () => mainWindow.webContents.send('conversion:end', { video, outputPath }))
            .run();
    });
    
})