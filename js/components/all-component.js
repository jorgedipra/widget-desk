/**
 * all-component
 */
document.addEventListener('DOMContentLoaded', function () {

  const modal000 = document.getElementById("myModal000");
  const Pomodoro = document.getElementById('Pomodoro');
  const win_Pomodoro = document.getElementById('myModal06');
  const cerar_Pomodoro = document.getElementById('cerrarModal06').querySelector('p');;
  const img_Pomodoro='./images/Component-lanzador/pomodoro.png';

  if (Pomodoro) {
    Pomodoro.addEventListener('click', () => {
      modal000.classList.remove('visible');
      modal000.classList.toggle('hidden');
      toggleVisibility_win('myModal06', 1);
      win_Pomodoro.classList.toggle('visible');
      win_Pomodoro.classList.remove('hidden');
    });

    Pomodoro.style.backgroundImage = `url('${img_Pomodoro}')`;


  }

  if (cerar_Pomodoro) {
    cerar_Pomodoro.addEventListener('click', () => {
      win_Pomodoro.classList.remove('hidden');
      win_Pomodoro.classList.toggle('visible');
    });
  }




});


function toggleVisibility_win(id, condition) {
  var element = document.getElementById(id);
  element.style.display = condition ? 'block' : 'none';
}