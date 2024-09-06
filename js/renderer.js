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
loadComponent('./components/all-component.html', 'component-all');
loadComponent('./components/Clock-component.html', 'component-Clock');
loadComponent('./components/Programas-component.html', 'component-Programas');
loadComponent('./components/Lanzador-component.html', 'component-Lanzador');
loadComponent('./components/Folders-component.html', 'component-Folders');
loadComponent('./components/Lector-component.html', 'component-Lector');
loadComponent('./components/Volumen-component.html', 'component-volumen');
loadComponent('./components/ChildComponent/General-Programas.html', 'Programas-General');
loadComponent('./components/ProgramComponent/Pomodoro-Program.html', 'Programas-Pomodoro');
loadComponent('./components/ProgramComponent/Alarma-Program.html', 'Programas-Alarma');
loadComponent('./components/MonitorSistema-component.html', 'component-MonitorSistema');


/**
 * llamdo de programas 
 */
document.addEventListener('DOMContentLoaded', function () {

    // Mapeo de IDs a programas
    const programMap = {
        'openChrome': 'ChromeDev',
        'openOpera': 'Opera',
        'openBrave': 'Brave',
        'openSublime': 'SublimeText',
        'openVisualCode': 'VisualCode',
        'openDBeaver': 'DBeaver',
        'openSourcetree': 'Sourcetree',
        'openPomodoro': 'Pomodoro',
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

        'openLectorVoz_30': 'lectorVoz_30',
        'openLectorVoz': 'lectorVoz',
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

        Object.keys(programMap).forEach(className => {
            const buttons = document.querySelectorAll(`.${className}`);
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    window.electron.sendOpenProgram(programMap[className]);
                });
            });
        });

    }

    // Configuración de eventos de clic
    setupEventListeners();

});


document.addEventListener('DOMContentLoaded', () => {
    /**
     * Cerrar APP
     *  */
    const closeBtn = document.getElementById('CerrarApp');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            setTimeout(() => {
                // window.close();//cierra solo la ventana
                window.electron.closeApp();//cierra todo el programa
            }, 500); // Espera 500 milisegundos, que es igual a 0.5 segundos
        });
    }

    /**
     * pasar al fondo la aplicación
     */
    const htmlElement = document.getElementById("backgroundWin");
    htmlElement.addEventListener('click', () => {
        window.electron.WinBackground();
    });
    htmlElement.addEventListener('mousedown', () => {
        window.electron.WinBackground();
    });

});


// Modal-notificaciones 

// Función para mostrar el modal
function mostrarModal(titulo, mensaje,offcancelar) {
    return new Promise((resolve) => {
        // Establecer el título y el mensaje
        document.getElementById('modal-title').textContent = titulo;
        document.getElementById('modal-content').textContent = mensaje;

        // Mostrar el modal
        document.getElementById('modal-message').classList.add('is-active');

        // Función para cerrar el modal
        function cerrarModal(resultado) {
            document.getElementById('modal-message').classList.remove('is-active');
            resolve(resultado);
            // Eliminar los event listeners para evitar múltiples registros
            document.getElementById('close-modal').removeEventListener('click', handleClose);
            document.getElementById('cancel-button').removeEventListener('click', handleCancel);
            document.getElementById('accept-button').removeEventListener('click', handleAccept);
        }

        // Manejo de eventos para los botones
        function handleClose() { cerrarModal(false); }
        function handleCancel() { cerrarModal(false); }
        function handleAccept() { cerrarModal(true); }

        document.getElementById('close-modal').addEventListener('click', handleClose);
        document.getElementById('cancel-button').addEventListener('click', handleCancel);
        document.getElementById('accept-button').addEventListener('click', handleAccept);

        if(offcancelar){
            document.getElementById('cancel-button').style.display='none';
        }
    });
}

// Ejemplo de uso del modal como función
/**
mostrarModal('Título desde Consola', 'Mensaje desde Consola').then(resultado => {
    if (resultado) {
      console.log('El usuario aceptó el mensaje.');
    } else {
      console.log('El usuario canceló o cerró el mensaje.');
    }
  });
*/