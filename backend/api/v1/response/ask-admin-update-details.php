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

// Handle register endpoint -> ask-register-user.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receive registration data from the request
    // $data = json_decode(file_get_contents("php://input"));

    if (
        !empty($data->email) && 
        !empty($data->password) 
        // && !empty($data->confirmPassword)
        
        ) {
        
        // $response->email = $data->email;
        // $response->password = $data->password;



        {
            
            // Attempt to create user
            $authToken = $response->updateAdminPassword($data->email, $data->password);
            

            if ($authToken) {

                // User created successfully, return authentication token
                http_response_code(200);
                echo json_encode(array("status" => true, "message" => "Admin Updated Successfully.",

            ));
            } else {
                // User creation failed
                http_response_code(400);
                echo json_encode(array("status" => false, "message" => "Admin Update failed."));
            }
        }



        
    } else {
        // Registration data is incomplete
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Admin Update data is incomplete."));
    }
}
?>
