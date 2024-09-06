<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require './js/vendor/autoload.php';



$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';


//Create an instance; passing `true` enables exceptions

if (isset($_POST['send_message'])) {
    $mail = new PHPMailer(true);

    try {
        //Server settings
        /* $mail->SMTPDebug = SMTP::DEBUG_SERVER;      */                 //Enable verbose debug output
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com'; // Set the SMTP server to send through
        $mail->SMTPAuth   = true;
        $mail->Username   = 'admin@jrpsolutions.online'; // SMTP username
        $mail->Password   = 'Jrpsolutions*2024';           // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption, `ssl` also accepted
        $mail->Port       = 587; // TCP port to connect to

        // Recipients
        $mail->setFrom('admin@jrpsolutions.online', 'My_Portfolio');
        $mail->addAddress('llamera.llamera@gmail.com', 'Mark Paul Llamera');     //Add a recipient
        /* $mail->addAddress('ellen@example.com');    */            //Name is optional
        /* $mail->addReplyTo('info@example.com', 'Information');
        $mail->addCC('cc@example.com');
        $mail->addBCC('bcc@example.com'); */

        //Attachments
        /* $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name */

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'My Portfolio Client';
        $mail->Body    = '
                <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
            <br>
            <br>
            Name : ' . $name . '<br>
            Email : ' . $email . '<br>
            Phone : ' . $phone . '<br>
            <br>
            <br>
            Message : 
            <p>
                ' . $message . '
            </p>
            </body>
            </html>
        ';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo json_encode([
            "status" => "success",
            "message" => "Message sent successfully"
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
        ]);
    }
}
