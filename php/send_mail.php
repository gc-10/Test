<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nome = htmlspecialchars($_POST['nome']);
    $cognome = htmlspecialchars($_POST['cognome']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $email = htmlspecialchars($_POST['email']);
    $messaggio = htmlspecialchars($_POST['messaggio']);

    $to = 'gjergjcoli@outlook.com';
    $subject = 'Nuovo messaggio dal form di contatto';
    
    $body = "Nome: $nome\nCognome: $cognome\nTelefono: $telefono\nEmail: $email\nMessaggio:\n$messaggio";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo "Messaggio inviato con successo!";
    } else {
        echo "Errore nell'invio della mail.";
    }
} else {
    echo "Accesso non autorizzato.";
}
?>
