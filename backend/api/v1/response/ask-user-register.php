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
        !empty($data->email) && 
        !empty($data->password) 
        // && !empty($data->confirmPassword)
        
        ) {
        
        // $response->email = $data->email;
        // $response->password = $data->password;



        if($response->checkIfUserExists($data->email)) {
            // User creation failed
            http_response_code(400);
            echo json_encode(array("status" => false, "message" => "Registration failed. Email already exists."));
        } else {


            // Attempt to create user
            $authToken = $response->createUser($data->email, $data->password);
            

            if ($authToken) {


            //
            $randomToken = "";
			$codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for ($i = 0; $i < 8; $i++) {
                $randomToken .= $codeAlphabet[random_int(0, strlen($codeAlphabet) - 1)];
            }
            $response->InsertEmailTokenForUser($data->email, $randomToken);
            //
                
                
//
$subject = "Welcome Email (From A.S.K. Foundation)";
$message = "
<h4>Welcome to Ashabi Shobande Kokumo Foundation! (Aka A.S.K Foundation)</h4>
We're thrilled to have you on board!. Your code for email verification is: 
<br>
<div 
style='padding: 10px; background: #f4f4f4; border: 1px dashed #ccc; 
display: inline-block; font-family: monospace; font-size: 16px; font-weight: bold'>" . $randomToken . "</div>
<br><br>

As a valued subscriber, you're now part of a community driven initiatives dedicated to 
promoting human dignity.<br><br> To stay updated on our latest news, initiatives, and 
opportunities, kindly subscribe to our social media handles:<br>
<ul>
    <li><a href='https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m' target='_blank'>WhatsApp</a></li>
    <li><a href='https://t.me/askfoundations' target='_blank'>Telegram</a></li>
    <li><a href='https://www.facebook.com/askfoundationpage' target='_blank'>Facebook</a></li>
    <li><a href='https://x.com/@askfoundations' target='_blank'>Twitter</a></li>
    <li><a href='https://www.instagram.com/askfoundations' target='_blank'>Instagram</a></li>
    <li><a href='https://www.tiktok.com/@askfoundations' target='_blank'>TikTok</a></li>
    <li><a href='https://www.youtube.com/@Askfoundations' target='_blank'>YouTube</a></li>
</ul>

<br>To make the most of your membership, don't hesitate to:
<ul>
    <li>Use the 'Ask' button to request assistance or support (Note: To qualify, you'll need to verify your identity through our verification process)</li>
    <li>Share your request with others to gather support</li>
    <li>Nominate fellow members who may be in need</li>
    <li>Share others' requests to help them get the necessary nominations</li>
</ul>
<br><br>

Remember, our community-based selection protocol (CBSPro) relies on your input! By nominating and sharing 
requests, you'll help us identify those who need support the most.
<br><br>
Additionally, your financial support will be instrumental in helping us achieve our goals. Please consider 
making a donation using the 'Donate' button to support our initiatives.
<br><br>
Thank you for joining us! Your contributions, nominations, and sharing will go a long way in creating positive change!
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
                echo json_encode(array("status" => true, "message" => "Registration successful.", "token" => $authToken,

            ));
            } else {
                // User creation failed
                http_response_code(400);
                echo json_encode(array("status" => false, "message" => "Registration failed."));
            }
        }



        
    } else {
        // Registration data is incomplete
        http_response_code(400);
        echo json_encode(array("status" => false, "message" => "Registration data is incomplete."));
    }
}
?>
