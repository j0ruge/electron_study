module.exports = [
    {        
        role: 'fileMenu',        
    },
    {
        label: 'Edit',
        submenu: [
          {            
            role: 'undo'
          },
          {            
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {            
            role: 'cut'
          },
          {            
            role: 'copy'
          },
          {            
            role: 'paste'
          },
          {            
            role: 'selectAll'
          }
        ]
    },
    {
       label: 'Electron', 
          submenu: [
            {
              label: 'Item 01',
              click() { console.log('Item 01 was clicked') }
            },
            {
              label: 'Item 02',
              submenu: [
                {
                  label: 'Item 02.01',
                  click() { console.log('Item 02.01 was clicked') }
                },
                {
                  label: 'Item 02.02',
                  click() { console.log('Item 02.02 was clicked') }
                }
              ],
              click() { console.log('Item 02 was clicked') }
            }
          ],
          click()
          { 
            console.log('Electron Menu was clicked') 
          } 
      },
      {
        label: 'Actions',
        submenu: [
          {
            label: 'DevTools',
            role: 'toggleDevTools',
            //enabled: false,
            click() { console.log('Action 01 was clicked') }
          },
          {
            label: 'Greet',
            click: () => { console.log('Hello from Main Menu') },
            accelerator: 'Shift+Alt+G'
          },
          {
            role: 'togglefullscreen'
          },
          {
                label: 'Exit',
                role: 'quit'
          }
        ]
      }
]