<?php
require_once __DIR__ . '/../send_mail.php';


$email = 'rilwan.at@gmail.com';
//
$subject = "Welcome Email (From A.S.K. Foundation)";
$message = "
<h4>Welcome to Ashabi Shobande Kokumo Foundation! (Aka A.S.K Foundation)</h4>
We're thrilled to have you on board!. Your code for email verification is: 
<br>
<div 
style='padding: 10px; background: #f4f4f4; border: 1px dashed #ccc; 
display: inline-block; font-family: monospace; font-size: 16px; font-weight: bold'>" . $randomToken . "</div>
<br><br>

As a valued subscriber, you're now part of a community driven initiatives dedicated to 
promoting human dignity.<br><br> To stay updated on our latest news, initiatives, and 
opportunities, kindly subscribe to our social media handles:<br>
<ul>
    <li><a href='https://whatsapp.com/channel/0029VapJPNX05MUYgWDwWR0m' target='_blank'>WhatsApp</a></li>
    <li><a href='https://t.me/askfoundations' target='_blank'>Telegram</a></li>
    <li><a href='https://www.facebook.com/askfoundationintl' target='_blank'>Facebook</a></li>
    <li><a href='https://x.com/@askfoundations' target='_blank'>Twitter</a></li>
    <li><a href='https://www.instagram.com/askfoundations' target='_blank'>Instagram</a></li>
    <li><a href='https://www.tiktok.com/@askfoundations' target='_blank'>TikTok</a></li>
    <li><a href='https://www.youtube.com/@Askfoundations' target='_blank'>YouTube</a></li>
</ul>

<br>To make the most of your membership, don't hesitate to:
<ul>
    <li>Use the 'Ask' button to request assistance or support (Note: To qualify, you'll need to verify your identity through our verification process)</li>
    <li>Share your request with others to gather support</li>
    <li>Nominate fellow members who may be in need</li>
    <li>Share others' requests to help them get the necessary nominations</li>
</ul>
<br><br>

Remember, our community-based selection protocol (CBSPro) relies on your input! By nominating and sharing 
requests, you'll help us identify those who need support the most.
<br><br>
Additionally, your financial support will be instrumental in helping us achieve our goals. Please consider 
making a donation using the 'Donate' button to support our initiatives.
<br><br>
Thank you for joining us! Your contributions, nominations, and sharing will go a long way in creating positive change!
<br><br>
Best regards,
<br>
<strong>A.S.K Foundation Team</strong>
<br><br>
";

sendMailToUser($email, $email, $subject, $message);
//



?>