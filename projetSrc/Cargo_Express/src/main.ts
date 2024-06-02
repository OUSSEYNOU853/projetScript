// main.ts
import { CargoManager } from './addCargoExpress';

document.addEventListener('DOMContentLoaded', () => {
    const cargoList = document.getElementById('cargo-list') as HTMLTableElement;
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const paginationContainer = document.getElementById('pagination') as HTMLElement;

    if (cargoList && searchInput && paginationContainer) {
        const cargoManager = new CargoManager(cargoList, searchInput, paginationContainer);

        // Ajoutez d'autres initialisations ou gestionnaires d'événements ici si nécessaire

    } else {
        console.error('Erreur : cargoList, searchInput ou paginationContainer est null.');
    }
});


// main.ts
import { generateCargaisonId, getOrCreateCargaison, updateCargaisonTable, showCargoDetails, closeModal, cargaisons } from './ajout';

// Gestionnaire d'événement pour la soumission du formulaire de cargaison
document.getElementById('formCargaison')!.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    document.getElementById('section-ajout-produit')!.style.display = 'block';
    window.scrollTo(0, document.getElementById('section-ajout-produit')!.offsetTop);
});

// Gestionnaire d'événement pour la soumission du formulaire de produit
document.getElementById('formProduit')!.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const typeCargaison = (document.querySelector('input[name="typeCargaison"]:checked') as HTMLInputElement)!.value as 'maritime' | 'terrestre' | 'aerienne';
    const libelleProduit = (document.getElementById('libelle-produit') as HTMLInputElement)!.value;
    const poidsProduit = parseFloat((document.getElementById('poids-produit') as HTMLInputElement)!.value);
    const typeProduit = (document.getElementById('type-produit') as HTMLInputElement)!.value;
    const degreToxicite = (document.getElementById('degre-toxicite') as HTMLInputElement)!.value;

    const cargaison = getOrCreateCargaison(typeCargaison);
    cargaison.produits.push({
        libelle: libelleProduit,
        poids: poidsProduit,
        type: typeProduit,
        degreToxicite: degreToxicite
    });

    cargaison.poidsTotal += poidsProduit;
    cargaison.nombreProduits += 1;

    if (cargaison.nombreProduits >= 10 || cargaison.poidsTotal >= 5000) {
        cargaison.etat = 'en attente';
    }

    updateCargaisonTable();
    alert("Produit ajouté avec succès !");
});

// Gestionnaire d'événement pour fermer la modale
document.getElementById('close-modal')!.addEventListener('click', closeModal);

// Initialisation des cargaisons (si nécessaire)
updateCargaisonTable();
