<?php

// Set CORS headers for preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
    exit;
}

// Set CORS headers for actual POST request
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");



include_once '../config/database.php';
include_once '../objects/response.php';

require_once __DIR__ . '/../send_mail.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (
        !empty($data->email) && 
        // !empty($data->fullname) && 
        // !empty($data->phoneNumber) &&
        // !empty($data->accountNumber) &&
        // !empty($data->accountName) &&
        // !empty($data->bankName) &&
        // !empty($data->gender) &&
        // !empty($data->residence) &&
        !empty($data->kycStatus)
    ) {
        $updateCustomerKycSpecific = $response->updateUserKycSpecific(            
            $data->email, 
            // $data->fullname, 
            // $data->phoneNumber, 
            // $data->accountNumber, 
            // $data->accountName, 
            // $data->bankName, 
            // $data->gender, 
            // $data->residence,
            $data->kycStatus 
        );

        $userData = $response->ReadUser($data->email);


        if ($updateCustomerKycSpecific) {


            //
            $subject = "KYC Update Confirmation";
            $message = "Your KYC information has been successfully updated: ". $data->kycStatus .". We are reviewing it and will get back to you very soon. Thank you for your patience.";
            sendMailToUser($data->fullname, $data->email, $subject, $message);
            //



            http_response_code(200);
            echo json_encode(array("status" => true, "message" => "Account updated successfully! KYC Status: " . $data->kycStatus, "userData" => $userData
        ));
        } else {
            http_response_code(400);
            echo json_encode(array("status" => false, "message" => "Update failed."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Incomplete data."));
    }
}
?>
