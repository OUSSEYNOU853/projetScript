// produits.ts


const typeProduit = document.getElementById('type-produit') as HTMLSelectElement;
const materielField = document.getElementById('materiel') as HTMLElement;
const toxiciteField = document.getElementById('form-toxicity-container') as HTMLElement;

typeProduit.addEventListener('change', function () {
    if (this.value === 'materielle') {
        materielField.style.display = 'block';
    } else {
        materielField.style.display = 'none';
    }
    if (this.value === 'chimique') {
        toxiciteField.style.display = 'block';
    } else {
        toxiciteField.style.display = 'none';
    }
});

const sidebarToggle = document.getElementById('sidebarToggle') as HTMLElement;
sidebarToggle.addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    if (sidebar.classList.contains('w-20')) {
        sidebar.classList.remove('w-20');
        sidebar.classList.add('w-80');
    } else {
        sidebar.classList.remove('w-80');
        sidebar.classList.add('w-20');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const openFormButton = document.querySelectorAll('.openFormButton') as NodeListOf<HTMLElement>;
    const popupForme = document.getElementById('popupForme') as HTMLElement;
    const overlaye = document.getElementById('overlaye') as HTMLElement;

    if (openFormButton && popupForme && overlaye) {
        openFormButton.forEach(button => {
            button.addEventListener('click', function () {
                popupForme.style.display = 'block';
                overlaye.style.display = 'block';
            });
        });
    } else {
        console.error('One or more elements are missing.');
    }
});

const closeFormButton = document.getElementById('closeFormButton') as HTMLButtonElement;
closeFormButton.addEventListener('click', function () {
    const popupForme = document.getElementById('popupForme') as HTMLElement;
    const overlaye = document.getElementById('overlaye') as HTMLElement;
    popupForme.style.display = 'none';
    overlaye.style.display = 'none';
});

const overlaye = document.getElementById('overlaye') as HTMLElement;
overlaye.addEventListener('click', function () {
    const popupForme = document.getElementById('popupForme') as HTMLElement;
    popupForme.style.display = 'none';
    overlaye.style.display = 'none';
});

const toggleViewButton = document.getElementById('toggleViewButton') as HTMLButtonElement;
toggleViewButton.addEventListener('click', function () {
    const cardesView = document.getElementById('cardes-view') as HTMLElement;
    const listeView = document.getElementById('liste-view') as HTMLElement;
    const toggleViewIcone = document.getElementById('toggleViewIcone') as HTMLElement;
    cardesView.classList.toggle('hidden');
    listeView.classList.toggle('hidden');
    toggleViewIcone.classList.toggle('fa-list');
    toggleViewIcone.classList.toggle('fa-th');
});
