// Modules
const {ipcRenderer} = require('electron');
const items = require('./items');
const { toggleModalButtons, showModal } = require('./modal')

// DOM Nodes
//let showModal = document.getElementById('show-modal');
let closeModal = document.getElementById('close-modal');
let modal = document.getElementById('modal');
let addItem = document.getElementById('add-item');
let itemUrl = document.getElementById('url');

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
ipcRenderer.on('new-item-success', (event, newItem) =>
{
    // Add item to "items" node
    items.addItem(newItem);

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

document.addEventListener("DOMContentLoaded", () =>
{    
   let button = document.getElementById("special-submit-button");
    
    button.addEventListener("click", function() {
      button.classList.add("onclic");
      setTimeout(validate, 250);
    });
  
    function validate() {
      setTimeout(function() {
        button.classList.remove("onclic");
        button.classList.add("validate");
        setTimeout(callback, 450);
      }, 2250);
    }
  
    function callback() {
      setTimeout(function() {
        button.classList.remove("validate");
      }, 1250);
    }
});