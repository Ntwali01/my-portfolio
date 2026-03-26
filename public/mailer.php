<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

$name    = isset($input['name'])    ? htmlspecialchars(strip_tags(trim($input['name'])))    : '';
$email   = isset($input['email'])   ? htmlspecialchars(strip_tags(trim($input['email'])))   : '';
$subject = isset($input['subject']) ? htmlspecialchars(strip_tags(trim($input['subject']))) : 'No subject';
$message = isset($input['message']) ? htmlspecialchars(strip_tags(trim($input['message']))) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit();
}

$to      = 'cyubahirontwaliadore@gmail.com';
$subject = "[Portfolio] $subject";

$body  = "New message from your portfolio contact form\n";
$body .= "============================================\n\n";
$body .= "Name:    $name\n";
$body .= "Email:   $email\n\n";
$body .= "Message:\n$message\n";

$headers  = "From: Portfolio Contact <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
?>
