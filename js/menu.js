/**
 * MENU::CONFIG
 */
var modal00 = document.getElementById("myModal00");
var cerarmodal00 = document.getElementById("cerrarModal00");

makeDraggable(modal00);
modal00.style.top = "250px";
modal00.style.left = "432px";

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
      if (modal00.style.display === 'block') {
        // modal00.style.display = 'none';
        modal00.classList.remove('visible');
        
      } else {
        // modal00.style.display = 'block';
        modal00.classList.toggle('visible');
      }
    });
  });

// Asignar el evento click al botón de cerrar
cerarmodal00.addEventListener('click', cerrarModal);

});
/**
 * VENTANA FLOTANTE
 * @param {} element 
 */
// Función para hacer que un elemento sea arrastrable
function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

  element.onmousedown = function (e) {
    // e.preventDefault();
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
  }
}

// Aplica la funcionalidad de arrastre a la ventana
var modal01 = document.getElementById("myModal01");
makeDraggable(modal01);
modal01.style.top = "-6px";
modal01.style.left = "22px";

var modal02 = document.getElementById("myModal02");
makeDraggable(modal02);
modal02.style.top = "16px";
modal02.style.left = "1180px";

var modal03 = document.getElementById("myModal03");
makeDraggable(modal03);
modal03.style.top = "684px";
modal03.style.left = "5px";


/**
 * Widget
 */
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
  }

  // Asignar el evento de cambio a los botones de radio
  var radios = [
      'rf-relog-digital',
      're-relog-digital',
      'rf-Programas01',
      're-Programas01'
  ];

  radios.forEach(function(id) {
      document.getElementById(id).addEventListener('change', toggleVisibility_relog);
  });
  toggleVisibility_relog();
  // modal00.classList.toggle('visible');
});