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


require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();


include_once '../config/database.php';
include_once '../objects/response.php';

require_once __DIR__ . '/../send_mail.php';
require_once __DIR__ . '/verify-nuban.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (
        !empty($data->email) && 
        // !empty($data->fullname) && 
        !empty($data->phoneNumber) &&
        !empty($data->accountNumber) &&
        // !empty($data->accountName) &&
        !empty($data->bankName) &&
        !empty($data->bankCode) &&
        !empty($data->gender) &&
        !empty($data->residence)
    ) {
         // ✅ Step 1: Verify NUBAN before DB update
         list($accountNameFromNuban, $bankNameFromNuban) = verifyNuban($data->accountNumber, $data->bankCode, $data->bankName); // Custom function
         

         if (!$accountNameFromNuban || !$bankNameFromNuban) {
            $kycStatus = "REJECTED"; 
            $eligibility = "No"; 

            //
            $subject = "ASK: KYC " . $kycStatus;
            $message = "Oops! There seem to be a mismatch in your supplied data. Your KYC information has been '" . $kycStatus . "'. Please try again with accurate details.";
            sendMailToUser($accountNameFromNuban, $data->email, $subject, $message);
            //

             http_response_code(400);
             echo json_encode(["status" => false, "message" => "Invalid bank account details. KYC: ". $kycStatus]);
             exit;
         }



         //NUBAN validated but now check and know if similar account exists
         //flag as cheat and others and return
         //if //user is cheat
         //return cheat user
        //  if (!$accountNameFromNuban || !$bankNameFromNuban) 
        //function to get nubian name parameter and match it to fullname 
        // in users_table if a match toLower for the string was found as is flag the 
        // two accounts as cheat or just the second account
        //FLAG THIS NEW ACCOUUN ONLY KYC
        if($response->checkIfUserExistsWithKYCName($accountNameFromNuban, $data->email))
         {
            $kycStatus = "CHEAT"; 
            $eligibility = "No"; 


            // update cheat user
            //
            $subject = "ASK: KYC Warning Account Flagged";
            $message = "Your KYC information has been flagged.";
            sendMailToUser($accountNameFromNuban, $data->email, $subject, $message);
            //

             http_response_code(403);
             echo json_encode(["status" => false, "message" => "Duplicate account not allowed."]);
             exit;
         }

 

         $kycStatus = "APPROVED"; 
         $eligibility = "Yes"; 
         // ✅ Step 2: Proceed to update if valid
        $updateCustomerAccountDetails = $response->updateUserKyc(            
            $data->email, 
            // $data->fullname, 
            $data->phoneNumber, 
            $data->accountNumber, 
            $accountNameFromNuban, 
            $bankNameFromNuban, 
            $data->gender, 
            $data->residence,
            $kycStatus,
            $eligibility
        );

        $userData = $response->ReadUser($data->email);


        if ($updateCustomerAccountDetails) {


            //
            $subject = "ASK: KYC Update Confirmation";
            $message = "Your KYC information has been successfully updated: '" . $kycStatus . "'. You are now eligible.";
            sendMailToUser($accountNameFromNuban, $data->email, $subject, $message);
            //



            http_response_code(200);
            echo json_encode(array("status" => true, "message" => "Level 2 Verification (KYC) Successful!", "userData" => $userData));
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
