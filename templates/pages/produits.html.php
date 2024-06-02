<div id="produits-title-container" class="flex items-center w-full pl-4">
    <span id="produits-title" class="text-2xl font-bold text-blue-700">AJOUTER PRODUITS DANS CARGAISONS</span>
</div>
<?php
$json_data = file_get_contents('../public/cargaisons.json');

$data = json_decode($json_data, true);
?>
<div class=":card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden hide-scrollbar p-4"
    style="padding-top:1%; padding-bottom:1%;" id="cardList">
    <?php if ($data && isset($data['cargaisons']) && !empty($data['cargaisons'])): ?>
        <?php foreach ($data['cargaisons'] as $index => $cargaison): ?>
            <!-- Affichage de la cargaison -->
            <div class="bg-blue-100', hover:text-blue-500, p-4, rounded-xl, shadow-xl, cursor-pointer, hover:scale-105, transition-transform, duration-200, ease-out">
                <div class="text-gray-700"><strong>Numéro:</strong> <?=$cargaison['numero']; ?></div>
                <div class="text-gray-700"><strong>Type:</strong> <?php echo $cargaison['type']; ?></div>
                <div class="text-gray-700"><strong>Lieu de départ:</strong> <?php echo $cargaison['lieu_depart']; ?></div>
                <div class="text-gray-700"><strong>Lieu d'arrivée:</strong> <?php echo $cargaison['lieu_arrivee']; ?></div>
                <div class="text-gray-700"><strong>Date de départ:</strong> <?php echo $cargaison['date_depart']; ?></div>
                <div class="text-gray-700"><strong>Date d'arrivée:</strong> <?php echo $cargaison['date_arrivee']; ?></div>
                <div class="text-gray-700"><strong>Prix total:</strong> <?php echo $cargaison['prix_total']; ?> €</div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>