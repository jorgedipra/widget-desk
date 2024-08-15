// Función para cargar un archivo HTML en un contenedor
function loadComponent(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}
// Llamar a la función para cargar el componente
loadComponent('./components/Menu-component.html', 'component-Menu');
loadComponent('./components/Clock-component.html', 'component-Clock');
loadComponent('./components/Programas-component.html', 'component-Programas');
loadComponent('./components/Lanzador-component.html', 'component-Lanzador');
loadComponent('./components/Folders-component.html', 'component-Folders');
loadComponent('./components/ChildComponent/General-Programas.html', 'Programas-General');

/**
 * llamdo de programas 
 */
document.addEventListener('DOMContentLoaded', function () {

    // Mapeo de IDs a programas
    const programMap = {
        'openChrome': 'chrome',
        'openOpera': 'opera',
        'openBrave': 'brave',
        'openSublime': 'sublime',
        'openVisualCode': 'VisualCode',
        'openDBeaver': 'DBeaver',
        'openSourcetree': 'Sourcetree',
        'openPomodoro': 'pomodoro',
        'openLectorVoz': 'lectorVoz',
        'openFolder-www': 'Folder-www',
        'openFolder-document': 'Folder-document',
        'openFolder-descargas': 'Folder-descargas',
        'openFolder-imagenes': 'Folder-imagenes',
        'openFolder-musica': 'Folder-musica',
        'openFolder-video': 'Folder-video',
        'openFolder-trabajo': 'Folder-trabajo',
        'openAcceso-desk': 'Acceso-desk',
        'openGestor': 'Gestor',
        'openOpenVPN': 'OpenVPN',
        'openWinSCP': 'WinSCP',
        'openUwAmp': 'UwAmp',


        'CerrarApp': 'CerrarApp',
        're-power': 're-power'
    };

    // Función para configurar los eventos de clic
    function setupEventListeners() {
        Object.keys(programMap).forEach(id => {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', () => {
                    window.electron.sendOpenProgram(programMap[id]);
                });
            }
        });

    }

    // Configuración de eventos de clic
    setupEventListeners();  

});


// cerrar app
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('CerrarApp');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            setTimeout(() => {
                window.close();
            }, 500); // Espera 500 milisegundos, que es igual a 0.5 segundos
        });
    }
});
