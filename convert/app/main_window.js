const { BrowserWindow } = require("electron");

class MainWindow extends BrowserWindow
{
    constructor(url)
    {
        super(
        {
            height: 600,
            width: 800,
            webPreferences: { backgroundThrottling: false }
        });
        this.loadURL(url);        
    }
}

module.exports = MainWindow;