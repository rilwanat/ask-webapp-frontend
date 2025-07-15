<?php
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Max-Age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



// include_once '../config/database.php';
// include_once '../objects/response.php';

// Option 1: Hardcoded absolute path (quick fix)
include_once '/home/askfimzp/public_html/backend/api/v1/config/database.php';
include_once '/home/askfimzp/public_html/backend/api/v1/objects/response.php';

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
$stmt = $response->ReadAllUsers();

// Initialize array to store user data
$help_requests_data["helpRequestsData"] = array();


ini_set('memory_limit', '-1');
// Loop through each user
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    // Extract user data from the row
    $product_item = array(
        "email_address" => $row['email_address']
    );

    array_push($help_requests_data["helpRequestsData"], $product_item);
  
    $response->updateVoterConsistencySilently($row['email_address']);

}



// Check if successfully fetched
if ($help_requests_data["helpRequestsData"]) {
    $response_data = array("status" => true, "data" => $help_requests_data["helpRequestsData"]);
} else {
    $response_data = array("status" => false);
}


// // Set HTTP response code and return JSON response
// http_response_code(200);
// echo json_encode($response_data);
?>
