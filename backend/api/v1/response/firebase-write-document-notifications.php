<?php
function sendFirestoreMessage($chatId, $messageData) {
    $projectId = 'ask-platform-1900b';
    $accessToken = getAccessToken();
    $url = "https://firestore.googleapis.com/v1/projects/$projectId/databases/(default)/documents/notifications/$chatId/messages";

    $data = [
        'fields' => [
            'message' => ['stringValue' => $messageData['message']],
            'senderId' => ['stringValue' => $messageData['senderId']],
            'senderImage' => ['stringValue' => $messageData['senderImage']],
            'senderName' => ['stringValue' => $messageData['senderName']],
            'receiverId' => ['stringValue' => $messageData['receiverId']],
            'receiverName' => ['stringValue' => $messageData['receiverName']],
            'timestamp' => ['timestampValue' => date('c')] // ISO8601 timestamp
        ]
    ];

    $headers = [
        "Authorization: Bearer $accessToken",
        "Content-Type: application/json"
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        return ['success' => false, 'error' => curl_error($ch)];
    }
    curl_close($ch);

    $responseData = json_decode($response, true);
    if (isset($responseData['name'])) {
        return ['success' => true, 'messageId' => basename($responseData['name'])];
    } else {
        return ['success' => false, 'error' => $responseData['error']['message'] ?? 'Unknown error'];
    }
}

function getAccessToken() {
    $keyFile = __DIR__.'/../keys/ask-platform-1900b-firebase-adminsdk-fbsvc-c3667d0568.json';
    $key = json_decode(file_get_contents($keyFile), true);

    $jwtHeader = ['alg' => 'RS256', 'typ' => 'JWT'];
    $jwtClaimSet = [
        'iss' => $key['client_email'],
        'scope' => 'https://www.googleapis.com/auth/datastore',
        'aud' => 'https://oauth2.googleapis.com/token',
        'exp' => time() + 3600,
        'iat' => time()
    ];

    $jwt = base64url_encode(json_encode($jwtHeader)) . '.' . base64url_encode(json_encode($jwtClaimSet));
    openssl_sign($jwt, $signature, $key['private_key'], 'SHA256');
    $jwt .= '.' . base64url_encode($signature);

    $response = file_get_contents('https://oauth2.googleapis.com/token', false, stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query([
                'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                'assertion' => $jwt
            ])
        ]
    ]));

    $tokenData = json_decode($response, true);
    return $tokenData['access_token'];
}

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// Example usage
$messageData = [
    'message' => 'Hello from PHP via REST!',
    'senderId' => 'php-sender-id',
    'senderImage' => 'https://example.com/php.jpg',
    'senderName' => 'PHP Server',
    'receiverId' => 'flutter-receiver-id',
    'receiverName' => 'Flutter User'
];
$result = sendFirestoreMessage('admin123', $messageData);

if ($result['success']) {
    echo "Message sent successfully! Message ID: " . $result['messageId'];
} else {
    echo "Error sending message: " . $result['error'];
}
