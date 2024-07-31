const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');


// Configura electron-reload
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });


const createWindow = () => {
    // Obtén la información de las pantallas
    const displays = screen.getAllDisplays();
    const primaryDisplay = displays[0];
    const secondaryDisplay = displays[1] || primaryDisplay; // Fallback si no hay pantalla secundaria

    const win = new BrowserWindow({
        x: primaryDisplay.bounds.x,
        y: primaryDisplay.bounds.y,
        width: 1226,
        height: 1080,
        transparent: true,
        frame: false,
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, '/js/preload.js'), // Ruta al archivo preload.js
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    win.loadFile('index.html');
    win.setAlwaysOnTop(false);

}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


ipcMain.on('open-program', (event, programName) => {
    fs.readFile('programs.json', 'utf8', (err, data) => {
        if (err) {
            console.error(`Error al leer el archivo JSON: ${err}`);
            return;
        }
        const programs = JSON.parse(data);
        const programPath = programs[programName];
        if (programPath) {
            const formattedPath = `"${programPath}"`; // Envolver la ruta entre comillas
            exec(formattedPath, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al abrir el programa: ${error}`);
                    return;
                }
                console.log(`Programa abierto: ${stdout}`);
            });
        } else {
            console.error(`Programa no encontrado: ${programName}`);
        }
    });
});
