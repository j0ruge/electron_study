// Modules
const {app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const updater = require('./updater');

const readItem = require('./read_item');
const appMenu = require('./menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Listen for new item request
ipcMain.on('new-item', (event, itemUrl) =>
{ 
  // Get new item and send back to renderer
  readItem(itemUrl, item =>
  {     
    event.sender.send('new-item-success', item);
  });
})

// Create a new BrowserWindow when `app` is ready
function createWindow ()
{

  // Check for updates
  setTimeout(updater, 3000);


  let state = windowStateKeeper(
    {
      defaultWidth: 500, 
      defaultHeight: 650 
    }
  );

  mainWindow = new BrowserWindow(
  {
    width: state.width, height: state.height,
    x: state.x, y: state.y,
    minWidth: 350, maxWidth: 650, minHeight: 300,
    webPreferences:
    {      
      //contextIsolation: false,
      nodeIntegration: true
    }
  });
  
  
  // setWindowsOpenHandler
  
//   mainWindow.webContents.setWindowOpenHandler(({ url }) => {
//     return {
//       action: 'allow',
//       overrideBrowserWindowOptions: {
//         webPreferences: {
//           preload: `${__dirname}/renderer/reader.js`
//         }
//       }
//     }
// });


  appMenu(mainWindow.webContents);



  // mainWindow.setMenuBarVisibility(true);
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html')  


  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

 // Manage new window state
  state.manage(mainWindow);

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
