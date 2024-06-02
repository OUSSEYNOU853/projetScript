

// interface Cargo {
//     id: string;
//     type: string /* 'maritime' | 'aerien' | 'terrestre'; */
//     dateDepart: string;
//     dateArrivee: string;
//     distance: number;
//     etat: string /* 'Ouvert' | 'Fermé'; */
//     status: string /* 'En attente' | 'En cours' | 'Livré'; */
// }

// interface CargoCounters {
//     [key: string]: number;
// }

// class CargoManager {
//     private cargos: Cargo[] = [];
//     private cargoCounters: CargoCounters = {
//         maritime: 0,
//         aerien: 0,
//         terrestre: 0,
//     };
//     private itemsPerPage = 3;
//     private currentPage = 1;

//     private addCargoBtn = document.getElementById('addCargoBtn')!;
//     private addCargoModal = document.getElementById('addCargoModal')!;
//     private cancelBtn = document.getElementById('cancelBtn')!;
//     private addCargoForm = document.getElementById('addCargoForm') as HTMLFormElement;
//     private cargoList = document.getElementById('cargo-list')!;
//     private searchInput = document.getElementById('searchInput')!;
//     private paginationContainer = document.getElementById('pagination')!;

//     private editCargoModal = document.getElementById('editCargoModal')!;
//     private cancelEditBtn = document.getElementById('cancelEditBtn')!;
//     private editCargoForm = document.getElementById('editCargoForm') as HTMLFormElement;
//     private deleteCargoBtn = document.getElementById('deleteCargoBtn')!;

//     private dateDepartInput = document.getElementById('dateDepart') as HTMLInputElement;
//     private dateArriveeInput = document.getElementById('dateArrivee') as HTMLInputElement;
//     private stopCriteriaSelect = document.getElementById('stopCriteria') as HTMLSelectElement;
//     private criteriaValueInput = document.getElementById('criteriaValue') as HTMLInputElement;

//     private pointDepart: L.LatLng | null = null;
//     private pointArrivee: L.LatLng | null = null;

//     private map!: L.Map;
//     filterItems: any;

//     constructor() {
//         this.addEventListeners();
//         this.initMap();
//         this.initEvents();
//         this.champSaisi = document.getElementById('champ-saisi') as HTMLDivElement;
//     }

//     private addEventListeners() {
//         this.addCargoBtn.addEventListener('click', () => {
//             this.addCargoModal.style.display = 'block';
//         });

//         this.cancelBtn.addEventListener('click', () => {
//             this.addCargoModal.style.display = 'none';
//             this.resetForm();
//         });

//         this.cancelEditBtn.addEventListener('click', () => {
//             this.editCargoModal.style.display = 'none';
//             this.editCargoForm.reset();
//         });

//         this.addCargoForm.addEventListener('submit', (e) => {
//             e.preventDefault();

//             if (!this.validateForm()) {
//                 return;
//             }

//             const type = (this.addCargoForm.querySelector('input[name="type"]:checked') as HTMLInputElement).value as 'maritime' | 'aerien' | 'terrestre';
//             const dateDepart = this.dateDepartInput.value;
//             const dateArrivee = this.dateArriveeInput.value;
//             const distance = parseFloat(this.criteriaValueInput.value);

//             const cargoId = this.generateCargoId(type);

//             const newCargo: Cargo = {
//                 id: cargoId,
//                 type,
//                 dateDepart,
//                 dateArrivee,
//                 distance,
//                 etat: 'Ouvert',
//                 status: 'En attente',
//             };

//             this.cargos.unshift(newCargo);
//             this.updateItems();
//             this.renderPage();

//             this.addCargoModal.style.display = 'none';
//             this.addCargoForm.reset();
//             this.resetForm();
//         });
//     }

//     private initMap() {
//         this.map = L.map("map").setView([0, 0], 2);
//         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             maxZoom: 18,
//         }).addTo(this.map);

//         let departMarker: L.Marker | null = null;
//         let arriveeMarker: L.Marker | null = null;

//         this.map.on("click", (e) => {
//             if (!departMarker) {
//                 departMarker = this.createMarker(e.latlng, "Lieu de départ");
//                 this.updateInputWithLocationName(e.latlng, "depart");
//                 this.pointDepart = e.latlng;
//             } else if (!arriveeMarker) {
//                 arriveeMarker = this.createMarker(e.latlng, "Lieu d'arrivée");
//                 this.updateInputWithLocationName(e.latlng, "arrivee");
//                 this.pointArrivee = e.latlng;
//                 this.calculateDistance(this.pointDepart, this.pointArrivee);
//             }
//         });
//     }

//     private createMarker(latlng: L.LatLng, popupText: string): L.Marker {
//         return L.marker(latlng)
//             .addTo(this.map)
//             .bindPopup(popupText)
//             .openPopup();
//     }

//     private updateInputWithLocationName(latlng: L.LatLng, inputId: string): void {
//         fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 const locationName = data.display_name || `${latlng.lat}, ${latlng.lng}`;
//                 (document.getElementById(inputId) as HTMLInputElement).value = locationName;
//             })
//             .catch((error) => {
//                 console.error("Error fetching location name:", error);
//                 (document.getElementById(inputId) as HTMLInputElement).value = `${latlng.lat}, ${latlng.lng}`;
//             });
//     }

//     private calculateDistance(start: L.LatLng | null, end: L.LatLng | null): void {
//         if (start && end) {
//             const distance = this.map.distance(start, end) / 1000;
//             this.criteriaValueInput.value = distance.toFixed(2);
//         }
//     }

//     private generateCargoId(type: 'maritime' | 'aerien' | 'terrestre'): string {
//         const id = `${type.charAt(0).toUpperCase()}-${Date.now()}-${this.cargoCounters[type] + 1}`;
//         this.cargoCounters[type]++;
//         return id;
//     }

//     private resetForm() {
//         this.pointDepart = null;
//         this.pointArrivee = null;
//         this.map.eachLayer((layer) => {
//             if (layer instanceof L.Marker) {
//                 this.map.removeLayer(layer);
//             }
//         });
//     }

//     private createNewCargoRow(cargo: Cargo): HTMLTableRowElement {
//         const newRow = document.createElement('tr');
//         newRow.innerHTML = `
//             <td>${cargo.id}</td>
//             <td>${cargo.type}</td>
//             <td>${cargo.dateDepart}</td>
//             <td>${cargo.dateArrivee}</td>
//             <td>${cargo.distance} km</td>
//             <td>${cargo.etat}</td>
//             <td>${cargo.status}</td>
//             <td>
//                 <button class="modifierBtn bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg">Modifier</button>
//             </td>
//         `;
//         return newRow;
//     }

//     private validateForm(): boolean {
//         const type = (this.addCargoForm.querySelector('input[name="type"]:checked') as HTMLInputElement)?.value;
//         const dateDepart = this.dateDepartInput.value;
//         const dateArrivee = this.dateArriveeInput.value;
//         const criteriaValue = this.criteriaValueInput.value;
//         const pointDepart = (document.getElementById('depart') as HTMLInputElement).value;
//         const pointArrivee = (document.getElementById('arrivee') as HTMLInputElement).value;

//         if (!type || !dateDepart || !dateArrivee || !criteriaValue || !pointDepart || !pointArrivee) {
//             alert("Veuillez remplir tous les champs.");
//             return false;
//         }

//         if (new Date(dateDepart) > new Date(dateArrivee)) {
//             alert("La date de départ ne peut pas être postérieure à la date d'arrivée.");
//             return false;
//         }

//         if (this.pointDepart === null || this.pointArrivee === null) {
//             alert("Veuillez sélectionner les points de départ et d'arrivée sur la carte.");
//             return false;
//         }

//         return true;
//     }

//     private renderPage(): void {
//         this.cargoList.innerHTML = '';
//         const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//         const endIndex = startIndex + this.itemsPerPage;
//         const paginatedCargos = this.cargos.slice(startIndex, endIndex);

//         paginatedCargos.forEach((cargo) => {
//             const newRow = this.createNewCargoRow(cargo);
//             this.cargoList.appendChild(newRow);
//         });

//         this.renderPagination();
//     }

//     private renderPagination(): void {
//         this.paginationContainer.innerHTML = '';
//         const totalPages = Math.ceil(this.cargos.length / this.itemsPerPage);
//         for (let i = 1; i <= totalPages; i++) {
//             const pageButton = document.createElement('button');
//             pageButton.textContent = i.toString();
//             pageButton.addEventListener('click', () => {
//                 this.currentPage = i;
//                 this.renderPage();
//             });
//             this.paginationContainer.appendChild(pageButton);
//         }
//     }

//     private updateItems(cargos: Cargo[]): void {
//         this.cargos.sort((a, b) => {
//             return new Date(a.dateDepart).getTime() - new Date(b.dateDepart).getTime();
//         });
//     }

//     private initEvents() {
//         this.editCargoForm.addEventListener('submit', (e) => {
//             e.preventDefault();

//             const cargoId = (document.getElementById('editCargoId') as HTMLInputElement).value;
//             const dateDepart = (document.getElementById('editDateDepart') as HTMLInputElement).value;
//             const dateArrivee = (document.getElementById('editDateArrivee') as HTMLInputElement).value;
//             const etat = (document.getElementById('editEtat') as HTMLInputElement).value as 'Ouvert' | 'Fermé';
//             const status = (document.getElementById('editStatus') as HTMLInputElement).value as 'En attente' | 'En cours' | 'Livré';

//             const rowIndex = this.cargos.findIndex(cargo => cargo.id === cargoId);

//             if (rowIndex !== -1) {
//                 this.cargos[rowIndex] = {
//                     ...this.cargos[rowIndex],
//                     dateDepart,
//                     dateArrivee,
//                     etat,
//                     status,
//                 };
//                 this.updateItems(this.cargos);
//             }

//             this.editCargoModal.style.display = 'none';
//         });

//         this.deleteCargoBtn.addEventListener('click', () => {
//             const cargoId = (document.getElementById('editCargoId') as HTMLInputElement).value;
//             const rowIndex = this.cargos.findIndex(cargo => cargo.id === cargoId);
//             if (rowIndex !== -1) {
//                 this.cargos.splice(rowIndex, 1);
//                 this.updateItems(this.cargos);
//             }
//             this.editCargoModal.style.display = 'none';
//         });

//         const choixSelect = (document.getElementById("choix") as HTMLSelectElement);
//         const champSaisi = (document.getElementById("champ-saisi") as HTMLInputElement);
//         const labelValeur = (champSaisi.querySelector("label") as HTMLLabelElement);
//         const inputValeur = (document.getElementById("valeur") as HTMLInputElement);

//         choixSelect.addEventListener("change", () => {
//             if (choixSelect.value === "poids" || choixSelect.value === "nombre") {
//                 this.showInputField("Entrez la valeur", "Entrez la valeur");
//             } else {
//                 this.hideInputField();
//             }
//         });

//         this.searchInput.addEventListener('input', this.filterItems.bind(this));
//     }

//     private showInputField(labelText: string, placeholderText: string): void {
//         champSaisi.classList.remove("hidden");
//         labelValeur.textContent = labelText;
//         inputValeur.placeholder = placeholderText;
//         inputValeur.classList.remove("hidden");
//     }

//     private hideInputField(): void {
//         champSaisi.classList.add("hidden");
//         inputValeur.classList.add("hidden");
//     }
// }

// const cargoManager = new CargoManager();