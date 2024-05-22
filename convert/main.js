const { app } = require('electron');
const path = require('path');
const MainWindow = require('./app/main_window');

let mainWindow;
let url = `file://${__dirname}${path.sep}src${path.sep}/index.html`

app.on('ready', () => 
{
    mainWindow = new MainWindow(url);
});