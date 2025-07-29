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

// Fetch all users
$stmt = $response->ReadAllArchiveNominationsForAdmin();

// Initialize array to store user data
$nominations_data["nominations_data"] = array();


ini_set('memory_limit', '-1');
// Loop through each user
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    // Extract user data from the row
    $product_item = array(
            
    // Voting-specific fields
    "voter" => $row['voter'],
    "voter_email" => $row['voter_email'],
    "nominee" => $row['nominee'],
    "device" => $row['device'],
    "voted_time" => $row['voted_time'],
    "registration_date" => $row['registered'],
    "location" => $row['location'],
    "vote_weight" => $row['dnq'],

    // User fields
    "user" => array(
        "id" => $row['user_id'],
        "fullname" => $row['user_fullname'],
        "email_address" => $row['user_email'],
        "phone_number" => $row['user_phone'],
        "kyc_status" => $row['user_kyc_status'],
        "account_number" => $row['user_account_number'],
        "account_name" => $row['user_account_name'],
        "bank_name" => $row['user_bank_name'],
        "gender" => $row['user_gender'],
        "state_of_residence" => $row['user_state'],
        "profile_picture" => $row['user_profile_picture'],
        "email_verified" => $row['user_email_verified'],
        "registration_date" => $row['user_registration_date'],
        "user_type" => $row['user_type'],
        "eligibility" => $row['user_eligibility'],
        "is_cheat" => $row['user_is_cheat'],
        "opened_welcome_msg" => $row['user_opened_welcome_msg'],
        "vote_weight" => $row['user_vote_weight'],
        "voter_consistency" => $row['user_voter_consistency']

    )

    );

    array_push($nominations_data["nominations_data"], $product_item);

}


// Check if successfully fetched
if ($nominations_data["nominations_data"]) {
    $response_data = array("status" => true, "data" => $nominations_data["nominations_data"]);
} else {
    $response_data = array("status" => false);
}


// Set HTTP response code and return JSON response
http_response_code(200);
echo json_encode($response_data);
?>
