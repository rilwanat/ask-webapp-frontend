<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/response.php';

require_once __DIR__ . '/../send_mail.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

$data = json_decode(file_get_contents("php://input"), true);


if (
!empty($data['beneficiaries']) 
) {




    if ($response->postBeneficiariesArray($data['beneficiaries'] )) {


        // Send email to all other requests
        $requests = $response->ReadAllHelpRequestsEmailsNotCheat();

        // Prepare the base email content
        $subject = "ASK Nominee Selection Update";

        // Get list of selected beneficiaries for the email
        $selectedBeneficiaries = array_map(function($b) {
            return "- " . $b['email'] . " (Amount: " . ($b['amount'] ?? '') . ")";
        }, $data['beneficiaries']);

        // Convert to HTML unordered list
$beneficiariesList = '<ul>' . implode('', array_map(function($item) {
    return '<li>' . htmlspecialchars($item) . '</li>';
}, $selectedBeneficiaries)) . '</ul>';

        // Send to each requestor
        while ($row = $requests->fetch(PDO::FETCH_ASSOC)) {
            if (!empty($row['email_address'])) {
                // Personalize each email with the recipient's name
                $message = "Dear " . $row['user_fullname'] . ",<br><br>"
                 . "The following winners have been selected for this round:<br>"
                 . $beneficiariesList . "<br><br>"
                 . "Thank you for participating. Please try again in the next round.<br><br>"
                 . "Best regards,<br>"
                 . "ASK Foundations Team";

                 

                sendMailToUser(
                    $row['user_fullname'],
                    $row['email_address'],
                    $subject,
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