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

$data = json_decode(file_get_contents("php://input"));


if (
!empty($data->email) &&
!empty($data->helpToken) && 
!empty($data->amount) &&
!empty($data->remark)
) {




    if ($response->postBeneficiary($data->email, $data->helpToken, $data->amount, $data->remark )) {

        // set response code - 201 created
        http_response_code(200);

        // tell the user
        echo json_encode(array("status" => true, "message" => "ASK Post Beneficiary: Posted Successfully."));
    } else {

        // set response code - 503 service unavailable
        http_response_code(200);

        // tell the user
        echo json_encode(array("status" => false, "message" => "ASK Post Beneficiary: Post not found or already done."));
    }



} else {

    // set response code - 503 service unavailable
    http_response_code(200);

    // tell the user
    echo json_encode(array("status" => false, "message" => "Unable to Post. Data is incomplete."));
}






?>