/* --[interface]-- */
/*     app_tw     */
/* ---------------- */

document.addEventListener('DOMContentLoaded', function () {
    const app_twlist = document.querySelectorAll('.app_twlist');

    const configuraciones = {};

    // Recorrer cada elemento y construir el objeto configuraciones
    app_twlist.forEach(function (element) {
        // Obtener el ID del elemento y usarlo como clave
        const key = element.id.toLowerCase(); // Convertir a minúsculas por consistencia
        // Establecer el valor de la clave en false
        configuraciones[key] = false;
    });
    // console.log(configuraciones);// {
    //     "pomodoro": false,
    //     "notas": false,
    //     "alarma": false
    // };

    localStorage.setItem("config", JSON.stringify(configuraciones));

    verificar_();

});

// 3. Función para actualizar un campo específico
function actualizarCampo(campo, nuevoValor) {
    // 3.1. Obtener el objeto JSON desde localStorage
    let configActual = JSON.parse(localStorage.getItem("config"));

    // 3.2. Modificar el valor del campo
    if (configActual.hasOwnProperty(campo)) {
        configActual[campo] = nuevoValor;

        localStorage.setItem("config", JSON.stringify(configActual));
        // console.log(`${campo} actualizado a ${nuevoValor}`);
        const win_app = document.getElementById('app_tw');
        if (nuevoValor) {
            const nw_app = document.getElementById(`app_${campo}`);
            if (!nw_app){
                win_app.innerHTML += `<div id="app_${campo}" class="app-box">${campo}</div>`;
                app_box_list();
            }
                
        }
        else
            document.getElementById(`app_${campo}`).remove();
        verificar_();
    } else {
        console.log(`El campo ${campo} no existe en la configuración.`);
    }
}


function todosSonFalse(obj) {
    return Object.values(obj).every(valor => valor === false);
}

function verificar_() {
    let configActual = JSON.parse(localStorage.getItem("config"));

    if (todosSonFalse(configActual)) {
        document.getElementById("app_tw").style.display = "none";
    } else {
        document.getElementById("app_tw").style.display = "block";
    }
}
/**
* Función que obtiene los elementos con la clase 'app-box'
    * y asigna un evento click para mostrar u ocultar ventanas.
* La ventana que se mostrará u ocultará está determinada por el atributo 'data-config'.
*/
function app_box_list() { 

    // Selecciona todos los elementos con la clase 'app-box'
    const app_box = document.querySelectorAll('.app-box');

    // Recorre cada elemento seleccionado
    app_box.forEach(function (element) {
        // Obtiene el valor del atributo 'data-config' de cada elemento
        const key = element.getAttribute('data-config');

        // Agrega un evento click a cada elemento
        element.addEventListener('click', function () { 
            // Obtiene el ID del elemento actual (ej: 'app_pomodoro')
            const elementId = element.id;

            // Elimina el prefijo 'app_' y convierte la primera letra a mayúscula
            // Ejemplo: de 'app_pomodoro' a 'Pomodoro'
            let name = elementId.replace('app_', '');
            let name_comp=name;
            name = name.charAt(0).toUpperCase() + name.slice(1);

            // Obtiene el elemento DOM cuyo ID coincide con el nombre modificado (ej: 'Pomodoro')
            const elementId2 = document.getElementById(name);

            // Obtiene el valor de 'data-config' del elemento encontrado
            const dataConfig = elementId2.dataset.config;

            // Llama a la función que maneja la visualización de la ventana
            view_win(dataConfig,name_comp);
        });
    });
}

/**
* Función que maneja la visibilidad de la ventana.
* Recibe el valor de 'data-config' para identificar qué ventana mostrar.
* 
* @param {string} dataConfig - El identificador de la ventana (usualmente el valor de 'data-config')
* @param {string} name - El identificador de la ventana (usualmente el valor de 'id') el que aparece en all-component
*/
function view_win(dataConfig,name) {

    if (document.getElementById(dataConfig).classList.contains('visible')) {
        //'La clase "visible" está presente'
        actualizarCampo(name, true);
        // Añade la clase 'visible' y elimina la clase 'hidden' del elemento correspondiente
        document.getElementById(dataConfig).classList.toggle('hidden');
        document.getElementById(dataConfig).classList.remove('visible');
        
    } else {
        document.getElementById(dataConfig).classList.toggle('visible');
        document.getElementById(dataConfig).classList.remove('hidden');
    }

}
