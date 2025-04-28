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

// $data = json_decode(file_get_contents("php://input"));


$uploadDir = "../../../../images/ask-sponsors/";


// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}
require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();




if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $sponsorName = $_POST['sponsorName'] ?? null;
    $sponsorType = $_POST['sponsorType'] ?? null;


    //file type check to ensure only images are allowed:
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
if (!in_array($_FILES['image']['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Only JPG, PNG, and GIF files are allowed."]);
    exit();
}

//limiting file size (for server protection):
if ($_FILES['image']['size'] > 2 * 1024 * 1024) { // 2MB max
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Image exceeds maximum size limit of 2MB."]);
    exit();
}


    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {

        //Sanitize unique filename
        $filename = preg_replace("/[^a-zA-Z0-9\._-]/", "", basename($_FILES['image']['name']));
        $uniqueTargetFilePath = $uploadDir . uniqid() . "_" . $filename;

        // Check if the upload directory exists, create if not
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Move the uploaded file to the specified directory
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uniqueTargetFilePath)) {
            
            
            
            

            // Ensure ASK Sponsor data is complete
            if ($sponsorName && $sponsorType && $uniqueTargetFilePath) {

                // Add ASK Sponsor with image path
                if ($response->CreateSponsor($sponsorName, $sponsorType, $uniqueTargetFilePath)) {
                    http_response_code(200);
                    echo json_encode(["status" => true, "message" => "ASK Sponsor created successfully."]);
                } else {
                    http_response_code(500);
                    echo json_encode(["status" => false, "message" => "Unable to create ASK Sponsor."]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["status" => false, "message" => "Incomplete data."]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["status" => false, "message" => "Image upload failed."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Invalid image file."]);
    }
} else {
    http_response_code(405); // Method not allowed
    echo json_encode(["status" => false, "message" => "Only POST method is allowed."]);
}
?>