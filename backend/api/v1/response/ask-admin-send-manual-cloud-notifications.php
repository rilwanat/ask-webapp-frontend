<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



include_once '../config/database.php';
include_once '../objects/response.php';


$database = new Database();
$db = $database->getConnection();

$response = new Response($db);


// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}

require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();


$message = isset($_POST['message']) ? trim($_POST['message']) : '';
if ($message === '') {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Message body is required."]);
    exit();
}

$messageBody = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

// Fetch all users
$stmt = $response->ReadAllUsers();

// Initialize array to store user data
$users_data["usersData"] = array();


ini_set('memory_limit', '-1');
// Loop through each user
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    // Extract user data from the row
    $product_item = array(
        "fullname" => $row['fullname'],
        "email_address" => $row['email_address'],
    );

    array_push($users_data["usersData"], $product_item);

  
    $fuser = explode(" ", $row['fullname']);
                    //
                    $messageData = [
    'message' => 'Hello ' . $fuser[0] . ', ' . $messageBody,
    // 'senderId' => 'A.S.K Admin',
    // 'senderImage' => 'https://example.com/php.jpg',
    // 'senderName' => 'A.S.K Admin',
    // 'receiverId' => $nomineeEmail,
    // 'receiverName' => 'A.S.K User'
];
$result = $response->sendFirestoreMessage('adm-'. $row['email_address'], $messageData);

}



// Check if successfully fetched
if ($users_data["usersData"]) {
    $response_data = array("status" => true, "message" => "A.S.K Notification Broadcast: Sent Successfully.");
} else {
    $response_data = array("status" => false);
}


// Set HTTP response code and return JSON response
http_response_code(200);
echo json_encode($response_data);
?>
