// Modules
const {ipcRenderer} = require('electron');

// DOM Nodes
let showModal = document.getElementById('show-modal');
let closeModal = document.getElementById('close-modal');
let modal = document.getElementById('modal');
let addItem = document.getElementById('add-item');
let itemUrl = document.getElementById('url');

// Disable & Enable modal buttons
const toggleModalButtons = () =>
{
    // Check state of buttons
    if(addItem.disabled === true)
    {
        addItem.disabled = false;
        addItem.style.opacity = 1;
        addItem.innerText = 'Add Item';
        closeModal.style.display = 'inline';
    }
    else
    {
        addItem.disabled = true;
        addItem.style.opacity = 0.5;
        addItem.innerText = 'Adding...';
        closeModal.style.display = 'none';
    }
};


// Show modal
showModal.addEventListener('click', () =>
 {
    modal.style.display = 'flex';
    itemUrl.focus();
});

// Close modal
closeModal.addEventListener('click', () =>
 {
    modal.style.display = 'none';
    itemUrl.value = '';
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


// Listen for new item from main process
ipcRenderer.on('new-item-success', (event, item) =>
{
    // Add item to "items" node
    console.log(item);

    // Enable buttons
    toggleModalButtons();

    // Hide modal and clear value
    modal.style.display = 'none';
    itemUrl.value = '';
});

// Listen for keyboard submit
itemUrl.addEventListener('keyup', (event) =>
{
    if(event.key === 'Enter') addItem.click();
});