const electron = require('electron');

const { Tray, app, Menu } = electron;
const HALF_WINDOWS_SIZE = 2;

class TimerTray extends Tray
{
    constructor(iconPath, mainWindow)
    {
        super(iconPath);

        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this));
        this.setToolTip('Timer App');
        this.on('right-click', this.onRightClick.bind(this));
    }

    onClick(event, bounds)
    {
        // Click event bounds
        const { x, y } = bounds;

        // Windows height and wi
        const { width, height } = this.mainWindow.getBounds();
         
        if (this.mainWindow.isVisible())
        {
            this.mainWindow.hide();
        }
        else 
        {
            const yPosition = process.platform === 'darwin' ? y : y - height;
            this.mainWindow.setBounds({
                x: x - width / HALF_WINDOWS_SIZE,
                y: yPosition,
                height: height,
                width: width
            });
            this.mainWindow.show();
        }        
    }

    onRightClick()
    {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]);

        this.popUpContextMenu(menuConfig);

    }
}

module.exports = TimerTray;