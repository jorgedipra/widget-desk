/** OpenWebUI-component */

function updateSystemUsage() {
    window.electron.getSystemUsage();
}

window.electron.onSystemUsage((usage) => {
    document.getElementById('ram-usage').textContent = `RAM: ${usage.memoryUsage}%`;
    document.getElementById('cpu-usage').textContent = `CPU: ${usage.cpuUsage}%`;
});

// Actualiza el uso del sistema cada segundo
setInterval(updateSystemUsage, 1000);