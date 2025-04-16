<?php

// Set CORS headers for preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
    exit;
}

// Set CORS headers for actual POST request
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/response.php';

// require_once __DIR__ . '/../send_mail.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (
        !empty($data->cryptoId) && 
        !empty($data->cryptoNetwork) && 
        !empty($data->cryptoAddress)
    ) {
        $updateCryptoDetails = $response->updateCrypto(            
            $data->cryptoId, 
            $data->cryptoNetwork,
            $data->cryptoAddress
        );


        if ($updateCryptoDetails) {


            http_response_code(200);
            echo json_encode(array("status" => true, "message" => "Crypto updated successfully!"));
        } else {
            http_response_code(400);
            echo json_encode(array("status" => false, "message" => "Crypto Update failed."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Incomplete data."));
    }
}
?>
