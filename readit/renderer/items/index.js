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

// Persist storage
exports.save = () => 
{
    localStorage.setItem('readit-items', JSON.stringify(this.storage));
}

// Set item as selected
exports.select = event =>
{
    const ACTUAL_SELECTION = document.getElementsByClassName('read-item selected')[0];
    // Remove currently selected item class
    ACTUAL_SELECTION.classList.remove('selected');
    // Add to clicked item
    event.currentTarget.classList.add('selected');
}


// Open selected item for reading

exports.open = () =>
{
    // Only if items have been added
    if(!this.storage.length) return;

    // Get selected item
    let selectedItem = document.getElementsByClassName('read-item selected')[0];

    // Get item's URL
    let contentURL = selectedItem.dataset.url;

    // Open item in proxy BrowserWindow
    let readerWin = window.open(contentURL, '', `
        maxWidth=2000, 
        maxHeight=2000,
        width=1200,
        height=800,
        backgroundColor=#DEDEDE,
        nodeIntegration=0,
        contextIsolation=1
    `);

    // Inject JavaScript
    readerWin.eval(readerJS);
}


// Move to newly selected item

exports.changeSelection = direction =>
{
    // Get selected item
    let currentItem = document.getElementsByClassName('read-item selected')[0];
    // Handle up/down
    if(direction === 'ArrowUp' && currentItem.previousElementSibling)
    {
        currentItem.classList.remove('selected');
        currentItem.previousElementSibling.classList.add('selected');
    }
    else if(direction === 'ArrowDown' && currentItem.nextElementSibling)
    {
        currentItem.classList.remove('selected');
        currentItem.nextElementSibling.classList.add('selected');
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

    // If this is the first item, select it
    if(document.getElementsByClassName('read-item').length === 1)
    {
        itemNode.classList.add('selected');
    }

    // Attach click handler to select item
    itemNode.addEventListener('click', this.select);

    // Attach double-click handler to open item
    itemNode.addEventListener('dblclick', this.open);


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
    this.addItem(item, false);
});