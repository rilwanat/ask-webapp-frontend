<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET"); // Changed to GET since we're fetching files
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// No database needed for this operation
$allowedExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
$testimoniesFolder = '../../../../testimonies/'; // Goes 4 folders back (adjust as needed)
$baseUrl = 'https://askfoundations.org/testimonies/'; // Replace with your actual domain

// Initialize response array
$testimonies_data = array();

// Check if directory exists
if (!is_dir($testimoniesFolder)) {
    http_response_code(404);
    echo json_encode(array("status" => false, "message" => "Testimonies directory not found"));
    exit;
}

// Scan directory for files
$files = scandir($testimoniesFolder);

ini_set('memory_limit', '-1');

foreach ($files as $file) {
    $fileExt = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    
    // Only process image files
    if (in_array($fileExt, $allowedExtensions)) {
        $testimony_item = array(
            "filename" => $file,
            // "url" => $baseUrl . $file,
            "url" => $testimoniesFolder . $file,
            "type" => $fileExt,
            "last_modified" => date("Y-m-d H:i:s", filemtime($testimoniesFolder . $file))
        );
        
        array_push($testimonies_data, $testimony_item);
    }
}

// Prepare response
if (!empty($testimonies_data)) {
    $response_data = array(
        "status" => true,
        "count" => count($testimonies_data),
        "data" => $testimonies_data
    );
} else {
    $response_data = array(
        "status" => false,
        "message" => "No image files found in testimonies directory"
    );
}

// Set HTTP response code and return JSON response
http_response_code(200);
echo json_encode($response_data);
?>