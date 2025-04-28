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
        $subject = "ASK Notification of Beneficiary Selection";

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
                 . "Thank you for participating. Kindly join the next cycle, and start mobilizing for nominations.<br><br>"
                 . "Best of luck,<br>"
                 . "ASK Foundations Team";

                 

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
                 . "Congratulations!! You have been selected as this week's beneficiary of A.S.K FOUNDATION weekly support initiative.<br><br>"
                 . "Your request is currently being processed.<br><br>"
                 . "Please when you receive the credit alert send us a short VIDEO to our WhatsApp (+2349051047138) telling us your name, how you got to know A.S.K Foundation and how you eventually got nominated.<br><br>"
                 . "ASK Foundations Team";

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
        echo json_encode(array("status" => true, "message" => "ASK Post Beneficiaries: Posted Successfully."));
    } else {

        // set response code - 503 service unavailable
        http_response_code(200);

        // tell the user
        echo json_encode(array("status" => false, "message" => "ASK Post Beneficiaries: Post not found or already done."));
    }



} else {

    // set response code - 503 service unavailable
    http_response_code(200);

    // tell the user
    echo json_encode(array("status" => false, "message" => "Unable to Post. Data is incomplete."));
}






?>