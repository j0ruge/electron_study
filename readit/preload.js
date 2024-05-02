const fs = require('fs');

const desktopPath = '/Users/jorge.ferrari/Desktop'

window.writeToFile = text => 
{
  fs.writeFileSync( desktopPath + '/electron-test.txt', text, console.log)
}


window.versions = 
{
  node: process.versions.node,
  electron: process.versions.electron
}