/**
 * all-component
 */
document.addEventListener('DOMContentLoaded', function () {

  const modal000 = document.getElementById("myModal000");
  // const myModal10 = document.getElementById("myModal10");

  const Pomodoro = document.getElementById('Pomodoro');
  const win_Pomodoro = document.getElementById('myModal06');
  const cerar_Pomodoro = document.getElementById('cerrarModal06').querySelector('p');
  const img_Pomodoro='./images/Component-lanzador/pomodoro.png';

  const Alarma = document.getElementById('Alarma');
  const win_Alarma = document.getElementById('myModal07');
  const cerar_Alarma = document.getElementById('cerrarModal07').querySelector('p');
  const img_Alarma='./images/Component-lanzador/alarma.png';


  // myModal10.classList.remove('visible');
  // myModal10.classList.toggle('hidden');
  // toggleVisibility_win('myModal10', 1);




// Pomodoro
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


//Alarma
if (Alarma) {
  Alarma.addEventListener('click', () => {
    modal000.classList.remove('visible');
    modal000.classList.toggle('hidden');
    toggleVisibility_win('myModal06', 1);
    win_Alarma.classList.toggle('visible');
    win_Alarma.classList.remove('hidden');
  });

  Alarma.style.backgroundImage = `url('${img_Alarma}')`;


}

if (cerar_Alarma) {
  cerar_Alarma.addEventListener('click', () => {
    win_Alarma.classList.remove('hidden');
    win_Alarma.classList.toggle('visible');
  });
}

});


function toggleVisibility_win(id, condition) {
  var element = document.getElementById(id);
  element.style.display = condition ? 'block' : 'none';
}