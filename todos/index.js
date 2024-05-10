const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;
const path = require('path');

let mainWindow;
let webContent;
let main_menu = Menu.buildFromTemplate(require('./main_menu'));



app.on('ready', () =>
{
    mainWindow = new BrowserWindow(
    {
        width:800, minWidth: 640,
        height: 600, minHeight: 480,
        webPreferences:
        {
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    // Carrega a interface da Main
    mainWindow.loadFile(`${__dirname}${path.sep}main.html`);
    
    // Fecha toda a aplicação de a Main for fechada. 
    mainWindow.on('close', () => app.quit());

    webContent = mainWindow.webContents;
    webContent.openDevTools();
});

// Main Menu
if(process.platform === 'darwin')
{
    main_menu.unshift({label: ""});
};



Menu.setApplicationMenu(main_menu);
