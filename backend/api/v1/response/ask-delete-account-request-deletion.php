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

// Handle register endpoint -> ask-register-user.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receive registration data from the request
    // $data = json_decode(file_get_contents("php://input"));

    if (
        !empty($data->email)  
        // && !empty($data->confirmPassword)
        
        ) {
        
        // $response->email = $data->email;
        // $response->password = $data->password;


$randomToken = "";
        $existingToken = $response->checkIfUserExistsInDeleteTokenTable($data->email);

if ($existingToken !== false) {
    // User exists - use the existing token
    $randomToken = $existingToken;
} else {
     

     if ($response->checkIfUserExists($data->email)) {
//
			$codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for ($i = 0; $i < 8; $i++) {
                $randomToken .= $codeAlphabet[random_int(0, strlen($codeAlphabet) - 1)];
            }
            $response->InsertEmailTokenForDeleteUser($data->email, $randomToken);
            //
     } else {
        // Registration data is incomplete
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "User not found."));
        return;
     }
            
}




          //
$subject = "A.S.K Account Deletion Token (From A.S.K. Foundation)";
$message = "
<h4>Your recently requested for your account to be deleted.</h4>
Use the following token to delete your account: 
<br>
<div 
style='padding: 10px; background: #f4f4f4; border: 1px dashed #ccc; 
display: inline-block; font-family: monospace; font-size: 16px; font-weight: bold'>" . $randomToken . "</div>
<br><br>




<br><br>
Best regards,
<br>
<strong>A.S.K Foundation Team</strong>
<br><br>
";
sendMailToUser($data->email, $data->email, $subject, $message);
//           




                // User created successfully, return authentication token
                http_response_code(200);
                echo json_encode(array("status" => true, "message" => "An account deletion token has been sent to your email."

            ));



        
    } else {
        // Registration data is incomplete
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Data is incomplete."));
    }
}
?>
