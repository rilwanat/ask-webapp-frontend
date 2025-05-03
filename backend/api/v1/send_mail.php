<?php 







function sendMailToUser($username, $email, $subject, $message) {
    // $headers = "MIME-Version: 1.0" . "\r\n";
    // $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    // $headers .= 'From: hello@askfoundations.org' . "\r\n";



    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: A.S.K Foundation <noreply@askfoundations.org>\r\n";
    $headers .= "X-Auto-Response-Suppress: All\r\n"; // Disables auto-replies
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    
    // $headers .= "Content-Type: multipart/related; boundary=\"$boundary\"\r\n";



    
    $emailBody = '
    <!DOCTYPE html>
<html>
<head>
<title>A.S.K Foundation</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        width: 90%;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        padding: 20px 0;
        background-color: #161c34;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
    }
    .header img {
        max-width: 200px;
        margin-bottom: 15px;
    }
    .header h2 {
        margin: 0;
        font-size: 24px;
    }
    .content {
        padding: 20px;
    }
    .content p {
        margin: 15px 0;
        font-size: 16px;
        color: #333333;
    }
    .details {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
    }
    .details th, .details td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    .details th {
        background-color: #161c34;
        color: #ffffff;
    }
    .details td {
        background-color: #f9f9f9;
        color: #333333;
    }
    .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #ffffff;
        background-color: #161c34;
        border-top: 1px solid #dddddd;
        margin-top: 20px;
    }
    .footer p {
        margin: 5px 0;
    }
    .footer a {
        color: #ffffff;
    }
    @media (max-width: 600px) {
        .container {
            width: 100%;
            margin: 10px;
            padding: 15px;
        }
        .header h2 {
            font-size: 20px;
        }
        .details th, .details td {
            font-size: 14px;
            padding: 8px;
        }
    }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        
        <h2>'. $subject .'</h2>
    </div>
    <div class="content">
        <p>Dear ' . 
        // $username
        explode(" ", $username)[0]
        . ',</p>
        <p>' . $message . '</p>
        
        <p>If you have any questions or need further assistance, feel free to contact us at <a href="mailto:info@askfoundations.org">info@askfoundations.org</a>.</p>
    </div>
    <div class="footer">

<br><br>
    <a href="https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m" target="_blank">WhatsApp</a>
    <a href="https://t.me/askfoundations" target="_blank">Telegram</a>
    <a href="https://www.facebook.com/askfoundationintl" target="_blank">Facebook</a>
    <a href="https://x.com/@askfoundations" target="_blank">Twitter</a>
    <a href="https://www.instagram.com/askfoundations" target="_blank">Instagram</a>
    <a href="https://www.tiktok.com/@askfoundations" target="_blank">TikTok</a>
    <a href="https://www.youtube.com/@Askfoundations" target="_blank">YouTube</a>
<br><br>



        <p>&copy; 2025 A.S.K Foundation. All rights reserved.</p>
    </div>
</div>
</body>
</html>

';











    $mailSent = mail($email, $subject, $emailBody, $headers); // Fixed variable usage
    if ($mailSent) {
        // echo json_encode(["success" => true, "message" => "Message Sent"]);
        return true;
    } else {
        // echo json_encode(["success" => false, "message" => "Failed"]);
        return false;
    }
}

// sendMailToUser($email, $subject, $emailBody);




function sendMailFromGuest($username, $email, $subject, $message) {
    // $headers = "MIME-Version: 1.0" . "\r\n";
    // $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";


    // // Set From and Reply-To headers
    // $headers .= 'From: A.S.K Foundation <rilwan.at@gmail.com>' . "\r\n";
    // $headers .= 'Reply-To: ' . $email . "\r\n";  // This makes replies go to the sender
    
    // // You might also want to add these for better email deliverability
    // $headers .= 'Return-Path: rilwan.at@gmail.com' . "\r\n";
    // $headers .= 'X-Mailer: PHP/' . phpversion();


    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    
    // Set From and Reply-To headers (modified to use hello@askfoundations.org)
    $headers .= 'From: A.S.K Foundation <hello@askfoundations.org>' . "\r\n";
    $headers .= 'Reply-To: ' . $email . "\r\n";  // This makes replies go to the sender
    
    // Additional headers for deliverability
    $headers .= 'Return-Path: hello@askfoundations.org' . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();




    
    $emailBody = '
    <!DOCTYPE html>
<html>
<head>
<title>A.S.K Foundation</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        width: 90%;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        padding: 20px 0;
        background-color: #161c34;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
    }
    .header img {
        max-width: 200px;
        margin-bottom: 15px;
    }
    .header h2 {
        margin: 0;
        font-size: 24px;
    }
    .content {
        padding: 20px;
    }
    .content p {
        margin: 15px 0;
        font-size: 16px;
        color: #333333;
    }
    .details {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
    }
    .details th, .details td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    .details th {
        background-color: #161c34;
        color: #ffffff;
    }
    .details td {
        background-color: #f9f9f9;
        color: #333333;
    }
    .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #ffffff;
        background-color: #161c34;
        border-top: 1px solid #dddddd;
        margin-top: 20px;
    }
    .footer p {
        margin: 5px 0;
    }
    .footer a {
        color: #ffffff;
    }
    @media (max-width: 600px) {
        .container {
            width: 100%;
            margin: 10px;
            padding: 15px;
        }
        .header h2 {
            font-size: 20px;
        }
        .details th, .details td {
            font-size: 14px;
            padding: 8px;
        }
    }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        
        <h2>'. $subject .'</h2>
    </div>
    <div class="content">
        
    
        <p>' . $message . '</p>
        
    
    </div>
    <div class="footer">

<br><br>
    <a href="https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m" target="_blank">WhatsApp</a>
    <a href="https://t.me/askfoundations" target="_blank">Telegram</a>
    <a href="https://www.facebook.com/askfoundationintl" target="_blank">Facebook</a>
    <a href="https://x.com/@askfoundations" target="_blank">Twitter</a>
    <a href="https://www.instagram.com/askfoundations" target="_blank">Instagram</a>
    <a href="https://www.tiktok.com/@askfoundations" target="_blank">TikTok</a>
    <a href="https://www.youtube.com/@Askfoundations" target="_blank">YouTube</a>
<br><br>


        <p>&copy; 2025 A.S.K Foundation. All rights reserved.</p>
    </div>
</div>
</body>
</html>

';











    $mailSent = mail(
        // "askfoundationss@gmail.com", 
        "info@askfoundations.org", 
        $subject, $emailBody, $headers); // Fixed variable usage
    if ($mailSent) {
        // echo json_encode(["success" => true, "message" => "Message Sent"]);
        return true;
    } else {
        // echo json_encode(["success" => false, "message" => "Failed"]);
        return false;
    }
}














function sendMailToSubscribe($username, $email, $subject, $message, $attachmentPath = null) {
    $boundary = md5(time());
    
    // $headers = "MIME-Version: 1.0\r\n";
    // $headers .= "From: hello@askfoundations.org\r\n";
    // $headers .= "Content-Type: multipart/related; boundary=\"$boundary\"\r\n";

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: A.S.K Foundation <noreply@askfoundations.org>\r\n";
    $headers .= "X-Auto-Response-Suppress: All\r\n"; // Disables auto-replies
    $headers .= "Content-Type: multipart/related; boundary=\"$boundary\"\r\n";

    

    // HTML email body (keep your original HTML exactly as is)
    $emailBody = '
    <!DOCTYPE html>
<html>
<head>
<title>A.S.K Foundation</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        width: 90%;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        padding: 20px 0;
        background-color: #161c34;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
    }
    .header img {
        max-width: 200px;
        margin-bottom: 15px;
    }
    .header h2 {
        margin: 0;
        font-size: 24px;
    }
    .content {
        padding: 20px;
    }
    .content p {
        margin: 15px 0;
        font-size: 16px;
        color: #333333;
    }
    .details {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
    }
    .details th, .details td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    .details th {
        background-color: #161c34;
        color: #ffffff;
    }
    .details td {
        background-color: #f9f9f9;
        color: #333333;
    }
    .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #ffffff;
        background-color: #161c34;
        border-top: 1px solid #dddddd;
        margin-top: 20px;
    }
    .footer p {
        margin: 5px 0;
    }
    .footer a {
        color: #ffffff;
    }
    @media (max-width: 600px) {
        .container {
            width: 100%;
            margin: 10px;
            padding: 15px;
        }
        .header h2 {
            font-size: 20px;
        }
        .details th, .details td {
            font-size: 14px;
            padding: 8px;
        }
    }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        
        <h2>'. $subject .'</h2>
    </div>
    <div class="content">
        <p>Dear ' . $username . ',</p>
        <p>' . $message . '</p>
        
        <!-- Image preview will be inserted here if attachment exists -->
        ' . ($attachmentPath ? '<div style="margin:20px 0;text-align:center;">
            <img src="cid:attached_image" style="max-width:100%;height:auto;border:1px solid #ddd;border-radius:4px;">
        </div>' : '') . '
        
        <p>If you have any questions or need further assistance, feel free to contact us at <a href="mailto:info@askfoundations.org">info@askfoundations.org</a>.</p>
    </div>
    <div class="footer">
<br><br>
    <a href="https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m" target="_blank">WhatsApp</a>
    <a href="https://t.me/askfoundations" target="_blank">Telegram</a>
    <a href="https://www.facebook.com/askfoundationintl" target="_blank">Facebook</a>
    <a href="https://x.com/@askfoundations" target="_blank">Twitter</a>
    <a href="https://www.instagram.com/askfoundations" target="_blank">Instagram</a>
    <a href="https://www.tiktok.com/@askfoundations" target="_blank">TikTok</a>
    <a href="https://www.youtube.com/@Askfoundations" target="_blank">YouTube</a>
<br><br>
<p>
    <a href="https://askfoundations.org/backend/api/v1/unsubscribe.php?email=' . urlencode($email) . '" style="color: #666666; text-decoration: underline;">
        Unsubscribe from our emails
    </a>
</p>
        <p>&copy; 2025 A.S.K Foundation. All rights reserved.</p>
    </div>
</div>
</body>
</html>';

    // Build the complete message with attachment
    $message = "--$boundary\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= $emailBody . "\r\n";

    // Add the image attachment if provided
    if ($attachmentPath && file_exists($attachmentPath)) {
        $fileContent = file_get_contents($attachmentPath);
        $fileEncoded = chunk_split(base64_encode($fileContent));
        $fileType = mime_content_type($attachmentPath);
        $fileName = basename($attachmentPath);

        $message .= "--$boundary\r\n";
        $message .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-ID: <attached_image>\r\n";
        $message .= "Content-Disposition: inline; filename=\"$fileName\"\r\n\r\n";
        $message .= $fileEncoded . "\r\n";
    }

    $message .= "--$boundary--";

    $mailSent = mail($email, $subject, $message, $headers);
    return $mailSent;
}
?>
