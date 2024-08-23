const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    sendOpenNotepad: () => ipcRenderer.send('open-notepad'),
    sendOpenProgram: (programName) => ipcRenderer.send('open-program', programName),
    onProgramImage: (callback) => ipcRenderer.on('program-image', (event, image) => callback(image)),
    closeApp: () => ipcRenderer.send('close-app'),
    WinBackground: () => ipcRenderer.send('backgroundWin')
});
