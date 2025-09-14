<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Includi i file necessari (adatta il percorso se serve)
require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

// Controlla se il form è stato inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Pulizia e assegnazione dei dati del form
    $nome = htmlspecialchars($_POST['nome']);
    $cognome = htmlspecialchars($_POST['cognome']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $email = htmlspecialchars($_POST['email']);
    $messaggio = htmlspecialchars($_POST['messaggio']);

    // Corpo della mail
    $body = "Hai ricevuto un nuovo messaggio dal form di contatto:\n\n";
    $body .= "Nome: $nome\n";
    $body .= "Cognome: $cognome\n";
    $body .= "Telefono: $telefono\n";
    $body .= "Email: $email\n";
    $body .= "Messaggio:\n$messaggio\n";

    // Inizializza PHPMailer
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.tuo-provider.com'; // Sostituisci col tuo SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'tuo@email.com';     // SMTP username
        $mail->Password = 'password';          // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;                     // Porta SMTP

        // Destinatario e mittente
        $mail->setFrom($email, "$nome $cognome");  // Mittente dal form
        $mail->addAddress('gjergjcoli@outlook.com'); // Destinatario

        // Contenuto
        $mail->Subject = 'Nuovo messaggio da contattaci.html';
        $mail->Body    = $body;

        $mail->send();
        echo 'Messaggio inviato con successo!';
    } catch (Exception $e) {
        echo "Errore nell'invio: {$mail->ErrorInfo}";
    }

} else {
    echo "Accesso non autorizzato.";
}
?>
