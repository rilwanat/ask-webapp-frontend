<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");






include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();

$response = new Response($db);

// Fetch potential cheats (this now returns an array directly)
$potential_cheats = $response->FindPotentialCheats();

// Initialize array to store user data
$potential_cheats_data["potential_cheats_data"] = array();


// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}

require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();





ini_set('memory_limit', '-1');

if ($potential_cheats !== null) {
    // Track already processed pairs to avoid duplicates
    $processed_pairs = array();
    
    // Loop through each potential cheat pair
    foreach ($potential_cheats as $cheat_pair) {
        $pair_key = min($cheat_pair['id1'], $cheat_pair['id2']) . '_' . max($cheat_pair['id1'], $cheat_pair['id2']);
        
        // Only process if we haven't seen this pair before
        if (!isset($processed_pairs[$pair_key])) {
            $processed_pairs[$pair_key] = true;
            
            $product_item = array(
                "pair_id" => $pair_key,
                "user1" => array(
                    "id" => $cheat_pair['id1'],
                    "fullname" => $cheat_pair['name1']
                ),
                "user2" => array(
                    "id" => $cheat_pair['id2'],
                    "fullname" => $cheat_pair['name2']
                ),
                "normalized_name" => str_replace('  ', ' ', $cheat_pair['name1'])
            );
            
            array_push($potential_cheats_data["potential_cheats_data"], $product_item);
        }
    }

    // Check if successfully fetched
    if (!empty($potential_cheats_data["potential_cheats_data"])) {
        $response_data = array(
            "status" => true, 
            "data" => $potential_cheats_data["potential_cheats_data"],
            "count" => count($potential_cheats_data["potential_cheats_data"])
        );
    } else {
        $response_data = array(
            "status" => true,
            "message" => "No potential cheats found",
            "count" => 0
        );
    }
} else {
    $response_data = array(
        "status" => false,
        "message" => "Error occurred while checking for potential cheats"
    );
}


// Set HTTP response code and return JSON response
http_response_code(200);
echo json_encode($response_data);
?>
