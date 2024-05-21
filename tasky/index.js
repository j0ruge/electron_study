const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const TimerTray = require('./app/timer_tray')

let mainWindow;
let tray;

app.on('ready', () => 
{
    mainWindow = new BrowserWindow(
    {
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false        
    });
    mainWindow.loadURL(`file://${__dirname}${path.sep}src${path.sep}/index.html`);
    mainWindow.on('blur', () => 
    {
        mainWindow.hide();
    })

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `.${path.sep}src${path.sep}assets${path.sep}${iconName}`);

    tray = new TimerTray(iconPath, mainWindow); //Evita o Garbage Collector, limpar por não ter nehuma variável apontando para ela. 

});

 