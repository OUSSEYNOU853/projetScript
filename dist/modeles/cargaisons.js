"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terrestre = exports.Maritime = exports.Aerienne = exports.Cargaison = void 0;
class Cargaison {
    constructor(frais, distance) {
        this.produits = [];
        this.frais = frais;
        this.distance = distance;
    }
    ajouterProduit(produit) {
        if (this.produits.length >= 10) {
            console.log("Vous ne pouvez pas ajouter plus de 10 produits");
            return;
        }
        this.produits.push(produit);
    }
    nombreProduits() {
        return this.produits.length;
    }
    sommeTotal() {
        return this.produits.reduce((total, produit) => total + produit.poids * this.frais, 0);
    }
    getFrais() {
        return this.frais;
    }
    getDistance() {
        return this.distance;
    }
    getProduits() {
        return this.produits;
    }
    setProduits(produits) {
        this.produits = produits;
    }
    setFrais(frais) {
        this.frais = frais;
    }
    setDistance(distance) {
        this.distance = distance;
    }
}
exports.Cargaison = Cargaison;
class Aerienne extends Cargaison {
    calculerFrais() {
        return this.frais * this.distance;
    }
}
exports.Aerienne = Aerienne;
class Maritime extends Cargaison {
    calculerFrais() {
        return this.frais * this.distance;
    }
}
exports.Maritime = Maritime;
class Terrestre extends Cargaison {
    calculerFrais() {
        return this.frais * this.distance;
    }
}
exports.Terrestre = Terrestre;
