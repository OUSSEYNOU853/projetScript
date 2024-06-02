<div class=" h-20">
    <div class="flex items-center justify-between w-full bg-blue-300 h-12 pl-5 pr-5">
        <div id="filters" class="flex space-x-2">
            <input type="text" id="numeroFilter" placeholder="Filtrer par numéro"
                class="p-2 rounded border border-gray-300">
            <select id="typeFilter" class="p-2 rounded border border-gray-300">
                <option value="">Tous les types</option>
                <option value="aérienne">Aérien</option>
                <option value="routière">Routière</option>
                <option value="maritime">Maritime</option>
            </select>
            <select id="etatFilter" class="p-2 rounded border border-gray-300">
                <option value="">Tous les états</option>
                <option value="ouvert">Ouvert</option>
                <option value="fermé">Fermé</option>
            </select>
            <input type="text" id="destinationFilter" placeholder="Filtrer par destination"
                class="p-2 rounded border border-gray-300">
            <input type="text" id="departFilter" placeholder="Filtrer par lieu de départ"
                class="p-2 rounded border border-gray-300">
            <input type="date" id="dateDepartFilter" class="p-2 rounded border border-gray-300">
            <input type="date" id="dateArriveeFilter" class="p-2 rounded border border-gray-300">
        </div>
        <div class="flex items-center space-x-4">
            <button id="search-button"
                class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                <i class="fa-regular fa-square-plus fa-lg"></i>
            </button>
            <button class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                <i class="fa-solid fa-gear fa-lg" style="color: #ff0000;"></i>
            </button>
            <button id="toggleViewBtn"
                class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                <i id="toggleViewIcon" class="fa-solid fa-list fa-lg"></i>
            </button>
        </div>
    </div>
    <div id="produits-title-container" class="flex items-center w-full pl-4  border border-b-black border-solid h-8">
        <span id="produits-title" class="text-2xl font-bold text-blue-700">NOUVELLE CARGAISONS</span>
    </div>
</div>
<?php
$json_data = file_get_contents('../public/cargaisons.json');

$data = json_decode($json_data, true);
?>
<div class="w-full" id="cargaison-container" style="height:90%;">
    <div class="" id="cards-view" style="width:100%;height:100%;">
        <div class="w-full h-full">
            <div class="absolute top-1 -translate-y-5 hover:translate-y-0 transition-transform duration-200 ease-out cursor-pointer"
                style="left:58%; z-index:10;">
                <button onclick="prevSlide()"
                    class="swiper-button-up bg-white text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-full">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2l-6 6h4v6h4v-6h4l-6-6z" fill="#3C3C3C"></path>
                    </svg>
                </button>
            </div>
            <div class="w-full h-full">
                <div class="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4"
                    id="cargoList">
                    <!-- Boucle sur les données pour afficher chaque cargaison -->
                    <?php if ($data && isset($data['cargaisons']) && !empty($data['cargaisons'])): ?>
                        <?php foreach ($data['cargaisons'] as $index => $cargaison): ?>
                            <!-- Affichage de la cargaison -->
                            <div data-idcargo="<?= htmlspecialchars($idcargo) ?>"
                                class="card openFormButton bg-blue-100 hover:text-blue-500 p-4 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-200 ease-out <?= $index >= 10 ? 'hidden' : '' ?>">
                                <div class="div1 mb-4 flex justify-between">
                                    <span class="div1 text-blue-700 font-bold"><?= $cargaison['type'] ?></span>
                                    <button type="submit"
                                        class="inline-block bg-green-500 text-white px-3 py-1 rounded-full"><?= $cargaison['etat_avancement'] ?></button>
                                </div>
                                <div class="w-full h-44 mb-2 border border-solid border-gray-200 rounded-2xl overflow-hidden">
                                    <img src="Sans titre.jpeg" class="rounded-2xl w-full h-full object-cover" alt="avion">
                                </div>
                                <div class="flex justify-between items-center w-full h-10 flex-wrap">
                                    <span class="div3 text-blue-600 font-bold"><?= $cargaison['lieu_depart'] ?></span>
                                    <span class="div5 text-blue-600 font-bold"><?= $cargaison['date_depart']; ?></span>
                                </div>
                                <div class="flex justify-between items-center w-full h-10 flex-wrap">
                                    <p class="div4 text-blue-600 font-bold"><?= $cargaison['lieu_arrivee'] ?></p>
                                    <p class="div6 text-blue-600 font-bold"><?= $cargaison['date_arrivee']; ?></p>
                                </div>
                                <div class="flex h-10 w-full items-center justify-between">
                                    <button class="div2 inline-block bg-green-500 text-white px-3 py-1 rounded-full"><?= $cargaison['etat_globale'] ?></button>
                                    <button class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">Details</button>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
            <div class="absolute bottom-1 -translate-y-5 hover:translate-y-0 transition-transform duration-200 ease-out cursor-pointer"
                style="left:58%; z-index:10;">
                <!-- Button pointing down -->
                <button onclick="nextSlide()"
                    class="swiper-button-up bg-white text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-full">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 14l6-6h-4V2H6v6H2l6 6z" fill="#3C3C3C"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <div id="list-view" class="hidden m-10">
        <!-- Example list view item -->
        <table class="table-auto w-full border-collapse">
            <thead>
                <tr class="bg-blue-600">
                    <th class="border px-4 py-2 text-white font-bold">N°</th>
                    <th class="border px-4 py-2 text-white font-bold">Type</th>
                    <th class="border px-4 py-2 text-white font-bold">Date de départ</th>
                    <th class="border px-4 py-2 text-white font-bold">Date d'arrivée</th>
                    <th class="border px-4 py-2 text-white font-bold">État</th>
                    <th class="border px-4 py-2 text-white font-bold">Étapes</th>
                    <th class="border px-4 py-2 text-white font-bold">Status</th>
                </tr>
            </thead>
            <tbody id="cargaisonList">
                <?php if ($data && isset($data['cargaisons']) && !empty($data['cargaisons'])): ?>
                    <?php foreach ($data['cargaisons'] as $cargaison): ?>
                        <tr class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                            <td class="border px-4 py-2 font-bold text-center"><?= $cargaison['numero'] ?></td>
                            <td class="border px-4 py-2 font-bold text-center"><?= $cargaison['type'] ?></td>
                            <td class="border px-4 py-2 font-bold text-center">
                                <?= $cargaison['lieu_depart']; ?>
                                <br><?= $cargaison['date_depart']; ?>
                            </td>
                            <td class="border px-4 py-2 font-bold text-center">
                                <?= $cargaison['lieu_arrivee']; ?>
                                <br> <?= $cargaison['date_arrivee']; ?>
                            </td>
                            <td class="border px-4 py-2 text-center">
                                <button
                                    class="bg-green-500 text-white rounded-full font-bold px-3 py-1"><?= $cargaison['etat_globale'] ?></button>
                            </td>
                            <td class="border px-4 py-2 text-center">
                                <button
                                    class="bg-green-500 text-white rounded-full font-bold px-3 py-1"><?= $cargaison['etat_avancement'] ?></button>
                            </td>
                            <td class="border px-4 py-2 space-x-4 text-center">
                                <button
                                    class="bg-blue-600 text-white rounded-full font-bold px-3 py-1 hover:bg-blue-100 transition duration-200">
                                    Details
                                </button>
                                <button class="h-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                                    <i class="fas fa-edit text-red-500"></i>
                                </button>
                                <button
                                    class="openFormButton h-5 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" data-idcargo="<?= htmlspecialchars($idcargo) ?>">
                                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet"
                                        fill="none">
                                        <title>new-chat-outline</title>
                                        <path
                                            d="M9.53277 12.9911H11.5086V14.9671C11.5086 15.3999 11.7634 15.8175 12.1762 15.9488C12.8608 16.1661 13.4909 15.6613 13.4909 15.009V12.9911H15.4672C15.9005 12.9911 16.3181 12.7358 16.449 12.3226C16.6659 11.6381 16.1606 11.0089 15.5086 11.0089H13.4909V9.03332C13.4909 8.60007 13.2361 8.18252 12.8233 8.05119C12.1391 7.83391 11.5086 8.33872 11.5086 8.991V11.0089H9.49088C8.83941 11.0089 8.33411 11.6381 8.55097 12.3226C8.68144 12.7358 9.09947 12.9911 9.53277 12.9911Z"
                                            fill="currentColor"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M0.944298 5.52617L2.99998 8.84848V17.3333C2.99998 18.8061 4.19389 20 5.66665 20H19.3333C20.8061 20 22 18.8061 22 17.3333V6.66667C22 5.19391 20.8061 4 19.3333 4H1.79468C1.01126 4 0.532088 4.85997 0.944298 5.52617ZM4.99998 8.27977V17.3333C4.99998 17.7015 5.29845 18 5.66665 18H19.3333C19.7015 18 20 17.7015 20 17.3333V6.66667C20 6.29848 19.7015 6 19.3333 6H3.58937L4.99998 8.27977Z"
                                            fill="currentColor"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
        <div id="pagination" class="pagination-controls"></div>
    </div>
</div>



<!-- Popup Form -->
<div class="overlay fixed inset-0 bg-black bg-opacity-50 z-50 hidden" id="overlay"></div>
<div class="popup-form fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 p-8 rounded-lg shadow-lg max-w-md z-50 hidden"
    id="popupForm">
    <h3 class="text-3xl text-blue-600 font-bold mb-6">NOUVELLE CARGAISONS</h3>
    <form id="cargoForm" action="" method="post">
        <div class="mb-2">
            <label class="block text-black mb-2">Type de transport</label>
            <select id="transportType" class="w-full p-2 border rounded-md">
                <option value="maritime">Maritime</option>
                <option value="aérienne">Aérienne</option>
                <option value="routière">Routière</option>
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