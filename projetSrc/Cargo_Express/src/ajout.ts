// CargoManager.ts

export interface Produit {
    libelle: string;
    poids: number;
    type: string;
    degreToxicite: string;
}

export interface Cargaison {
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
export let cargaisons: { [key: string]: Cargaison[] } = {
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
export function generateCargaisonId(type: 'maritime' | 'terrestre' | 'aerienne'): string {
    const prefix = type.charAt(0).toUpperCase();
    const idCounter = ++cargaisonIdCounters[type];
    return prefix + String(idCounter).padStart(3, '0');
}

// Fonction pour obtenir ou créer une nouvelle cargaison
export function getOrCreateCargaison(type: 'maritime' | 'terrestre' | 'aerienne'): Cargaison {
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
export function updateCargaisonTable(): void {
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
export function showCargoDetails(cargoId: string): void {
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
        <strong>Produits:</strong>
        <ul>
            ${cargo.produits.map(p => `<li>${p.libelle} - ${p.poids}kg (${p.type})</li>`).join('')}
        </ul>
    `;

    document.getElementById('cargo-modal')!.style.display = 'block';
}

// Fonction pour fermer la modale
export function closeModal(): void {
    document.getElementById('cargo-modal')!.style.display = 'none';
}
