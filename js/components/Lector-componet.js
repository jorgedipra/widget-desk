/**
 * Componente Lector
 */

// Obtener las referencias a los elementos
const objOn = document.getElementById("obj-on");
const objOff = document.getElementById("obj-off");
const Off = document.getElementById("Off");
const On = document.getElementById("ON");

objOff.style.display = "block";

// Función para alternar la visibilidad
function toggleVisibility_Lector() {
    if (objOff.style.display === "block") { 
        objOn.style.display = "block";
        objOff.style.display = "none";
        On.style.display = "block";
        Off.style.display = "none";
        
        // Temporizador de 1 minuto para apagar automáticamente
        setTimeout(() => { 
            objOn.style.display = "none";
            objOff.style.display = "block";
            On.style.display = "none";
            Off.style.display = "block";
        }, 30000); // 60000 milisegundos = 1 minuto
    } else {
        objOn.style.display = "none";
        objOff.style.display = "block";
        On.style.display = "none";
        Off.style.display = "block";
    }
}

// Añadir el evento click a ambos elementos
objOn.addEventListener("click", toggleVisibility_Lector);
objOff.addEventListener("click", toggleVisibility_Lector);