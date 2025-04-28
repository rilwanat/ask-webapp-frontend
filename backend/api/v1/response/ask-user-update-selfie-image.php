<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



include_once '../config/database.php';
include_once '../objects/response.php';

// Initialize the database and product object
$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

// Directory to store uploaded images
$uploadDir = "../../../../images/user-selfies-images/";


// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}
require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();





if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $fileName = basename($_FILES['image']['name']);
        $targetFilePath = $uploadDir . $fileName;

        // Check if the upload directory exists, create if not
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        
        // // Check if the file already exists, delete it
        // if (file_exists($targetFilePath)) {
        //     unlink($targetFilePath);
        // }


        // Move the uploaded file to the specified directory
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {

            $email = $_POST['email'] ?? null;
            if ($email) {

                // Add selfie path
                if ($response->updateSelfiImagePath($email, $targetFilePath)) {
                    http_response_code(200);
                    echo json_encode(["status" => true, "message" => "Image and path updated successfully."]);
                } else {
                    http_response_code(500);
                    echo json_encode(["status" => false, "message" => "Unable to update Image."]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["status" => false, "message" => "Missing data."]);
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
