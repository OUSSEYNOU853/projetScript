// import * as L from 'leaflet';


//     document.addEventListener("DOMContentLoaded", function () {
//         const map = L.map('map').setView([5, -22.09], 3);
//         let departureMarker: L.Marker | null = null;
//         let arrivalMarker: L.Marker | null = null;

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);

//         map.on('click', function (e: L.LeafletMouseEvent) {
//             if (!departureMarker) {
//                 departureMarker = L.marker(e.latlng).addTo(map);
//                 getCountryName(e.latlng.lat, e.latlng.lng, function (countryName) {
//                     (document.getElementById('countryName') as HTMLInputElement).value = countryName;
//                 });
//             } else if (!arrivalMarker) {
//                 arrivalMarker = L.marker(e.latlng).addTo(map);
//                 getCountryName(e.latlng.lat, e.latlng.lng, function (countryName) {
//                     (document.getElementById('arrivalCountry') as HTMLInputElement).value = countryName;
//                 });
//                 calculateDistance(departureMarker.getLatLng(), arrivalMarker.getLatLng());
//                 closeMapModal();
//             }
//         });

//         function getCountryName(lat: number, lng: number, callback: (countryName: string) => void): void {
//             const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

//             fetch(url)
//                 .then(response => response.json())
//                 .then(data => {
//                     const countryName = data.address.country || 'Inconnu';
//                     callback(countryName);
//                 })
//                 .catch(error => {
//                     callback('Inconnu');
//                 });
//         }

//         function calculateDistance(departureLatLng: L.LatLng, arrivalLatLng: L.LatLng): void {
//             const distance = departureLatLng.distanceTo(arrivalLatLng) / 1000;
//             (document.getElementById('distance') as HTMLInputElement).value = distance.toFixed(2) + ' km';
//         }

//         const departInput = document.getElementById('countryName') as HTMLInputElement;
//         const arriveeInput = document.getElementById('arrivalCountry') as HTMLInputElement;
//         const mapModal = document.getElementById('mapModal') as HTMLElement;

//         departInput.addEventListener('click', function (e) {
//             e.preventDefault();
//             resetMarkers();
//             mapModal.style.display = 'flex';
//             setTimeout(() => {
//                 map.invalidateSize();
//             }, 200);
//         });

//         arriveeInput.addEventListener('click', function (e) {
//             e.preventDefault();
//             resetMarkers();
//             mapModal.style.display = 'flex';
//             setTimeout(() => {
//                 map.invalidateSize();
//             }, 200);
//         });

//         function resetMarkers(): void {
//             if (departureMarker) {
//                 map.removeLayer(departureMarker);
//                 departureMarker = null;
//             }
//             if (arrivalMarker) {
//                 map.removeLayer(arrivalMarker);
//                 arrivalMarker = null;
//             }
//         }

//         function closeMapModal(): void {
//             mapModal.style.display = 'none';
//         }
//     });



//     document.addEventListener("DOMContentLoaded", function () {
//         const mapAffiche = L.map('mapAffiche').setView([9, -22], 2);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(mapAffiche);
//     });