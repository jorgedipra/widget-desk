const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    sendOpenNotepad: () => ipcRenderer.send('open-notepad'),
    sendOpenProgram: (programName) => ipcRenderer.send('open-program', programName)
});
