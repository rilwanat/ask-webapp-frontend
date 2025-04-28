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


$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"));



// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}
require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();




if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (
        !empty($data->rate)
    ) {
        


 
        $updateExchangeRate = $response->updateExchangeRate(            
            $data->rate
        );


        if ($updateExchangeRate) {


            http_response_code(200);
            echo json_encode(array("status" => true, "message" => "Exchange Rate Updated Successfully!"));
        } else {
            http_response_code(400);
            echo json_encode(array("status" => false, "message" => "Update failed."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Incomplete data."));
    }
}
?>
