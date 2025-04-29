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
$dashboard_data = array();
$dashboard_data["dashboardData"] = array();

try {
    // Fetch data from the Response class
    $total_users = $response->getTotalUsers();
    $total_help_requests = $response->getTotalHelpRequests();
    $total_beneficiaries = $response->getTotalBeneficiaries();
    $total_sponsors = $response->getTotalSponsors();
    $total_nominations = $response->getTotalNominations();

    $total_incoming = $response->getTotalIncoming();
    $total_outgoing = $response->getTotalOutgoing();

    $top_nominations = $response->getTopNominations();
    $top_consistencies = $response->getTopConsistencies();

    // Prepare dashboard data item
    $dashboard_item = array(
        "Total_Users" => $total_users,
        "Total_Help_Requests" => $total_help_requests,
        "Total_Beneficiaries" => $total_beneficiaries,
        "Total_Sponsors" => $total_sponsors,
        "Total_Nominations" => $total_nominations,

        "Total_Incoming" => $total_incoming,
        "Total_Outgoing" => $total_outgoing,

        "Top_Nominations" => $top_nominations,
        "Top_Consistencies" => $top_consistencies,


    );

    array_push($dashboard_data["dashboardData"], $dashboard_item);

    // Check if data fetching was successful
    if (!empty($dashboard_data["dashboardData"])) {
        $response_data = array("status" => true, "dashboardData" => $dashboard_data["dashboardData"]);
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
