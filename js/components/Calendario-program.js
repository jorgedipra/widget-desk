/**
 * [Component]
 * Calendario-program
 */
document.addEventListener('DOMContentLoaded', function () {
    const tooltipCalendar = document.getElementById('has-tooltip-calendar');
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

    tooltipCalendar.addEventListener('click', function () {
        minimizar_calendar();
    });


    // Renderizar el calendario por primera vez
    renderCalendar(currentDate);
});



function  minimizar_calendar(){
    
    const checkbox = document.getElementById('rf-Programas01');
    const relatedCheckbox = document.getElementById('re-Programas01');

    const opciones = { 
        // weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const fechaActual = new Date();
    const fechaFormateada = new Intl.DateTimeFormat('es-CO', opciones).format(fechaActual);

    if (checkbox) {
        // Alterna el estado del checkbox
        checkbox.checked = !checkbox.checked;
        
        // Si se desmarca el checkbox, marca el otro checkbox
        if (!checkbox.checked && relatedCheckbox) {
            relatedCheckbox.checked = true;
        }
        
        // Llama a toggleVisibility con el estado actual del checkbox
        toggleVisibility('myModal02', checkbox.checked);
        document.querySelector("#openCalendar > span").textContent = fechaFormateada;
    }
}