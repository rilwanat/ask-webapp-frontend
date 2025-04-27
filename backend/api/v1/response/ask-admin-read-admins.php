<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();


include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();

$response = new Response($db);

// Fetch all users
$stmt = $response->ReadAllAdmins();

// Initialize array to store user data
$admins_data["admins_data"] = array();


ini_set('memory_limit', '-1');
// Loop through each user
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    // Extract user data from the row
    $product_item = array(

        "id" => $row['id'],
        "fullname" => $row['fullname'],
        "email_address" => $row['email_address'],
        "phone_number" => $row['phone_number'],
        "kyc_status" => $row['kyc_status'],
        "account_number" => $row['account_number'],
        "account_name" => $row['account_name'],
        "bank_name" => $row['bank_name'],
        "gender" => $row['gender'],
        "state_of_residence" => $row['state_of_residence'],
        "profile_picture" => $row['profile_picture'],
        "email_verified" => $row['email_verified'],
        "registration_date" => $row['registration_date'],
        "user_type" => $row['user_type'],
        "eligibility" => $row['eligibility'],
        "is_cheat" => $row['is_cheat'],
        "opened_welcome_msg" => $row['opened_welcome_msg']
        // "vote_weight" => $row['vote_weight']
    );

    array_push($admins_data["admins_data"], $product_item);

}


// Check if successfully fetched
if ($admins_data["admins_data"]) {
    $response_data = array("status" => true, "data" => $admins_data["admins_data"]);
} else {
    $response_data = array("status" => false);
}


// Set HTTP response code and return JSON response
http_response_code(200);
echo json_encode($response_data);
?>
