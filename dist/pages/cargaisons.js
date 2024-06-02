"use strict";
const searchButton = document.getElementById('search-button');
const popupForm = document.getElementById('popupForm');
const overlay = document.getElementById('overlay');
searchButton.addEventListener('click', function () {
    popupForm.style.display = 'block';
    overlay.style.display = 'block';
});
overlay.addEventListener('click', function () {
    popupForm.style.display = 'none';
    overlay.style.display = 'none';
});
const toggleViewBtn = document.getElementById('toggleViewBtn');
toggleViewBtn.addEventListener('click', function () {
    const cardsView = document.getElementById('cards-view');
    const listView = document.getElementById('list-view');
    const toggleViewIcon = document.getElementById('toggleViewIcon');
    cardsView.classList.toggle('hidden');
    listView.classList.toggle('hidden');
    toggleViewIcon.classList.toggle('fa-list');
    toggleViewIcon.classList.toggle('fa-th');
});
const choix = document.getElementById('choix');
choix.addEventListener('change', function () {
    const poidMaxField = document.getElementById('poidMax');
    const nombreMaxField = document.getElementById('nombreMax');
    if (this.value === 'poids') {
        poidMaxField.style.display = 'block';
    }
    else {
        poidMaxField.style.display = 'none';
    }
    if (this.value === 'nombre') {
        nombreMaxField.style.display = 'block';
    }
    else {
        nombreMaxField.style.display = 'none';
    }
});
