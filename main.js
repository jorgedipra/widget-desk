const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const windowManager = require('electron-window-manager');
const activeWindows = require('active-windows');
const loudness = require('loudness'); //volumen
const brightness = require('brightness');
const { log } = require('console');

const positionFilePath = path.join(app.getPath('userData'), 'window-position.json');// Archivo para almacenar la posición de la ventana

// Configura electron-reload
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

//ventana principal
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
        icon: path.join(__dirname, '/images/desk.ico'),
        transparent: true,  // Fondo transparente 
        frame: false,       // indica que no se muestra la barra de título ni los bordes de la ventana
        fullscreen: true,   // pantalla completa
        alwaysOnTop: false, // Asegura que no esté siempre al frente
        focusable: true,   // Hace que la ventana no sea enfocada al hacer clic
        skipTaskbar: true, // Evita que aparezca en la barra de tareas
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

    win.on('show', () => {
        setTimeout(() => {
            win.setAlwaysOnTop(false, 'screen-saver');
        }, 100);
    });

     // evento para mostrar la ventana principal desde otra
    ipcMain.on('show-main-window', () => {
        // Mostrar o enfocar la ventana principal
        if (win) {
            win.show();
            win.focus();
        }
    });

    // Evento adicional para asegurarse de que la ventana siempre se mantenga atrás
    // Asegúrate de que la ventana siempre se mantenga atrás
    ipcMain.on('backgroundWin', () => {
        win.blur();
    });
    // 
}

// Función para guardar la posición de la ventana
function saveWindowPosition(window) {
    const bounds = window.getBounds();
    const positionData = { x: bounds.x, y: bounds.y };
    fs.writeFileSync(positionFilePath, JSON.stringify(positionData), 'utf-8');
    // console.log('Position saved:', positionData); // Debugging line
}

// Función para cargar la posición de la ventana
function loadWindowPosition() {
    if (fs.existsSync(positionFilePath)) {
        const positionData = JSON.parse(fs.readFileSync(positionFilePath, 'utf-8'));
        // console.log('Position loaded:', positionData); // Debugging line
        return positionData;
    }
    return { x: 0, y: 0 }; // Default position
}

/**
 * Segunda ventana
 */
function createSecondWindow() {
    // Obtén la información de las pantallas
    const displays = screen.getAllDisplays();
    const primaryDisplay = displays[0]; // Obtiene la pantalla principal
    const secondaryDisplay = displays[1] || primaryDisplay; // Fallback si no hay pantalla secundaria

    // Calcula la posición para la esquina inferior izquierda con un margen de 100px desde los bordes
    const windowWidth = 70; // Ancho de la ventana
    const windowHeight = 70; // Alto de la ventana

    // const xPosition = primaryDisplay.bounds.x + 100; // 100px desde el borde izquierdo
    // const yPosition = primaryDisplay.bounds.y + primaryDisplay.workArea.height - windowHeight - 100; // 100px desde el borde inferior


    // Cargar la posición de la ventana principal
    const mainWindowPosition = loadWindowPosition();

    // Crea la segunda ventana con las configuraciones indicadas
    secondWindow = new BrowserWindow({
        x:mainWindowPosition.x, 
        y:mainWindowPosition.y, 
        width: windowWidth,
        height: windowHeight,
        icon: path.join(__dirname, '/images/desk.ico'),
        transparent: true,  // Fondo transparente 
        frame: false,        // Muestra la barra de título y bordes de la ventana
        fullscreen: false,  // No en pantalla completa
        alwaysOnTop: true,  // Asegura que siempre esté al frente
        focusable: true,    // Hace que la ventana pueda ser enfocada
        movable: true,      // Permite que la ventana sea movible
        webPreferences: {
            // preload: path.join(__dirname, 'preload_second.js'),
            enableRemoteModule: false,
            nodeIntegration: true,   // Habilitar nodeIntegration
            contextIsolation: false 
        },
    });
    //secondWindow.webContents.openDevTools(); // abre el explorador dev

    secondWindow.loadFile('second.html'); // Asegúrate de tener un archivo HTML para la segunda ventana

    // Guardar la posición de la ventana principal al moverla
    secondWindow.on('move', () => {
        saveWindowPosition(secondWindow);
    });

    // Evento para manejar cuando la segunda ventana se cierra
    secondWindow.on('closed', () => {
        secondWindow = null;
    });
}


app.whenReady().then(() => {
    createWindow();
    createSecondWindow();

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
    fs.readFile('programas.json', 'utf8', (err, data) => {
        if (err) {
            console.error(`Error al leer el archivo JSON: ${err}`);
            return;
        }
        const programs = JSON.parse(data);
        const program = programs[programName];
        if (program && program.path) {
            // Ejecutar el programa
            exec(`"${program.path}"`, (error, stdout, stderr) => {
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

            // Enviar la imagen asociada al frontend
            event.sender.send('program-image', program.image);

        } else {
            console.error(`Programa no encontrado: ${programName}`);
        }
    });
});

ipcMain.on('open-program-lanzador', (event, programName) => {
    fs.readFile('programs.json', 'utf8', (err, data) => {
        if (err) {
            console.error(`Error al leer el archivo JSON: ${err}`);
            return;
        }
        const programs = JSON.parse(data);
        const program = programs[programName];
        if (program && program.path) {
            // Ejecutar el programa
            exec(`"${program.path}"`, (error, stdout, stderr) => {
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

            // Enviar la imagen asociada al frontend
            event.sender.send('program-image', program.image);

        } else {
            console.error(`Programa no encontrado: ${programName}`);
        }
    });
});

// cerrar app
ipcMain.on('close-app', () => {
    app.quit();
});

//control de volumen
ipcMain.handle('get-volume', async () => {
    return await loudness.getVolume();
});

ipcMain.handle('set-volume', async (event, volume) => {
    await loudness.setVolume(volume);
});

ipcMain.handle('get-muted', async () => {
    return await loudness.getMuted();
});

ipcMain.handle('set-muted', async (event, muted) => {
    await loudness.setMuted(muted);
});

//control de luz
ipcMain.handle('get-brightness', async () => {
    try {
        const currentBrightness = await brightness.get();
        return currentBrightness * 100; // Devuelve el valor como porcentaje
    } catch (error) {
        console.error('Error al obtener el brillo:', error);
    }
});

ipcMain.handle('set-brightness', async (event, brightnessValue) => {
    try {
        await brightness.set(brightnessValue / 100); // El valor debe estar entre 0 y 1
    } catch (error) {
        console.error('Error al establecer el brillo:', error);
    }
});

// Escuchar evento del frontend para obtener datos
function getSystemUsage() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsage = (usedMemory / totalMemory) * 100;

    const cpus = os.cpus();
    const cpuUsage = cpus.map(cpu => {
        const total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0);
        const idle = cpu.times.idle;
        return 100 - Math.floor((idle / total) * 100);
    });

    return {
        memoryUsage: memoryUsage.toFixed(2),
        cpuUsage: Math.floor(cpuUsage.reduce((acc, curr) => acc + curr, 0) / cpuUsage.length)
    };
}

// Escuchar evento del frontend para obtener datos
ipcMain.on('get-system-usage', (event) => {
    const usage = getSystemUsage();
    event.reply('system-usage', usage);
});

//Notas
// Guardar el contenido en un archivo
ipcMain.on('save-note', (event, content) => {
    const filePath = path.join(app.getPath('userData'), 'note.txt');
    fs.writeFileSync(filePath, content, 'utf-8');
});

// Cargar el contenido desde un archivo
ipcMain.handle('load-note', () => {
    const filePath = path.join(app.getPath('userData'), 'note.txt');
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    }
    return '';
});


ipcMain.on('saveJson', (event, data) => {
    const { name, file, img } = data; // Datos enviados desde el renderizador
    const filePath = path.join(__dirname, 'programs.json'); // Ruta del archivo JSON

    let jsonData = {};
    if (fs.existsSync(filePath)) {
        // Leer el archivo si existe
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
            jsonData = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error al parsear programs.json:', error);
        }
    }

    // Agregar o actualizar la entrada
    jsonData[name] = { name, path: file, image: img };

    // Escribir el archivo JSON
    try {
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 4), 'utf-8');
        console.log('programs.json actualizado correctamente.');
    } catch (error) {
        console.error('Error al escribir en programs.json:', error);
    }
});