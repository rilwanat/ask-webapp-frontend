<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// ==================== INITIAL SETUP ====================
error_log("🚀 Broadcast script started.");
set_time_limit(600); // 10 minute timeout
ini_set('memory_limit', '256M'); // Increase memory limit

include_once '../config/database.php';
include_once '../objects/response.php';
require_once __DIR__ . '/../send_mail.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    error_log("✅ Preflight OPTIONS request handled.");
    exit();
}

// ==================== AUTHENTICATION ====================
require_once 'ask-auth-validate-token.php';
error_log("🔐 Validating token...");
validateToken();
error_log("✅ Token validated.");

// ==================== FILE UPLOAD HANDLING ====================
$fileUploaded = isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK;
$attachmentPath = null;

if ($fileUploaded) {
    error_log("📁 File uploaded: " . $_FILES['file']['name']);
    $uploadDir = __DIR__ . '/../uploads/';
    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true); // More secure permissions
        error_log("📂 Upload directory created at: $uploadDir");
    }

    $fileName = uniqid() . '_' . basename($_FILES['file']['name']); // Prevent name collisions
    $targetFilePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
        $attachmentPath = $targetFilePath;
        error_log("✅ File moved to: $attachmentPath");
    } else {
        error_log("❌ Failed to move uploaded file.");
        http_response_code(500);
        echo json_encode(["status" => false, "message" => "File upload failed"]);
        exit();
    }
} else {
    error_log("📎 No file uploaded.");
}

// ==================== MESSAGE VALIDATION ====================
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
if ($message === '') {
    http_response_code(400);
    error_log("❌ Empty message body.");
    echo json_encode(["status" => false, "message" => "Message body is required."]);
    exit();
}

$messageBody = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$subject = "A.S.K Foundation Broadcast";

// ==================== BATCH EMAIL PROCESSING ====================
$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$batchSize = 100; // Emails per batch
$delayBetweenEmails = 500000; // 0.5 seconds in microseconds
$totalSent = 0;
$failedEmails = [];

error_log("📨 Starting email broadcast in batches of $batchSize");

// Process in batches
$offset = 0;
do {
    $batchCount = 0;
    $stmt = $response->getSubscribersBatch($batchSize, $offset);
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if (!empty($row['email_address'])) {
            $email = $row['email_address'];
            
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                error_log("⚠️ Invalid email skipped: $email");
                $failedEmails[] = $email;
                continue;
            }

            $finalMessage = $messageBody . "<br><br><strong>A.S.K Foundation Team</strong>";
            
            $mailResult = sendMailToSubscribe(
                'A.S.K Community',
                $email,
                $subject,
                $finalMessage,
                $attachmentPath
            );

            if ($mailResult) {
                $batchCount++;
                $totalSent++;
                error_log("📬 Sent to: $email ($totalSent total)");
            } else {
                error_log("❌ Failed to send to: $email");
                $failedEmails[] = $email;
            }
            
            usleep($delayBetweenEmails); // Throttle emails
        }
    }
    
    $offset += $batchSize;
    error_log("✅ Batch complete. Total sent: $totalSent");
    
    // Free memory between batches
    unset($stmt);
    gc_collect_cycles();
    
} while ($batchCount > 0);

// ==================== CLEANUP ====================
if ($attachmentPath && file_exists($attachmentPath)) {
    if (unlink($attachmentPath)) {
        error_log("🧹 Cleaned up attachment");
    } else {
        error_log("⚠️ Could not delete attachment");
    }
}

// ==================== FINAL RESPONSE ====================
$responseData = [
    "status" => true,
    "message" => "A.S.K Broadcast: Sent to $totalSent subscribers.",
    "failed_count" => count($failedEmails),
    "failed_emails" => $failedEmails
];

if (!empty($failedEmails)) {
    file_put_contents(__DIR__ . '/../failed_emails.log', implode("\n", $failedEmails), FILE_APPEND);
    error_log("⚠️ Failed emails logged to file");
}

http_response_code(200);
echo json_encode($responseData);
error_log("✅ Broadcast completed successfully. Total: $totalSent, Failed: " . count($failedEmails));
?>