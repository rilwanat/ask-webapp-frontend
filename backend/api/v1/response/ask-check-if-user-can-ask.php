<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");





include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"));


// $uploadDir = "../../../../images/help-requests-images/";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}




require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();




// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        !empty($data->email) 
        // &&
        // !empty($data->helpToken) && 
        // !empty($data->amount) &&
        // !empty($data->remark)
        ) {

    // $email = $_POST['email'] ?? null;



    // Validate user credentials and additional checks
    $authResult = $response->checkIfUserCanPostHelpRequest($data->email);
    if (!$authResult['status']) {
        http_response_code(403); // Forbidden
        echo json_encode(["status" => false, "message" => $authResult['message']]);
        exit();
    } else {
        http_response_code(200);
        echo json_encode([
            "status" => true,
            "message" => "User can create."
        ]);
    }



} else {
    http_response_code(405); // Method not allowed
    echo json_encode(["status" => false, "message" => "Unable to Post. Data is incomplete."]);
}
?>