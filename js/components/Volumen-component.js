document.addEventListener('DOMContentLoaded', function () {
    const volumeSlider = document.getElementById('volume-slider');
    const muteToggle = document.getElementById('mute-toggle');
    const muteIcon = muteToggle.querySelector('i');
    const rangeInput = document.querySelector("#volume-slider");
    const initialValue = rangeInput.value;
    const rangeInputValueContainer = document.querySelector("#range-input-value");
    localStorage.setItem("mute", 0);

    async function updateUI() {
        const volume = await window.electron.getVolume();
        const muted = await window.electron.getMuted();

        volumeSlider.value = volume;
        muteIcon.className = muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';

        if(muted){
            setDisplayedValue('X');
            localStorage.setItem("mute", 1);
        }else{
            setDisplayedValue(rangeInput.value);
            localStorage.setItem("mute", 0);
        }
    }

    volumeSlider.addEventListener('input', async () => {
        const volume = volumeSlider.value;
        await window.electron.setVolume(Number(volume));
    });

    muteToggle.addEventListener('click', async () => {
        const muted = await window.electron.getMuted();
        await window.electron.setMuted(!muted);
        if(localStorage.getItem("mute")==0){
            setDisplayedValue('X');
            localStorage.setItem("mute", 1);
        }else{
            localStorage.setItem("mute", 0);  
        }
        
        updateUI();
    });

    // Inicializa la interfaz de usuario
    updateUI();


    const setDisplayedValue = (value) => {
        rangeInputValueContainer.innerText = value;
    };

    setInterval(function () {
        updateUI();
    }, 500);


    rangeInput.addEventListener("input", (e) => {
        setDisplayedValue(e.target.value);
    });



});