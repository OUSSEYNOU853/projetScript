
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cargoForm") as HTMLFormElement;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    const transportType = document.getElementById('transportType') as HTMLSelectElement;
    const numero = "CGS" + Math.floor(Math.random() * 1000);
    const poids_max = parseFloat((document.getElementById('maxWeight') as HTMLInputElement).value) || 0;
    const nombre_max = parseFloat((document.getElementById('maxProducts') as HTMLInputElement).value) || 0;
    const prix_total = poids_max > 0 ? poids_max * 100 : nombre_max * 100;
    const lieu_depart = (document.getElementById('countryName') as HTMLInputElement).value;
    const date_depart = (document.getElementById('departureDate') as HTMLInputElement).value;
    const lieu_arrivee = (document.getElementById('arrivalCountry') as HTMLInputElement).value;
    const date_arrivee = (document.getElementById('arrivalDate') as HTMLInputElement).value;
    const distance_km = (document.getElementById('distance') as HTMLInputElement).value;
    const etat_avancement = "en Attente";
    const etat_globale = "ouvert";

    const formData = new FormData();
    formData.append('action', 'addCargaison');
    formData.append('numero', numero);
    formData.append('poids_max', poids_max.toString());
    formData.append('nombre_max', nombre_max.toString());
    formData.append('prix_total', prix_total.toString());
    formData.append('lieu_depart', lieu_depart);
    formData.append('date_depart', date_depart);
    formData.append('date_arrivee', date_arrivee);
    formData.append('lieu_arrivee', lieu_arrivee);
    formData.append('distance_km', distance_km.toString());
    formData.append('type', transportType.value);
    formData.append('etat_avancement', etat_avancement);
    formData.append('etat_globale', etat_globale);

    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    if (transportType.value === "choix" || transportType.value === "") {
      isValid = false;
      showError(transportType, "Veuillez sélectionner un type de transport.");
    }

    if (lieu_depart.trim() === "") {
      isValid = false;
      showError(document.getElementById('countryName') as HTMLInputElement, "Veuillez saisir le pays de départ.");
    }

    if (lieu_arrivee.trim() === "") {
      isValid = false;
      showError(document.getElementById('arrivalCountry') as HTMLInputElement, "Veuillez saisir le pays d'arrivée.");
    }

    if (distance_km.trim() === "") {
      isValid = false;
      showError(document.getElementById('distance') as HTMLInputElement, "Veuillez saisir la distance.");
    }

    if (date_depart === "") {
      isValid = false;
      showError(document.getElementById('departureDate') as HTMLInputElement, "Veuillez sélectionner une date de départ.");
    }

    if (date_arrivee === "") {
      isValid = false;
      showError(document.getElementById('arrivalDate') as HTMLInputElement, "Veuillez sélectionner une date d'arrivée.");
    } else {
      if (date_depart >= date_arrivee) {
        isValid = false;
        showError(document.getElementById('arrivalDate') as HTMLInputElement, "La date d'arrivée doit être supérieure à la date de départ.");
      }
    }

    const choix = document.getElementById('choix') as HTMLSelectElement;
    if (choix.value === "") {
      isValid = false;
      showError(choix, "Veuillez choisir une option.");
    } else if (choix.value === "poids" && poids_max <= 0) {
      isValid = false;
      showError(document.getElementById('maxWeight') as HTMLInputElement, "Veuillez saisir un poids maximum valide.");
    } else if (choix.value === "nombre" && nombre_max <= 0) {
      isValid = false;
      showError(document.getElementById('maxProducts') as HTMLInputElement, "Veuillez saisir un nombre maximum de produits valide.");
    }

    if (isValid) {
      fetch('../public/donnees.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            if (data.status === "success") {
              console.log(data.message);
              const modal = document.getElementById('modal');
              if (modal) modal.classList.add('hidden');
              addCargaisonToTout(numero, transportType.value, lieu_depart, lieu_arrivee, date_depart, date_arrivee, etat_globale, etat_avancement, prix_total);
            } else {
              console.log('Erreur lors de l\'ajout de la cargaison');
            }
          } catch (e) {
            console.error('Erreur de parsing JSON:', e, text);
          }
        })
        .catch(error => console.error('Erreur:', error));
    }
  });

  const choix = document.getElementById("choix") as HTMLSelectElement;
  choix.addEventListener("change", () => {
    const poidMax = document.getElementById("poids") as HTMLDivElement;
    const nombreMax = document.getElementById("nombre") as HTMLDivElement;

    if (choix.value === "poids") {
      poidMax.classList.remove("hidden");
      nombreMax.classList.add("hidden");
    } else if (choix.value === "nombre") {
      poidMax.classList.add("hidden");
      nombreMax.classList.remove("hidden");
    } else {
      poidMax.classList.add("hidden");
      nombreMax.classList.add("hidden");
    }
  });

  fetchCargaisons();
});

function showError(input: HTMLElement, message: string): void {
  const errorElement = document.createElement("div");
  errorElement.classList.add("error-message");
  errorElement.textContent = message;
  input.parentElement?.appendChild(errorElement);
}

function generateUniqueId(): string {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}

function addCargaisonToTout(numero: string, type: string, lieu_depart: string, lieu_arrivee: string, date_depart: string, date_arrivee: string, etat_globale: string, etat_avancement: string, prix_total: number): void {
  const id = generateUniqueId();
  addCargaisonToCard(id, numero, type, lieu_depart, lieu_arrivee, date_depart, date_arrivee, etat_avancement, etat_globale);
  addCargaisonToTable(id, numero, type, lieu_depart, lieu_arrivee, date_depart, date_arrivee, etat_globale, etat_avancement);
  addCargaisonToList(id, numero, type, lieu_depart, date_depart, lieu_arrivee, date_arrivee, prix_total);
}

function addCargaisonToTable(id: string, numero: string, type: string, lieu_depart: string, lieu_arrivee: string, date_depart: string, date_arrivee: string, etat_globale: string, etat_avancement: string): void {
  const tableBody = document.getElementById('cargaisonList') as HTMLTableSectionElement;
  const row = document.createElement('tr');
  row.classList.add('bg-white', 'hover:bg-gray-100', 'transition', 'duration-300', 'ease-in-out');
  row.innerHTML = `
    <td class="border px-4 py-2 font-bold text-center">${numero}</td>
    <td class="border px-4 py-2 font-bold text-center">${type}</td>
    <td class="border px-4 py-2 font-bold text-center">${lieu_depart}<br>${date_depart}</td>
    <td class="border px-4 py-2 font-bold text-center">${lieu_arrivee}<br> ${date_arrivee}</td>
    <td class="border px-4 py-2 text-center">
      <button class="bg-green-500 text-white rounded-full font-bold px-3 py-1">${etat_globale}</button>
    </td>
    <td class="border px-4 py-2 text-center">
      <button class="bg-green-500 text-white rounded-full font-bold px-3 py-1">${etat_avancement}</button>
    </td>
    <td class="border px-4 py-2 space-x-4 text-center">
      <button class="bg-blue-600 text-white rounded-full font-bold px-3 py-1 hover:bg-blue-100 transition duration-200">Details</button>
      <button class="h-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
        <i class="fas fa-edit text-red-500"></i>
      </button>
      <button class="openFormButton h-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet"
          fill="none">
          <title>new-chat-outline</title>
          <path
            d="M9.53277 12.9911H11.5086V14.9671C11.5086 15.3999 11.7634 15.8175 12.1762 15.9488C12.8608 16.1661 13.4909 15.6613 13.4909 15.009V12.9911H15.4672C15.9005 12.9911 16.3181 12.7358 16.449 12.3226C16.6659 11.6381 16.1606 11.0089 15.5086 11.0089H13.4909V9.03332C13.4909 8.60007 13.2361 8.18252 12.8233 8.05119C12.1391 7.83391 11.5086 8.33872 11.5086 8.991V11.0089H9.49088C8.83941 11.0089 8.33411 11.6381 8.55097 12.3226C8.68144 12.7358 9.09947 12.9911 9.53277 12.9911Z"
            fill="currentColor">
          </path>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M0.944298 5.52617L2.99998 8.84848V17.3333C2.99998 18.8061 4.19389 20 5.66665 20H19.3333C20.8061 20 22 18.8061 22 17.3333V6.66667C22 5.19391 20.8061 4 19.3333 4H1.79468C1.01126 4 0.532088 4.85997 0.944298 5.52617ZM4.99998 8.27977V17.3333C4.99998 17.7015 5.29845 18 5.66665 18H19.3333C19.7015 18 20 17.7015 20 17.3333V6.66667C20 6.29848 19.7015 6 19.3333 6H3.58937L4.99998 8.27977Z"
            fill="currentColor">
          </path>
        </svg>
      </button>
    </td>
    `;
  tableBody.appendChild(row);
}

function addCargaisonToCard(id: string, numero: string, type: string, lieu_depart: string, lieu_arrivee: string, date_depart: string, date_arrivee: string, etat_avancement: string, etat_globale: string): void {
  const cargoList = document.getElementById('cargoList') as HTMLDivElement;
  const cargoItem = document.createElement('div');
  cargoItem.classList.add('openFormButton', 'card', 'bg-blue-100', 'hover:text-blue-500', 'p-4', 'rounded-2xl', 'shadow-xl', 'hover:scale-105', 'transition-transform', 'duration-200', 'ease-out');
  cargoItem.innerHTML = `
        <div class="div1 mb-4 flex justify-between">
          <span class="div1 text-blue-700 font-bold">${type}</span>
          <button type="submit" class="inline-block bg-green-500 text-white px-3 py-1 rounded-full">${etat_avancement}</button>
        </div>
        <div class="w-full h-44 mb-2 border border-solid border-gray-200 rounded-2xl overflow-hidden">
          <img src="Sans titre.jpeg" class="rounded-2xl w-full h-full object-cover" alt="avion">
        </div>
        <div class="flex justify-between items-center w-full h-10 flex-wrap">
          <span class="div3 text-blue-600 font-bold">${lieu_depart}</span>
          <span class="div5 text-blue-600 font-bold">${date_depart}</span>
        </div>
        <div class="flex justify-between items-center w-full h-10 flex-wrap">
          <p class="div4 text-blue-600 font-bold">${lieu_arrivee}</p>
          <p class="div6 text-blue-600 font-bold">${date_arrivee}</p>
        </div>
        <div class="flex h-10 w-full items-center justify-between">
          <button class="div2 inline-block bg-green-500 text-white px-3 py-1 rounded-full">${etat_globale}</button>
          <button class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">Details</button>
        </div>
    `;
  cargoList.appendChild(cargoItem);
}

function addCargaisonToList(id: string, numero: string, type: string, lieu_depart: string, date_depart: string, lieu_arrivee: string, date_arrivee: string, prix_total: number): void {
  const cardList = document.getElementById('cardList') as HTMLDivElement;
  const cardItem = document.createElement('div');
  cardItem.classList.add('bg-blue-100', 'hover:text-blue-500', 'p-4', 'rounded-xl', 'shadow-xl', 'cursor-pointer', 'hover:scale-105', 'transition-transform', 'duration-200', 'ease-out');
  cardItem.innerHTML = `
      <div class="mb-2">
        <p class="text-gray-700"><strong>Numéro:</strong> ${numero}</p>
        <p class="text-gray-700"><strong>Type:</strong> ${type}</p>
        <p class="text-gray-700"><strong>Lieu et date de départ:</strong> ${lieu_depart}(${date_depart})</p>
        <p class="text-gray-700"><strong>Lieu d'arrivée:</strong> ${lieu_arrivee}(${date_arrivee})</p>
       <p class="text-gray-700"><strong>Date de départ:</strong> </p>
       <p class="text-gray-700"><strong>Date d'arrivée:</strong> </p>
        <p class="text-gray-700"><strong>Prix total:</strong> ${prix_total} F CFA</p>
      </div>
    `;
  cardList.appendChild(cardItem);
}


function deleteCargaison(id: string): void {
  const row = document.getElementById(id);
  if (row) row.remove();
  console.log('Cargaison deleted with ID:', id);
}

function fetchCargaisons(): void {
  fetch('../public/donnees.php?action=getAllCargaisons')
    .then(response => response.json())
    .then(data => {
      data.forEach((cargaison: any) => {
        const { numero, type, lieu_depart, lieu_arrivee, date_depart, date_arrivee, etat_avancement, etat_globale, prix_total } = cargaison;
        addCargaisonToTout(numero, type, lieu_depart, lieu_arrivee, date_depart, date_arrivee, etat_globale, etat_avancement, prix_total);
      });
    })
    .catch(error => console.error('Erreur:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  const produitsForm = document.getElementById('produits-form') as HTMLFormElement;

  produitsForm.addEventListener('submit', function (event: Event) {
    event.preventDefault();

    const idcargo = (produitsForm.dataset.idcargo as string) || '';
    console.log('ID de cargaison:', idcargo); // Log the idcargo

    if (idcargo) {
      const nombreColis = (document.getElementById('nombre-colis') as HTMLInputElement).value;
      const numero = "PRD" + Math.floor(Math.random() * 1000);
      const poids = parseFloat((document.getElementById('poids') as HTMLInputElement).value) || 0;
      const typeProduit = (document.getElementById('type-produit') as HTMLInputElement).value;
      const formToxicityInput = (document.getElementById('form-toxicity-input') as HTMLInputElement).value;
      const formDiscountInput = (document.getElementById('form-discount-input') as HTMLInputElement).value;
      const typeMateriel = (document.getElementById('type-materiel') as HTMLInputElement).value;
      const clientNom = (document.getElementById('client-nom') as HTMLInputElement).value;
      const clientPrenom = (document.getElementById('client-prenom') as HTMLInputElement).value;
      const clientTelephone = (document.getElementById('client-telephone') as HTMLInputElement).value;
      const clientAdresse = (document.getElementById('client-adresse') as HTMLInputElement).value;
      const clientEmail = (document.getElementById('client-email') as HTMLInputElement).value;
      const destinataireNom = (document.getElementById('destinataire-nom') as HTMLInputElement).value;
      const destinatairePrenom = (document.getElementById('destinataire-prenom') as HTMLInputElement).value;
      const destinataireTelephone = (document.getElementById('destinataire-telephone') as HTMLInputElement).value;
      const destinataireAdresse = (document.getElementById('destinataire-adresse') as HTMLInputElement).value;
      const destinataireEmail = (document.getElementById('destinataire-email') as HTMLInputElement).value;

      const formData = new FormData();
      formData.append('action', 'addProduct');
      formData.append('idcargo', idcargo);  // Ajout de idcargo
      formData.append('numero', numero);
      formData.append('poids', poids.toString());
      formData.append('typeProduit', typeProduit);
      formData.append('formToxicityInput', formToxicityInput);
      formData.append('typeMateriel', typeMateriel);
      formData.append('formDiscountInput', formDiscountInput);
      formData.append('nombre', nombreColis);
      formData.append('clientNom', clientNom);
      formData.append('clientAdresse', clientAdresse);
      formData.append('clientPrenom', clientPrenom);
      formData.append('clientTelephone', clientTelephone);
      formData.append('clientEmail', clientEmail);
      formData.append('destinataireNom', destinataireNom);
      formData.append('destinatairePrenom', destinatairePrenom);
      formData.append('destinataireTelephone', destinataireTelephone);
      formData.append('destinataireAdresse', destinataireAdresse);
      formData.append('destinataireEmail', destinataireEmail);

      // Log formData entries
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      fetch('../public/donnees.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.text()) // Use text() instead of json() to inspect the raw response
        .then(text => {
          console.log('Raw response:', text); // Log raw response
          try {
            const data = JSON.parse(text);
            if (data.status === 'success') {
              console.log('Produit ajouté avec succès');
            } else {
              console.log('Erreur:', data.message);
            }
          } catch (e) {
            console.error('Erreur de parsing JSON:', e, 'Texte:', text);
            alert('Erreur lors de l\'ajout du produit : réponse du serveur invalide.');
          }
        })
        .catch(error => {
          console.error('Erreur:', error);
          alert('Erreur lors de l\'ajout du produit');
        });
    } else {
      console.error('ID de cargaison manquant.');
      alert('Erreur : ID de cargaison manquant.');
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const rowsPerPage = 10;
  let currentPage = 1;

  const filters = {
    numero: document.getElementById('numeroFilter') as HTMLInputElement,
    type: document.getElementById('typeFilter') as HTMLSelectElement,
    etat: document.getElementById('etatFilter') as HTMLSelectElement,
    destination: document.getElementById('destinationFilter') as HTMLInputElement,
    depart: document.getElementById('departFilter') as HTMLInputElement,
    dateDepart: document.getElementById('dateDepartFilter') as HTMLInputElement,
    dateArrivee: document.getElementById('dateArriveeFilter') as HTMLInputElement
  };

  const cargaisonList = document.getElementById('cargaisonList') as HTMLTableSectionElement;
  const cargoList = document.getElementById('cargoList') as HTMLDivElement;

  function applyFilters() {
    const rows = Array.from(cargaisonList.querySelectorAll('tr')) as HTMLTableRowElement[];
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const numero = cells[0].textContent || '';
      const type = cells[1].textContent || '';
      const lieuDepart = cells[2].textContent || '';
      const lieuArrivee = cells[3].textContent || '';
      const dateDepart = cells[2].textContent || '';
      const dateArrivee = cells[3].textContent || '';
      const etat = cells[4].textContent || '';

      const numeroMatch = numero.includes(filters.numero.value);
      const typeMatch = filters.type.value === '' || type === filters.type.value;
      const etatMatch = filters.etat.value === '' || etat === filters.etat.value;
      const destinationMatch = lieuArrivee.includes(filters.destination.value);
      const departMatch = lieuDepart.includes(filters.depart.value);
      const dateDepartMatch = !filters.dateDepart.value || new Date(dateDepart) >= new Date(filters.dateDepart.value);
      const dateArriveeMatch = !filters.dateArrivee.value || new Date(dateArrivee) <= new Date(filters.dateArrivee.value);

      if (numeroMatch && typeMatch && etatMatch && destinationMatch && departMatch && dateDepartMatch && dateArriveeMatch) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
      }
    });
  }

  function applyFiltersCard() {
    const cards = Array.from(cargoList.querySelectorAll('.card')) as HTMLElement[];
    cards.forEach(card => {
      const type = card.querySelector('.div1')?.textContent || '';
      const etat = card.querySelector('.div2')?.textContent || '';
      const lieuDepart = card.querySelector('.div3')?.textContent || '';
      const lieuArrivee = card.querySelector('.div4')?.textContent || '';
      const dateDepart = card.querySelectorAll('.div5')[1]?.textContent || '';
      const dateArrivee = card.querySelector('.div6')?.textContent || '';

      const typeMatch = filters.type.value === '' || type === filters.type.value;
      const etatMatch = filters.etat.value === '' || etat === filters.etat.value;
      const destinationMatch = lieuArrivee.includes(filters.destination.value);
      const departMatch = lieuDepart.includes(filters.depart.value);
      const dateDepartMatch = !filters.dateDepart.value || new Date(dateDepart) >= new Date(filters.dateDepart.value);
      const dateArriveeMatch = !filters.dateArrivee.value || new Date(dateArrivee) <= new Date(filters.dateArrivee.value);

      if (typeMatch && etatMatch && destinationMatch && departMatch && dateDepartMatch && dateArriveeMatch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  function paginate(elements: HTMLElement[], page: number) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    elements.forEach((element, index) => {
      if (index >= start && index < end) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
  }

  function updatePaginationControls(totalElements: number, elementType: string) {
    const totalPages = Math.ceil(totalElements / rowsPerPage);
    const paginationContainer = document.getElementById('pagination') as HTMLDivElement;
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i.toString();
      button.classList.add('pagination-button');
      button.addEventListener('click', () => {
        currentPage = i;
        const filteredElements = Array.from(document.querySelectorAll(`#${elementType} .card:not(.hidden), #${elementType} tr:not(.hidden)`)) as HTMLElement[];
        paginate(filteredElements, currentPage);
      });
      paginationContainer.appendChild(button);
    }
  }

  function applyFiltersAndPaginate() {
    applyFilters();
    applyFiltersCard();
    const filteredRows = Array.from(cargaisonList.querySelectorAll('tr:not(.hidden)')) as HTMLTableRowElement[];
    const filteredCards = Array.from(cargoList.querySelectorAll('.card:not(.hidden)')) as HTMLDivElement[];

    if (filteredRows.length > 0) {
      updatePaginationControls(filteredRows.length, 'cargaisonList');
      paginate(filteredRows, currentPage);
    } else if (filteredCards.length > 0) {
      updatePaginationControls(filteredCards.length, 'cargoList');
      paginate(filteredCards, currentPage);
    }
  }

  applyFiltersAndPaginate();

  Object.values(filters).forEach(filter => filter.addEventListener('input', applyFiltersAndPaginate));
});
