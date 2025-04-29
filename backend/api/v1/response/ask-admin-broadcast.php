<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/response.php';
require_once __DIR__ . '/../send_mail.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

require_once 'ask-auth-validate-token.php';
validateToken();

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

// Read incoming JSON payload
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['message']) || trim($input['message']) === '') {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Message body is required."]);
    exit();
}

$messageBody = nl2br(htmlspecialchars($input['message'], ENT_QUOTES, 'UTF-8')); // Sanitized and formatted
$subject = "ASK Foundation Message";

// Read all subscriptions
$stmt = $response->ReadAllSubscriptions();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if (!empty($row['email_address'])) {
        $message = $messageBody . "<br><br><strong>ASK Foundations Team</strong>";

        sendMailToSubscribe(
            'ASK Community',
            $row['email_address'],
            $subject,
            $message
        );
    }
}

http_response_code(200);
echo json_encode(["status" => true, "message" => "ASK Broadcast: Sent Successfully."]);
?>
