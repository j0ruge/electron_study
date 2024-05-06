const {ipcRenderer} = require('electron');
const { toggleModalButtons, itemUrl } = require('../modal');

let addItem = document.getElementById('add-item');

// DOM Nodes
search = document.getElementById('search');

// Filter items with "search" input
search.addEventListener('keyup', event =>
{
    // Loop items
    Array.from(document.getElementsByClassName('read-item')).forEach(item =>
    {
        // Hide items that don't match search value
        let hasMatch = item.innerText.toLowerCase().includes(search.value.toLowerCase());
        item.style.display = hasMatch ? 'flex' : 'none';
    });
});

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

exports = 
{
    search, addItem
}

