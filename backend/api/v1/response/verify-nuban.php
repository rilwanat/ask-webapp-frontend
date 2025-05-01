<?php
function verifyNuban($accountNumber, $bankCode, $bankNameFromClient) {
    $userCode = "NUBAN-LZLNOSGN2321"; // Your NUBAN API user code
    $appendix = "?acc_no={$accountNumber}&bank_code={$bankCode}";
    $url = "https://app.nuban.com.ng/api/" . $userCode . $appendix;

    $contextOptions = [
        "ssl" => [
            "verify_peer" => false,
            "verify_peer_name" => false,
        ],
    ];

    $response = file_get_contents($url, false, stream_context_create($contextOptions));
    if (!$response) return [null, null];

    $data = json_decode($response, true);
    if (!is_array($data) || empty($data)) return [null, null];

    // Save raw data to file
    // file_put_contents('nuban_data.txt', print_r($data, true));

    // Get the first item from the response array
    // $firstItem = $data[0];
    $firstItem = $data[0] ?? null;
    
    // Extract account name and bank name
    // $accountName = strtoupper($firstItem['account_name']) ?? null;
    $accountName = isset($firstItem['account_name']) ? strtoupper($firstItem['account_name']) : null;
    // $bankName = $firstItem['bank_name'] ?? strtoupper($bankNameFromClient);
    $bankName = !empty($firstItem['bank_name']) 
        ? $firstItem['bank_name'] 
        : strtoupper($bankNameFromClient);

    // Save raw data to file
    // file_put_contents('nuban_data2.txt', print_r(strtoupper($bankNameFromClient), true));
    // file_put_contents('nuban_data2.txt', print_r(strtoupper($bankName), true));

    // Return as array
    return [$accountName, $bankName];
}
?>
