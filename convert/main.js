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
          resolve(metadata);
        });
      });
    });
    Promise.all(promises).then((results) => console.log(results));
});