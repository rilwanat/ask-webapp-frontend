<?php
function verifyNuban($accountNumber, $bankCode) {
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

    // Get the first item from the response array
    $firstItem = $data[0];
    
    // Extract account name and bank name
    $accountName = $firstItem['account_name'] ?? null;
    $bankName = $firstItem['bank_name'] ?? null;

    // Return as array
    return [$accountName, $bankName];
}
?>
