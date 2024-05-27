<div
    class="flex justify-between items-center w-full bg-blue-300 h-14 pb-1 pl-5 pr-5 -translate-y-12 rounded-b-xl hover:translate-y-0 transition-transform duration-200 ease-out cursor-pointer">
    <div class="flex items-center justify-between w-full">
        <div class="flex gap-4">
            <select name="type" id="type" class="bg-green-500 text-white rounded-md px-4 py-2 font-bold text-xl">
                <option value="maritime">Maritime</option>
                <option value="aerienne">Aerienne</option>
                <option value="terrestre">terrestre</option>
            </select>
            <button class="px-4 py-2 bg-green-500 text-white rounded-md font-bold text-xl">raflaichir</button>
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
</div>
<div id="produits-title-container" class="flex items-center w-full pl-4">
    <span id="produits-title" class="text-2xl font-bold text-blue-700">NOUVELLE CARGAISONS</span>
</div>
<?php
$json_data = file_get_contents('../public/cargaisons.json');

$data = json_decode($json_data, true);
?>
<div class="w-full h-5/6 mt-4 overflow-hidden hide-scrollbar" id="cargaison-container">
    <div class="w-full h-full" id="cards-view">
        <div class="w-full h-full">
            <div class="relative flex flex-col items-center justify-between">
                <button onclick="prevSlide()"
                    class="swiper-button-up bg-white text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-full">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2l-6 6h4v6h4v-6h4l-6-6z" fill="#3C3C3C"></path>
                    </svg>
                </button>
            </div>
            <div class="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4"
                id="cargaisonList">
                <!-- Boucle sur les données pour afficher chaque cargaison -->
                <?php if ($data && isset($data['cargaisons']) && !empty($data['cargaisons'])): ?>
                    <?php foreach ($data['cargaisons'] as $index => $cargaison): ?>
                        <!-- Affichage de la cargaison -->
                        <div
                            class="card bg-blue-100 hover:text-blue-500 p-4 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200 ease-out <?= $index >= 10 ? 'hidden' : '' ?>">
                            <div class="mb-4 flex justify-between">
                                <span
                                    class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full"><?= $cargaison['type'] ?></span>
                                <span
                                    class="px-3 py-1 inline-block rounded-full bg-red-100 text-red-800"><?= $cargaison['etat_avancement'] ?></span>
                            </div>
                            <div class="w-full h-44 mb-2 border border-solid border-gray-200 rounded-2xl overflow-hidden">
                                <img src="Sans titre.jpeg" class="rounded-2xl w-full h-full object-cover" alt="avion">
                            </div>
                            <div class="flex justify-between items-center w-full h-10 flex-wrap">
                                <span
                                    class="inline-block bg-red-100 text-red-600 px-2 py-1 rounded-full"><?= $cargaison['lieu_depart'] ?></span>
                                <span class="inline-block bg-red-100 text-red-600 px-2 py-1 rounded-full ml-1">
                                    <?php if (isset($cargaison['date_depart'])) {
                                        echo $cargaison['date_depart'];
                                    } ?>
                                </span>
                            </div>
                            <div class="flex justify-between items-center w-full h-10 flex-wrap">
                                <p class="text-blue-600 font-bold text-sm ml-2"><?= $cargaison['lieu_arrivee'] ?></p>
                                <p class="text-blue-600 font-bold text-sm mr-2">
                                    <?php if (isset($cargaison['date_arrivee'])) {
                                        echo $cargaison['date_arrivee'];
                                    } ?>
                                </p>
                            </div>
                            <div class="flex h-10 w-full items-center justify-between">
                                <p class="text-blue-600 font-bold text-sm">Poids restant:</p>
                                <div class="w-7/12 bg-gray-200 rounded-full h-10">
                                    <div class="bg-blue-600 h-10 rounded-full flex justify-center items-center"
                                        style="width: 100%">
                                        <?= $cargaison['poids_max'] ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
            <div class="relative flex flex-col items-center justify-between">
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
        <table class="table-auto w-full">
            <thead>
                <tr class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                    <th class="border px-4 py-2 text-blue-600 font-bold">N°</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Type</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Date de départ</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Date d'arrivée</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">État</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Étapes</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Progression</th>
                </tr>
            </thead>
            <tbody id="cargaisonList">
                <?php if ($data && isset($data['cargaisons']) && !empty($data['cargaisons'])): ?>
                    <?php foreach ($data['cargaisons'] as $cargaison): ?>
                        <tr class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                            <td class="border px-4 py-2 text-blue-600 font-bold"><?= $cargaison['numero'] ?></td>
                            <td class="border px-4 py-2 text-blue-600 font-bold"><?= $cargaison['type'] ?></td>
                            <td class="border px-4 py-2 text-blue-600 font-bold"><?= $cargaison['lieu_depart'];
                            if (isset($cargaison['date_depart'])) {
                                $cargaison['date_depart'];
                            } ?>
                            </td>
                            <td class="border px-4 py-2 text-blue-600 font-bold"><?= $cargaison['lieu_arrivee'];
                            if (isset($cargaison['date_arrivee'])) {
                                $cargaison['date_arrivee'];
                            } ?>
                            </td>
                            <td class="border px-4 py-2"><?= $cargaison['etat_globale'] ?></td>
                            <td class="border px-4 py-2"><?= $cargaison['etat_avancement'] ?></td>
                            <td class="border px-4 py-2"><?= $cargaison['poids_max'] ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
        <div class="w-full p-3 mt-2 bg-blue-400 rounded-b-lg shadow-md">
            <div class="flex items-center justify-between text-gray-700">
                <div data-qa="PagerInfo" class="text-sm bg-black text-white pl-4">1-60 de 133 208</div>
                <div data-qa="Pager" class="flex items-center space-x-2">
                    <!-- Previous Button -->
                    <button
                        class="p-2 rounded-full bg-white text-black hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Précédente">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.707 2.707a1 1 0 00-1.414-1.414l1.414 1.414zM4 8l-.707-.707a1 1 0 000 1.414L4 8zm5.293 6.707a1 1 0 001.414-1.414l-1.414 1.414zm0-13.414l-6 6 1.414 1.414 6-6-1.414-1.414zm-6 7.414l6 6 1.414-1.414-6-6-1.414 1.414z"
                                fill="#3C3C3C"></path>
                        </svg>
                    </button>
                    <!-- Page Input -->
                    <input
                        class="pageInput w-12 p-2 border border-blue-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-800"
                        aria-label="Page actuelle 1" type="number" min="1" value="1">
                    <!-- Next Button -->
                    <button
                        class="p-2 rounded-full bg-white text-black hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Suivante">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.293 13.293a1 1 0 101.414 1.414l-1.414-1.414zM12 8l.707.707a1 1 0 000-1.414L12 8zM6.707 1.293a1 1 0 00-1.414 1.414l1.414-1.414zm0 13.414l6-6-1.414-1.414-6 6 1.414 1.414zm6-7.414l-6-6-1.414 1.414 6 6 1.414-1.414z"
                                fill="#3C3C3C"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    </div>
</div>