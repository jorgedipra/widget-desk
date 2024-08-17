/**
 * all-component
 */
document.addEventListener('DOMContentLoaded', function () {  
    const modal000 = document.getElementById("myModal000");
    const Pomodoro = document.getElementById('Pomodoro');
    const win = document.getElementById('myModal06');
  
    if (Pomodoro) {
        Pomodoro.addEventListener('click', () => {
            modal000.classList.remove('visible');
            modal000.classList.toggle('hidden');
            win.display='block';
    });
  }

 });