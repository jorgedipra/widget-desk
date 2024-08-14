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