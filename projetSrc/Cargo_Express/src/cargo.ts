// script.js
import * as L from 'leaflet';

interface Produit {
  libelle: string;
  poids: number;
  type: string;
  degreToxicite: string;
}

interface Cargaison {
  id: string;
  type: 'maritime' | 'terrestre' | 'aerienne';
  dateDepart: string;
  dateArrivee: string;
  etatGlobal: 'Ouvert' | 'fermé';
  etat: 'en attente' | 'en cours' | 'terminee';
  produits: Produit[];
  poidsTotal: number;
  nombreProduits: number;
}

// Variables pour stocker les données de cargaison
let cargaisons: { [key: string]: Cargaison[] } = {
  maritime: [],
  terrestre: [],
  aerienne: []
};

let cargaisonIdCounters: { [key: string]: number } = {
  maritime: 0,
  terrestre: 0,
  aerienne: 0
};

// Fonction pour générer un ID unique de cargaison
function generateCargaisonId(type: 'maritime' | 'terrestre' | 'aerienne'): string {
  const prefix = type.charAt(0).toUpperCase();
  const idCounter = ++cargaisonIdCounters[type];
  return prefix + String(idCounter).padStart(3, '0');
}

// Gestionnaire d'événement pour la soumission du formulaire de cargaison
document.getElementById('addCargoForm')!.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  document.getElementById('addCargoModal')!.classList.add('hidden');
  window.scrollTo(0, document.getElementById('section-ajout-produit')!.offsetTop);
});

// Fonction pour obtenir ou créer une nouvelle cargaison
function getOrCreateCargaison(type: 'maritime' | 'terrestre' | 'aerienne'): Cargaison {
  const cargaisonList = cargaisons[type];
  let cargaison = cargaisonList.find(c => c.etat === 'en attente');

  if (!cargaison) {
    cargaison = {
      id: generateCargaisonId(type),
      type: type,
      dateDepart: '',
      dateArrivee: '',
      etatGlobal: 'Ouvert',
      etat: 'en attente',
      produits: [],
      poidsTotal: 0,
      nombreProduits: 0
    };
    cargaisonList.push(cargaison);
  }
  return cargaison;
}

// Fonction pour mettre à jour le tableau de cargaison
function updateCargaisonTable(): void {
  const cargoList = document.getElementById('cargo-list')!;
  cargoList.innerHTML = '';

  for (const type in cargaisons) {
    cargaisons[type].forEach(cargaison => {
      const row = document.createElement('tr');
      row.className = 'border-b';

      row.innerHTML = `
        <td class="py-2 px-4">${cargaison.id}</td>
        <td class="py-2 px-4">${cargaison.type.charAt(0).toUpperCase() + cargaison.type.slice(1)}</td>
        <td class="py-2 px-4">${cargaison.dateDepart}</td>
        <td class="py-2 px-4">${cargaison.dateArrivee}</td>
        <td class="py-2 px-4">${cargaison.etat}</td>
        <td class="py-2 px-4">
          <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" onclick="showCargoDetails('${cargaison.id}')">Voir</button>
        </td>
      `;
      cargoList.appendChild(row);
    });
  }
}

// Fonction pour afficher les détails de la cargaison dans une modale
function showCargoDetails(cargoId: string): void {
  let cargo;
  for (const type in cargaisons) {
    cargo = cargaisons[type].find(c => c.id === cargoId);
    if (cargo) break;
  }

  if (!cargo) return;

  const cargoDetails = document.getElementById('cargo-details')!;
  cargoDetails.innerHTML = `
    <strong>ID:</strong> ${cargo.id}<br>
    <strong>Type:</strong> ${cargo.type}<br>
    <strong>Date de départ:</strong> ${cargo.dateDepart}<br>
    <strong>Date d'arrivée:</strong> ${cargo.dateArrivee}<br>
    <strong>État:</strong> ${cargo.etat}<br>
    <strong>Produits:</strong><br>
  `;

  const productList = document.createElement('ul');
  cargo.produits.forEach(produit => {
    const productItem = document.createElement('li');
    productItem.textContent = `${produit.libelle} - ${produit.poids} kg - ${produit.type} - Toxicité: ${produit.degreToxicite}`;
    productList.appendChild(productItem);
  });

  cargoDetails.appendChild(productList);
  document.getElementById('cargo-modal')!.classList.remove('hidden');
}

// Fonction pour fermer la modale des détails de cargaison
function closeModal(): void {
  document.getElementById('cargo-modal')!.classList.add('hidden');
}

// Fonction pour exporter les données au format JSON
function exportData(): void {
  const dataStr = JSON.stringify(cargaisons, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'cargaisons.json';
  a.click();

  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
  const addCargoBtn = document.getElementById('addCargoBtn');
  const addCargoModal = document.getElementById('addCargoModal') as HTMLElement | null;
  const cancelBtn = document.getElementById('cancelBtn');
  const addCargoForm = document.getElementById('addCargoForm') as HTMLFormElement;
  const cargoList = document.getElementById('cargo-list');

  const dateDepartInput = document.getElementById('dateDepart') as HTMLInputElement;
  const dateArriveeInput = document.getElementById('dateArrivee') as HTMLInputElement;
  const stopCriteriaSelect = document.getElementById('stopCriteria') as HTMLSelectElement;
  const criteriaValueInput = document.getElementById('criteriaValue') as HTMLInputElement;
  let pointDepart: L.LatLng | null = null;
  let pointArrivee: L.LatLng | null = null;

  addCargoBtn?.addEventListener('click', () => {
    if (addCargoModal !== null) {
      addCargoModal.style.display = 'block';
    } else {
      console.error('Element with id "addCargoModal" not found.');
    }
  });

  cancelBtn?.addEventListener('click', () => {
    addCargoModal?.classList.add('hidden');
  });

  addCargoForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const type = (addCargoForm.elements.namedItem('type') as HTMLInputElement)?.value as 'maritime' | 'terrestre' | 'aerienne';
    const dateDepart = new Date(addCargoForm.dateDepart.value).toISOString().split('T')[0];
    const dateArrivee = new Date(addCargoForm.dateArrivee.value).toISOString().split('T')[0];
    const stopCriteria = addCargoForm.stopCriteria.value;
    const criteriaValue = parseFloat(addCargoForm.criteriaValue.value);

    const newRow = document.createElement('tr');
    newRow.classList.add('border-b');
    newRow.innerHTML = `
      <td class="py-2 px-4">C003</td>
      <td class="py-2 px-4">${type}</td>
      <td class="py-2 px-4">${dateDepart}</td>
      <td class="py-2 px-4">${dateArrivee}</td>
      <td class="py-2 px-4"><button>Ouvert</button></td>
      <td class="py-2 px-4"><button>En attente</button></td>
      <td class="py-2 px-4">
        <button class="bg-blue-700 text-white px-4 py-2 rounded-lg">Voir</button>
      </td>
    `;
    cargoList?.appendChild(newRow);
    addCargoModal?.classList.add('hidden');
    addCargoForm.reset();
  });

  function validateForm(): boolean {
    clearErrors();
    let isValid = true;

    const selectedType = getSelectedType();
    if (!selectedType) {
      showError('typeError', 'Veuillez choisir un type de cargaison.');
      isValid = false;
    }

    const now = new Date();
    const dateDepart = new Date(dateDepartInput.value);
    const dateArrivee = new Date(dateArriveeInput.value);

    if (dateDepart < now) {
      showError('dateDepartError', 'La date de départ ne doit pas être inférieure à la date actuelle.');
      isValid = false;
    }

    if (dateArrivee <= dateDepart) {
      showError('dateArriveeError', 'La date d\'arrivée doit être supérieure à la date de départ.');
      isValid = false;
    }

    if (stopCriteriaSelect.value && parseFloat(criteriaValueInput.value) <= 0) {
      showError('criteriaValueError', 'La valeur doit être positive.');
      isValid = false;
    }

    return isValid;
  }

  function clearErrors() {
    document.getElementById('typeError')!.textContent = '';
    document.getElementById('dateDepartError')!.textContent = '';
    document.getElementById('dateArriveeError')!.textContent = '';
    document.getElementById('criteriaValueError')!.textContent = '';
    document.getElementById('mapError')!.textContent = '';
  }

  function showError(elementId: string, message: string) {
    document.getElementById(elementId)!.textContent = message;
  }

  function getSelectedType(): string | null {
    const radios = document.getElementsByName('type');
    for (const radio of Array.from(radios)) {
      if ((radio as HTMLInputElement).checked) {
        return (radio as HTMLInputElement).value;
      }
    }
    return null;
  }
});

// Initialisation de la carte Leaflet
const map = L.map("map").setView([0, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);

// Variables globales pour les marqueurs de départ et d'arrivée
let departMarker: L.Marker | null = null, arriveeMarker: L.Marker | null = null;

// Gestion de l'événement de clic sur la carte
map.on("click", function (e: L.LeafletMouseEvent) {
  if (!departMarker) {
    // Création du marqueur de départ
    departMarker = createMarker(e.latlng, "Lieu de départ");
    updateInputWithLocationName(e.latlng, "depart");
  } else if (!arriveeMarker) {
    // Création du marqueur d'arrivée
    arriveeMarker = createMarker(e.latlng, "Lieu d'arrivée");
    updateInputWithLocationName(e.latlng, "arrivee");
    calculateDistance(departMarker.getLatLng(), arriveeMarker.getLatLng());
  }
});

// Création d'un marqueur avec un popup
function createMarker(latlng: L.LatLngExpression, popupText: string): L.Marker {
  return L.marker(latlng)
    .addTo(map)
    .bindPopup(popupText)
    .openPopup();
}

// Mise à jour des champs de formulaire avec le nom du lieu
function updateInputWithLocationName(latlng: L.LatLng, inputId: string) {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
    .then((response) => response.json())
    .then((data) => {
      const locationName = data.display_name || `${latlng.lat}, ${latlng.lng}`;
      (document.getElementById(inputId) as HTMLInputElement).value = locationName;
    })
    .catch((error) => {
      console.error("Error fetching location name:", error);
      (document.getElementById(inputId) as HTMLInputElement).value = `${latlng.lat}, ${latlng.lng}`;
    });
}

// Calcul de la distance entre deux points
function calculateDistance(start: L.LatLng, end: L.LatLng) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((end.lat - start.lat) * Math.PI) / 180;
  const dLon = ((end.lng - start.lng) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((start.lat * Math.PI) / 180) * Math.cos((end.lat * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  (document.getElementById("distance") as HTMLInputElement).value = distance.toFixed(2);
}

// Gestion du champ de saisie en fonction du choix
const choixSelect = document.getElementById("choix") as HTMLSelectElement;
const champSaisi = document.getElementById("champ-saisi");
const labelValeur = document.querySelector("#champ-saisi label");
const inputValeur = document.getElementById("valeur") as HTMLInputElement;

choixSelect.addEventListener("change", function () {
  if (this.value === "poids") {
    showInputField("Poids maximal", "Entrez le poids maximal");
  } else if (this.value === "nombre") {
    showInputField("Nombre maximal de produits", "Entrez le nombre maximal de produits");
  } else {
    hideInputField();
  }
});

// Affichage du champ de saisie avec l'étiquette appropriée
function showInputField(labelText: string, placeholderText: string) {
  champSaisi?.classList.remove("hidden");
  labelValeur!.textContent = labelText;
  inputValeur.placeholder = placeholderText;
}

// Masquage du champ de saisie
function hideInputField() {
  champSaisi?.classList.add("hidden");
}
