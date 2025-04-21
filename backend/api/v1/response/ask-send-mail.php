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

require_once __DIR__ . '/../send_mail.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

// $data = json_decode(file_get_contents("php://input"));

// Handle register endpoint -> ask-register-user.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receive registration data from the request
    // $data = json_decode(file_get_contents("php://input"));

    // formData.append('contact_name', contactName);
    // formData.append('phone_number', phoneNumber);
    // formData.append('email', email);    
    // formData.append('address', address);
    // formData.append('message', message);

    $email = $_POST['email'] ?? null;
    $message = $_POST['message'] ?? null;
    $contactName = $_POST['contact_name'] ?? null;
    $phoneNumber = $_POST['phone_number'] ?? null;
    $address = $_POST['address'] ?? null;

    if (
        !empty($email) && 
        !empty($message)
        // !empty($data->contact_name) &&
        // !empty($data->phone_number) &&
        // !empty($data->address)
        
        ) {
        
            //
$subject = "ASK Mail";
$message = "<h4>Name: " . $contactName . ' PhoneNumber: ' . $phoneNumber . ' Message: ' . $message . ' Address: ' . $address . "</h4>";
$sentMail = sendMailFromGuest($email, "info@askfoundations.org", $subject, $message);

if ($sentMail) {
    http_response_code(200);
                    echo json_encode([
                        "status" => true,
                        "message" => "Mail sent."
                    ]);
} else {
    http_response_code(400);
                    echo json_encode([
                        "status" => false,
                        "message" => "Mail not sent, failed."
                    ]);
}
//


        
    } else {
        // Registration data is incomplete
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Mail data is incomplete."));
    }
}
?>
