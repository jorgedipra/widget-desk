document.addEventListener('DOMContentLoaded', function () {
    const volumeSlider = document.getElementById('volume-slider');
    const muteToggle = document.getElementById('mute-toggle');
    const muteIcon = muteToggle.querySelector('i');
    const rangeInput = document.querySelector("#volume-slider");
    const initialValue = rangeInput.value;
    const rangeInputValueContainer = document.querySelector("#range-input-value");

    async function updateUI() {
        const volume = await window.electron.getVolume();
        const muted = await window.electron.getMuted();

        volumeSlider.value = volume;
        muteIcon.className = muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    }

    volumeSlider.addEventListener('input', async () => {
        const volume = volumeSlider.value;
        await window.electron.setVolume(Number(volume));
    });

    muteToggle.addEventListener('click', async () => {
        const muted = await window.electron.getMuted();
        await window.electron.setMuted(!muted);
        updateUI();
    });

    // Inicializa la interfaz de usuario
    updateUI();

    const setDisplayedValue = (value) => {
        rangeInputValueContainer.innerText = value;
    };

    setDisplayedValue(initialValue);

    rangeInput.addEventListener("input", (e) => {
        setDisplayedValue(e.target.value);
    });



});