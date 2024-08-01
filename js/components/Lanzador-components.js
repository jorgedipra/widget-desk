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