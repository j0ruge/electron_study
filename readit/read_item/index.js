// 1. Offscreen Renderer (BrowserWindow)
// 2. Load Item URL (itemUrl)
// 3. Retrieve Item (Screenshot & Title) 

const { BrowserWindow } = require('electron');

//Offscreen BrowserWindow
let offscreenWindow;

// Exported readItem function
module.exports = (url, callback) =>
    {
        // Create offscreen window
        offscreenWindow = new BrowserWindow(
        {
            width: 500,
            height: 500,
            show: false,
            webPreferences:
            {
                offscreen: true
            }
        });

        // Load item URL
        offscreenWindow.loadURL(url);

        // Wait for content to finish loading
        offscreenWindow.webContents.on('did-finish-load', event =>
        {
            // Get page title
            let title = offscreenWindow.getTitle();
            // Get screenshot (thumbnail)
            offscreenWindow.webContents.capturePage().then(image =>
            {
                // Get image as dataURL
                let screenshot = image.toDataURL();
                // Execute callback with new item object
                callback({ title, screenshot, url });
                // Clean up, #Bests Practice#
                offscreenWindow.close();
                offscreenWindow = null;
            });
        });

    }