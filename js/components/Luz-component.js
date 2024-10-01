document.addEventListener('DOMContentLoaded', function () {
    const brightnessSlider = document.getElementById('brightness-slider');
    const rangeInputValueContainer = document.querySelector("#brightness-input-value");

    async function updateUI() {
        const brightness = await window.electron.getBrightness(); // Obtener el brillo actual
        brightnessSlider.value = brightness; // Ajustar el control deslizante al brillo actual
        setDisplayedValue(brightness); // Mostrar el brillo actual
    }

    // Actualizar el brillo cuando se cambia el control deslizante
    brightnessSlider.addEventListener('input', async () => {
        const brightness = brightnessSlider.value; // Obtener el valor del control deslizante
        await window.electron.setBrightness(Number(brightness)); // Ajustar el brillo de la pantalla
        setDisplayedValue(brightness); // Mostrar el nuevo valor
    });

    const setDisplayedValue = (value) => {
        rangeInputValueContainer.innerText = value; // Mostrar el valor actual en la UI
    };

    // Inicializa la interfaz de usuario con el valor de brillo actual
    updateUI();
});
