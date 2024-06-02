// cargaisons.ts


    const searchButton = document.getElementById('search-button') as HTMLButtonElement;
    const popupForm = document.getElementById('popupForm') as HTMLElement;
    const overlay = document.getElementById('overlay') as HTMLElement;

    searchButton.addEventListener('click', function () {
        popupForm.style.display = 'block';
        overlay.style.display = 'block';
    });

    overlay.addEventListener('click', function () {
        popupForm.style.display = 'none';
        overlay.style.display = 'none';
    });

    const toggleViewBtn = document.getElementById('toggleViewBtn') as HTMLButtonElement;
    toggleViewBtn.addEventListener('click', function () {
        const cardsView = document.getElementById('cards-view') as HTMLElement;
        const listView = document.getElementById('list-view') as HTMLElement;
        const toggleViewIcon = document.getElementById('toggleViewIcon') as HTMLElement;
        cardsView.classList.toggle('hidden');
        listView.classList.toggle('hidden');
        toggleViewIcon.classList.toggle('fa-list');
        toggleViewIcon.classList.toggle('fa-th');
    });

    const choix = document.getElementById('choix') as HTMLSelectElement;
    choix.addEventListener('change', function () {
        const poidMaxField = document.getElementById('poidMax') as HTMLElement;
        const nombreMaxField = document.getElementById('nombreMax') as HTMLElement;

        if (this.value === 'poids') {
            poidMaxField.style.display = 'block';
        } else {
            poidMaxField.style.display = 'none';
        }
        if (this.value === 'nombre') {
            nombreMaxField.style.display = 'block';
        } else {
            nombreMaxField.style.display = 'none';
        }
    });