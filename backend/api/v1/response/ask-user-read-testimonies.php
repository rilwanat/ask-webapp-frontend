<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
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

// First collect all valid files with their metadata
$fileData = array();
foreach ($files as $file) {
    $fileExt = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    
    // Only process image files
    if (in_array($fileExt, $allowedExtensions)) {
        $filePath = $testimoniesFolder . $file;
        $fileData[] = array(
            'filename' => $file,
            'filepath' => $filePath,
            'ext' => $fileExt,
            'modified' => filemtime($filePath)
        );
    }
}

// Sort files by modified date (newest first)
usort($fileData, function($a, $b) {
    return $b['modified'] - $a['modified'];
});

// Now build the final testimonies_data array with sorted files
foreach ($fileData as $file) {
    $testimony_item = array(
        "filename" => $file['filename'],
        "url" => $file['filepath'], // or $baseUrl . $file['filename'] if you prefer
        "type" => $file['ext'],
        "last_modified" => date("Y-m-d H:i:s", $file['modified'])
    );
    array_push($testimonies_data, $testimony_item);
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