"use strict";
const typeProduit = document.getElementById('type-produit');
const materielField = document.getElementById('materiel');
const toxiciteField = document.getElementById('form-toxicity-container');
typeProduit.addEventListener('change', function () {
    if (this.value === 'materielle') {
        materielField.style.display = 'block';
    }
    else {
        materielField.style.display = 'none';
    }
    if (this.value === 'chimique') {
        toxiciteField.style.display = 'block';
    }
    else {
        toxiciteField.style.display = 'none';
    }
});
const sidebarToggle = document.getElementById('sidebarToggle');
sidebarToggle.addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('w-20')) {
        sidebar.classList.remove('w-20');
        sidebar.classList.add('w-80');
    }
    else {
        sidebar.classList.remove('w-80');
        sidebar.classList.add('w-20');
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const openFormButton = document.querySelectorAll('.openFormButton');
    const popupForme = document.getElementById('popupForme');
    const overlaye = document.getElementById('overlaye');
    if (openFormButton && popupForme && overlaye) {
        openFormButton.forEach(button => {
            button.addEventListener('click', function () {
                popupForme.style.display = 'block';
                overlaye.style.display = 'block';
            });
        });
    }
    else {
        console.error('One or more elements are missing.');
    }
});
const closeFormButton = document.getElementById('closeFormButton');
closeFormButton.addEventListener('click', function () {
    const popupForme = document.getElementById('popupForme');
    const overlaye = document.getElementById('overlaye');
    popupForme.style.display = 'none';
    overlaye.style.display = 'none';
});
const overlaye = document.getElementById('overlaye');
overlaye.addEventListener('click', function () {
    const popupForme = document.getElementById('popupForme');
    popupForme.style.display = 'none';
    overlaye.style.display = 'none';
});
const toggleViewButton = document.getElementById('toggleViewButton');
toggleViewButton.addEventListener('click', function () {
    const cardesView = document.getElementById('cardes-view');
    const listeView = document.getElementById('liste-view');
    const toggleViewIcone = document.getElementById('toggleViewIcone');
    cardesView.classList.toggle('hidden');
    listeView.classList.toggle('hidden');
    toggleViewIcone.classList.toggle('fa-list');
    toggleViewIcone.classList.toggle('fa-th');
});
