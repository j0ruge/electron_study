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
        resizable: false,
        show: false        
    });
    mainWindow.loadURL(`file://${__dirname}${path.sep}src${path.sep}/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `.${path.sep}src${path.sep}assets${path.sep}${iconName}`);

    tray = new Tray(iconPath);
    tray.on('click', () =>
    {
        
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
        // if (mainWindow.isVisible())
        // {

        // }
        // else 
        // {

        // }
        // mainWindow.show();
    });
});

 