<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/database.php';
include_once './objects/response.php';

$database = new Database();
$db = $database->getConnection();
$response = new Response($db);

// Accept email from either GET or POST
$method = $_SERVER['REQUEST_METHOD'];
$email = null;

if ($method === 'GET') {
    $email = isset($_GET['email']) ? urldecode($_GET['email']) : null;
} elseif ($method === 'POST') {
    $email = isset($_POST['email']) ? urldecode($_POST['email']) : null;
}


if ($method === 'GET' || $method === 'POST') {
    if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if ($response->UnsubscribeEmail($email)) {
            // Display message and delay redirect with JavaScript
            echo "<html>
                    <head>
                        <script type='text/javascript'>
                            setTimeout(function() {
                                window.location.href = '/';
                            }, 5000); // Redirect after 5 seconds
                        </script>
                    </head>
                    <body>
                        <p>You have been unsubscribed successfully. Redirecting...</p>
                    </body>
                  </html>";
            exit;
        } else {
            echo "Unsubscription failed.";
            exit;
        }
    } else {
        echo "Invalid or missing email.";
        exit;
    }
} else {
    echo "Only GET and POST methods are allowed.";
    exit;
}
?>
