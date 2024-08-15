const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const windowManager = require('electron-window-manager');
const activeWindows = require('active-windows');

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

    // Configuración para ocultar la ventana de la barra de tareas en Windows
    if (process.platform === 'win32') {
        win.setSkipTaskbar(true); // Oculta el ícono de la barra de tareas
    }

    win.loadFile('index.html');
    win.setAlwaysOnTop(false);
    win.webContents.openDevTools(); // abre el explorador dev



    // Mueve la ventana detrás de todos los elementos, como un fondo de pantalla
    win.once('ready-to-show', () => {
        setTimeout(() => {
            win.setAlwaysOnTop(true, 'screen-saver');
            win.show();
            // Asegúrate de que la ventana está en el fondo
            win.setVisibleOnAllWorkspaces(true); // En sistemas Unix, puede ser útil para asegurar la visibilidad en todos los escritorios
            win.setAlwaysOnTop(false);
        }, 100); // Ajusta el retraso según sea necesario
    });

    // Evento adicional para asegurarse de que la ventana siempre se mantenga atrás
    // Asegúrate de que la ventana siempre se mantenga atrás
    win.on('focus', () => {
        win.blur();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    ipcMain.handle('get-windows', async () => {
        return new Promise((resolve, reject) => {
            exec('wmctrl -l', (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${stderr}`);
                } else {
                    const windows = stdout.split('\n').filter(line => line.trim() !== '');
                    resolve(windows);
                }
            });
        });
    });

    ipcMain.handle('restore-window', async (event, windowTitle) => {
        return new Promise((resolve, reject) => {
            exec(`wmctrl -a "${windowTitle}"`, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${stderr}`);
                } else {
                    resolve(true);
                }
            });
        });
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
            // Asegúrate de que la ruta esté bien formateada
            exec(`"${programPath}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al ejecutar el programa: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        } else {
            console.error(`Programa no encontrado: ${programName}`);
        }
    });
    
});