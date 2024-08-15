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