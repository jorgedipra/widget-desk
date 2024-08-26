/**
 * MENU::CONFIG
 */
var modal00 = document.getElementById("myModal00");
var modal000 = document.getElementById("myModal000");
var cerarmodal00 = document.getElementById("cerrarModal00").querySelector('p');

makeDraggable(modal00);
// makeDraggable(modal000);
initializeModalPosition(modal00, "myModal00");
initializeModalPosition(modal000, "myModal000");



// Función para cerrar el modal
function cerrarModal() {
  var icons = document.querySelectorAll('#nav-icon1, #nav-icon2, #nav-icon3, #nav-icon4');
  icons.forEach(function(icon) {
    icon.click();
  });
  
  if (modal00.classList.contains('visible')) {
      modal00.classList.remove('visible');
  }
}

// Icono de Menu interaccion
document.addEventListener('DOMContentLoaded', function () {
  // Selecciona los elementos con los IDs específicos
  var icons = document.querySelectorAll('#nav-icon1, #nav-icon2, #nav-icon3, #nav-icon4');

  // Añade un manejador de eventos de clic a cada uno
  icons.forEach(function (icon) {
    icon.addEventListener('click', function () {
      // Alterna la clase 'open' en el elemento clicado
      this.classList.toggle('open');
      // Alterna la visibilidad del modal
      if (modal00.classList.contains('visible')) {
        modal00.classList.remove('visible');
        modal00.classList.toggle('hidden');
      } else {
        modal00.classList.toggle('visible');
        modal00.classList.remove('hidden');
      }
    });
  });

  // Asignar el evento click al botón de cerrar
  cerarmodal00.addEventListener('click', cerrarModal);
  
  // Menu de programas
  // modal000.classList.toggle('visible');
  const Program = document.getElementById('program_menu');
  if (Program) {
    Program.addEventListener('click', () => {
      if (modal000.classList.contains('visible')) {
        modal000.classList.remove('visible');
        modal000.classList.toggle('hidden');
      } else {
        modal000.classList.toggle('visible');
        modal000.classList.remove('hidden');
      }
    });
  }


  // Recuperar el estado de los radio buttons desde localStorage
  restoreRadioButtonsState();
});

/**
 * VENTANA FLOTANTE
 * @param {} element 
 */
// Función para hacer que un elemento sea arrastrable
function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

  element.onmousedown = function (e) {
    // Obtén la posición del mouse al hacer clic en el elemento
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  };

  function elementDrag(e) {
    e.preventDefault(); 
    // Calcula el nuevo desplazamiento del elemento
    offsetX = mouseX - e.clientX;
    offsetY = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Aplica el nuevo posicionamiento
    element.style.top = (element.offsetTop - offsetY) + "px";
    element.style.left = (element.offsetLeft - offsetX) + "px";
  }

  function closeDragElement() {
    // Detén el arrastre cuando se suelta el mouse
    document.onmousemove = null;
    document.onmouseup = null;
    // Guarda la posición en localStorage
    savePosition(element.id);
  }
}

/**
 * Inicializa la posición del modal desde localStorage [Del Menu de Configuración]
 * @param {HTMLElement} modal El modal a inicializar
 * @param {string} id El ID del modal para usar en localStorage
 */
function initializeModalPosition(modal, id) {
  const position = JSON.parse(localStorage.getItem(id));
  if (position) {
    modal.style.top = position.top || "0px";
    modal.style.left = position.left || "0px";
  } else {
    // Posiciones predeterminadas si no hay datos en localStorage
    modal.style.top = "250px";
    modal.style.left = "432px";
  }
}

/**
 * Guarda la posición del modal en localStorage[del resto de ventanas]
 * @param {string} modalId El ID del modal a guardar
 */
function savePosition(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    const position = {
      top: modal.style.top,
      left: modal.style.left
    };
    localStorage.setItem(modalId, JSON.stringify(position));
  }
}

/**
 * Aplica la funcionalidad de arrastre a los modales
 */
// Lista de IDs de los modales
const modalIds = [
  "myModal01",//component-Clock
  "myModal02",//component-Programas
  "myModal03",//component-Lanzador
  "myModal04",//component-Folders
  "myModal05",//component-Lector

  "myModal06",//component-program(pomodoro)
  "myModal07",//component-program(Alarma)
  "myModal08"//component-Dia
];

// Función para inicializar modales
function initializeModals(modalIds) {
  modalIds.forEach(id => {
      const modal = document.getElementById(id);
      makeDraggable(modal);
      initializeModalPosition(modal, id);
  });
}

// Llamada a la función para inicializar todos los modales
initializeModals(modalIds);

/**
 * Widget
 */
// Asignar el evento de cambio a los botones de radio
const radios = [
  're-relog-digital',
  'rf-relog-digital',
  're-Programas01',
  'rf-Programas01',
  're-Lanzador',
  'rf-Lanzador',
  're-Folders',
  'rf-Folders',
  're-Lector',
  'rf-Lector',
  're-Day',
  'rf-Day'
];

document.addEventListener('DOMContentLoaded', function() {
  // Función para manejar la visibilidad del modal
  function toggleVisibility(id, condition) {
    var element = document.getElementById(id);
    element.style.display = condition ? 'block' : 'none';
  }

  function toggleVisibility_relog() {
      // Configurar el estado de los modales basado en los radio buttons
      toggleVisibility('myModal01', document.getElementById('rf-relog-digital').checked);
      toggleVisibility('myModal02', document.getElementById('rf-Programas01').checked);
      toggleVisibility('myModal03', document.getElementById('rf-Lanzador').checked);
      toggleVisibility('myModal04', document.getElementById('rf-Folders').checked);
      toggleVisibility('myModal05', document.getElementById('rf-Lector').checked);
      toggleVisibility('myModal08', document.getElementById('rf-Day').checked);
  }

  radios.forEach(function(id) {
      document.getElementById(id).addEventListener('change', function() {
          // Guarda el estado del radio button en localStorage
          saveRadioButtonState();
          // Actualiza la visibilidad del modal
          toggleVisibility_relog();
      });
  });

  // Recuperar el estado de los radio buttons y aplicar
  toggleVisibility_relog();
});

/**
 * Guarda el estado de los radio buttons en localStorage
 */
function saveRadioButtonState() {
  

  radios.forEach(function(id) {
    const radio = document.getElementById(id);
    if (radio) {
      localStorage.setItem(id, radio.checked.toString());
    }
  });
}

/**
 * Recupera el estado de los radio buttons desde localStorage
 */
function restoreRadioButtonsState() {
  
  radios.forEach(function(id) {
    const checked = localStorage.getItem(id) === 'true';
    const radio = document.getElementById(id);
    if (radio) {
      radio.checked = checked;
    }
  });
}