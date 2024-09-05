/**
 * [Componente]
 *  Clock-component
 */
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('openCalendar');
    // Variable para llevar el control del estado de visibilidad
    let isButtonVisible = true;
    document.getElementById('miniPomodoro').addEventListener('click', toggleButtonVisibility);

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {

            const checkbox = document.getElementById('rf-Programas01');
            const relatedCheckbox = document.getElementById('re-Programas01');
            if (checkbox) {
                // Alterna el estado del checkbox
                checkbox.checked = !checkbox.checked;
                
                // Si se desmarca el checkbox, marca el otro checkbox
                if (!checkbox.checked && relatedCheckbox) {
                    relatedCheckbox.checked = true;
                }
                
                // Llama a toggleVisibility con el estado actual del checkbox
                toggleVisibility('myModal02', checkbox.checked);
                document.querySelector("#openCalendar > span").textContent = "Calendario";
            }
        });
    }

    showTime('MyClockDisplay'); 

});


function toggleVisibility(id, condition) {
    var element = document.getElementById(id);
    element.style.display = condition ? 'block' : 'none';
} 


function toggleButtonVisibility() {
    const button = document.getElementById('miniPomodoro');
    const win_Pomodoro = document.getElementById('myModal06');

    button.style.display = 'none'; // Ocultar el botón
    win_Pomodoro.classList.remove('hidden');
    win_Pomodoro.classList.toggle('visible');
    
    // Cambiar el estado de visibilidad
    isButtonVisible = !isButtonVisible;
}

// Función para mostrar la hora actual en el formato deseado
function showTime(id) {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h === 0) {
        h = 12;
    } else if (h > 12) {
        h -= 12;
        session = "PM";
    }

    h = h.toString().padStart(2, '0');
    m = m.toString().padStart(2, '0');
    s = s.toString().padStart(2, '0');

    // Alternar visibilidad de los dos puntos cada segundo
    var separator = s % 2 === 0 ? ":" : "<span class='color_fondo'>:</span>";

    // Construir el tiempo con dos puntos parpadeantes
    var time = h + separator + m + " " + session;
    var time24 = date.getHours().toString().padStart(2, '0') + ":" + m; // Tiempo en formato de 24 horas

    // Verificar si el elemento existe antes de modificar el innerHTML
    var element = document.getElementById(id);
    var element2 = document.getElementById("alarmInputTimeHidden");
    if (element) {
        element.innerHTML = time;
        element2.value = time24; // Actualizar el campo oculto con el formato de 24 horas
    } else {
        console.error(`Element with id "${id}" not found.`);
    }

    setTimeout(function () { showTime(id); }, 1000); // Pasar id como argumento
}