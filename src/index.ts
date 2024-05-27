
import { Cargaison } from './models/cargaisons';

function afficherDetailsCargaison(cargaisonId: string | null): void {
  console.log('Afficher les détails pour la cargaison:', cargaisonId);
}

document.getElementById('cargoForm')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const typeCargaison = (document.getElementById('transportType') as HTMLSelectElement).value;
  const numero = "CGS" + Math.floor(Math.random() * 1000);
  const poids_max = parseFloat((document.getElementById('maxWeight') as HTMLInputElement).value);
  const nombre_max = parseFloat((document.getElementById('maxProducts') as HTMLInputElement).value);
  const prix_total = poids_max || nombre_max * 100;
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
  formData.append('type', typeCargaison);
  formData.append('etat_avancement', etat_avancement);
  formData.append('etat_globale', etat_globale);

  console.log('Valeur du champ date de départ :', date_depart);
  console.log('Valeur du champ date d\'arrivée :', date_arrivee);


  fetch('donnees.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        if (data.status === "success") {
          alert(data.message);
          const modal = document.getElementById('modal');
          if (modal) modal.classList.add('hidden');
        } else {
          alert('Erreur lors de l\'ajout de la cargaison');
        }
      } catch (e) {
        console.error('Erreur de parsing JSON:', e, text);
      }
    })
    .catch(error => console.error('Erreur:', error));
});

