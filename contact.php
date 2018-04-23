<?php
//TESTING (returns true every time)
// Site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
// Secret key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe

$captcha = $_POST["captcha"];
$secret = "[YOUR ReCaptcha Secret Here]";
$verify = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha), true);
$success = $verify["success"];

$name = stripslashes($_POST["name"]);
$email = stripslashes($_POST["email"]);
$subject = stripslashes($_POST["subject"]);
$message = stripslashes($_POST["message"]);

$headers = "From: " . $email . "\r\n" .
    "Reply-To: " . $email . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

// prepare email body text
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";

$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

if ($success == false) {
  //This user was not verified by recaptcha.
  echo "Recaptcha Verification Failed";
} else if ($success == true) {
    //This user is verified by recaptcha
    // send email
    if (mail("[Your Email Here]", $subject, $Body, $headers)){
      //send successful
      echo "Recaptcha Success, Mail Sent Successfully";
    }else{
      //send failure
        echo "Mailing Failed";
      }
}

?>
