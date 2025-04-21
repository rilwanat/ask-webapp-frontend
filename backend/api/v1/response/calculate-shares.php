<?php

// Set CORS headers for preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
    exit;
}

// Set CORS headers for actual POST request
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

// Validate inputs
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        isset($data->shareType) &&
        isset($data->numberOfBeneficiaries) &&
        isset($data->totalAmount)
    ) {
        $type = strtolower($data->shareType);
        $count = (int) $data->numberOfBeneficiaries;
        $amount = (float) $data->totalAmount;
        $ratios = isset($data->shareRatio) ? $data->shareRatio : [];

        $shares = [];

        if ($count <= 0 || $amount <= 0) {
            echo json_encode(["status" => false, "ratio" => []]);
            exit;
        }

        if ($type === "direct") {
            $shareAmount = round($amount / $count, 2);
            for ($i = 0; $i < $count; $i++) {
                $shares[] = $shareAmount;
            }
        } elseif ($type === "ratio") {
            if (count($ratios) !== $count) {
                echo json_encode(["status" => false, "ratio" => []]);
                exit;
            }

            $sum = array_sum($ratios);
            foreach ($ratios as $val) {
                $shares[] = round(($val / $sum) * $amount, 2);
            }
        } else {
            echo json_encode(["status" => false, "ratio" => []]);
            exit;
        }

        echo json_encode(["status" => true, "ratio" => $shares]);
    } else {
        echo json_encode(["status" => false, "ratio" => []]);
    }
}
?>
