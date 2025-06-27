<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//error_log("🚀 Broadcast script started.");

include_once '../config/database.php';
include_once '../objects/response.php';
require_once __DIR__ . '/../send_mail.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    //error_log("✅ Preflight OPTIONS request handled.");
    exit();
}

require_once 'ask-auth-validate-token.php';
//error_log("🔐 Validating token...");
validateToken();
//error_log("✅ Token validated.");

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

// Handle file upload
$fileUploaded = isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK;
$attachmentPath = null;
if ($fileUploaded) {
    //error_log("📁 File uploaded: " . $_FILES['file']['name']);

    $uploadDir = __DIR__ . '/../uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
        //error_log("📂 Upload directory created at: $uploadDir");
    }

    $fileName = basename($_FILES['file']['name']);
    $targetFilePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
        $attachmentPath = $targetFilePath;
        //error_log("✅ File moved to: $attachmentPath");
    } else {
        //error_log("❌ Failed to move uploaded file.");
    }
} else {
    //error_log("📎 No file uploaded.");
}

$message = isset($_POST['message']) ? trim($_POST['message']) : '';
if ($message === '') {
    http_response_code(400);
    //error_log("❌ Empty message body.");
    echo json_encode(["status" => false, "message" => "Message body is required."]);
    exit();
}

$messageBody = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$subject = "A.S.K Foundation Broadcast";

//error_log("📨 Preparing to fetch subscribers...");
$stmt = $response->ReadAllSubscriptions();
$count = 0;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if (!empty($row['email_address'])) {
        $email = $row['email_address'];
        $finalMessage = $messageBody . "<br><br><strong>A.S.K Foundation Team</strong>";

        $mailResult = sendMailToSubscribe(
            'A.S.K Community',
            $email,
            $subject,
            $finalMessage,
            $attachmentPath
        );

        //error_log("📬 Mail sent to: $email | Result: " . var_export($mailResult, true));
        $count++;
    }
}

http_response_code(200);
$responseMsg = "A.S.K Broadcast: Sent to $count subscribers.";
//error_log("✅ $responseMsg");
echo json_encode(["status" => true, "message" => $responseMsg]);
?>
