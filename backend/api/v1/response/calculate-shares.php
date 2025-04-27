<?php

// Set CORS headers for preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
    exit;
}


require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();


// Set CORS headers for actual POST request
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/response.php';

// require_once __DIR__ . '/../send_mail.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);


// Read JSON input
$data = json_decode(file_get_contents("php://input"));

// Validate inputs
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        isset($data->shareType) &&
        isset($data->numberOfBeneficiaries) &&
        isset($data->totalAmount) &&
        isset($data->remark)
    ) {
        $type = strtolower($data->shareType);
        $count = (int) $data->numberOfBeneficiaries;
        $amount = (float) $data->totalAmount;
        $ratios = isset($data->shareRatio) ? $data->shareRatio : [];

        $shares = [];

        if ($count <= 0 || $amount <= 0) {
            echo json_encode(["status" => false, "ratio" => []]);
            exit;
        }

        if ($type === "direct") {
            $shareAmount = round($amount / $count, 2);
            for ($i = 0; $i < $count; $i++) {
                $shares[] = $shareAmount;
            }
        } elseif ($type === "ratio") {
            if (count($ratios) !== $count) {
                echo json_encode(["status" => false, "ratio" => []]);
                exit;
            }

            $sum = array_sum($ratios);
            foreach ($ratios as $val) {
                $shares[] = round(($val / $sum) * $amount, 2);
            }
        } else {
            echo json_encode(["status" => false, "ratio" => []]);
            exit;
        }


        //
        $stmt = $response->GenerateBeneficiariesNotCheat($count);

        $beneficiaries_requests_data["beneficiariesRequestsData"] = array();
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
        "remark" => $data->remark,//$row['remark'],
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
    array_push($beneficiaries_requests_data["beneficiariesRequestsData"], $product_item);

}


if ($beneficiaries_requests_data["beneficiariesRequestsData"]) {
    $response_data = array("status" => true, "ratio" => $shares, "data" => $beneficiaries_requests_data["beneficiariesRequestsData"]);
    echo json_encode($response_data);
} else {
    $response_data = array("status" => false);
    echo json_encode($response_data);
}

        
    } else {
        echo json_encode(["status" => false, "ratio" => []]);
    }
}
?>
