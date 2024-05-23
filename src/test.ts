
// test.ts
import { Aerienne, Maritime, Terrestre, Cargaison } from './modeles/cargaisons';
import { Alimentaire, Chimique, Fragile, Incassable, Produit } from './modeles/produits';

const cargaisons: Cargaison[] = [];
const produits: Produit[] = [];
console.log(cargaisons);
console.log(produits);
function displayCargaisons() {
    const cargaisonItems = document.getElementById('cargaison-items')!;
    cargaisonItems.innerHTML = '';
    cargaisons.forEach((cargaison, index) => {
        const li = document.createElement('li');
        li.textContent = `Cargaison ${index + 1}: ${cargaison.getDistance()} km, ${cargaison.getFrais()} F/kg/km, ${cargaison.nombreProduits()} produits`;
        cargaisonItems.appendChild(li);
    });
}

function displayProduits() {
    const produitItems = document.getElementById('produit-items')!;
    produitItems.innerHTML = '';
    produits.forEach((produit, index) => {
        const li = document.createElement('li');
        li.textContent = `Produit ${index + 1}: ${produit.libelle}, ${produit.poids} kg`;
        produitItems.appendChild(li);
    });
}

document.getElementById('add-cargaison-form')!.addEventListener('submit', function (e) {
    e.preventDefault();
    const type = (document.getElementById('type-cargaison') as HTMLSelectElement).value;
    const distance = Number((document.getElementById('distance') as HTMLInputElement).value);
    const frais = Number((document.getElementById('frais') as HTMLInputElement).value);

    let cargaison: Cargaison;
    if (type === 'aerienne') {
        cargaison = new Aerienne(frais, distance);
    } else if (type === 'maritime') {
        cargaison = new Maritime(frais, distance);
    } else {
        cargaison = new Terrestre(frais, distance);
    }

    cargaisons.push(cargaison);
    displayCargaisons();

    // Mettre à jour le sélecteur de cargaisons dans le formulaire des produits
    const cargaisonSelect = document.getElementById('cargaison-select')!;
    const option = document.createElement('option');
    option.value = (cargaisons.length - 1).toString();
    option.text = `Cargaison ${cargaisons.length}`;
    cargaisonSelect.appendChild(option);
});

document.getElementById('add-produit-form')!.addEventListener('submit', function (e) {
    e.preventDefault();
    const cargaisonIndex = Number((document.getElementById('cargaison-select') as HTMLSelectElement).value);
    const typeProduit = (document.getElementById('type-produit') as HTMLSelectElement).value;
    const libelle = (document.getElementById('libelle-produit') as HTMLInputElement).value;
    const poids = Number((document.getElementById('poids-produit') as HTMLInputElement).value);
    let produit: Produit;

    if (typeProduit === 'alimentaire') {
        produit = new Alimentaire(libelle, poids);
    } else if (typeProduit === 'chimique') {
        const toxicite = Number((document.getElementById('toxicite-produit') as HTMLInputElement).value);
        produit = new Chimique(libelle, poids, toxicite);
    } else if (typeProduit === 'fragile') {
        produit = new Fragile(libelle, poids);
    } else {
        produit = new Incassable(libelle, poids);
    }

    cargaisons[cargaisonIndex].ajouterProduit(produit);
    produits.push(produit);
    displayProduits();
    console.log(`Produit ${libelle} ajouté à la cargaison ${cargaisonIndex + 1}.`);
});
