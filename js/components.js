document.addEventListener('DOMContentLoaded', () => {
    let alarms = JSON.parse(localStorage.getItem('alarms')) || []; // Recuperar alarmas del localStorage o inicializar con un array vacío
    let swBtnAdd = 0; // Estado del botón de agregar alarma
    let editingAlarmId = null; // ID de la alarma que se está editando
    let playInterval = null;

    const addAlarmButton = document.querySelector('.addAlarmButton');
    const btnCancelar = document.querySelector('#btnCancelar');
    const btnCrear = document.querySelector('#btnCrear');
    const alarmTime = document.querySelector('#alarmTime'); // Hora actual

    // Muestra la hora actual en el formato deseado
    if (alarmTime) {
        showTime('alarmTime');
    }

    // Renderizar alarmas desde localStorage al cargar la página
    alarms.forEach(alarm => renderAlarm(alarm));

    // Verificar alarmas activas cada minuto
    setInterval(checkAlarms, 60000); // Ejecutar cada 60 segundos

    // Maneja el clic en el botón para mostrar el formulario de agregar alarma
    if (addAlarmButton) {
        addAlarmButton.addEventListener('click', () => {
            if (swBtnAdd === 0) {
                document.getElementById("alarmInputTime").value = convertTo24HourFormat(document.getElementById("alarmInputTimeHidden").value);

                document.querySelector('.button.addAlarmButton').classList.add('expanded');
                document.querySelector('#AddAlarm').classList.add('visible');

                document.getElementById('Alarma-Programas').scrollTop = document.getElementById('Alarma-Programas').scrollHeight;
                swBtnAdd = 1;
                editingAlarmId = null; // Resetear ID de edición
                btnCrear.value = 'Crear';
                btnCrear.classList.remove('is-info'); // Cambiar color de botón
                btnCrear.classList.add('is-primary');
                if (btnCancelar) {
                    btnCancelar.classList.remove('hidden'); // Asegúrate de que el botón de cancelar sea visible
                }
            }
        });
    }

    // Maneja el clic en el botón para cancelar el formulario de agregar alarma
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            retraerBtn();
            setTimeout(() => {
                swBtnAdd = 0;
                editingAlarmId = null; // Resetear ID de edición
                btnCrear.value = 'Crear';
                btnCrear.classList.remove('is-info'); // Restaurar color original del botón
                btnCrear.classList.add('is-primary');
                if (btnCancelar) {
                    btnCancelar.classList.add('hidden'); // Ocultar el botón de cancelar en modo edición
                }
            }, 500);
        });
    }

    // Maneja el clic en el botón para crear o guardar una alarma
    if (btnCrear) {
        btnCrear.addEventListener('click', () => {
            // Captura de datos del formulario
            const timeInput = document.querySelector('#alarmInputTime').value;
            const sound = document.querySelector('select[name="soundSelect"]').value;
            const repeat = document.querySelector('select[name="repeatSelect"]').value;
            const autoDelete = document.querySelector('#autoDelete').checked;
            const label = document.querySelector('#alarmLabel').value || 'Nueva Alarma';

            // Convertir el formato de hora a 12 horas
            const time = convertTo12HourFormat(timeInput);

            const alarmData = {
                label: label,
                time: timeInput, // Guardar en formato de 24 horas para consistencia
                repeat: repeat,
                sound: sound,
                autoDelete: autoDelete,
                active: true
            };

            if (editingAlarmId) {
                // Editar alarma existente
                const alarmIndex = alarms.findIndex(alarm => alarm.id === editingAlarmId);
                if (alarmIndex > -1) {
                    alarms[alarmIndex] = {
                        id: editingAlarmId,
                        ...alarmData
                    };

                    // Actualizar el DOM con los nuevos datos
                    const alarmItem = document.querySelector(`li[data-id="${editingAlarmId}"]`);
                    alarmItem.querySelector('.etiquetaTime').textContent = label;
                    alarmItem.querySelector('.timeHMT').textContent = convertTo12HourFormat(timeInput);
                    alarmItem.querySelector('.timeExt').textContent = repeat;
                    alarmItem.querySelector('.toggle-button').textContent = alarms[alarmIndex].active ? 'Apagar' : 'Encender';
                    alarmItem.querySelector('.toggle-button').classList.toggle('is-warning', alarms[alarmIndex].active);
                    alarmItem.querySelector('.toggle-button').classList.toggle('is-success', !alarms[alarmIndex].active);

                    // Guardar cambios en localStorage
                    localStorage.setItem('alarms', JSON.stringify(alarms));

                    // Resetear modo de edición
                    editingAlarmId = null;
                    btnCrear.value = 'Crear';
                    btnCrear.classList.remove('is-info'); // Restaurar color original del botón
                    btnCrear.classList.add('is-primary');
                    if (btnCancelar) {
                        btnCancelar.classList.add('hidden'); // Ocultar el botón de cancelar en modo edición
                    }
                }
            } else {
                // Creación de la nueva alarma con los valores del formulario
                const newAlarm = {
                    id: Date.now(),
                    ...alarmData
                };
                alarms.push(newAlarm);
                renderAlarm(newAlarm); // Renderiza la nueva alarma en la lista

                // Guardar nueva alarma en localStorage
                localStorage.setItem('alarms', JSON.stringify(alarms));
            }

            retraerBtn();
            setTimeout(() => {
                swBtnAdd = 0;
            }, 500);
        });
    }

    // Función para convertir el formato de hora de 24 horas a 12 horas
    function convertTo12HourFormat(time) {
        if (!time) return '';

        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours || 12; // la hora "0" debería ser "12"
        minutes = minutes.padStart(2, '0');
        return `${hours}:${minutes} ${ampm}`;
    }

    // Función para convertir el formato de hora de 12 horas a 24 horas
    function convertTo24HourFormat(time) {
        if (!time) return '';

        let [timePart, session] = time.split(' ');
        let [hours, minutes] = timePart.split(':');
        hours = parseInt(hours, 10);
        if (session === 'PM' && hours !== 12) hours += 12;
        if (session === 'AM' && hours === 12) hours = 0;
        hours = hours.toString().padStart(2, '0');
        minutes = minutes.padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Función para renderizar una alarma en la lista
    function renderAlarm(alarm) {
        const alarmList = document.getElementById('alarmList');
        const alarmItem = document.createElement('li');
        alarmItem.setAttribute('data-id', alarm.id);
        alarmItem.innerHTML = `
            <div>
                <span class="etiquetaTime">${alarm.label} </span>
                <section class="session-time">
                    <span class="timeHMT">${convertTo12HourFormat(alarm.time)}</span>
                    <span class="timeExt">${alarm.repeat}</span>
                </section>
            </div>
            <div class="session-button">
                <button class="button is-info edit-button">Editar</button>
                <button class="button status-button ${alarm.active ? 'is-warning' : 'is-success'} toggle-button">${alarm.active ? 'Apagar' : 'Encender'}</button>
                <button class="button is-danger delete-button">Eliminar</button>
            </div>
        `;

        // Añadir listeners para los botones de la alarma
        alarmItem.querySelector('.edit-button').addEventListener('click', () => editAlarm(alarm.id));
        alarmItem.querySelector('.delete-button').addEventListener('click', () => deleteAlarm(alarm.id));
        alarmItem.querySelector('.toggle-button').addEventListener('click', () => toggleAlarmStatus(alarm.id));

        alarmList.appendChild(alarmItem);
    }

    // Función para editar una alarma
    function editAlarm(alarmId) {
        const alarm = alarms.find(alarm => alarm.id === alarmId);
        if (!alarm) return;

        // Rellenar el formulario con los datos actuales de la alarma
        document.querySelector('#alarmInputTime').value = convertTo24HourFormat(alarm.time);
        document.querySelector('select[name="soundSelect"]').value = alarm.sound;
        document.querySelector('select[name="repeatSelect"]').value = alarm.repeat;
        document.querySelector('#autoDelete').checked = alarm.autoDelete;
        document.querySelector('#alarmLabel').value = alarm.label || '';

        document.querySelector('.button.addAlarmButton').classList.add('expanded');
        document.querySelector('#AddAlarm').classList.add('visible');

        document.getElementById('Alarma-Programas').scrollTop = document.getElementById('Alarma-Programas').scrollHeight;
        swBtnAdd = 1;
        editingAlarmId = alarmId; // Guardar el ID de la alarma que se está editando
        btnCrear.value = 'Guardar';
        btnCrear.classList.remove('is-primary'); // Cambiar color de botón
        btnCrear.classList.add('is-info');
        if (btnCancelar) {
            btnCancelar.classList.remove('hidden'); // Mostrar el botón de cancelar en modo edición
        }
    }

    // Función para eliminar una alarma
    function deleteAlarm(alarmId) {
        alarms = alarms.filter(alarm => alarm.id !== alarmId);
        const alarmItem = document.querySelector(`li[data-id="${alarmId}"]`);
        if (alarmItem) {
            alarmItem.remove();
        }

        // Actualizar localStorage
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }

    // Función para alternar el estado de la alarma
    function toggleAlarmStatus(alarmId) {
        const alarm = alarms.find(alarm => alarm.id === alarmId);
        if (!alarm) return;

        alarm.active = !alarm.active; // Alterna el estado
        const button = document.querySelector(`li[data-id="${alarmId}"] .toggle-button`);
        button.textContent = alarm.active ? 'Apagar' : 'Encender';
        button.classList.toggle('is-warning', alarm.active);
        button.classList.toggle('is-success', !alarm.active);

        // Actualizar localStorage
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }

    // Función para reproducir un sonido
    function playSound(soundFile) {
        const audio = new Audio(soundFile);
        audio.play();
    }

    // Función para retraer el formulario de agregar alarma
    function retraerBtn() {
        document.querySelector('.button.addAlarmButton').classList.remove('expanded');
        document.querySelector('#AddAlarm').classList.remove('visible');

        document.getElementById('Alarma-Programas').scrollTop = 0;
    }

    // Función para verificar y mostrar alertas para las alarmas activas
    function checkAlarms() {
        const now = new Date();
        const currentTime = now.toTimeString().substring(0, 5); // Obtener tiempo actual en formato HH:MM

        alarms.forEach(alarm => {
            if (alarm.active && alarm.time === convertTo24HourFormat(currentTime)) {
                // Reproducir el sonido asociado
                if (alarm.sound === 'beep') {
                    playSoundRepeatedly('./song/SD_ALERT_29.mp3', 1000); // Repetir cada 1000 ms
                } else if (alarm.sound === 'ring') {
                    playSoundRepeatedly('./song/mario-bros-die.mp3', 1000); // Repetir cada 1000 ms
                }
                
                // Mostrar alerta
                mostrarModal(`🕑 Alarma: ${alarm.label} 🕑`, `¡Alarma activada!`, 'Simple').then(resultado => {
                    if (resultado) {
                        stopSound(); // Detener el sonido cuando el usuario acepta el mensaje
                    }
                });
                
                // Si autoDelete está habilitado, eliminar la alarma
                if (alarm.autoDelete) {
                    deleteAlarm(alarm.id);
                }
            }
        });
    }

    // Función para reproducir un sonido indefinidamente
function playSoundRepeatedly(soundFile, interval) {
    // Si ya hay un intervalo activo, no crear uno nuevo
    if (playInterval) return;

    playInterval = setInterval(() => {
        playSound(soundFile);
    }, interval);
}

// Función para detener el sonido
function stopSound() {
    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
    }
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
});

/**
 * all-component
 */
document.addEventListener('DOMContentLoaded', function () {

  const modal000 = document.getElementById("myModal000");

  const Pomodoro = document.getElementById('Pomodoro');
  const win_Pomodoro = document.getElementById('myModal06');
  const cerar_Pomodoro = document.getElementById('cerrarModal06').querySelector('p');
  const img_Pomodoro='./images/Component-lanzador/pomodoro.png';

  const Alarma = document.getElementById('Alarma');
  const win_Alarma = document.getElementById('myModal07');
  const cerar_Alarma = document.getElementById('cerrarModal07').querySelector('p');
  const img_Alarma='./images/Component-lanzador/alarma.png';

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
/**
 * Clock-component
 */
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('openCalendar');
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
            }
        });
    }
});


function toggleVisibility(id, condition) {
    var element = document.getElementById(id);
    element.style.display = condition ? 'block' : 'none';
} 


// Variable para llevar el control del estado de visibilidad
let isButtonVisible = true;

document.getElementById('miniPomodoro').addEventListener('click', toggleButtonVisibility);

function toggleButtonVisibility() {
    const button = document.getElementById('miniPomodoro');
    const win_Pomodoro = document.getElementById('myModal06');

    button.style.display = 'none'; // Ocultar el botón
    win_Pomodoro.classList.remove('hidden');
    win_Pomodoro.classList.toggle('visible');
    
    // Cambiar el estado de visibilidad
    isButtonVisible = !isButtonVisible;
}

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
/**
 * Lanzador-components
 */
let wrapper = document.querySelector(".usermenu"),
    children = document.querySelectorAll(".usermenu a");
const noOfCircles = children.length;
const degreeAngle = 360 / noOfCircles;

let currAngle = 0;
/* draw each circle at the specified angle */
for (var i = 0; i < noOfCircles; i++) {
    currAngle = currAngle + degreeAngle;
    setDiv(children[i], currAngle);
}

function setDiv(el, currAngle) {
    el.classList.add("circle");
    el.setAttribute("data-angle", currAngle + 250);
    el.style.transform =
        "rotate(" +
        (currAngle + 260) +
        "deg) translate(0) rotate(-" +
        (currAngle + 260) +
        "deg)";
}

function toggle(bool, timeout = false) {
    let children = document.querySelectorAll(".usermenu a"),
        angle,
        i = 0,
        translate = 0,
        timer;
    (timeout ? timer = ".3s" : timer = "0s");

    if (bool) {
        translate = "5em";
        timer = "0s";
    }
    for (i; children.length > i; i++) {
        angle = children[i].getAttribute("data-angle");
        children[i].style.transition = "transform 0.3s ease-out " + timer;
        children[i].style.transform =
            "rotate(" +
            angle +
            "deg) translate(" +
            translate +
            ") rotate(-" +
            angle +
            "deg)";
    }
}

wrapper.addEventListener('mouseover', () => {
    toggle(true, true);
});
wrapper.addEventListener('mouseout', () => {
    toggle(false, true);
});
let state = false;
wrapper.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('circle')) {
        return false;
    }
    toggle(state = !state);
});

// Obtén todos los enlaces dentro de .usermenu
const links = document.querySelectorAll(".usermenu a");

// Obtén el div cuyo fondo queremos cambiar
const targetDiv = document.querySelector(".usermenu > div");

// Función para cambiar el fondo del div
function changeBackgroundImage(url) {
    targetDiv.style.backgroundImage = `url(${url})`;
}

// Cargar datos desde el archivo JSON
fetch('programs.json')
    .then(response => response.json())
    .then(data => {
        // Define las imágenes de fondo para cada enlace basado en el JSON
        Object.keys(data).forEach(key => {
            const program = data[key];
            const link = document.querySelector(`a.${key}`);
            if (link && program.image) {
                // Establece la imagen de fondo del enlace
                link.style.backgroundImage = `url(${program.image})`;

                // Configura los eventos hover para cada enlace
                link.addEventListener('mouseover', () => {
                    changeBackgroundImage(program.image);
                });

                link.addEventListener('mouseout', () => {
                    targetDiv.style.backgroundImage = '';
                });
            }
        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
/**
 * Componente Lector
 */

// Obtener las referencias a los elementos
const objOn = document.getElementById("obj-on");
const objOff = document.getElementById("obj-off");

objOff.style.display = "block";

// Función para alternar la visibilidad
function toggleVisibility_Lector() {
    if (objOff.style.display === "block") { 
        objOn.style.display = "block";
        objOff.style.display = "none";
        
        // Temporizador de 1 minuto para apagar automáticamente
        setTimeout(() => { 
            objOn.style.display = "none";
            objOff.style.display = "block";
        }, 30000); // 60000 milisegundos = 1 minuto
    } else {
        objOn.style.display = "none";
        objOff.style.display = "block";
    }
}

// Añadir el evento click a ambos elementos
objOn.addEventListener("click", toggleVisibility_Lector);
objOff.addEventListener("click", toggleVisibility_Lector);
/**
 * Pomodoro-program
 */
let workTime = 40; // Default work time in minutes
let breakTime = 10; // Default break time in minutes
let longBreakTime = 30; // Long break time in minutes
let sessions = 0;
let totalWorkTime = 0; // in minutes
let timerRunning = false;
let timerType = 'work';
let remainingTime = workTime * 60; // in seconds
let freeBreakMode = false;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    updateTimerDisplay();

    document.getElementById('start').addEventListener('click', startTimer);
    document.getElementById('stop').addEventListener('click', stopTimer);
    document.getElementById('reset').addEventListener('click', resetTimer);
    document.getElementById('freeBreak').addEventListener('click', startFreeBreak);
    document.getElementById('updateTimes').addEventListener('click', updateTimes);
    document.getElementById('minimizar_pomodoro').addEventListener('click', minimizar_pomodoro);


});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    document.getElementById('timer_pomodoro').textContent = formatTime(remainingTime);
}

function updateTimer() {
    if (timerRunning) {
        if (remainingTime > 0) {
            remainingTime -= 1;
            updateTimerDisplay();
            timerInterval = setTimeout(updateTimer, 1000);
        } else {
            playSound();
            setTimeout(() => {
                if (freeBreakMode) {
                    startFreeBreak();
                } else {
                    askForActivityChange();
                }
            }, 1000);
        }
    }
}

function startTimer() {
    document.getElementById('title_pomodoro').textContent = "🔰 Trabajando... 🔰";
    if (!timerRunning) {
        if (freeBreakMode) {
            freeBreakMode = false;
            document.getElementById('start').textContent = "Iniciar";
        }
        timerRunning = true;
        updateTimer();
    }
}

function stopTimer() {
    clearTimeout(timerInterval);
    timerRunning = false;
}

function resetTimer() {
    stopTimer();
    document.getElementById('title_pomodoro').textContent = "🍅 Pomodoro Timer 🍅";
    remainingTime = timerType === 'work' ? workTime * 60 : breakTime * 60;
    updateTimerDisplay();
}

function startFreeBreak() {
    document.getElementById('title_pomodoro').textContent = "🔰 Descanso 🔰";
    if (!freeBreakMode) {
        stopTimer();
        freeBreakMode = true;
        document.getElementById('start').textContent = "Iniciar Descanso";
        remainingTime = breakTime * 60;
        updateTimerDisplay();
    } else {
        startTimer();
    }
}

function askForActivityChange() { 
    if(timerType === 'work')
        timerType='trabajo'
    else
        timerType='descanso'
    
    mostrarModal('🍅 Pomodoro Timer 🍅', `¿Deseas cambiar de ${timerType} a ${timerType === 'trabajo' ? 'descanso' : 'trabajo'}?`).then(resultado => {

        if (resultado) {
            timerType = 'work';
            switchMode();
            updateTimer();
        }else{
            timerType = 'break';
            resetTimer();
        } 

    });
}

function switchMode() {
    if (timerType === 'work') {
        document.getElementById('title_pomodoro').textContent = "🔰 Descanso 🔰";
        if (sessions === 2) {
            remainingTime = longBreakTime * 60;
            sessions = 0;
        } else {
            remainingTime = breakTime * 60;
            sessions += 1;
        }
        document.getElementById('breakStatus').textContent = `Descansos: ${sessions}`;
        totalWorkTime += workTime;
        document.getElementById('workStatus').textContent = `Horas de trabajo: ${totalWorkTime}`;
        timerType = 'break';
    } else {
        timerType = 'work';
        document.getElementById('title_pomodoro').textContent = "🔰 Trabajando... 🔰";
        remainingTime = workTime * 60;
    }
}

function playSound() {
    const audio = new Audio(timerType === 'work' ? './song/SD_ALERT_29.mp3' : './song/mario-bros-die.mp3');
    audio.play();
}

function updateTimes() {
    workTime = parseInt(document.getElementById('workTime').value, 10);
    breakTime = parseInt(document.getElementById('breakTime').value, 10);
    resetTimer();
}

function minimizar_pomodoro() {
    const min_Pomodoro = document.getElementById('minimizar_pomodoro');
    const win_Pomodoro = document.getElementById('myModal06');
    const miniPomodoro = document.getElementById('miniPomodoro');
    const timerText = document.getElementById('timer_pomodoro').textContent;
    if (min_Pomodoro) {
        win_Pomodoro.classList.remove('hidden');
        win_Pomodoro.classList.toggle('visible');
        miniPomodoro.style.display = 'block';
        // Llamar a la función de actualización cada 1 segundo
        const intervalId = setInterval(updateButtonText, 1000); // 1000 milisegundos = 1 segundo
    }

    // Función para actualizar el texto del botón
    function updateButtonText() {
        const timerText = document.getElementById('timer_pomodoro').textContent;
        miniPomodoro.textContent = "🍅 " + timerText;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const monthYearElem = document.getElementById('monthYear');
    const daysElem = document.getElementById('days');

    let currentDate = new Date();

    // Lista de festivos fijos en Colombia (día, mes)
    const fixedHolidays = [
        { day: 1, month: 0 },  // Año Nuevo (1 de enero)
        { day: 1, month: 4 },  // Día del Trabajo (1 de mayo)
        { day: 20, month: 6 }, // Independencia (20 de julio)
        { day: 7, month: 7 },  // Batalla de Boyacá (7 de agosto)
        { day: 25, month: 11 }, // Navidad (25 de diciembre)
        { day: 25, month: 10 },
        { day: 2, month: 8 }
    ];

    // Función para calcular la Pascua y festivos móviles basados en la Pascua
    function getEasterDate(year) {
        const f = Math.floor,
            G = year % 19,
            C = f(year / 100),
            H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
            I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
            J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
            L = I - J,
            month = 3 + f((L + 40) / 44),
            day = L + 28 - 31 * f(month / 4);

        return new Date(year, month - 1, day);
    }

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date(); // Día actual

        // Calcular la fecha de la Pascua para el año dado
        const easterDate = getEasterDate(year);

        // Calcular los festivos móviles basados en la Pascua
        const movableHolidays = [
            new Date(easterDate.getTime() + (39 * 86400000)), // Ascensión del Señor (39 días después de Pascua)
            new Date(easterDate.getTime() + (60 * 86400000)), // Corpus Christi (60 días después de Pascua)
            new Date(easterDate.getTime() + (68 * 86400000)), // Sagrado Corazón (68 días después de Pascua)
            new Date(year, 9, ((1 + 7) - (new Date(year, 9, 1).getDay() || 7))), // Día de la Raza (segundo lunes de octubre)
            new Date(year, 10, ((1 + 7) - (new Date(year, 10, 1).getDay() || 7))), // Todos los Santos (primer lunes de noviembre)
            new Date(year, 10, ((11 + 7) - (new Date(year, 10, 11).getDay() || 7))) // Independencia de Cartagena (11 de noviembre, lunes siguiente)
        ];

        // Establecer el título del mes y el año
        monthYearElem.textContent = `${date.toLocaleString('es-ES', { month: 'long' }).toUpperCase()} ${year}`;

        // Limpiar los días del calendario
        daysElem.innerHTML = '';

        // Primer día del mes y la cantidad de días en el mes
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Corregir el valor de firstDay para que el calendario comience en lunes
        const correctedFirstDay = (firstDay === 0) ? 6 : firstDay - 1;

        // Añadir espacios vacíos para los días antes del primer día
        for (let i = 0; i < correctedFirstDay; i++) {
            daysElem.innerHTML += '<div class="calendar-day-box"></div>';
        }

        // Añadir los días del mes
        for (let i = 1; i <= lastDate; i++) {
            const dayClass = (today.getDate() === i && today.getMonth() === month && today.getFullYear() === year) ? 'calendar-day-box current-day' : 'calendar-day-box';

            // Verificar si el día es un festivo fijo
            const isFixedHoliday = fixedHolidays.some(holiday => holiday.day === i && holiday.month === month);

            // Verificar si el día es un festivo móvil
            const isMovableHoliday = movableHolidays.some(holiday => holiday.getDate() === i && holiday.getMonth() === month);

            // Marcar el día como festivo si corresponde
            const finalClass = (isFixedHoliday || isMovableHoliday) ? `${dayClass} holiday` : dayClass;

            daysElem.innerHTML += `<div class="${finalClass}">${i}</div>`;
        }
    }

    prevMonthBtn.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Renderizar el calendario por primera vez
    renderCalendar(currentDate);
});
