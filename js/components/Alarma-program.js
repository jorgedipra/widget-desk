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
            let repeat = document.querySelector('select[name="repeatSelect"]').value;
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
                    const repeatMap = {
                        'once': 'Una sola vez',
                        'daily': 'Diariamente',
                        'weekdays': 'Lunes a viernes'
                    };
                    const repeatText = repeatMap[repeat] || repeat;
                    // Actualizar el contenido de texto del elemento
                    alarmItem.querySelector('.timeExt').textContent = repeatText;
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
        const repeatToText = {
            'once': 'Una sola vez',
            'daily': 'Diariamente',
            'weekdays': 'Lunes a viernes'
        };
        
        const textToRepeat = {
            'Una sola vez': 'once',
            'Diariamente': 'daily',
            'Lunes a viernes': 'weekdays'
        };
        alarm.repeat = repeatToText[alarm.repeat] || alarm.repeat;// variable a texto
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
        alarm.repeat = textToRepeat[alarm.repeat] || alarm.repeat;// texto a varible
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

   
});