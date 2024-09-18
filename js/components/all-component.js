/**
 * all-component
 */
document.addEventListener('DOMContentLoaded', () => {
  const modal000 = document.getElementById("myModal000");

  // Configuración de cada aplicación
  const configuraciones = {
    pomodoro: {
      element: document.getElementById('Pomodoro'),
      modal: document.getElementById('myModal06'),
      closeButton: document.getElementById('cerrarModal06').querySelector('p'),
      img: './images/Component-lanzador/pomodoro.png'
    },
    alarma: {
      element: document.getElementById('Alarma'),
      modal: document.getElementById('myModal07'),
      closeButton: document.getElementById('cerrarModal07').querySelector('p'),
      img: './images/Component-lanzador/alarma.png'
    },
    notas: {
      element: document.getElementById('Notas'),
      modal: document.getElementById('myModal11'),
      closeButton: document.getElementById('cerrarModal11').querySelector('p'),
      img: './images/Component-lanzador/Notas.png'
    }
  };

  // toggleVisibility_win('myModal11', 1);
  // myModal.classList.toggle('visible');
  // myModal.classList.remove('hidden');

  // Función para manejar el click en cada aplicación
  function gestionarAplicacion(appKey) {
    const config = configuraciones[appKey];

    if (config.element) {
      // Click en el botón de la aplicación
      config.element.addEventListener('click', () => {

        modal000.classList.remove('visible');
        modal000.classList.toggle('hidden');
        toggleVisibility_win(config.modal.id, 1);
        config.modal.classList.toggle('visible');
        config.modal.classList.remove('hidden');
        if (config.modal.classList.contains('visible')) {
          // 'La clase "visible" está presente'
          actualizarCampo(appKey, true); 
          
        } else {
          // 'La clase "visible" no está presente'
          actualizarCampo(appKey, false);
        }
        
      });

      // Asignar la imagen de fondo
      config.element.style.backgroundImage = `url('${config.img}')`;
    }

    if (config.closeButton) {
      // Click en el botón de cierre
      config.closeButton.addEventListener('click', () => {
        config.modal.classList.remove('hidden');
        config.modal.classList.toggle('visible');
        actualizarCampo(appKey, false);
      });
    }
  }

  // Iterar sobre cada configuración y aplicar los eventos
  Object.keys(configuraciones).forEach(appKey => {
    gestionarAplicacion(appKey);
  });
});

// Función para alternar visibilidad de la ventana
function toggleVisibility_win(id, condition) {
  var element = document.getElementById(id);
  element.style.display = condition ? 'block' : 'none';
}
