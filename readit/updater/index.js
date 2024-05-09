const { dialog  } = require('electron');
// Electron-Updater Module
const { autoUpdater } = require('electron-updater');

// Configure log debugging
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';
const UPDATE = 0;
const YES = 0;


// Disable auto downloading of updates
autoUpdater.autoDownload = false;

autoUpdater.setFeedURL ({
    provider: 'github',
    owner: "j0ruge",
    repo: "electron_study",
    private: true
});

module.exports = () => 
{
    // Check for update (GH Releases)    
    autoUpdater.checkForUpdates();   
    
    // Listen for update found
    autoUpdater.on('update-available', () => 
    {
        // Promt user to start download
        dialog.showMessageBox(
        {
            type: 'info',
            title: 'Update available',
            message: 'A new version of Readit is available. Do you want to update now?',
            buttons: ['Update', 'No']
        })
        .then( result => 
        {
            let buttonIndex = result.response;            
            // If button 0 (update), start downloading the update
            if ( buttonIndex === UPDATE) autoUpdater.downloadUpdate();
        });

        // Listen for update downloaded
        autoUpdater.on('update-downloaded', () =>
        {
            // Promt the user to install the update            
            dialog.showMessageBox(
            {
                type: 'info',
                title: 'Update ready',
                message: 'Instll & restart now?',
                buttons: ['Yes', 'Later']
            })
            .then( result => 
            {
                let buttonIndex = result.response;            
                // Install & restart if button 0 (update), start downloading the update
                if ( buttonIndex === YES) autoUpdater.quitAndInstall(false, true);
            });
        }); 

    });

};