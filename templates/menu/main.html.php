<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/d2ba3c872c.js" crossorigin="anonymous"></script>
    <link rel="icon" href="path/to/your/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="tailwind.css">
    <title>GP MONDE</title>
    <style>
        .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
    </style>
</head>

<body>
    <div class="bg-gray-200 w-full h-screen flex gap-4">
        <div class="bg-gray-200 w-full h-screen flex gap-4">
            <div id="sidebar" class="bg-white w-80 h-full flex flex-col items-center gap-4">
                <img id="logo" src="logo_gpMonde.jpeg" alt="logo" class="h-40 w-full mb-2">
                <a href="?page=accueil"
                    class="hover:text-white font-bold flex items-center justify-center w-4/5 h-10 text-xl text-purple-700 border border-solid border-black rounded hover:bg-purple-700 action:bg-purple-700">Accueil</a>
                <a href="?page=dashboard"
                    class="hover:text-white font-bold flex items-center justify-center w-4/5 h-10 text-xl text-purple-700 border border-solid border-black rounded action:bg-purple-700 hover:bg-purple-700">Dashboard</a>
                <a href="?page=cargaisons"
                    class="hover:text-white font-bold flex items-center justify-center w-4/5 h-10 text-xl text-purple-700 border border-solid border-black rounded hover:bg-purple-700 action:bg-purple-700">Cargaisons</a>
                <a href="?page=produits"
                    class="hover:text-white font-bold flex items-center justify-center w-4/5 h-10 text-xl text-purple-700 border border-solid border-black rounded hover:bg-purple-700 action:bg-purple-700">Produits</a>
                <a href="?page=clientel"
                    class="hover:text-white font-bold flex items-center justify-center w-4/5 h-10 text-xl text-purple-700 border border-solid border-black rounded hover:bg-purple-700 action:bg-purple-700">Clientel</a>
                <a href="?page=contact"
                    class="hover:text-white font-bold flex items-center justify-center w-4/5 h-10 text-xl text-purple-700 border border-solid border-black rounded hover:bg-purple-700 action:bg-purple-700">Contact</a>
                <form method="post" action="auth.php" class="mt-4">
                    <button type="submit" name="deconnexion"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Déconnexion</button>
                </form>
            </div>
            <div class="flex-1 mr-4 relative overflow-auto hide-scrollbar">
                <header class="w-full h-24 flex justify-between bg-white rounded-b-2xl">
                    <div class="w-1/4 h-full flex items-center">
                        <div class="w-12 h-12 ml-4 rounded-full flex justify-center items-center">
                            <i class="fa fa-bars text-purple-700 font-bold text-4xl" aria-hidden="true"></i>
                        </div>
                        <div class="w-12 h-12 ml-4 bg-gray-200 rounded-full flex justify-center items-center">
                            <i class="fa fa-sun font-bold text-3xl"></i>
                        </div>
                    </div>
                    <div class="w-1/3 h-full flex items-center justify-between">
                        <div class="w-2/5 h-full flex items-center justify-center">
                            <span class="w-72 h-3/5 rounded-xl border border-solid border-black bg-purple-600 text-white text-2xl"><i class="fa-solid fa-calendar-days"></i><?php echo date('d F Y'); ?></span>
                        </div>
                        <div class="profil">
                            <img src="../image/profile.jpeg" alt="profile">
                        </div>
                        <div class="infos">
                            <div class="admin">
                                <div><?php echo isset($user_firstname) ? $user_firstname . ' ' . $user_lastname : ''; ?>
                                </div>
                            </div>
                            <div class="selection">
                                <div style="font-size:150%;"><?php echo isset($user_status) ? $user_status : ''; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main id="main-content" class="w-full h-4/5 overflow-x-auto flex flex-wrap relative hide-scrollbar">