<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/d2ba3c872c.js" crossorigin="anonymous"></script>
    <script type="module" src="../../dist/index.js" defer></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="tailwind.css">
    <title>GP MONDE</title>
    <style>
        .popup-form input,
        .popup-form select,
        .popup-forme input,
        .popup-forme select {
            background-color: white;
            color: gray;
        }

        .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }

        .popup-form .col-span-2 {
            grid-column: span 2;
        }

        m .card:hover {
            transform: translateY(-5px) scale(1);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .popup-form button:hover {
            background-color: #0056b3;
        }

        .carousel-slide {
            transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
            position: absolute;
            width: 40%;
            height: 90%;
        }

        .carousel-slide.inactive {
            transform: translateX(100%) scale(0.8);
            opacity: 0.5;
            z-index: 1;
        }

        .carousel-slide.left {
            transform: translateX(-100%) scale(0.8);
            opacity: 0.5;
            z-index: 1;
        }

        .carousel-slide.active {
            transform: translateX(0) scale(1);
            opacity: 1;
            z-index: 2;
        }

        .carousel-slide.scale-left {
            transform: translateX(-50%) scale(0.8);
            opacity: 0.5;
            z-index: 1;
        }

        .carousel-slide.scale-right {
            transform: translateX(50%) scale(0.8);
            opacity: 0.8;
            z-index: 1;
        }

        .carousele-slid {
            transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
            position: absolute;
            width: 40%;
            height: 90%;
        }

        .carousele-slid.inactive {
            transform: translateX(100%) scale(0.8);
            opacity: 0.5;
            z-index: 1;
        }

        .carousele-slid.left {
            transform: translateX(-100%) scale(0.8);
            opacity: 0.5;
            z-index: 1;
        }

        .carousele-slid.active {
            transform: translateX(0) scale(1);
            opacity: 1;
            z-index: 2;
        }

        .carousele-slid.scale-left {
            transform: translateX(-50%) scale(0.8);
            opacity: 0.5;
            z-index: 1;
        }

        .carousele-slid.scale-right {
            transform: translateX(50%) scale(0.8);
            opacity: 0.8;
            z-index: 1;
        }

        .card-container {
            max-height: 600px;
            /* Ajustez la hauteur maximale pour le conteneur des cartes */
            overflow-y: auto;
        }

        .pagination-controls {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        .pagination-button {
            background-color: #4A90E2;
            color: white;
            border: none;
            padding: 10px;
            margin: 5px;
            cursor: pointer;
            border-radius: 5px;
        }

        .pagination-button:hover {
            background-color: #357ABD;
        }

        @media (min-width: 1024px) {
            .card-container {
                display: grid;
                grid-template-columns: repeat(5, minmax(0, 1fr));
                gap: 1rem;
            }
        }
    </style>
</head>


<body class="bg-gray-100">
    <!-- affichage du map -->
    <div id="mapModal" class="fixed bg-gray-600 bg-opacity-5 flex justify-center items-center w-full h-full p-40"
        style="display: none; z-index:9999;">
        <div class="bg-white rounded-lg shadow-lg p-6 w-3/4 h-3/4">
            <h2 class="text-2xl font-bold mb-4">Sélectionner sur la carte</h2>
            <div id="map" class="w-full h-64"></div>
            <div class="flex justify-end space-x-4 mt-4">
                <button type="button" onclick="closeMapModal()"
                    class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Fermer</button>
            </div>
        </div>
    </div>
    <div class="flex flex-row h-screen w-screen">
        <!-- Sidebar -->
        <div id="sidebar" class="bg-black w-20 lg:w-80 h-full flex flex-col items-end p-4 shadow-lg bg-opacity-85">
            <img id="logo" src="GP_MONDE.webp" alt="logo" class="h-40 w-full mb-4">
            <nav id="menu" class="flex flex-col gap-2 w-full">
                <a href="?page=accueil"
                    class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:border-white hover:bg-blue-600 hover:text-white transition"><i
                        class="fa-solid fa-house mr-2 block"></i><span class="lg:block hidden">Accueil</span></a>
                <a href="?page=dashboard"
                    class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:border-white hover:bg-blue-600 hover:text-white transition"><i
                        class="fa-solid fa-tachometer-alt mr-2 block"></i><span
                        class="lg:block hidden">Dashboard</span></a>
                <a href="?page=cargaisons"
                    class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:border-white hover:bg-blue-600 hover:text-white transition"><i
                        class="fa-solid fa-ship mr-2 block"></i><span class="lg:block hidden">Cargaisons</span></a>
                <a href="?page=produits"
                    class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:border-white hover:bg-blue-600 hover:text-white transition"><i
                        class="fa-solid fa-boxes mr-2 block"></i><span class="lg:block hidden">Produits</span></a>
                <a href="?page=clientel"
                    class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:border-white hover:bg-blue-600 hover:text-white transition"><i
                        class="fa-solid fa-users mr-2 block"></i><span class="lg:block hidden">Clientel</span></a>
                <a href="?page=contact"
                    class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:border-white hover:bg-blue-600 hover:text-white transition"><i
                        class="fa-solid fa-envelope mr-2 sidebar-icon"></i><span
                        class="lg:block hidden">Contact</span></a>
            </nav>
            <form method="post" action="auth.php" class="w-full mt-auto">
                <button type="submit" name="deconnexion"
                    class="flex items-center justify-center w-full py-2 text-lg text-red-600 border border-red-600 rounded hover:border-white hover:bg-red-600 hover:text-white transition">
                    <i class="fa fa-power-off block" aria-hidden="true"></i>
                    <span class="lg:block hidden">Déconnexion</span>
                </button>
            </form>
        </div>
        <!-- Main content -->
        <div class="flex-1 flex flex-col h-full pl-3">
            <header
                class="w-full h-20 bg-black shadow p-4 flex justify-between items-center lg:w-full bg-opacity-85 rounded-bl-3xl">
                <div class="flex items-center lg:w-24">
                    <button id="sidebarToggle" class="mr-4 text-blue-600">
                        <i class="fa fa-bars text-2xl"></i>
                    </button>
                    <div class="relative">
                        <input type="text" placeholder="Search"
                            class="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500">
                        <i
                            class="fa-solid fa-magnifying-glass absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 hidden lg:block"></i>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="text-xl text-blue-600 lg:block hidden">
                        <i class="fa-solid fa-calendar-days mr-2 "></i>
                        <?php echo date('d F Y'); ?>
                    </div>
                    <img src="#" alt="user-image"
                        class="h-10 w-10 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform duration-200 ease-out mr-10">
                    <div class="h-full">
                        <div class="font-semibold text-white">
                            OUSSEYNOU
                        </div>
                        <div class="font-semibold text-white">
                            DIEDHIOU
                        </div>
                    </div>
                    <!-- <span data-icon="menu" class=""><svg viewBox="0 0 24 24" height="24" width="24"
                            preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px"
                            enable-background="new 0 0 24 24">
                            <title>menu</title>
                            <path fill="currentColor"
                                d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z">
                            </path>
                        </svg></span>
                    <div tabindex="-1" class="_ak4w _ak4x" role="application"
                        style="transform-origin: right top; transform: scale(1); opacity: 1;">
                        <ul class="_ak5b">
                            <li tabindex="0" class="_aj-r _aj-q _aj-_" data-animate-dropdown-item="true"
                                style="opacity: 1;">
                                <div class="_aj-z _aj-t _alxo" role="button" aria-label="Nouveau groupe" style="">
                                    Nouveau groupe</div>
                            </li>
                            <li tabindex="0" class="_aj-r _aj-q _aj-_" data-animate-dropdown-item="true"
                                style="opacity: 1;">
                                <div class="_aj-z _aj-t _alxo x134i773" role="button" aria-label="Communautés" style="">
                                    Communautés</div>
                            </li>
                            <li tabindex="0" class="_aj-r _aj-q _aj-_" data-animate-dropdown-item="true"
                                style="opacity: 1;">
                                <div class="_aj-z _aj-t _alxo" role="button" aria-label="Messages importants" style="">
                                    Messages importants</div>
                            </li>
                            <li tabindex="0" class="_aj-r _aj-q _aj-_" data-animate-dropdown-item="true"
                                style="opacity: 1;">
                                <div class="_aj-z _aj-t _alxo" role="button" aria-label="Sélectionner les discussions"
                                    style="">Sélectionner les discussions</div>
                            </li>
                            <li tabindex="0" class="_aj-r _aj-q _aj-_" data-animate-dropdown-item="true"
                                style="opacity: 1;">
                                <div class="_aj-z _aj-t _alxo" role="button" aria-label="Déconnexion" style="">
                                    Déconnexion</div>
                            </li>
                        </ul>
                    </div> -->
                </div>
            </header>
            <main id="main-content" class="flex-1 pb-4 pl-4 pr-4">
                <nav class="h-full w-full shadow-md  overflow-hidden hide-scrollbar">