const { app, BrowserWindow } = require('electron');
const path = require('path');




module.exports = [    
    {
        label: 'File',
        submenu: [            
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

function createAddWindow()
{
    addWindow = new BrowserWindow(
    {
        width: 300, minWidth: 300, maxWidth: 300,
        height: 200, minHeight: 200, maxHeight: 200,
        title: 'Add New Todo'
    });

    // Esconder a barra de Menu  nesta segunda janela. 
    addWindow.setMenuBarVisibility(false);
    // Carrega a interface do 'New Todo'
    addWindow.loadFile(`${__dirname}${path.sep}add.html`);
    addWindow.webContents.openDevTools();
}

if (process.env.NODE_ENV !== 'production')
{
        this.push(
        {
        label: 'View', 
        submenu: [
            {
                label: 'Toggle Developer Tool',
                click(item, focusedWindow)
                {

                }
            }
        ]
        });  
}