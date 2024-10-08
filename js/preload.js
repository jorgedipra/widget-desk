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
    setMuted: (muted) => ipcRenderer.invoke('set-muted', muted),
    getBrightness: () => ipcRenderer.invoke('get-brightness'),
    setBrightness: (brightness) => ipcRenderer.invoke('set-brightness', brightness),
    getSystemUsage: () => ipcRenderer.send('get-system-usage'),
    onSystemUsage: (callback) => ipcRenderer.on('system-usage', (event, usage) => callback(usage)),
    saveNote: (content) => ipcRenderer.send('save-note', content),
    loadNote: () => ipcRenderer.invoke('load-note')
});
// se agregar:
// window.electron.WinBackground();