// /**
//  * Lanzador-components
//  */

document.addEventListener('DOMContentLoaded', () => {

    // Contenido inicial del localStorage "lanzador"
    const initialData = `
    null
    `;

    ;
    // Guardar datos iniciales en el localStorage
    if (!localStorage.getItem('lanzador')) {
        localStorage.setItem('lanzador', initialData);
    }

    const sortableList = document.getElementById('sortable-list');
    const saveButton = document.getElementById('save-button');
    const addButton = document.getElementById('add-button');

    // Leer y mostrar los elementos del localStorage
    const parseLocalStorageData = () => {
        const data = localStorage.getItem('lanzador');
        const lines = data.split('\n').filter(line => line.trim() && line !== 'null');
        return lines.map(line => {
            const match = line.match(/id\s*=\s*"([^"]+)"/); // Extraer el atributo id
            return match ? { id: match[1], fullLine: line.trim() } : null; // Retornar id y línea completa
        }).filter(item => item);
    };

    const renderList = () => {
        const items = parseLocalStorageData();
        sortableList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
            <span class="drag-handle">↕</span>
            <span>${item.id}</span>
            <button class="delete-btn" title="Eliminar elemento">🗑️</button>
        `;
            li.dataset.fullLine = item.fullLine; // Guardar la línea completa en un atributo de datos
            sortableList.appendChild(li);

            // Habilitar arrastrar para cada ítem
            li.setAttribute('draggable', true);

            // Agregar funcionalidad al botón de eliminar
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                removeItem(item.fullLine);
            });
        });
    };

    const removeItem = (lineToRemove) => {
        const data = localStorage.getItem('lanzador');
        const updatedData = data
            .split('\n')
            .filter(line => line.trim() && line !== lineToRemove)
            .join('\n');
        localStorage.setItem('lanzador', updatedData);
        renderList();
    };

    renderList();

    // Lógica Drag and Drop para reordenar
    let draggingItem = null;

    sortableList.addEventListener('dragstart', (e) => {
        draggingItem = e.target;
        e.target.classList.add('dragging');
    });

    sortableList.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        draggingItem = null;
    });

    sortableList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(sortableList, e.clientY);
        if (afterElement == null) {
            sortableList.appendChild(draggingItem);
        } else {
            sortableList.insertBefore(draggingItem, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Guardar el nuevo orden en el localStorage
    saveButton.addEventListener('click', () => {
        const updatedOrder = [...sortableList.querySelectorAll('li')]
            .map(li => li.dataset.fullLine) // Recuperar la línea completa desde el atributo de datos
            .join('\n');
        localStorage.setItem('lanzador', `null\n${updatedOrder}`);
        mostrarModal('💾 Guardado 💾', 'Orden guardado exitosamente!','off').then(resultado => {
            if (resultado) {
                myModal14.classList.remove('visible');
                myModal14.classList.toggle('hidden');
                toggleVisibility('myModal14', false);
                makeDraggable('#myModal14', true);
                json_local("x", "", "");
            }
        });

    });

    // Agregar nuevo ítem al lanzador
    addButton.addEventListener('click', () => {
        myModal13.classList.remove('hidden');
        myModal13.classList.toggle('visible');
        toggleVisibility('myModal13', true);
        renderList();
    });


});

// 
