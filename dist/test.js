"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// test.ts
const cargaisons_1 = require("./modeles/cargaisons");
const produits_1 = require("./modeles/produits");
const cargaisons = [];
const produits = [];
console.log(cargaisons);
console.log(produits);
function displayCargaisons() {
    const cargaisonItems = document.getElementById('cargaison-items');
    cargaisonItems.innerHTML = '';
    cargaisons.forEach((cargaison, index) => {
        const li = document.createElement('li');
        li.textContent = `Cargaison ${index + 1}: ${cargaison.getDistance()} km, ${cargaison.getFrais()} F/kg/km, ${cargaison.nombreProduits()} produits`;
        cargaisonItems.appendChild(li);
    });
}
function displayProduits() {
    const produitItems = document.getElementById('produit-items');
    produitItems.innerHTML = '';
    produits.forEach((produit, index) => {
        const li = document.createElement('li');
        li.textContent = `Produit ${index + 1}: ${produit.libelle}, ${produit.poids} kg`;
        produitItems.appendChild(li);
    });
}
document.getElementById('add-cargaison-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const type = document.getElementById('type-cargaison').value;
    const distance = Number(document.getElementById('distance').value);
    const frais = Number(document.getElementById('frais').value);
    let cargaison;
    if (type === 'aerienne') {
        cargaison = new cargaisons_1.Aerienne(frais, distance);
    }
    else if (type === 'maritime') {
        cargaison = new cargaisons_1.Maritime(frais, distance);
    }
    else {
        cargaison = new cargaisons_1.Terrestre(frais, distance);
    }
    cargaisons.push(cargaison);
    displayCargaisons();
    // Mettre à jour le sélecteur de cargaisons dans le formulaire des produits
    const cargaisonSelect = document.getElementById('cargaison-select');
    const option = document.createElement('option');
    option.value = (cargaisons.length - 1).toString();
    option.text = `Cargaison ${cargaisons.length}`;
    cargaisonSelect.appendChild(option);
});
document.getElementById('add-produit-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const cargaisonIndex = Number(document.getElementById('cargaison-select').value);
    const typeProduit = document.getElementById('type-produit').value;
    const libelle = document.getElementById('libelle-produit').value;
    const poids = Number(document.getElementById('poids-produit').value);
    let produit;
    if (typeProduit === 'alimentaire') {
        produit = new produits_1.Alimentaire(libelle, poids);
    }
    else if (typeProduit === 'chimique') {
        const toxicite = Number(document.getElementById('toxicite-produit').value);
        produit = new produits_1.Chimique(libelle, poids, toxicite);
    }
    else if (typeProduit === 'fragile') {
        produit = new produits_1.Fragile(libelle, poids);
    }
    else {
        produit = new produits_1.Incassable(libelle, poids);
    }
    cargaisons[cargaisonIndex].ajouterProduit(produit);
    produits.push(produit);
    displayProduits();
    console.log(`Produit ${libelle} ajouté à la cargaison ${cargaisonIndex + 1}.`);
});
