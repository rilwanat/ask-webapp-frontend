<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (!empty($data->email) && !empty($data->helpToken) && !empty($data->fingerPrint)) {

    // Validate user credentials and additional checks
    $nominateResult = $response->checkIfUserCanNominate($data->email, $data->helpToken, $data->fingerPrint);
    // file_put_contents('nom.txt', print_r($nominateResult, true));
    // file_put_contents('nom.txt', print_r($nominateResult, JSON_PRETTY_PRINT));
    if (!$nominateResult['status']) {
        http_response_code(403); // Forbidden
        echo json_encode(["status" => false, "message" => $nominateResult['message']]);
        exit();
    }

    $voterFullname = $nominateResult['userData']['fullname'];
    $voterConsistency = $nominateResult['userData']['voter_consistency'];
    $voterDeviceId = $data->fingerPrint;
    $votingWeight = $nominateResult['userData']['vote_weight'];

    $nomineeEmail = $nominateResult['nomineeData']['email_address'];
    $nomineeFullname = $nominateResult['nomineeData']['fullname_for_comparison'];

                // Add nomination
                if ($response->CreateNomination($data->email, $voterFullname, $voterConsistency, $voterDeviceId, $votingWeight, $nomineeEmail, $nomineeFullname, $data->helpToken)) {
                    http_response_code(200);
                    echo json_encode(["status" => true, "message" => "Nomination created successfully."]);
                } else {
                    http_response_code(500);
                    echo json_encode(["status" => false, "message" => "Unable to create Nomination."]);
                }
            
            } else {
                http_response_code(400);
                echo json_encode(["status" => false, "message" => "Incomplete data."]);
            }

} else {
    http_response_code(405); // Method not allowed
    echo json_encode(["status" => false, "message" => "Only POST method is allowed."]);
}
?>