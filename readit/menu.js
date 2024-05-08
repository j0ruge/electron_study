// Modules
const {Menu, shell} = require('electron');

// Module function to create main app menu
module.exports = appWin =>
{
    // Menu template
    let template = [
        {
            label: 'Items',
            submenu: [
                {
                    label: 'Add New',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => 
                    {
                        // Send message to open modal
                        appWin.send('menu-show-modal');
                    }
                },
                {
                    label: 'Read Item',
                    accelerator: 'CmdOrCtrl+Enter',
                    click: () => 
                    {
                        // Send message to open selected item
                        appWin.send('menu-open-item');   
                    }

                },
                {
                    label: 'Delete Item',
                    accelerator: 'CmdOrCtrl+Backspace',
                    click: () => 
                    {
                        // Send message to delete selected item
                        appWin.send('menu-delete-item');   
                    }

                },
                {
                    label: 'Open in Browser',
                    accelerator: 'CmdOrCtrl+Shift+Enter',
                    click: () => 
                    {
                        // Send message to open selected item in browser
                        appWin.send('menu-open-item-native');   
                    }
                },
                {
                    label: 'Search Items',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => 
                    {
                        // Send message to open selected item in browser
                        appWin.send('menu-focus-search');   
                    }
                }
            ]
        },
        {
            role: 'editMenu'
        },
        {
            role: 'windowMenu'
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: () => 
                        { 
                            shell.openExternal('https://github.com/j0ruge/electron_study/tree/main/readit'); 
                        }
                }
            ]
        }
    ];

    // Create Mac app menu
    if (process.platform === 'darwin') template.unshift({ role: 'appMenu'})

    // Build menu
    let menu = Menu.buildFromTemplate(template);
    
    // Set as mainapp menu
    Menu.setApplicationMenu(menu);

}

