/** OpenWebUI-component */

function updateSystemUsage() {
    window.electron.getSystemUsage();
}

window.electron.onSystemUsage((usage) => {
    // Actualiza el texto y el progreso de la RAM
    document.getElementById('ram-percent').textContent = `${usage.memoryUsage}%`;
    document.getElementById('ram-progress').value = usage.memoryUsage;

    // Actualiza el texto y el progreso del CPU
    document.getElementById('cpu-percent').textContent = `${usage.cpuUsage}%`;
    document.getElementById('cpu-progress').value = usage.cpuUsage;
});

// Actualiza el uso del sistema cada segundo
setInterval(updateSystemUsage, 1000);
