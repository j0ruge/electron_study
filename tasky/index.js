const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const TimerTray = require('./app/timer_tray')

let mainWindow;
let tray;
const HALF_WINDOWS_SIZE = 2;

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

    tray = new TimerTray(iconPath);
    tray.on('click', (event, bounds) =>
    {        
        // Click event bounds
        const { x, y } = bounds;

        // Windows height and wi
        const { width, height } = mainWindow.getBounds();
         
        if (mainWindow.isVisible())
        {
            mainWindow.hide();
        }
        else 
        {
            const yPosition = process.platform === 'darwin' ? y : y - height;
            mainWindow.setBounds({
                x: x - width / HALF_WINDOWS_SIZE,
                y: yPosition,
                height: height,
                width: width
            });
            mainWindow.show();
        }        
    });
});

 