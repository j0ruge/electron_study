const {ipcRenderer} = require('electron');
let addItem = document.getElementById('add-item');
const { toggleModalButtons, itemUrl } = require('../modal');

// Handle new item  
addItem.addEventListener('click', () =>
{
    //Check if URL is provided
    if(itemUrl.value)
    {
        // Send new item URL to the main process
        ipcRenderer.send('new-item', itemUrl.value);

        // Disable buttons
        toggleModalButtons();
    }
});

exports.addItem
