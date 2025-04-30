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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message'] ?? '');
    $contactName = htmlspecialchars($_POST['contact_name'] ?? '');
    $phoneNumber = htmlspecialchars($_POST['phone_number'] ?? '');
    $address = htmlspecialchars($_POST['address'] ?? '');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Invalid email address"]);
        exit;
    }

    if (empty($message)) {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Message cannot be empty"]);
        exit;
    }

    $subject = "A.S.K Mail from " . $contactName;
    $htmlMessage = "
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> {$contactName}</p>
        <p><strong>Phone:</strong> {$phoneNumber}</p>
        <p><strong>Address:</strong> {$address}</p>
        <h3>Message:</h3>
        <p>{$message}</p>
    ";

    // Try sending to both addresses
    $sentToAdmin = sendMailFromGuest($contactName, $email, $subject, $htmlMessage);

    if ($sentToAdmin || $sentToBackup) {
        http_response_code(200);
        echo json_encode([
            "status" => true,
            "message" => "Mail sent successfully"
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => false,
            "message" => "Failed to send mail. Please try again later."
        ]);
        
        // Log the error for debugging
        error_log("Mail sending failed for email: $email");
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => false, "message" => "Method not allowed"]);
}