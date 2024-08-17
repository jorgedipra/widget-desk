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
    if (confirm(`¿Deseas cambiar de ${timerType} a ${timerType === 'work' ? 'descanso' : 'trabajo'}?`)) {
        switchMode();
        updateTimer();
    }
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
        miniPomodoro.textContent = "🍅 "+timerText;
    }
}