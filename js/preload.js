const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    sendOpenNotepad: () => ipcRenderer.send('open-notepad'),
    sendOpenProgram: (programName) => ipcRenderer.send('open-program', programName),
    onProgramImage: (callback) => ipcRenderer.on('program-image', (event, image) => callback(image)),
    closeApp: () => ipcRenderer.send('close-app'),
    WinBackground: () => ipcRenderer.send('backgroundWin'),
    getVolume: () => ipcRenderer.invoke('get-volume'),
    setVolume: (volume) => ipcRenderer.invoke('set-volume', volume),
    getMuted: () => ipcRenderer.invoke('get-muted'),
    setMuted: (muted) => ipcRenderer.invoke('set-muted', muted)
});
// se agregar:
// window.electron.WinBackground();