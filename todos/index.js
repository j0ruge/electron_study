const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const path = require('path');

let mainWindow;
let webContent;
let addWindow;

// App Menu
const app_menu = [
    {
        label: 'File',
        submenu:
        [            
            {
                label: 'New Todo',
                click() {createAddWindow()}
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click()
                {
                    app.quit();
                }
            }
        ]
    }
]

if (process.env.NODE_ENV !== 'production')
{
    app_menu.push(
    {
        label: 'View', 
        submenu:
        [
            {
                label: 'Toggle Developer Tool',
                accelerator: process.platform == 'darwin' ? 'Command+Alt+I' : 'Ctrl+Alt+I',
                click(item, focusedWindow)
                {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });  
}

let main_menu = Menu.buildFromTemplate(app_menu);

app.on('ready', () =>
{
    mainWindow = new BrowserWindow(
    {
        width:800, minWidth: 640,
        height: 600, minHeight: 480,
        webPreferences:
        {
            nodeIntegration: true,
            contextIsolation: true,
        }
    });

    // Carrega a interface da Main
    mainWindow.loadFile(`${__dirname}${path.sep}main.html`);
    
    // Fecha toda a aplicação de a Main for fechada. 
    mainWindow.on('close', () => app.quit());

    webContent = mainWindow.webContents;    
});

function createAddWindow()
{
    addWindow = new BrowserWindow(
    {
        width: 300, minWidth: 300, maxWidth: 300,
        height: 200, minHeight: 200, maxHeight: 200,
        title: 'Add New Todo',        
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    // Carrega a interface do 'New Todo'    
    addWindow.loadURL(`file://${__dirname}${path.sep}add${path.sep}index.html`);
    addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('todo:add', (event, todo) => 
{   console.log(todo);
    webContent.send('todo:add', todo);    
    addWindow.close();
});

// Main Menu
if(process.platform === 'darwin')
{
    main_menu.unshift({label: ""});
};

Menu.setApplicationMenu(main_menu);