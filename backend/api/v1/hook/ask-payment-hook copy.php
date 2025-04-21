<?php



// Retrieve the request's body and parse it as JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);
//$metadata = json_decode($data["data"]["metadata"], true);



// get database connection
include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

file_put_contents('io.txt', $data);


if ($data["event"] == "charge.success") 
{

    
    $response->logPayment(
        $data["data"]["reference"],
        $data["data"]["metadata"]["custom_fields"][0]["username"],
        $data["data"]["metadata"]["custom_fields"][0]["firstname"],
        $data["data"]["metadata"]["custom_fields"][0]["lastname"],
        $data["data"]["amount"],
        $data["data"]["metadata"]["custom_fields"][0]["email"],
        $data["data"]["metadata"]["custom_fields"][0]["subscription_type"]
    );
}



?>
