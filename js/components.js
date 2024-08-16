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

//[Mostrar la imagenes en cada circulo y al pasar por el mosrar en el lanzador o cirsulo mayor]

// Obtén todos los enlaces dentro de .usermenu
const links = document.querySelectorAll(".usermenu a");

// Obtén el div cuyo fondo queremos cambiar
const targetDiv = document.querySelector(".usermenu > div");

// Define las imágenes de fondo para cada enlace
const images = {
    'ChromeDev': './images/Component-lanzador/google_chrome_dev.png',
    'Opera': './images/Component-lanzador/opera.png',
    'Brave': './images/Component-lanzador/brave.png',
    'VisualCode': './images/Component-lanzador/visual_code.png',
    'SublimeText': './images/Component-lanzador/sublime_text.png',
    'DBeaver': './images/Component-lanzador/DBeaver.png',
    'Sourcetree': './images/Component-lanzador/Sourcetree.png',
    'Pomodoro': './images/Component-lanzador/pomodoro.png',
    'LectorVoz': './images/Component-lanzador/LectorVoz.png',
    'Gestor': './images/Component-lanzador/gestor.png',
    'UwAmp': './images/Component-lanzador/UwAmp.png',
    'WinSCP': './images/Component-lanzador/WinSCP.png',
    'OpenVPN': './images/Component-lanzador/OpenVPN.png',
    'alert': './images/Component-lanzador/pr.png',
};

// Función para cambiar el fondo del div
function changeBackgroundImage(url) {
    targetDiv.style.backgroundImage = `url(${url})`;
}

// Configura los eventos hover para cada enlace
links.forEach(link => {
    // Establece el background-image al cargar la página
    const linkClass = link.classList[0];
    if (images[linkClass]) {
        link.style.backgroundImage = `url(${images[linkClass]})`;
    }

    link.addEventListener('mouseover', () => {
        // Obtén la imagen de fondo asociada al enlace
        const backgroundImage = link.classList[0];
        changeBackgroundImage(images[backgroundImage]);
    });

    link.addEventListener('mouseout', () => {
        // Restaura la imagen de fondo original o déjala en blanco
        targetDiv.style.backgroundImage = '';
    });
});
/**
 * Componente Lector
 */

// Obtener las referencias a los elementos
const objOn = document.getElementById("obj-on");
const objOff = document.getElementById("obj-off");

objOff.style.display = "block";

// Función para alternar la visibilidad
function toggleVisibility() {
    if (objOff.style.display === "block") {
        objOn.style.display = "block";
        objOff.style.display = "none";
    } else {
        objOn.style.display = "none";
        objOff.style.display = "block";
    }
}

// Añadir el evento click a ambos elementos
objOn.addEventListener("click", toggleVisibility);
objOff.addEventListener("click", toggleVisibility);

// Temporizador de 1 minuto para apagar automáticamente
setTimeout(() => {
    objOn.style.display = "none";
    objOff.style.display = "block";
}, 30000); // 60000 milisegundos = 1 minuto



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
