<?php
header('Content-Type: application/json'); // Assurez-vous que le contenu est du JSON

// Fonction pour lire le fichier JSON
function readJSON($filename) {
    if (!file_exists($filename)) {
        return ["cargaisons" => []];
    }
    $json_data = file_get_contents($filename);
    return json_decode($json_data, true);
}

// Fonction pour écrire dans le fichier JSON
function writeJSON($filename, $data) {
    $json_data = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json_data);
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
        $action = $_POST['action'];
        if ($action === 'addCargaison') {
            $newCargaison = [
                "idcargo" => uniqid(),
                "numero" => $_POST['numero'],
                "poids_max" => $_POST['poids_max'],
                "prix_total" => $_POST['prix_total'],
                "lieu_depart" => $_POST['lieu_depart'],
                "lieu_arrivee" => $_POST['lieu_arrivee'],
                "date_depart" => $_POST['date_arrivee'],
                "date_arrivee" => $_POST['date_arrivee'],
                "distance_km" => $_POST['distance_km'],
                "type" => $_POST['type'],
                "etat_avancement" => $_POST['etat_avancement'],
                "etat_globale" => $_POST['etat_globale']
            ];

            $data = readJSON('cargaisons.json');
            $data['cargaisons'][] = $newCargaison;
            writeJSON('cargaisons.json', $data);

            echo json_encode(["status" => "success", "message" => "Cargaison ajoutée avec succès"]);
            exit;
        } else {
            echo json_encode(["status" => "error", "message" => "Action non valide"]);
            exit;
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Requête non valide"]);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    exit;
}
?>
