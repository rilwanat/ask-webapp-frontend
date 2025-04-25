<?php 

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;
// require 'vendor/autoload.php';
// $mail = new PHPMailer(true);



// /////////////////////
// // Set CORS headers
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Content-Type: application/json; charset=UTF-8");

// // Check if the request is POST
// if ($_SERVER["REQUEST_METHOD"] !== "POST") {
//     echo json_encode(["success" => false, "message" => "Invalid request method"]);
//     exit;
// }

// // Validate and retrieve form data
// // $companyName = $_POST['company_name'] ?? '';
// // $address = $_POST['address'] ?? '';
// // $phoneNumber = $_POST['phone_number'] ?? '';
// // $email = $_POST['email'] ?? '';
// // $subject = $_POST['subject'] ?? '';


// // Validate email
// if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//     echo json_encode(["success" => false, "message" => "Invalid email address: " . $email]);
//     exit;
// }
// /////////////////////







function sendMailToUser($username, $email, $subject, $message) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: hello@askfoundations.org' . "\r\n";







    
    $emailBody = '
    <!DOCTYPE html>
<html>
<head>
<title>ASK Foundation</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        width: 90%;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        padding: 20px 0;
        background-color: #161c34;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
    }
    .header img {
        max-width: 200px;
        margin-bottom: 15px;
    }
    .header h2 {
        margin: 0;
        font-size: 24px;
    }
    .content {
        padding: 20px;
    }
    .content p {
        margin: 15px 0;
        font-size: 16px;
        color: #333333;
    }
    .details {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
    }
    .details th, .details td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    .details th {
        background-color: #161c34;
        color: #ffffff;
    }
    .details td {
        background-color: #f9f9f9;
        color: #333333;
    }
    .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #ffffff;
        background-color: #161c34;
        border-top: 1px solid #dddddd;
        margin-top: 20px;
    }
    .footer p {
        margin: 5px 0;
    }
    .footer a {
        color: #ffffff;
    }
    @media (max-width: 600px) {
        .container {
            width: 100%;
            margin: 10px;
            padding: 15px;
        }
        .header h2 {
            font-size: 20px;
        }
        .details th, .details td {
            font-size: 14px;
            padding: 8px;
        }
    }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        
        <h2>'. $subject .'</h2>
    </div>
    <div class="content">
        <p>Dear ' . $username . ',</p>
        <p>' . $message . '</p>
        
        <p>If you have any questions or need further assistance, feel free to contact us at <a href="mailto:info@askfoundations.org">info@askfoundations.org</a>.</p>
    </div>
    <div class="footer">

<br><br>
    <a href="https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m" target="_blank">WhatsApp</a>
    <a href="https://t.me/askfoundations" target="_blank">Telegram</a>
    <a href="https://www.facebook.com/askfoundationintl" target="_blank">Facebook</a>
    <a href="https://x.com/@askfoundations" target="_blank">Twitter</a>
    <a href="https://www.instagram.com/askfoundations" target="_blank">Instagram</a>
    <a href="https://www.tiktok.com/@askfoundations" target="_blank">TikTok</a>
    <a href="https://www.youtube.com/@Askfoundations" target="_blank">YouTube</a>
<br><br>


        <p>&copy; 2025 ASK Foundation. All rights reserved.</p>
    </div>
</div>
</body>
</html>

';











    $mailSent = mail($email, $subject, $emailBody, $headers); // Fixed variable usage
    if ($mailSent) {
        // echo json_encode(["success" => true, "message" => "Message Sent"]);
        return true;
    } else {
        // echo json_encode(["success" => false, "message" => "Failed"]);
        return false;
    }
}

// sendMailToUser($email, $subject, $emailBody);




function sendMailFromGuest($username, $email, $subject, $message) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: info@askfoundations.org' . "\r\n";







    
    $emailBody = '
    <!DOCTYPE html>
<html>
<head>
<title>ASK Foundation</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        width: 90%;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        padding: 20px 0;
        background-color: #161c34;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
    }
    .header img {
        max-width: 200px;
        margin-bottom: 15px;
    }
    .header h2 {
        margin: 0;
        font-size: 24px;
    }
    .content {
        padding: 20px;
    }
    .content p {
        margin: 15px 0;
        font-size: 16px;
        color: #333333;
    }
    .details {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
    }
    .details th, .details td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    .details th {
        background-color: #161c34;
        color: #ffffff;
    }
    .details td {
        background-color: #f9f9f9;
        color: #333333;
    }
    .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #ffffff;
        background-color: #161c34;
        border-top: 1px solid #dddddd;
        margin-top: 20px;
    }
    .footer p {
        margin: 5px 0;
    }
    .footer a {
        color: #ffffff;
    }
    @media (max-width: 600px) {
        .container {
            width: 100%;
            margin: 10px;
            padding: 15px;
        }
        .header h2 {
            font-size: 20px;
        }
        .details th, .details td {
            font-size: 14px;
            padding: 8px;
        }
    }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        
        <h2>'. $subject .'</h2>
    </div>
    <div class="content">
        
    
        <p>' . $message . '</p>
        
    
    </div>
    <div class="footer">

<br><br>
    <a href="https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m" target="_blank">WhatsApp</a>
    <a href="https://t.me/askfoundations" target="_blank">Telegram</a>
    <a href="https://www.facebook.com/askfoundationintl" target="_blank">Facebook</a>
    <a href="https://x.com/@askfoundations" target="_blank">Twitter</a>
    <a href="https://www.instagram.com/askfoundations" target="_blank">Instagram</a>
    <a href="https://www.tiktok.com/@askfoundations" target="_blank">TikTok</a>
    <a href="https://www.youtube.com/@Askfoundations" target="_blank">YouTube</a>
<br><br>


        <p>&copy; 2025 ASK Foundation. All rights reserved.</p>
    </div>
</div>
</body>
</html>

';











    $mailSent = mail($email, $subject, $emailBody, $headers); // Fixed variable usage
    if ($mailSent) {
        // echo json_encode(["success" => true, "message" => "Message Sent"]);
        return true;
    } else {
        // echo json_encode(["success" => false, "message" => "Failed"]);
        return false;
    }
}
?>
