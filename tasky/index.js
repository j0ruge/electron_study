const electron = require('electron');
const { app } = electron;
const path = require('path');
const TimerTray = require('./app/timer_tray')
const MainWindow = require('./app/main_window')

let mainWindow;
let tray;

app.on('ready', () => 
{    
    mainWindow = new MainWindow(`file://${__dirname}${path.sep}src${path.sep}/index.html`);    
        
    hideAppIcon();

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `.${path.sep}src${path.sep}assets${path.sep}${iconName}`);

    tray = new TimerTray(iconPath, mainWindow); //Evita o Garbage Collector, limpar por não ter nehuma variável apontando para ela. 

});

function hideAppIcon()
{
    process.platform === 'darwin' ? app.dock.hide() : mainWindow.setSkipTaskbar(true); // Esconde o icone no dock 
}