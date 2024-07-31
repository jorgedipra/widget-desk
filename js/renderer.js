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


/**
 * llamdo de programas 
 */
document.getElementById('openChrome').addEventListener('click', () => {
  window.electron.sendOpenProgram('chrome');
});

document.getElementById('openSublime').addEventListener('click', () => {
  window.electron.sendOpenProgram('sublime');
});