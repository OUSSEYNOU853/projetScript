<div
    class="flex justify-between items-center w-full bg-blue-300 h-14 pl-5 pr-5 pb-2 -translate-y-12 rounded-b-xl hover:translate-y-0 transition-transform duration-200 ease-out cursor-pointer">
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
            <span id="openFormButton" data-icon="new-chat-outline" class=""><svg viewBox="0 0 24 24" height="24"
                    width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none">
                    <title>new-chat-outline</title>
                    <path
                        d="M9.53277 12.9911H11.5086V14.9671C11.5086 15.3999 11.7634 15.8175 12.1762 15.9488C12.8608 16.1661 13.4909 15.6613 13.4909 15.009V12.9911H15.4672C15.9005 12.9911 16.3181 12.7358 16.449 12.3226C16.6659 11.6381 16.1606 11.0089 15.5086 11.0089H13.4909V9.03332C13.4909 8.60007 13.2361 8.18252 12.8233 8.05119C12.1391 7.83391 11.5086 8.33872 11.5086 8.991V11.0089H9.49088C8.83941 11.0089 8.33411 11.6381 8.55097 12.3226C8.68144 12.7358 9.09947 12.9911 9.53277 12.9911Z"
                        fill="currentColor"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.944298 5.52617L2.99998 8.84848V17.3333C2.99998 18.8061 4.19389 20 5.66665 20H19.3333C20.8061 20 22 18.8061 22 17.3333V6.66667C22 5.19391 20.8061 4 19.3333 4H1.79468C1.01126 4 0.532088 4.85997 0.944298 5.52617ZM4.99998 8.27977V17.3333C4.99998 17.7015 5.29845 18 5.66665 18H19.3333C19.7015 18 20 17.7015 20 17.3333V6.66667C20 6.29848 19.7015 6 19.3333 6H3.58937L4.99998 8.27977Z"
                        fill="currentColor"></path>
                </svg>
            </span>
            <button class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                <i class="fa-solid fa-gear fa-lg" style="color: #ff0000;"></i>
            </button>
            <button id="toggleViewButton"
                class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                <i id="toggleViewIcone" class="fa-solid fa-list fa-lg"></i>
            </button>
        </div>
    </div>
</div>
<div id="produits-title-container" class="flex items-center w-full pl-4">
    <span id="produits-title" class="text-2xl font-bold text-blue-700">AJOUTER PRODUITS DANS CARGAISONS</span>
</div>
<div class="w-full h-full mt-10 overflow-hidden hide-scrollbar" id="cargaison-container">
    <div class="w-full h-full" id="cardes-view">
        <div class="w-full h-full">
            <div class="relative flex flex-col items-center justify-between">
                <!-- Button pointing up -->
                <button
                    class="swiper-button-up bg-white text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2l-6 6h4v6h4v-6h4l-6-6z" fill="#3C3C3C"></path>
                    </svg>
                </button>
            </div>
            <div id="produits-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                <div id="produits-item-1" class="card bg-blue-100 p-4 rounded-lg border-2 border-blue-500">
                    <div id="produits-item-1-header" class="flex justify-between items-center mb-4">
                        <span id="produits-item-1-title" class="text-lg font-semibold text-green-600">Produits
                            Aérienne</span>
                        <span id="produits-item-1-discount"
                            class="text-sm bg-red-200 text-red-600 px-2 py-1 rounded-md">-20%</span>
                    </div>
                    <div id="produits-item-1-image-container"
                        class="w-full h-44 mb-4 border border-solid border-black rounded-2xl">
                        <img id="produits-item-1-image" src="Sans titre.jpeg"
                            class="rounded-2xl w-full h-full object-cover" alt="produits">
                    </div>
                    <div id="produits-item-1-details" class="flex justify-between items-center mb-4">
                        <span id="produits-item-1-category"
                            class="text-sm bg-blue-200 text-blue-600 px-2 py-1 rounded-md">Aérien</span>
                        <span id="produits-item-1-validity" class="text-lg font-semibold text-green-600">Validité:
                            30 jours</span>
                    </div>
                    <div id="produits-item-1-footer" class="mt-4">
                        <div id="produits-item-1-price-container" class="flex justify-between">
                            <p id="produits-item-1-price-label" class="text-lg">Prix original: </p>
                            <span id="produits-item-1-price-value" class="text-green-600 font-bold">50.000 F
                                cfa</span>
                        </div>
                        <div id="produits-item-1-discounted-price-container" class="flex justify-between mt-2">
                            <p id="produits-item-1-discounted-price-label" class="text-lg">Prix Total: </p>
                            <span id="produits-item-1-discounted-price-value" class="text-red-600 font-bold">40.000
                                F cfa</span>
                        </div>
                    </div>
                    <button id="produits-item-1-button"
                        class="mt-4 px-6 py-2 bg-green-500 text-white rounded-md">Appliquer</button>
                </div>
                <!-- Ajouter d'autres produits ici, en suivant la même structure -->
            </div>
            <!-- Ajouter d'autres cartes ici -->
            <div class="relative flex flex-col items-center justify-between">
                <!-- Button pointing down -->
                <button
                    class="swiper-button-down bg-white text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 14l6-6h-4V2H6v6H2l6 6z" fill="#3C3C3C"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <div id="liste-view" class="hidden m-10">
        <table class="w-full table-auto">
            <thead>
                <tr class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                    <th class="border px-4 py-2 text-blue-600 font-bold">Titre</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Catégorie</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Validité</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Prix Original</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Prix Total</th>
                    <th class="border px-4 py-2 text-blue-600 font-bold">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                    <td class="border px-4 py-2 text-blue-600 font-bold">Produits Aérienne</td>
                    <td class="border px-4 py-2 text-blue-600 font-bold">Aérien</td>
                    <td class="border px-4 py-2 text-blue-600 font-bold">30 jours</td>
                    <td class="border px-4 py-2 text-blue-600 font-bold">50.000 F CFA</td>
                    <td class="border px-4 py-2 text-blue-600 font-bold">40.000 F CFA</td>
                    <td class="border px-4 py-2 text-blue-600 font-bold">
                        <button class="px-6 py-2 bg-blue-500 text-white rounded-md">Appliquer</button>
                    </td>
                </tr>
                <!-- Ajoutez plus de lignes pour d'autres produits si nécessaire -->
            </tbody>
        </table>
        <div class="w-full p-3 mt-2 bg-blue-400 rounded-b-lg shadow-md">
            <div class="flex items-center justify-between text-gray-700">
                <div data-qa="PagerInfo" class="text-sm bg-black text-white pl-4">1-60 de 133 208</div>
                <div data-qa="Pager" class="flex items-center space-x-2">
                    <!-- Previous Button -->
                    <button
                        class="p-2 rounded-full bg-white text-black hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        aria-disabled="true" aria-label="Précédente" role="link" data-qa="VButton">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.707 2.707a1 1 0 00-1.414-1.414l1.414 1.414zM4 8l-.707-.707a1 1 0 000 1.414L4 8zm5.293 6.707a1 1 0 001.414-1.414l-1.414 1.414zm0-13.414l-6 6 1.414 1.414 6-6-1.414-1.414zm-6 7.414l6 6 1.414-1.414-6-6-1.414 1.414z"
                                fill="#3C3C3C"></path>
                        </svg>
                    </button>
                    <!-- Page Input -->
                    <input
                        class="w-12 p-2 border border-blue-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-800"
                        aria-label="Page actuelle 1" type="number" min="1" value="1">
                    <!-- Next Button -->
                    <a class="p-2 rounded-full bg-white text-black hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Suivante" aria-disabled="false"
                        href="/fr/videos/%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%B9%D0%BD%D0%B5%D1%80.html?offset=60"
                        data-qa="VLink">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.293 13.293a1 1 0 101.414 1.414l-1.414-1.414zM12 8l.707.707a1 1 0 000-1.414L12 8zM6.707 1.293a1 1 0 00-1.414 1.414l1.414-1.414zm0 13.414l6-6-1.414-1.414-6 6 1.414 1.414zm6-7.414l-6-6-1.414 1.414 6 6 1.414-1.414z"
                                fill="#3C3C3C"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

    </div>
</div>