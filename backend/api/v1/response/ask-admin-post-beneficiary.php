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

$data = json_decode(file_get_contents("php://input"));


// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}

require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();



if (
!empty($data->email) &&
!empty($data->helpToken) && 
!empty($data->amount) &&
!empty($data->remark)
) {




    if ($response->postBeneficiary($data->email, $data->helpToken, $data->amount, $data->remark )) {

        //
                    $messageData = [
    'message' => 'Congratulations! you have been selected as beneficiary!',
    // 'senderId' => 'A.S.K Admin',
    // 'senderImage' => 'https://example.com/php.jpg',
    // 'senderName' => 'A.S.K Admin',
    // 'receiverId' => $data->email,
    // 'receiverName' => 'A.S.K User'
];
$result = $response->sendFirestoreMessage('adm-'. $data->email, $messageData);
//


        // set response code - 201 created
        http_response_code(200);

        // tell the user
        echo json_encode(array("status" => true, "message" => "A.S.K Post Beneficiary: Posted Successfully."));
    } else {

        // set response code - 503 service unavailable
        http_response_code(200);

        // tell the user
        echo json_encode(array("status" => false, "message" => "A.S.K Post Beneficiary: Post not found or already done."));
    }



} else {

    // set response code - 503 service unavailable
    http_response_code(200);

    // tell the user
    echo json_encode(array("status" => false, "message" => "Unable to Post. Data is incomplete."));
}






?>