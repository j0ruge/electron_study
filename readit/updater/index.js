// Electron-Updater Module
const { autoUpdater } = require('electron-updater');

// Configure log debugging
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.setFeedURL ({
    provider: 'github',
    owner: "j0ruge",
    repo: "electron_study",
    private: true
});

module.exports = () => 
{
    // Check for update (GH Releases)
    console.log('Checking for updates...');
    autoUpdater.checkForUpdates();    
}