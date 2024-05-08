// Modules
const fs = require('fs');
const path = require('path');

// DOM node
let items = document.getElementById('items');

// Get readerJS content
let readerJS;
fs.readFile(`${__dirname}${path.sep}reader.js`, (err, data) =>
{
    readerJS = data.toString();
});


//Track items in storage
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

// Listen for "Done" message from reader window
window.addEventListener('message', event =>
{
    // Check for correct message
    if(event.data.action === 'delete-reader-item')
    {
        // Delete item with given index
        this.delete(event.data.itemIndex);  
    }

    // Close the reader window
    event.source.close();
      
});


// Delete item
exports.delete = itemIndex =>
{
    // Remove item from DOM
    items.removeChild(items.childNodes[itemIndex]);

    // Remove item from storage
    this.storage.splice(itemIndex, 1);

    // Persist storage
    this.save();

    // Select previous item or new first item if first was deleted
    if(this.storage.length)
    {
        // Get new selected item index
        let newSelectedItemIndex = (itemIndex === 0) ? 0 : itemIndex - 1;
        console.log(newSelectedItemIndex);
        // Set item at new index as selected
        document.getElementsByClassName('read-item')[newSelectedItemIndex].classList.add('selected');
    }
}

// Get selected item index
exports.getSelectedItem = () =>
{
    // Get selected node
    let currentItem = document.getElementsByClassName('read-item selected')[0];

    // Get item index
    let itemIndex = 0;
    let child = currentItem;
    while((child = child.previousElementSibling) != null) itemIndex++;

    // Return selected item and index
    return {node: currentItem, index: itemIndex};
}


// Persist storage
exports.save = () => 
{
    localStorage.setItem('readit-items', JSON.stringify(this.storage));
}

// Set item as selected
exports.select = event =>
{
  // Remove currently selected item class
  this.getSelectedItem().node.classList.remove('selected')

  // Add to clicked item
  event.currentTarget.classList.add('selected')
}


// Open selected item for reading

exports.open = () =>
{
    // Only if items have been added
    if(!this.storage.length) return;

    // Get selected item
    let selectedItem = this.getSelectedItem();

    // Get item's URL
    let contentURL = selectedItem.node.dataset.url;

    // Open item in proxy BrowserWindow
    let readerWin = window.open(contentURL, '', `
        maxWidth=2000, 
        maxHeight=2000,
        width=1200,
        height=800,
        backgroundColor=#DEDEDE,
        nodeIntegration=0,
        contextIsolation=1,        
    `);

    // Inject JavaScript with item index to delete button when item is done (selectedItem.index)
    readerWin.eval(readerJS.replace('{{index}}', selectedItem.index));
}


// Move to newly selected item

exports.changeSelection = direction =>
{
    // Get selected item
    let currentItem = this.getSelectedItem();
    // Handle up/down
    if(direction === 'ArrowUp' && currentItem.node.previousElementSibling)
    {
        currentItem.node.classList.remove('selected');
        currentItem.node.previousElementSibling.classList.add('selected');
    }
    else if(direction === 'ArrowDown' && currentItem.node.nextElementSibling)
    {
        currentItem.node.classList.remove('selected');
        currentItem.node.nextElementSibling.classList.add('selected');
    }
}


// Add new item
exports.addItem = (item, isNew = false) =>
{
    // Create a new DOM node
    let itemNode = document.createElement('div');
    // Assign "read-item class"
    itemNode.setAttribute('class', 'read-item');

    // Set item URL as data attribute
    itemNode.setAttribute('data-url', item.url);

    // Add inner HTML
    itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

    // Append new node to "items"
    items.appendChild(itemNode);

        // Attach click handler to select item
    itemNode.addEventListener('click', this.select);

    // Attach double-click handler to open item
    itemNode.addEventListener('dblclick', this.open);

    // If this is the first item, select it
    if(document.getElementsByClassName('read-item').length === 1)
    {
        itemNode.classList.add('selected');
    }

    // Add item to storage and persist
    if(isNew)
    {
        this.storage.push(item);
        this.save();
    }
} 

// Add items from storage when app loads

this.storage.forEach(item =>
{
    // this.addItem(item, false);
    this.addItem(item)
});