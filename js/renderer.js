// Función para cargar un archivo HTML en un contenedor
function loadComponent(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;
            } else {
                console.error('No se encontró el contenedor con ID:', containerId);
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

// Llamar a la función para cargar el componente
loadComponent('./components/Menu-component.html', 'component-Menu');
loadComponent('./components/all-component.html', 'component-all');
loadComponent('./components/Clock-component.html', 'component-Clock');
loadComponent('./components/Calendario-component.html', 'component-Calendario');
loadComponent('./components/Lanzador-component.html', 'component-Lanzador');
loadComponent('./components/Folders-component.html', 'component-Folders');
loadComponent('./components/Lector-component.html', 'component-Lector');
loadComponent('./components/Volumen-component.html', 'component-volumen');
loadComponent('./components/Luz-component.html', 'component-luz');
loadComponent('./components/ChildComponent/General-Programas.html', 'Programas-General');
loadComponent('./components/ProgramComponent/Pomodoro-Program.html', 'Programas-Pomodoro');
loadComponent('./components/ProgramComponent/Alarma-Program.html', 'Programas-Alarma');
loadComponent('./components/ProgramComponent/Notas-Program.html', 'Programas-Notas');
loadComponent('./components/MonitorSistema-component.html', 'component-MonitorSistema');
loadComponent('./components/ChildComponent/win-Lanzador.html', 'component-winLanzador');
loadComponent('./components/ChildComponent/win-LanzadorConfig.html', 'component-winLanzadorConfig');


/**
 * llamdo de programas 
 */

document.addEventListener('DOMContentLoaded', function () {

    // Mapeo de IDs a programas
    const programMap = {
        'openChrome': 'ChromeDev',
        'openOpera': 'Opera',
        'openBrave': 'Brave',
        'sublime_text': 'sublime_text',
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
        'UwAmp': 'UwAmp',

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
    const ConfigLanzadorBtn = document.getElementById('ConfigLanzador');
    const cerrarModa14 = document.getElementById('cerrarModa14');
    const myModal14 = document.getElementById('myModal14');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            setTimeout(() => {
                // window.close();//cierra solo la ventana
                window.electron.closeApp();//cierra todo el programa
            }, 500); // Espera 500 milisegundos, que es igual a 0.5 segundos
        });
    }

            myModal14.classList.remove('hidden');
            myModal14.classList.toggle('visible');
            toggleVisibility('myModal14', false);
            makeDraggable('#myModal14', false);


    if(ConfigLanzadorBtn){
        ConfigLanzadorBtn.addEventListener('click', () => {
        
            const navIcon2 = document.getElementById('nav-icon2');
            setTimeout(() => {
                navIcon2.click();
            }, 1000);

            myModal14.classList.remove('hidden');
            myModal14.classList.toggle('visible');
            toggleVisibility('myModal14', true);
            makeDraggable('#myModal14', false);
        });
    }
    if(cerrarModa14){
        cerrarModa14.addEventListener('click', () => {
            myModal14.classList.remove('visible');
            myModal14.classList.toggle('hidden');
            toggleVisibility('myModal14', false);
            makeDraggable('#myModal14', true);
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
function mostrarModal(titulo, mensaje, offcancelar) {
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

        if (offcancelar) {
            document.getElementById('cancel-button').style.display = 'none';
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

// Notas:
window.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const isPinned = localStorage.getItem('isPinned') === 'true';

    updatePinState(isPinned);

    document.getElementById('fijarOn').addEventListener('click', () => {
        // Actualizar el estado de los íconos y guardar en localStorage
        localStorage.setItem('isPinned', 'true');
        updatePinState(true);
    });

    document.getElementById('fijarOff').addEventListener('click', () => {
        // Actualizar el estado de los íconos y guardar en localStorage
        localStorage.setItem('isPinned', 'false');
        updatePinState(false);
    });

    function updatePinState(isPinned) {
        const modal = document.getElementById('myModal11');
        const fijarOnIcon = document.getElementById('fijarOn');
        const fijarOffIcon = document.getElementById('fijarOff');

        if (isPinned) {         

            fijarOnIcon.style.display = "none";
            fijarOffIcon.style.display = "block";
            modal.style.cursor = "move";
            document.querySelectorAll('#myModal11 > .header').forEach(header => {
                header.style.cursor = "move";
            });
            makeDraggable('#myModal11', true);

        } else {   
            
            fijarOnIcon.style.display = "block";
            fijarOffIcon.style.display = "none";
            modal.style.cursor = "default";
            document.querySelectorAll('#myModal11 > .header').forEach(header => {
                header.style.cursor = "default";
            });
            makeDraggable('#myModal11', false);
            // Asegúrate de que el modal esté visible
            modal.classList.remove('hidden');
            modal.classList.add('visible');
            let configActual = JSON.parse(localStorage.getItem("config"));
            if(!configActual['notas'])
                actualizarCampo("notas", true);
        }
    }

    // Agregar eventos para los botones de la barra de herramientas
    document.getElementById('bold').addEventListener('click', () => {
        document.execCommand('bold');
    });

    document.getElementById('italic').addEventListener('click', () => {
        document.execCommand('italic');
    });

    document.getElementById('underline').addEventListener('click', () => {
        document.execCommand('underline');
    });

    document.getElementById('quote').addEventListener('click', () => {
        document.execCommand('formatBlock', false, 'blockquote');
    });


    document.getElementById('strikethrough').addEventListener('click', () => {
        document.execCommand('strikeThrough');
    });

    document.getElementById('colorPicker').addEventListener('click', () => {
        // Mostrar el input de color cuando el usuario hace clic en el botón
        document.getElementById('colorInput').click();
    });
    
    document.getElementById('colorInput').addEventListener('input', (event) => {
        const color = event.target.value; // Obtener el color seleccionado
        document.execCommand('foreColor', false, color); // Aplicar el color al texto seleccionado
    });


    // Mostrar/Ocultar la cuadrícula de emojis
    document.getElementById('insertEmoji').addEventListener('click', () => {
        emojiGrid.classList.toggle('hidden'); // Mostrar/Ocultar cuadrícula
    });

    // Insertar el emoji seleccionado en el editor
    emojiGrid.addEventListener('click', (event) => {
        const emoji = event.target.textContent;
        if (emoji) {
            document.execCommand('insertText', false, emoji);
            emojiGrid.classList.add('hidden'); // Ocultar cuadrícula tras seleccionar
        }
    });

    // Función para cerrar cualquier elemento <li> abierto y su contenedor <ol> o <ul>
    function closeOpenListElements(range) {
        let container = range.commonAncestorContainer;

        // Asegúrate de que el container sea un elemento del DOM
        while (container.nodeType === Node.TEXT_NODE) {
            container = container.parentNode;
        }

        // Cierra todos los elementos <li> abiertos y su contenedor <ol> o <ul>
        let listItem = container.closest('li');
        if (listItem) {
            // Cierra el <li> actual
            listItem.innerHTML += '<br>'; // Agrega un <br> al final del <li> para asegurarte de que se cierre correctamente
            let parentList = listItem.parentElement;
            while (parentList && (parentList.tagName === 'OL' || parentList.tagName === 'UL')) {
                // Cierra el <ol> o <ul> actual
                parentList.appendChild(document.createElement('br')); // Añade un <br> para cerrar el <ol> o <ul>
                parentList = parentList.parentElement;
            }
        }
    }

    // Función para insertar una lista
    document.getElementById('insertList').addEventListener('click', () => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // Cierra cualquier elemento <li> abierto y su contenedor <ol> o <ul>
        closeOpenListElements(range);

        // Crea una lista ordenada
        const ol = document.createElement('ol');
        const li = document.createElement('li');

        // Inserta un elemento de lista vacío
        ol.appendChild(li);

        // Inserta la lista en el rango seleccionado
        range.deleteContents();
        range.insertNode(ol);

        // Coloca el cursor dentro del primer elemento de la lista
        range.setStart(li, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    });

    // Función para insertar un salto de línea
    document.getElementById('lineBreak').addEventListener('click', () => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // Cierra cualquier elemento <li> abierto y su contenedor <ol> o <ul>
        closeOpenListElements(range);

        // Crea un nuevo salto de línea
        const br = document.createElement('br');

        // Inserta el salto de línea en el rango seleccionado
        range.deleteContents();
        range.insertNode(br);

        // Coloca el cursor después del salto de línea
        range.setStartAfter(br);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    });

    // Función para insertar una línea horizontal
    document.getElementById('horizontalLine').addEventListener('click', () => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // Cierra cualquier elemento <li> abierto y su contenedor <ol> o <ul>
        closeOpenListElements(range);

        // Crea una línea horizontal
        const hr = document.createElement('hr');

        // Inserta la línea horizontal en el rango seleccionado
        range.deleteContents();
        range.insertNode(hr);

        // Coloca el cursor después de la línea horizontal
        range.setStartAfter(hr);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    });


    document.getElementById('removeFormat').addEventListener('click', () => {
        document.execCommand('removeFormat');
    });


    // Copiar contenido
    document.getElementById('copyContent').addEventListener('click', () => {
        const content = editor.innerHTML;
        navigator.clipboard.writeText(content).then(() => {
            // alert('Contenido copiado');
        }).catch(err => {
            console.error('Error al copiar el contenido:', err);
        });
    });

    document.getElementById('clear').addEventListener('click', () => {
        editor.innerHTML = '';
    });

    // Cargar el contenido al iniciar
    loadContent();

    // Guardar el contenido al cerrar la ventana
    window.onbeforeunload = () => {
        const content = editor.innerHTML;
        window.electron.saveNote(content);
    };

    editor.addEventListener('input', function () {
        const content = editor.innerHTML;
        window.electron.saveNote(content);
    });

    
    document.getElementById('minimizar_Notas').addEventListener('click', () => {
        toggleVisibility_win('myModal11', 1);
        document.getElementById("myModal11").classList.toggle('visible');
        document.getElementById("myModal11").classList.remove('hidden');
    });
    
});

// Función para cargar el contenido de la nota
async function loadContent() {
    try {
        const content = await window.electron.loadNote();
        editor.innerHTML = content;
    } catch (error) {
        console.error('Error al cargar el contenido:', error);
    }
}