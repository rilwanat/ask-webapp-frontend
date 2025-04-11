<?php
// reset-password.php

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

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($data->email) && !empty($data->token) && !empty($data->newPassword)) {

        if ($response->VerifyPasswordResetEmailToken($data->email, $data->token)) {

            // Update password
            $success = $response->UpdatePasswordResetUserPassword($data->email, $data->newPassword);

            if ($success) {
                $response->DeletePasswordResetEmailToken($data->email); // Optional: clear token after reset
                echo json_encode(["status" => true, "message" => "Password reset successful."]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => false, "message" => "Failed to reset password."]);
            }
        } else {
            http_response_code(401);
            echo json_encode(["status" => false, "message" => "Invalid or expired token."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Missing required fields."]);
    }
}

?>