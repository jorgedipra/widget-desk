// 

window.addEventListener('DOMContentLoaded', () => {

    makeDraggable('#myModal13', false);
    // toggleVisibility('myModal13', true);
    //
    const lanzador = localStorage.getItem('lanzador');
    if (lanzador) {
        const userMenu = document.querySelector(".usermenu");
        if (userMenu) {
            userMenu.innerHTML = `
                <div id="program_menu"></div>
                <a href="#/settings7" id="Add" class="Add"></a>
                ${lanzador}
            `;
        } else {
            console.error('Elemento con clase "usermenu" no encontrado.');
        }

    }
    // --------------------------------
    cargaP();
    loadMEnu();
    menu_principal();

    const Add = document.getElementById('Add');
    const crear_add = document.getElementById('crear_add');
    const cancelar_add = document.getElementById('cancelar_add');
    const WinLanzador = document.getElementById('myModal13');
    const label = document.querySelector(".js-fileName");
    const image_container = document.querySelector(".image_container>span");
    const img_container = document.querySelector(".image_container");
    //
    Add.addEventListener('click', () => {
        toggleVisibility('myModal13', true);
    });

    cancelar_add.addEventListener('click', () => {
        toggleVisibility('myModal13', false);
        label.innerHTML = "Elige el Programa";
        document.getElementById('app_name').innerHTML = "App_Name";
        if (document.querySelector('.image_container img'))
            document.querySelector('.image_container img').src = "./images/img.png";
    });

    crear_add.addEventListener('click', () => {
        toggleVisibility('myModal13', false);
        label.innerHTML = "Elige el Programa";
        document.getElementById('app_name').innerHTML = "App_Name";

        // Selecciona el contenedor con la clase "usermenu"
        const usermenu = document.querySelector(".usermenu");

        // Crea el nuevo elemento <a>
        const newLink = document.createElement("a");
        const img = localStorage.getItem('imgName');
        const formattedImg = img.replace(/\\/g, '/');
        const namebase = localStorage.getItem('fileName').split("\\").pop().split(".")[0];
        const namefile = namebase.replace(/ /g, "_");

        // Configura los atributos del elemento <a>
        newLink.href = "#/settings7";
        newLink.id = namefile;
        newLink.className = namefile;
        newLink.style.backgroundImage = `url("${formattedImg}")`;
        image_container.innerHTML = "";

        // console.log(localStorage.getItem('fileName'),img);
        // console.log(img);


        newLink.addEventListener('mouseover', () => {
            changeBackgroundImage(`"${formattedImg}"`);
        });
        newLink.addEventListener('mouseout', () => {
            targetDiv.style.backgroundImage = '';
        });

        // Agrega el elemento <a> al contenedor .usermenu
        if (usermenu) {
            usermenu.appendChild(newLink);
            if (document.querySelector('.image_container img'))
                document.querySelector('.image_container img').src = "./images/img.png";
            json_local(namefile, localStorage.getItem('fileName'), localStorage.getItem('imgName'))
        }

        // -----------------------------

        loadMEnu()
        //-------------------

    });

    // Crear el input file
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // Solo archivos de imagen

    // Función para manejar el cambio de archivo
    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0]; // Obtener el archivo seleccionado
        if (file) {
            // Crear un objeto URL para el archivo
            const reader = new FileReader();
            reader.onload = function (e) {

                //
                if (file.path) {
                    localStorage.setItem('imgName', file.path);
                }
                // 

                // Crear un elemento <img>
                const img = document.createElement("img");
                img.src = file.path; //e.target.result; // Establecer la URL de la imagen
                // Limpiar el contenedor y mostrar la nueva imagen
                img_container.innerHTML = ""; // Limpiar cualquier contenido previo
                img_container.appendChild(img); // Agregar la imagen al contenedor
            };
            reader.readAsDataURL(file); // Leer el archivo como una URL de datos
        }
    });

    // Hacer que al hacer clic en el contenedor se active el input file
    img_container.addEventListener("click", function () {
        fileInput.click();
    });

    (function () {
        "use strict";

        // Selecciona todos los elementos con la clase "input-file"
        document.querySelectorAll(".input-file").forEach(function (input) {
            const label = input.nextElementSibling; // Encuentra el siguiente elemento hermano (asume que es el label con clase .js-labelFile)
            const labelVal = label.innerHTML; // Guarda el contenido original del label

            // Agrega el evento "change" al input
            input.addEventListener("change", function (event) {
                let fileName = "";
                let fileName_sin = "";
                if (event.target.value) {
                    localStorage.setItem('fileName', event.target.files[0].path);

                    fileName = event.target.value.split("\\").pop(); // Obtiene el nombre del archivo
                    fileName_sin = event.target.value.split("\\").pop().split(".")[0]; // Obtiene el nombre del archivo sin la extensión
                }

                if (fileName) {
                    label.classList.add("has-file"); // Añade la clase "has-file" al label
                    const fileNameElement = label.querySelector(".js-fileName"); // Encuentra el elemento con clase .js-fileName dentro del label
                    if (fileNameElement) {
                        fileNameElement.innerHTML = fileName; // Muestra el nombre del archivo
                        document.getElementById('app_name').innerHTML = fileName_sin; // ;
                    }
                } else {
                    label.classList.remove("has-file"); // Remueve la clase "has-file" del label
                    label.innerHTML = labelVal; // Restaura el contenido original del label
                }
            });
        });
    })();

});


function json_local(name, file, img) {

    // json_local(namefile,localStorage.getItem('fileName'), localStorage.getItem('imgName'))
    const lanzador = localStorage.getItem('lanzador');

    localStorage.setItem('lanzador', lanzador + '<a href="#/settings7" id ="' + name + '" class="' + name + '"></a>')
    console.log(name, file, img);
    window.electron.jsonUtils(name, file, img);
}


function loadMEnu() {
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
                    const namebase = program.image;
                    const formattedImg = namebase.replace(/\\/g, '/');

                    // Establece la imagen de fondo del enlace
                    link.style.backgroundImage = `url(${formattedImg})`;

                    // Configura los eventos hover para cada enlace
                    link.addEventListener('mouseover', () => {
                        changeBackgroundImage(formattedImg);
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
}


function cargaP() {

    function setupEventListeners_() {


        // Selecciona todos los enlaces dentro de '.usermenu'
        const elements = document.querySelectorAll('.usermenu a');

        // Itera sobre cada elemento y agrega el evento 'click'
        elements.forEach(element => {
            element.addEventListener('click', () => {
                window.electron.sendOpenProgramLanzador(element.id);
                // console.log(`¡Has hecho clic en el enlace con id: ${element.id}`);
            });
        });
    }
    setupEventListeners_()
}

function menu_principal(){
    // Asignar el evento click al botón de cerrar
  cerarmodal00.addEventListener('click', cerrarModal);
  
  // Menu de programas
  // modal000.classList.toggle('visible');
  const Program = document.getElementById('program_menu');
  if (Program) {
    Program.addEventListener('click', () => {
      if (modal000.classList.contains('visible')) {
        modal000.classList.remove('visible');
        modal000.classList.toggle('hidden');
      } else {
        modal000.classList.toggle('visible');
        modal000.classList.remove('hidden');
      }
    });
  }
}