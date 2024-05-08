// Modules
const {ipcRenderer} = require('electron');
const items = require('./items');
const { toggleModalButtons, itemUrl, showModal } = require('./modal');
require('./header');

// open modal from menu
ipcRenderer.on('menu-show-modal',() =>
{
  showModal.click();
});

// Open selected item from menu
ipcRenderer.on('menu-open-item', () =>
{
  items.open();
});

// Delete selected item from menu

ipcRenderer.on('menu-delete-item', () =>
{
  let selectedItem = items.getSelectedItem();
  console.log(selectedItem);
  console.log(`Index: ${selectedItem.index}`);
  console.log(`Node: ${selectedItem.node}`);
  items.delete(selectedItem.index);
});

// Open selected item in native browser from menu
ipcRenderer.on('menu-open-item-native', () =>
{
  items.openNative();
});

// Focus the search input from menu
ipcRenderer.on('menu-focus-search', () =>
{
  search.focus();
});


// Navigate item selection with up/down arrows
document.addEventListener('keydown', event =>
{
    if(event.key === 'ArrowUp' || event.key === 'ArrowDown')
    {
        items.changeSelection(event.key);
    }
});

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


// Special Submit Button Animation
// document.addEventListener("DOMContentLoaded", () =>
// {    
//    let button = document.getElementById("special-submit-button");
    
//     button.addEventListener("click", function() {
//       button.classList.add("onclic");
//       setTimeout(validate, 250);
//     });
  
//     function validate() {
//       setTimeout(function() {
//         button.classList.remove("onclic");
//         button.classList.add("validate");
//         setTimeout(callback, 450);
//       }, 2250);
//     }
  
//     function callback() {
//       setTimeout(function() {
//         button.classList.remove("validate");
//       }, 1250);
//     }
// });