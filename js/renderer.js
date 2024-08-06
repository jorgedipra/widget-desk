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


/**
 * llamdo de programas 
 */
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('openChrome').addEventListener('click', () => {
    window.electron.sendOpenProgram('chrome');
  });

  document.getElementById('openSublime').addEventListener('click', () => {
    window.electron.sendOpenProgram('sublime');
  });

  document.getElementById('openPomodoro').addEventListener('click', () => {
    window.electron.sendOpenProgram('pomodoro');
  });

  document.getElementById('openLectorVoz').addEventListener('click', () => {
    window.electron.sendOpenProgram('lectorVoz');
  });
  
});