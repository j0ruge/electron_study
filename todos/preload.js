const { contextBridge, ipcRenderer } = require('electron/renderer');

// contextBridge.exposeInMainWorld('api', 
// {
//     send: (channel, data) =>
//     {
//         ipcRenderer.send(channel, data);
//     },
//     on: ( channel, callback) =>
//     {
//         ipcRenderer.on(channel, (event, ...args) => callback(...args));
//     }
// });

contextBridge.exposeInMainWorld('electronAPI',
{
    onUpdateCounter: callback => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
    counterValue: value => ipcRenderer.send('counter-value', value),
    addTodo: () => ipcRenderer.on('todo:add', (event, todo) => 
    {
        console.log(todo);
        const li = document.createElement('li');
        const text = document.createTextNode(todo);
        
        li.appendChild(text);
        document.querySelector('ul').appendChild(li);
    })
})

        // ipcRenderer.on('todo:add', (event, todo) => 
        // {
        //     console.log(todo);
        //     const li = document.createElement('li');
        //     const text = document.createTextNode(todo);
            
        //     li.appendChild(text);
        //     document.querySelector('ul').appendChild(li);
        // })