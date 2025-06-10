<?php
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Max-Age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



// include_once '../config/database.php';
// include_once '../objects/response.php';

// Option 1: Hardcoded absolute path (quick fix)
include_once '/home/askfimzp/playground.askfoundations.org/backend/api/v1/config/database.php';
include_once '/home/askfimzp/playground.askfoundations.org/backend/api/v1/objects/response.php';

$database = new Database();
$db = $database->getConnection();

$response = new Response($db);


// // Handle preflight OPTIONS request
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     http_response_code(204); // No Content
//     exit();
// }

// require_once 'ask-auth-validate-token.php';
// // Validate token
// validateToken();




// Fetch all users
$stmt = $response->ReadAllTrailingTopNominations();

// Initialize array to store user data
$nominations_data["nominations_data"] = array();


ini_set('memory_limit', '-1');
// Loop through each user
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    // Extract user data from the row
    $product_item = array(

        "id" => $row['id'],
        "date" => $row['date'],
        "nomination_count" => $row['nomination_count'],
        "description" => $row['description'],
        "remark" => $row['remark'],
        "email_address" => $row['email_address'],
        "request_image" => $row['request_image'],
        "help_token" => $row['help_token']
    );

    array_push($nominations_data["nominations_data"], $product_item);

}

$nom_email = $nominations_data["nominations_data"][0]['email_address'];//"rilwan.at@gmail.com";//

// Check if successfully fetched
if ($nominations_data["nominations_data"]) {

    //
                    $messageData = [
    'message' => 'Hello, you are leading on Nomination, keep sharing to maintain your lead!',
    // 'senderId' => 'A.S.K Admin',
    // 'senderImage' => 'https://example.com/php.jpg',
    // 'senderName' => 'A.S.K Admin',
    // 'receiverId' => $nom_email,
    // 'receiverName' => 'A.S.K User'
];
$result = $response->sendFirestoreMessage('adm-'. $nom_email, $messageData);
//

    $response_data = array("status" => true, "data" => $nominations_data["nominations_data"]);
} else {
    $response_data = array("status" => false);
}


// Set HTTP response code and return JSON response
http_response_code(200);
echo json_encode($response_data);
?>
