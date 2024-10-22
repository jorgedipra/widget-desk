/** OpenWebUI-component */
document.addEventListener('DOMContentLoaded', function () {
    const tooltipSystem = document.getElementById('has-tooltip-system');
    tooltipSystem.addEventListener('click', function () {
        minimizar_system();
    });
});
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


function minimizar_system(){
    const checkbox = document.getElementById('rf-ConsumoSys');
    const relatedCheckbox = document.getElementById('re-ConsumoSys');

    if (checkbox) {
        // Alterna el estado del checkbox
        checkbox.checked = !checkbox.checked;
        
        // Si se desmarca el checkbox, marca el otro checkbox
        if (!checkbox.checked && relatedCheckbox) {
            relatedCheckbox.checked = true;
        }
        
        // Llama a toggleVisibility con el estado actual del checkbox
        toggleVisibility('myModal10', checkbox.checked);
    }
}