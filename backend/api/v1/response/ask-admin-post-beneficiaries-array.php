<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



include_once '../config/database.php';
include_once '../objects/response.php';

require_once __DIR__ . '/../send_mail.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);



// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}

require_once 'ask-auth-validate-token.php';
// Validate token
validateToken();






$data = json_decode(file_get_contents("php://input"), true);


if (
!empty($data['beneficiaries']) 
) {




    if ($response->postBeneficiariesArray($data['beneficiaries'] )) {

        // Get beneficiary emails (from the posted data)
    $beneficiaryEmails = array_column($data['beneficiaries'], 'email');

        // Send email to all other requests
        $requests = $response->ReadAllHelpRequestsEmailsNotCheat();

        // Prepare the base email content
        $subject = "A.S.K Notification of Beneficiary Selection";

        // Get list of selected beneficiaries for the email
        $selectedBeneficiaries = array_map(function($b) {
            return "" . $b['fullname'] . " (N" . (number_format($b['amount'], 2) ?? '') . ")". " (Nomination: " . ($b['nomination_count'] ?? '') . ")";
        }, $data['beneficiaries']);

        // Convert to HTML unordered list
$beneficiariesList = '<ul>' . implode('', array_map(function($item) {
    return '<li>' . htmlspecialchars($item) . '</li>';
}, $selectedBeneficiaries)) . '</ul>';

        // Send to each requestor
        while ($row = $requests->fetch(PDO::FETCH_ASSOC)) {
            if (!empty($row['email_address'])) {
                // Personalize each email with the recipient's name
                $message = "" 
                // "Dear " . $row['user_fullname'] . ",<br><br>"
                 . "The following requests have been selected as beneficiaries for this cycle:<br>"
                 . $beneficiariesList . "<br><br>"
                 . "Thank you for participating. You got ". $row['nomination_count'] ." nominations in this cycle. Kindly join the next cycle, and start mobilizing for nominations.<br><br>"
                 . "Best of luck,<br>"
                 . "<strong>A.S.K Foundation Team</strong><br>";



                sendMailToUser(
                    explode(" ", $row['user_fullname'])[0], //$row['user_fullname'],
                    $row['email_address'],
                    $subject,
                    $message
                );
            }
        }

// Send to all beneficiaries (with different message)
foreach ($data['beneficiaries'] as $beneficiary) {
    if (!empty($beneficiary['email'])) {
        $message = "" 
        // "Dear " . ($beneficiary['fullname'] ?? 'User') . ",<br><br>"
                 . "Congratulations!! You have been selected as a beneficiary of A.S.K FOUNDATION financial support initiative.<br><br>"
                 . "To process your request, kindly contact us on Whatsapp (+2349051047138) to ACCEPT the nomination and affirm your willingness to acknowledge receipt through a short video.<br><br>"
                 . "Upon receipt of credit alert, please  tell us through a video:<br>"
                 . "<ol>"
                 . "<li>your name</li>"
                 . "<li>how you got to know A.S.K Foundation</li>"
                 . "<li>how you eventually got nominated</li>"
                 . "<li>your plans for your grant</li>"
                 . "</ol>"
                 . "<br><br>"
                 . "<strong>ATTENTION</strong><br>"
                 . "Beneficiaries for business support can get further support if you remain active on the platform and share progress report on your business.<br>"
                 . "<br><br>"
                 . "<strong>A.S.K Foundation Team</strong><br>";


                                  

                 $messageData = [
    'message' => 'Congratulations!! You have been selected as a beneficiary of A.S.K FOUNDATION financial support initiative.',
    'meta' => 'X',
    // 'senderId' => 'A.S.K Admin',
    // 'senderImage' => 'https://example.com/php.jpg',
    // 'senderName' => 'A.S.K Admin',
    // 'receiverId' => $nom_email,
    // 'receiverName' => 'A.S.K User'
];
// $result = $response->sendFirestoreMessage('adm-'. 'rilwan.at@gmail.com', $messageData);
$result = $response->sendFirestoreMessage('adm-'. $row['email_address'], $messageData);





        sendMailToUser(
            $beneficiary['fullname'] ?? 'User',
            $beneficiary['email'],
            $subject . " - Congratulations!",
            $message
        );
    }
}




        // set response code - 201 created
        http_response_code(200);

        // tell the user
        echo json_encode(array("status" => true, "message" => "A.S.K Post Beneficiaries: Posted Successfully."));
    } else {

        // set response code - 503 service unavailable
        http_response_code(200);

        // tell the user
        echo json_encode(array("status" => false, "message" => "A.S.K Post Beneficiaries: Post not found or already done."));
    }



} else {

    // set response code - 503 service unavailable
    http_response_code(200);

    // tell the user
    echo json_encode(array("status" => false, "message" => "Unable to Post. Data is incomplete."));
}






?>