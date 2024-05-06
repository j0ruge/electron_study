// Modules
const {ipcRenderer} = require('electron');
const items = require('./items');
const { toggleModalButtons, itemUrl } = require('./modal');
const addItem = require('./header');

// Listen for new item from main process
ipcRenderer.on('new-item-success', (event, newItem) =>
{
    // Add item to "items" node
    items.addItem(newItem, true);

    // Enable buttons
    toggleModalButtons();

    // Hide modal and clear value
    modal.style.display = 'none';
    itemUrl.value = '';
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