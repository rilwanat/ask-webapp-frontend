<?php 
require_once __DIR__ . '/../vendor/autoload.php'; // Adjust path based on your structure
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Paystack Subscription Plans Fetcher
function fetchPaystackPlans() {
    $secretKey = $_ENV['PAYSTACK_SK_LIVE'];
    
    $url = "https://api.paystack.co/plan";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $secretKey",
        "Cache-Control: no-cache"
    ]);
    
    $response = curl_exec($ch);
    $err = curl_error($ch);
    curl_close($ch);
    
    if ($err) {
        return ['status' => false, 'message' => "cURL Error: $err"];
    }
    
    $result = json_decode($response, true);
    
    if (!$result['status']) {
        return ['status' => false, 'message' => $result['message']];
    }
    
    return $result['data'];
}

// Initialize response array
$response_data = array();

try {
    $plans = fetchPaystackPlans();
    
    // if (is_array($plans)) {
    //     $formattedPlans = array();
        
    //     foreach ($plans as $plan) {

    //         error_log("Processing plan: " . print_r($plan, true));

    //         $plan_item = array(
    //             "id" => $plan['id'],
    //             "name" => $plan['name'],
    //             "plan_code" => $plan['plan_code'],
    //             "description" => $plan['description'],
    //             "amount" => $plan['amount'] / 100, // Convert from kobo to naira
    //             "interval" => $plan['interval'],
    //             "send_invoices" => $plan['send_invoices'],
    //             "send_sms" => $plan['send_sms'],
    //             "currency" => $plan['currency'],
    //             "createdAt" => $plan['createdAt'],
    //             "updatedAt" => $plan['updatedAt']
    //         );
            
    //         array_push($formattedPlans, $plan_item);
    //     }
        
    //     $response_data = array(
    //         "status" => true,
    //         "data" => array(
    //             "plans_data" => $formattedPlans
    //         )
    //     );
    // } else {

    //     error_log("Plans data is not an array: " . print_r($plans, true));

    //     $response_data = array(
    //         "status" => false,
    //         "message" => $plans['message'] ?? "Failed to fetch plans"
    //     );
    // }



    if (isset($plans['status']) && $plans['status'] === false) {
    // Handle error case
    $response_data = [
        "status" => false,
        "message" => $plans['message'] ?? "Failed to fetch plans"
    ];
} else {
    $formattedPlans = array();
    
    // Check if $plans is an array and not empty
    if (is_array($plans) && !empty($plans)) {
        foreach ($plans as $plan) {
            // Verify $plan is an array and has the required fields
            if (!is_array($plan)) {
                error_log("Skipping invalid plan (not an array)");
                continue;
            }

            // Create plan item with null checks
            $plan_item = array(
                "id" => $plan['id'] ?? null,
                "name" => $plan['name'] ?? null,
                "plan_code" => $plan['plan_code'] ?? null,
                "description" => $plan['description'] ?? null,
                "amount" => isset($plan['amount']) ? ($plan['amount'] / 100) : null,
                "interval" => $plan['interval'] ?? null,
                "send_invoices" => $plan['send_invoices'] ?? null,
                "send_sms" => $plan['send_sms'] ?? null,
                "currency" => $plan['currency'] ?? null,
                "createdAt" => $plan['createdAt'] ?? null,
                "updatedAt" => $plan['updatedAt'] ?? null
            );
            
            array_push($formattedPlans, $plan_item);
        }
        
        $response_data = array(
            "status" => true,
            "data" => array(
                "plans_data" => $formattedPlans
            )
        );
    } else {
        $response_data = array(
            "status" => false,
            "message" => "No plans found or invalid response format"
        );
    }
}


} catch (Exception $e) {
    $response_data = array(
        "status" => false,
        "message" => "Error: " . $e->getMessage()
    );
}

// Set HTTP response code and return JSON response
http_response_code(200);
echo json_encode($response_data);
?>