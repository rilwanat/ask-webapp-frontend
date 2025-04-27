<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Paystack Subscription Plans Fetcher
function fetchPaystackPlans() {
    $secretKey = 'sk_live_825ca42003c4951036d45a70d6728d2125b0b22e'; // Replace with your Paystack secret key
    
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
    
    if (is_array($plans)) {
        $formattedPlans = array();
        
        foreach ($plans as $plan) {
            $plan_item = array(
                "id" => $plan['id'],
                "name" => $plan['name'],
                "plan_code" => $plan['plan_code'],
                "description" => $plan['description'],
                "amount" => $plan['amount'] / 100, // Convert from kobo to naira
                "interval" => $plan['interval'],
                "send_invoices" => $plan['send_invoices'],
                "send_sms" => $plan['send_sms'],
                "currency" => $plan['currency'],
                "createdAt" => $plan['createdAt'],
                "updatedAt" => $plan['updatedAt']
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
            "message" => $plans['message'] ?? "Failed to fetch plans"
        );
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