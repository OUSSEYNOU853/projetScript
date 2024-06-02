<?php
header('Content-Type: application/json');

function readJSON($filename) {
    if (!file_exists($filename)) {
        return ["cargaisons" => []];
    }
    $json_data = file_get_contents($filename);
    return json_decode($json_data, true);
}

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
                "date_depart" => $_POST['date_depart'],
                "date_arrivee" => $_POST['date_arrivee'],
                "distance_km" => $_POST['distance_km'],
                "type" => $_POST['type'],
                "etat_avancement" => $_POST['etat_avancement'],
                "etat_globale" => $_POST['etat_globale'],
                "produits" => []
            ];

            $data = readJSON('cargaisons.json');
            $data['cargaisons'][] = $newCargaison;
            writeJSON('cargaisons.json', $data);

            echo json_encode(["status" => "success", "message" => "Cargaison ajoutée avec succès"]);
            exit;
        } else if ($action === 'addProduct' && isset($_POST['idcargo'])) {
            $idcargo = $_POST['idcargo'];
            $newProduct = [
                "idproduit" => uniqid(),
                "nombre_colis" => $_POST['nombre'],
                "poids" => $_POST['poids'],
                "type_produit" => $_POST['typeProduit'],
                "prix_total" => $_POST['formToxicityInput'],
                "type_materiel" => $_POST['typeMateriel'] ?? null,
                "taux_toxicite" => $_POST['formDiscountInput'] ?? null,
                "client" => [
                    "nom" => $_POST['clientNom'],
                    "prenom" => $_POST['clientPrenom'],
                    "telephone" => $_POST['clientTelephone'],
                    "adresse" => $_POST['clientAdresse'],
                    "email" => $_POST['clientEmail']
                ],
                "destinataire" => [
                    "nom" => $_POST['destinataireNom'],
                    "prenom" => $_POST['destinatairePrenom'],
                    "telephone" => $_POST['destinataireTelephone'],
                    "adresse" => $_POST['destinataireAdresse'],
                    "email" => $_POST['destinataireEmail']
                ]
            ];

            $data = readJSON('cargaisons.json');
            $found = false;
            foreach ($data['cargaisons'] as &$cargaison) {
                if ($cargaison['idcargo'] === $idcargo) {
                    $cargaison['produits'][] = $newProduct;
                    writeJSON('cargaisons.json', $data);
                    echo json_encode(["status" => "success", "message" => "Produit ajouté avec succès"]);
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                echo json_encode(["status" => "error", "message" => "Cargaison non trouvée"]);
            }
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
