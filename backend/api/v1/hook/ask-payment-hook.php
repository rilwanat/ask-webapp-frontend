<?php
// Enable full error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start output buffering to capture all output
ob_start();

// Paystack Webhook Handler with Complete Debugging
define('PAYSTACK_SECRET_KEY', 'sk_test_0e36f2a36881d8953d673c3e41b465569b105f0b');
define('DEBUG_LOG', 'paystack_debug.log');

// Function to log debug information
function debugLog($message) {
    $logEntry = date('Y-m-d H:i:s') . " - " . $message . "\n";
    file_put_contents(DEBUG_LOG, $logEntry, FILE_APPEND);
    // Also output to buffer for immediate viewing if needed
    echo $logEntry;
}

// Initialize debug log
debugLog("=== NEW WEBHOOK REQUEST STARTED ===");
debugLog("Server IP: " . ($_SERVER['SERVER_ADDR'] ?? 'unknown'));
debugLog("Remote IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
debugLog("Request Method: " . $_SERVER['REQUEST_METHOD']);
debugLog("Headers received: " . json_encode(getallheaders()));

// Handle GET requests (likely health checks)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    debugLog("Received GET request - likely a health check. Responding with 200 OK.");
    http_response_code(200);
    echo "OK";
    ob_end_flush();
    exit();
}

// Verify request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $error = "Invalid request method - expected POST, got " . $_SERVER['REQUEST_METHOD'];
    debugLog($error);
    http_response_code(405); // Method Not Allowed
    exit($error);
}

// ... rest of your POST request handling code ...

// End of processing
debugLog("=== WEBHOOK PROCESSING COMPLETED ===");

// Flush output buffer if needed
ob_end_flush();
?>