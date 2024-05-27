</nav>
</main>
<footer class="w-full h-16 bg-black bg-opacity-85 flex justify-center items-center rounded-tl-3xl">
    <h2 class="text-blue-600 text-3xl">®GP MONDE</h2>
</footer>
</div>
</div>

<!-- Popup Form -->
<div class="overlay fixed inset-0 bg-black bg-opacity-50 z-50 hidden" id="overlay"></div>
<div class="popup-form fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 p-8 rounded-lg shadow-lg max-w-md z-50 hidden"
    id="popupForm">
    <h3 class="text-3xl text-blue-600 font-bold mb-6">NOUVELLE CARGAISONS</h3>
    <form id="cargoForm" action="/public/index.php?page=cargaisons" method="post">
        <div class="mb-2">
            <label class="block text-black mb-2">Type de transport</label>
            <select id="transportType" class="w-full p-2 border rounded-md">
                <option value="Maritime">Maritime</option>
                <option value="Aérienne">Aérienne</option>
                <option value="Routière">Routière</option>
            </select>
        </div>
        <div class="mb-2" style="position:relative;">
            <label for="countryName" class="block text-black mb-2">Pays de Départ:</label>
            <input type="text" id="countryName" class="w-full p-2 border rounded-md" readonly>
        </div>
        <div class="mb-2" style="position:relative;">
            <label for="arrivalCountry" class="block text-black mb-2">Pays d'Arrivée:</label>
            <input type="text" id="arrivalCountry" class="w-full p-2 border rounded-md" readonly>
        </div>
        <div class="mb-2">
            <label for="distance" class="block text-black mb-2">Distance:</label>
            <input type="text" id="distance" class="w-full p-2 border rounded-md" readonly>
        </div>
        <div class="mb-2">
            <label class="block text-black mb-2">Date de Départ</label>
            <input type="date" id="departureDate" class="w-full p-2 border rounded-md" />
        </div>
        <div class="mb-2">
            <label class="block text-black mb-2">Date d'Arrivée</label>
            <input type="date" id="arrivalDate" class="w-full p-2 border rounded-md" />
        </div>
        <div class="mb-2">
            <label class="block text-black mb-2">Choisir produits à prendre</label>
            <select id="choix" class="w-full p-2 border rounded-md">
                <option value="">Choisir</option>
                <option value="poids">POIDS</option>
                <option value="nombre">NOMBRE</option>
            </select>
        </div>
        <div class="mb-2 hidden" id="poidMax">
            <label class="block text-black mb-2">Poids Maximum du cargaison (en Kg)</label>
            <input type="number" id="maxWeight" class="w-full p-2 border rounded-md" value="100" min="100"
                max="10000" />
        </div>
        <div class="mb-2 hidden" id="nombreMax">
            <label class="block text-black mb-2">Nombre Maximum de produits du cargaison</label>
            <input type="number" id="maxProducts" class="w-full p-2 border rounded-md" value="1" min="1" max="100" />
        </div>
        <div class="col-span-2">
            <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-lg">Enregistrer</button>
        </div>
    </form>
</div>


<!-- Popup Form -->
<div class="overlaye fixed inset-0 bg-black bg-opacity-50 z-50 hidden" id="overlaye"></div>
<div class="popup-forme fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg max-w-md z-50 hidden"
    id="popupForme">
    <div class="flex justify-between items-center">
        <h3 id="form-title" class="text-3xl font-bold mb-6">Ajouter produits</h3>
        <button id="closeFormButton" class="bg-red-500 text-white p-2 rounded-full self-end">
            <i class="fa-solid fa-times"></i>
        </button>
    </div>
    <form id="produits-form" action="#" method="post">
        <div class="mb-4">
            <label for="type-produit" class="block text-blue-700">Type de produits</label>
            <select id="type-produit" class="w-full p-2 border rounded-md" aria-placeholder="choisissez une produits">
                <option value="alimentaire">Alimentaire</option>
                <option value="materielle">Materielles</option>
                <option value="chimique">Chimique</option>
            </select>
        </div>
        <div class="mb-4">
            <label for="produits-type-select" class="block text-blue-700">Choisie Cargaisons disponible</label>
            <select id="produits-type-select" class="w-full p-2 border rounded-md">
            </select>
        </div>
        <div id="form-discount-container" class="mb-4">
            <label id="form-toxicity-label" class="block text-blue-700">Pourcentage de réduction</label>
            <input id="form-toxicity-input" type="number" min="1" max="100" class="w-full p-2 border rounded-md" />
        </div>
        <div id="form-validity-container" class="mb-4">
            <label id="form-validity-label" class="block text-blue-700">Validité (jours)</label>
            <input id="form-validity-input" type="number" min="1" max="365" class="w-full p-2 border rounded-md" />
        </div>
        <div id="form-toxicity-container" class="mb-4 hidden">
            <label id="form-discount-label" class="block text-blue-700">Taux de toxicite</label>
            <input id="form-discount-input" type="number" min="1" max="10" class="w-full p-2 border rounded-md" />
        </div>
        <div class="mb-4 hidden" id="materiel">
            <label for="type-materiel" class="block text-blue-700">Type de materielles</label>
            <select id="type-materiel" class="w-full p-2 border rounded-md">
                <option value="fragile">Fragile</option>
                <option value="incassable">Incassable</option>
            </select>
        </div>
        <div id="form-submit-container" class="mt-6">
            <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md">Ajouter produits</button>
        </div>
    </form>
</div>

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script>
    // partie produits 
    document.getElementById('type-produit').addEventListener('change', function () {
        const materielField = document.getElementById('materiel');
        if (this.value === 'materielle') {
            materielField.style.display = 'block';
        } else {
            materielField.style.display = 'none';
        }
        const toxiciteField = document.getElementById('form-toxicity-container');
        if (this.value === 'chimique') {
            toxiciteField.style.display = 'block';
        } else {
            toxiciteField.style.display = 'none';
        }
    });

    document.getElementById('sidebarToggle').addEventListener('click', function () {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('w-20')) {
            sidebar.classList.remove('w-20');
            sidebar.classList.add('w-80');
        } else {
            sidebar.classList.remove('w-80');
            sidebar.classList.add('w-20');
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
    const openFormButton = document.getElementById('openFormButton');
    const popupForme = document.getElementById('popupForme');
    const overlaye = document.getElementById('overlaye');

    if (openFormButton && popupForme && overlaye) {
        openFormButton.addEventListener('click', function() {
            popupForme.style.display = 'block';
            overlaye.style.display = 'block';
        });
    } else {
        console.error('One or more elements are missing.');
    }
});


    document.getElementById('closeFormButton').addEventListener('click', function () {
        document.getElementById('popupForme').style.display = 'none';
        document.getElementById('overlaye').style.display = 'none';
    });

    document.getElementById('overlaye').addEventListener('click', function () {
        document.getElementById('popupForme').style.display = 'none';
        document.getElementById('overlaye').style.display = 'none';
    });

    document.getElementById('toggleViewButton').addEventListener('click', function () {
        document.getElementById('cardes-view').classList.toggle('hidden');
        document.getElementById('liste-view').classList.toggle('hidden');
        document.getElementById('toggleViewIcone').classList.toggle('fa-list');
        document.getElementById('toggleViewIcone').classList.toggle('fa-th');
    });

</script>
<script>
    // partie cargaisons
    document.getElementById('search-button').addEventListener('click', function () {
        document.getElementById('popupForm').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    });

    document.getElementById('overlay').addEventListener('click', function () {
        document.getElementById('popupForm').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    document.getElementById('toggleViewBtn').addEventListener('click', function () {
        document.getElementById('cards-view').classList.toggle('hidden');
        document.getElementById('list-view').classList.toggle('hidden');
        document.getElementById('toggleViewIcon').classList.toggle('fa-list');
        document.getElementById('toggleViewIcon').classList.toggle('fa-th');
    });

    document.getElementById('choix').addEventListener('change', function () {
        const materielField = document.getElementById('poidMax');
        if (this.value === 'poids') {
            materielField.style.display = 'block';
        } else {
            materielField.style.display = 'none';
        }
        const toxiciteField = document.getElementById('nombreMax');
        if (this.value === 'nombres') {
            toxiciteField.style.display = 'block';
        } else {
            toxiciteField.style.display = 'none';
        }
    });

</script>
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

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const slides = document.querySelectorAll('.carousel-slide');
        let currenSlide = 0;

        if (slides.length > 0) {
            setInterval(() => {
                slides[currenSlide].classList.remove('active');
                slides[currenSlide].classList.add('left');

                currenSlide = (currenSlide + 1) % slides.length;

                slides[currenSlide].classList.remove('inactive', 'scale-left', 'scale-right');
                slides[currenSlide].classList.add('active');

                const previousSlide = (currenSlide === 0) ? slides.length - 1 : currenSlide - 1;
                slides[previousSlide].classList.add('inactive');

                const nextSlide = (currenSlide + 1) % slides.length;
                slides[nextSlide].classList.add('inactive');

                const scaleLeftSlide = (currenSlide === 0) ? slides.length - 1 : currenSlide - 1;
                if (slides[scaleLeftSlide]) {
                    slides[scaleLeftSlide].classList.add('scale-left');
                }

                const scaleRightSlide = (currenSlide + 1) % slides.length;
                slides[scaleRightSlide].classList.add('scale-right');
            }, 3000); // Change slide every 3 seconds
        }
    });

</script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const slids = document.querySelectorAll('.carousele-slid');
        let currenSlid = 0;

        if (slids.length > 0) {
            setInterval(() => {
                slids[currenSlid].classList.remove('active');
                slids[currenSlid].classList.add('left');

                currenSlid = (currenSlid + 1) % slids.length;

                slids[currenSlid].classList.remove('inactive', 'scale-left', 'scale-right');
                slids[currenSlid].classList.add('active');

                const previousSlid = (currenSlid === 0) ? slids.length - 1 : currenSlid - 1;
                slids[previousSlid].classList.add('inactive');

                const nextSlid = (currenSlid + 1) % slids.length;
                slids[nextSlid].classList.add('inactive');

                const scaleLeftSlid = (currenSlid === 0) ? slids.length - 1 : currenSlid - 1;
                if (slids[scaleLeftSlid]) {
                    slids[scaleLeftSlid].classList.add('scale-left');
                }

                const scaleRightSlid = (currenSlid + 1) % slids.length;
                slids[scaleRightSlid].classList.add('scale-right');
            }, 3000); // Change slide every 3 seconds
        }
    });

</script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('[aria-label="Précédente"]');
    const nextButton = document.querySelector('[aria-label="Suivante"]');
    const pageInput = document.querySelector('[aria-label="Page actuelle 1"]');

    if (!prevButton || !nextButton || !pageInput) {
        console.error("One or more required elements are missing.");
        return;
    }

    // Initialiser la pagination
    paginate(1);

    // Gestionnaire d'événement pour le bouton précédent
    prevButton.addEventListener('click', function() {
        const currentPage = parseInt(pageInput.value);
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    });

    // Gestionnaire d'événement pour le bouton suivant
    nextButton.addEventListener('click', function() {
        const currentPage = parseInt(pageInput.value);
        const totalPages = parseInt(pageInput.getAttribute('max'));
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    });

    // Fonction de pagination
    function paginate(page) {
        const itemsPerPage = 10;
        const cargaisons = document.querySelectorAll('#cargaisonList tr');

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        cargaisons.forEach((cargaison, index) => {
            if (index >= startIndex && index < endIndex) {
                cargaison.style.display = 'table-row';
            } else {
                cargaison.style.display = 'none';
            }
        });

        pageInput.value = page;

        // Mise à jour des boutons
        updateButtons(page, Math.ceil(cargaisons.length / itemsPerPage));
    }

    function updateButtons(currentPage, totalPages) {
        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= totalPages;
        pageInput.setAttribute('max', totalPages);
    }
});
</script>
<script>
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.card');
            let currentPage = 1;
            const itemsPerPage = 8;

            function showPage(page) {
                const startIndex = (page - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;

                cards.forEach((card, index) => {
                    if (index >= startIndex && index < endIndex) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });

                currentPage = page;
                updateButtons();
            }

            function updateButtons() {
                document.querySelector('[onclick="prevSlide()"]').disabled = currentPage <= 1;
                document.querySelector('[onclick="nextSlide()"]').disabled = currentPage >= Math.ceil(cards.length / itemsPerPage);
            }

            window.prevSlide = function() {
                if (currentPage > 1) {
                    showPage(currentPage - 1);
                }
            };

            window.nextSlide = function() {
                if (currentPage < Math.ceil(cards.length / itemsPerPage)) {
                    showPage(currentPage + 1);
                }
            };

            // Initialiser la première page
            showPage(1);
        });
    </script>

<!-- <script>
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));

            if (index >= 0 && index < slides.length) {
                slides[index].classList.add('active');
            }
        }

        function nextSlide() {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0; // Revient à la première diapositive
            }
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1; // Revient à la dernière diapositive
            }
            showSlide(currentSlide);
        }

        // Initialiser la première diapositive
        showSlide(currentSlide);
    </script> -->
</body>

</html>