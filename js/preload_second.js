// preload_second.js
const { ipcRenderer } = require('electron');

window.electronAPI = {
    // sendMessage: (message) => ipcRenderer.send('message', message),
};

// window.electronAPI.sendMessage('Hola');