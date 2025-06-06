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


// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}
require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();




// Handle login endpoint -> ask-login-user.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if email and password are provided
    if (!empty($data->email)) {
        
$userData = $response->ReadUser($data->email);

        // User authentication successful, return authentication token
            http_response_code(200);
            echo json_encode(array("status" => true, "message" => "Profile retrieved successful.", "profileUserData" => $userData));
        
    } else {
        // Incomplete login data provided
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Profile data is incomplete."));
    }
}
?>
