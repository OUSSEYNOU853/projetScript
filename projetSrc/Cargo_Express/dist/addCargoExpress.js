"use strict";
class CargoManager {
    constructor(cargoList, searchInput, paginationContainer) {
        this.cargoList = cargoList;
        this.searchInput = searchInput;
        this.paginationContainer = paginationContainer;
        this.allItems = [];
        this.currentPage = 1;
        this.itemsPerPage = 3;
        this.cargoCounters = {
            maritime: 0,
            aerien: 0,
            terrestre: 0,
        };
        this.initEvents();
    }
    // Méthode pour ajouter un nouveau cargo
    addCargo(type, dateDepart, dateArrivee, distance) {
        const cargoId = this.generateCargoId(type);
        const newCargo = {
            id: cargoId,
            type,
            dateDepart,
            dateArrivee,
            distance,
            etat: 'Ouvert',
            status: 'En attente'
        };
        this.allItems.unshift(newCargo);
        this.updateItems(this.allItems);
        this.renderPage(this.allItems, 1); // Afficher la première page
    }
    // Méthode pour générer un ID unique pour le cargo
    generateCargoId(type) {
        if (!this.cargoCounters[type]) {
            this.cargoCounters[type] = 0;
        }
        this.cargoCounters[type]++;
        return `${type.charAt(0).toUpperCase()}${this.cargoCounters[type].toString().padStart(3, '0')}`;
    }
    // Méthode pour filtrer les éléments en fonction de la recherche
    filterItems() {
        const filterText = this.searchInput.value.toLowerCase();
        const filteredItems = this.allItems.filter(row => {
            const rowData = Object.values(row).join(' ').toLowerCase();
            return rowData.includes(filterText);
        });
        this.renderPage(filteredItems, 1); // Toujours réinitialiser à la première page après le filtrage
        this.renderPagination(filteredItems);
    }
    // Méthode pour mettre à jour les éléments affichés
    updateItems(items) {
        this.allItems = items;
        this.filterItems(); // Mettre à jour les éléments affichés en fonction du filtre actuel
    }
    // Méthode pour afficher une page de cargos
    renderPage(items, page) {
        this.cargoList.innerHTML = '';
        const start = (page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedItems = items.slice(start, end);
        for (const item of paginatedItems) {
            this.cargoList.appendChild(this.createCargoRow(item));
        }
    }
    // Méthode pour créer une nouvelle ligne de cargo dans le tableau
    createCargoRow(cargo) {
        const newRow = document.createElement('tr');
        newRow.classList.add('border-b');
        newRow.innerHTML = `
            <td class="py-2 px-4">${cargo.id}</td>
            <td class="py-2 px-4">${cargo.type}</td>
            <td class="py-2 px-4">${cargo.dateDepart}</td>
            <td class="py-2 px-4">${cargo.dateArrivee}</td>
            <td class="py-2 px-4">${cargo.distance}</td>
            <td class="py-2 px-4"><button>${cargo.etat}</button></td>
            <td class="py-2 px-4"><button>${cargo.status}</button></td>
            <td class="py-2 px-4">
                <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg viewCargoBtn">Voir</button>
            </td>
            <td class="py-2 px-4">
                <button class="bg-blue-700 text-white font-bold px-4 py-2 rounded-lg editCargoBtn">Modifier</button>
            </td>
        `;
        const viewCargoBtn = newRow.querySelector('.viewCargoBtn');
        viewCargoBtn.addEventListener('click', () => {
            // Ajoutez ici la logique d'affichage du cargo
            this.viewCargo(cargo.id);
        });
        const editCargoBtn = newRow.querySelector('.editCargoBtn');
        editCargoBtn.addEventListener('click', () => {
            // Ajoutez ici la logique de modification du cargo
            this.editCargo(cargo.id);
        });
        return newRow;
    }
    // Méthode pour rendre la pagination
    renderPagination(items) {
        this.paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(items.length / this.itemsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement('button');
            pageLink.classList.add('page-link', 'px-2', 'py-1', 'mx-1', 'bg-blue-600', 'text-white', 'rounded-md');
            pageLink.textContent = i.toString();
            pageLink.addEventListener('click', () => {
                this.currentPage = i;
                this.renderPage(items, this.currentPage);
            });
            this.paginationContainer.appendChild(pageLink);
        }
    }
    // Méthode pour afficher les détails d'un cargo
    viewCargo(cargoId) {
        const cargo = this.allItems.find(c => c.id === cargoId);
        if (cargo) {
            alert(`Détails du Cargo:\nID: ${cargo.id}\nType: ${cargo.type}\nDate de départ: ${cargo.dateDepart}\nDate d'arrivée: ${cargo.dateArrivee}\nDistance: ${cargo.distance} km\nÉtat: ${cargo.etat}\nStatus: ${cargo.status}`);
        }
    }
    // Méthode pour modifier un cargo
    editCargo(cargoId) {
        const cargo = this.allItems.find(c => c.id === cargoId);
        if (cargo) {
            // Affichez un formulaire de modification pré-rempli avec les données du cargo
            const newType = prompt("Nouveau type:", cargo.type);
            const newDateDepart = prompt("Nouvelle date de départ:", cargo.dateDepart);
            const newDateArrivee = prompt("Nouvelle date d'arrivée:", cargo.dateArrivee);
            const newDistance = prompt("Nouvelle distance:", cargo.distance.toString());
            const newEtat = prompt("Nouvel état:", cargo.etat);
            const newStatus = prompt("Nouveau statut:", cargo.status);
            if (newType && newDateDepart && newDateArrivee && newDistance && newEtat && newStatus) {
                cargo.type = newType;
                cargo.dateDepart = newDateDepart;
                cargo.dateArrivee = newDateArrivee;
                cargo.distance = parseFloat(newDistance);
                cargo.etat = newEtat;
                cargo.status = newStatus;
                this.updateItems(this.allItems);
                this.renderPage(this.allItems, this.currentPage);
            }
        }
    }
    // Initialiser les événements
    initEvents() {
        this.searchInput.addEventListener('input', () => this.filterItems());
    }
}
// Utilisation de la classe CargoManager
document.addEventListener('DOMContentLoaded', () => {
    const cargoList = document.getElementById('cargo-list');
    const searchInput = document.getElementById('searchInput');
    const paginationContainer = document.getElementById('pagination');
    if (cargoList && searchInput && paginationContainer) {
        const cargoManager = new CargoManager(cargoList, searchInput, paginationContainer);
        // Ajoutez d'autres initialisations ou gestionnaires d'événements ici si nécessaire
    }
    else {
        console.error('Erreur : cargoList, searchInput ou paginationContainer est null.');
    }
});
