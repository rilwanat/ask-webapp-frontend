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

$data = json_decode(file_get_contents("php://input"));


if (
!empty($data->email) &&
!empty($data->deleteToken)
) {



$deleteResult = $response->DeleteAccount($data->email, $data->deleteToken);
    if ($deleteResult['status']) {

        //
$subject = "A.S.K Account Deleted (From A.S.K. Foundation)";
$message = "
<h4>Your A.S.K Account has been deleted succesfully!</h4>

<br>

<br><br>




<br><br>
Best regards,
<br>
<strong>A.S.K Foundation Team</strong>
<br><br>
";
sendMailToUser($data->email, $data->email, $subject, $message);
//


        // set response code - 201 created
        http_response_code(200);

        // tell the user
        echo json_encode(array("status" => true, "message" => "Account deleted successfully."));
    } else {

        // set response code - 503 service unavailable
        http_response_code(200);

        // tell the user
        echo json_encode(array("status" => false, "message" => $deleteResult['message']));
    }



} else {

    // set response code - 503 service unavailable
    http_response_code(200);

    // tell the user
    echo json_encode(array("status" => false, "message" => "Unable to Delete. Data is incomplete."));
}






?>