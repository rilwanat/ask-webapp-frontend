<?php
// forgot-password.php

// CORS headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit;
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once '../config/database.php';
include_once '../objects/response.php';
require_once __DIR__ . '/../send_mail.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($data->email)) {
    if ($response->checkIfUserExists($data->email)) {

        // Generate reset code/token
        $resetToken = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for ($i = 0; $i < 32; $i++) {
            $resetToken .= $codeAlphabet[random_int(0, strlen($codeAlphabet) - 1)];
        }

        // Store token in database (overwrite if exists)
        $response->InsertPasswordResetTokenForUser($data->email, $resetToken);

        // $data->baseName
        $passwordResetUrl = $data->baseName . 'reset-password/' . $resetToken;

        // Send email
        $subject = "Reset Password - A.S.K Foundation";
        $message = "
            <p>You requested a password reset.</p>
            <p>Use the verification code below to reset your password:</p>
            <a href=". $passwordResetUrl .">" . $passwordResetUrl . "</a>
            <br><br>If you didn't request this, you can ignore this email.
        ";

        sendMailToUser($data->email, $data->email, $subject, $message);

        echo json_encode(["status" => true, "message" => "Reset code sent to your email."]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => false, "message" => "No account found with that email."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Invalid request."]);
}

?>