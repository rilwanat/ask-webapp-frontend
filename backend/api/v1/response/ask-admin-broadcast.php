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

// Check for file upload
$fileUploaded = isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK;
$attachmentPath = null;
if ($fileUploaded) {
    $uploadDir = __DIR__ . '/../uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $fileName = basename($_FILES['file']['name']);
    $targetFilePath = $uploadDir . $fileName;
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
        $attachmentPath = $targetFilePath;
    }
}

$message = isset($_POST['message']) ? trim($_POST['message']) : '';
if ($message === '') {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Message body is required."]);
    exit();
}

$messageBody = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$subject = "A.S.K Foundation Broadcast";

$stmt = $response->ReadAllSubscriptions();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if (!empty($row['email_address'])) {
        $finalMessage = $messageBody . "<br><br><strong>A.S.K Foundation Team</strong>";
        sendMailToSubscribe(
            'A.S.K Community',
            $row['email_address'], //"rilwan.at@gmail.com", //
            $subject,
            $finalMessage,
            $attachmentPath
        );
    }
}

http_response_code(200);
echo json_encode(["status" => true, "message" => "A.S.K Broadcast: Sent Successfully."]);

?>