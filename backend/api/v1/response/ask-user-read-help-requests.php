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
$stmt = $response->ReadAllHelpRequestsNotCheat();

// Initialize array to store user data
$help_requests_data["helpRequestsData"] = array();


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
        "help_token" => $row['help_token'],

        // User fields
        "user" => array(
            "id" => $row['user_id'],
            "fullname" => $row['user_fullname'],
            "email_address" => $row['user_email'],
            "phone" => $row['user_phone'],
            "kyc_status" => $row['user_kyc_status'],
            "account_number" => $row['user_account_number'],
            "account_name" => $row['user_account_name'],
            "bank_name" => $row['user_bank_name'],
            "gender" => $row['user_gender'],
            "state" => $row['user_state'],
            "profile_picture" => $row['user_profile_picture'],
            "email_verified" => $row['user_email_verified'],
            "registration_date" => $row['user_registration_date'],
            "user_type" => $row['user_type'],
            "eligibility" => $row['user_eligibility'],
            "is_cheat" => $row['user_is_cheat'],
            "opened_welcome_msg" => $row['user_opened_welcome_msg'],
            "vote_weight" => $row['user_vote_weight']
        )

    );

    array_push($help_requests_data["helpRequestsData"], $product_item);

}


// Check if successfully fetched
if ($help_requests_data["helpRequestsData"]) {
    $response_data = array("status" => true, "data" => $help_requests_data["helpRequestsData"]);
} else {
    $response_data = array("status" => false);
}


// Set HTTP response code and return JSON response
http_response_code(200);
echo json_encode($response_data);
?>
