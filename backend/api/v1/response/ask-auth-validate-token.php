<?php
// pw-auth-validate-token.php
require __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function validateToken() {
    $secretKey = "your_secret_key_here";

    // Get the token from the Authorization header
    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (strpos($authorizationHeader, 'Bearer ') === 0) {
        $token = substr($authorizationHeader, 7); // Remove 'Bearer ' from the token
        try {
            // Decode the token
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

            // Check if the token is expired
            $currentTime = time();
            if ($decoded->exp < $currentTime) {
                // Token has expired
                http_response_code(401);
                echo json_encode(array("status" => false, "message" => "Token expired"));
                exit;
            } else {
                // Token is valid
                return true;
            }
        } catch (Exception $e) {
            // Token is invalid or malformed
            http_response_code(401);
            echo json_encode(array("status" => false, "message" => "Invalid token: " . $e->getMessage()));
            exit;
        }
    } else {
        // No token provided
        http_response_code(401);
        echo json_encode(array("status" => false, "message" => "No token provided"));
        exit;
    }
}
?>
