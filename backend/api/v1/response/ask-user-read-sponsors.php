<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/response.php';

$database = new Database();
$db = $database->getConnection();

$response = new Response($db);

// Fetch all users
$stmt = $response->ReadAllSponsors();

// Initialize array to store user data
$sponsors_data["sponsors_data"] = array();


ini_set('memory_limit', '-1');
// Loop through each user
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    // Extract user data from the row
    $product_item = array(
        "id" => $row['id'],
        "name" => $row['name'],
        "date" => $row['date'],
        "type" => $row['type'],
        "image" => $row['image']


    );

    array_push($sponsors_data["sponsors_data"], $product_item);

}


// Check if successfully fetched
if ($sponsors_data["sponsors_data"]) {
    $response_data = array("status" => true, "data" => $sponsors_data["sponsors_data"]);
} else {
    $response_data = array("status" => false);
}


// Set HTTP response code and return JSON response
http_response_code(200);
echo json_encode($response_data);
?>
