<?php
// Set necessary headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");





include_once '../config/database.php';
include_once '../objects/response.php';

// Initialize database and response objects
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



// Initialize array to store dashboard data
$general_settings_data = array();
$general_settings_data["generalSettingsData"] = array();

try {
    // Fetch data from the Response class
    $dnq = $response->getDNQData();
    $dollarExchange = $response->getDollarExchange();
    $daylightSavings = $response->getDaylightSavings();

    // Prepare dashboard data item
    $dashboard_item = array(
        "DNQ" => $dnq,
        "Dollar_Exchange" => $dollarExchange,
        "Daylight_Savings" => $daylightSavings,


    );

    array_push($general_settings_data["generalSettingsData"], $dashboard_item);

    // Check if data fetching was successful
    if (!empty($general_settings_data["generalSettingsData"])) {
        $response_data = array("status" => true, "generalSettingsData" => $general_settings_data["generalSettingsData"]);
    } else {
        $response_data = array("status" => false, "message" => "No data found.");
    }
    
    // Set HTTP response code and return JSON response
    http_response_code(200);
    echo json_encode($response_data);

} catch (Exception $e) {
    // Handle any errors that occur during data fetching
    http_response_code(500);
    echo json_encode(array("status" => false, "message" => "An error occurred while fetching data.", "error" => $e->getMessage()));
}
?>
