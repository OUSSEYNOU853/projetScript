</nav>
</main>
<footer class="w-full h-16 bg-black bg-opacity-85 flex justify-center items-center rounded-tl-3xl">
    <h2 class="text-blue-600 text-3xl">®GP MONDE</h2>
</footer>
</div>
</div>


<!-- Popup Form -->
<div class="overlaye fixed inset-0 bg-black bg-opacity-50 z-50 hidden" id="overlaye"></div>
<div class="popup-forme fixed transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-50 hidden"
    id="popupForme" style="width:50%; height:60%; top:49%; left:55%;">
    <div class="flex justify-between items-center">
        <h3 id="form-title" class="text-3xl font-bold mb-6">Ajouter produits</h3>
        <button id="closeFormButton" class="bg-red-500 text-white p-2 rounded-full">
            <i class="fa-solid fa-times"></i>
        </button>
    </div>
    <form id="produits-form" data-idcargo="<?= htmlspecialchars($cargaison['idcargo']) ?>" action="#" method="post" style="width:100%; height:95%;">
        <div class="flex w-full justify-between" style="height:80%;">
            <!-- Informations du produit -->
            <div class="mb-4" style="width:33%; height:100%">
                <h4 class="text-xl font-bold">Informations du produit</h4>
                <label for="nombre-colis" class="block text-blue-700 mt-6">Nombre de colis</label>
                <input id="nombre-colis" type="number" min="1" class="w-full p-3 border rounded-md" required />

                <label for="poids" class="block text-blue-700 mt-4">Poids(en kg)</label>
                <input id="poids" type="number" min="1" class="w-full p-3 border rounded-md" required />

                <label for="type-produit" class="block text-blue-700 mt-4">Type de produit</label>
                <select id="type-produit" class="w-full p-3 border rounded-md"
                    aria-placeholder="choisissez une produits" required>
                    <option value="alimentaire">Alimentaire</option>
                    <option value="materielle">Materielles</option>
                    <option value="chimique">Chimique</option>
                </select>
                <div id="form-discount-container" class="mb-4">
                    <label id="form-toxicity-label" class="block text-blue-700">Prix total(en CFA)</label>
                    <input id="form-toxicity-input" type="number" value="100" min="100" max="1000000"
                        class="w-full p-3" border rounded-md" />
                </div>
                <div id="form-toxicity-container" class="mb-4 hidden">
                    <label id="form-discount-label" class="block text-blue-700">Taux de toxicite</label>
                    <input id="form-discount-input" type="number" min="1" max="10"
                        class="w-full p-3 border rounded-md" />
                </div>
                <div class="mb-4 hidden" id="materiel">
                    <label for="type-materiel" class="block text-blue-700">Type de materielles</label>
                    <select id="type-materiel" class="w-full p-3 border rounded-md">
                        <option value="fragile">Fragile</option>
                        <option value="incassable">Incassable</option>
                    </select>
                </div>
            </div>
            <!-- Informations du client -->
            <div class="mb-4" style="width:33%; height:100%">
                <h4 class="text-xl font-bold">Informations du client</h4>
                <label for="client-nom" class="block text-blue-700 mt-6">Nom</label>
                <input id="client-nom" type="text" class="w-full p-2 border rounded-md" required />

                <label for="client-prenom" class="block text-blue-700 mt-2">Prénom</label>
                <input id="client-prenom" type="text" class="w-full p-2 border rounded-md" required />

                <label for="client-telephone" class="block text-blue-700 mt-2">Téléphone</label>
                <input id="client-telephone" type="tel" class="w-full p-2 border rounded-md" required />

                <label for="client-adresse" class="block text-blue-700 mt-2">Adresse</label>
                <input id="client-adresse" type="text" class="w-full p-2 border rounded-md" required />

                <label for="client-email" class="block text-blue-700 mt-2">Email (facultatif)</label>
                <input id="client-email" type="email" class="w-full p-2 border rounded-md" />
            </div>
            <!-- Informations du destinataire -->
            <div class="mb-4"" style=" width:33%; height:100%; border:1px solid">
                <h4 class="text-xl font-bold">Informations du destinataire</h4>
                <label for="destinataire-nom" class="block text-blue-700 mt-6">Nom</label>
                <input id="destinataire-nom" type="text" class="w-full p-2 border rounded-md" required />

                <label for="destinataire-prenom" class="block text-blue-700 mt-2">Prénom</label>
                <input id="destinataire-prenom" type="text" class="w-full p-2 border rounded-md" required />

                <label for="destinataire-telephone" class="block text-blue-700 mt-2">Téléphone</label>
                <input id="destinataire-telephone" type="tel" class="w-full p-2 border rounded-md" required />

                <label for="destinataire-adresse" class="block text-blue-700 mt-2">Adresse</label>
                <input id="destinataire-adresse" type="text" class="w-full p-2 border rounded-md" required />

                <label for="destinataire-email" class="block text-blue-700 mt-2">Email (facultatif)</label>
                <input id="destinataire-email" type="email" class="w-full p-2 border rounded-md" />
            </div>
        </div>
        <div id="form-submit-container" class="mt-6">
            <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md">Ajouter produits</button>
        </div>
    </form>
</div>

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script type="module" src="../../dist/pages/produits.js"></script>
<script type="module" src="../../dist/pages/cargaisons.js"></script>
<script type="module" src="../../dist/pages/carousel.js"></script>
<!-- <script type="module" src="../../dist/pages/map.js"></script> -->
<!-- <script type="module" src="../../dist/pages/paginate.js"></script> -->
<script type="module" src="../../dist/pages/pagination.js"></script>
<script type="module" src="../../dist/pages/scroll.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        var map = L.map('map').setView([5, -22.09], 3);
        var departureMarker;
        var arrivalMarker;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click', function (e) {
            if (!departureMarker) {
                departureMarker = L.marker(e.latlng).addTo(map);
                getCountryName(e.latlng.lat, e.latlng.lng, function (countryName) {
                    document.getElementById('countryName').value = countryName;
                });
            } else if (!arrivalMarker) {
                arrivalMarker = L.marker(e.latlng).addTo(map);
                getCountryName(e.latlng.lat, e.latlng.lng, function (countryName) {
                    document.getElementById('arrivalCountry').value = countryName;
                });
                calculateDistance(departureMarker.getLatLng(), arrivalMarker.getLatLng());
                closeMapModal();
            }
        });

        function getCountryName(lat, lng, callback) {
            var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var countryName = data.address.country || 'Inconnu';
                    callback(countryName);
                })
                .catch(error => {
                    callback('Inconnu');
                });
        }

        function calculateDistance(departureLatLng, arrivalLatLng) {
            var distance = departureLatLng.distanceTo(arrivalLatLng) / 1000;
            document.getElementById('distance').value = distance.toFixed(2) + ' km';
        }

        const departInput = document.getElementById('countryName');
        const arriveeInput = document.getElementById('arrivalCountry');
        const mapModal = document.getElementById('mapModal');

        departInput.addEventListener('click', function (e) {
            e.preventDefault();
            resetMarkers();
            mapModal.style.display = 'flex';
            setTimeout(() => {
                map.invalidateSize();
            }, 200);
        });

        arriveeInput.addEventListener('click', function (e) {
            e.preventDefault();
            resetMarkers();
            mapModal.style.display = 'flex';
            setTimeout(() => {
                map.invalidateSize();
            }, 200);
        });

        function resetMarkers() {
            if (departureMarker) {
                map.removeLayer(departureMarker);
                departureMarker = null;
            }
            if (arrivalMarker) {
                map.removeLayer(arrivalMarker);
                arrivalMarker = null;
            }
        }

        function closeMapModal() {
            mapModal.style.display = 'none';
        }
    });
</script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        var mapAffiche = L.map('mapAffiche').setView([9, -22], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapAffiche);
    });
</script>
</body>
</html>