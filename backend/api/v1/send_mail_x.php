<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Ensure PHPMailer is installed via Composer

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

// Validate and retrieve form data
// $companyName = $_POST['company_name'] ?? '';
// $address = $_POST['address'] ?? '';
// $phoneNumber = $_POST['phone_number'] ?? '';
$email = $_POST['email'] ?? '';



// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email address: " . $email]);
    exit;
}

// Initialize PHPMailer
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'mail.askfoundations.org'; // SMTP Server
    $mail->SMTPAuth = true;
    $mail->Username = 'hello@askfoundations.org'; // SMTP Username
    $mail->Password = '6DGjD~[I.M1s4b'; // Use your email password
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL Encryption
    // $mail->Port = 465; // SMTP Port
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;


    $mail->setFrom('hello@askfoundations.org', 'ASK Team');
    $mail->addAddress($email); // Recipient email
    // $mail->addBCC('bcc.email@gmail.com');


    // Email Subject & Body
    $mail->Subject = 'ASK';
    $mail->Body = "Hi";//"Company Name: $companyName\nAddress: $address\nPhone: $phoneNumber";

    // // Handle file attachment
    // if (!empty($_FILES['upload_file']['name'])) {
    //     $fileTmpPath = $_FILES['upload_file']['tmp_name'];
    //     $fileName = $_FILES['upload_file']['name'];

    //     if (move_uploaded_file($fileTmpPath, __DIR__ . "/uploads/" . $fileName)) {
    //         $mail->addAttachment(__DIR__ . "/uploads/" . $fileName);
    //     } else {
    //         echo json_encode(["success" => false, "message" => "File upload failed"]);
    //         exit;
    //     }
    // }

    // Send the email
    $mail->send();
    echo json_encode(["success" => true, "message" => "Message Sent"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Mailer Error: " . $mail->ErrorInfo]);
}
?>
