/**
 * [Componente]
 *  Day-Programas
 */
document.addEventListener('DOMContentLoaded', function () {
    const fecha = new Date();
    const diaSemana = fecha.getDay();
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const day = document.getElementById('component-day');


    if (day) {
        day.innerHTML = diasSemana[diaSemana];
    }
});