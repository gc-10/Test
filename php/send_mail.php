<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome      = htmlspecialchars($_POST['nome'] ?? '');
    $cognome   = htmlspecialchars($_POST['cognome'] ?? '');
    $telefono  = htmlspecialchars($_POST['telefono'] ?? '');
    $email     = htmlspecialchars($_POST['email'] ?? '');
    $messaggio = htmlspecialchars($_POST['messaggio'] ?? '');

    

    $to      = 'gjergjcoli@outlook.com';  // destinatario fisso
    $subject = 'Nuovo messaggio dal form di contatto';
    $body    = "Nome: $nome\nCognome: $cognome\nTelefono: $telefono\nEmail: $email\n\nMessaggio:\n$messaggio";

    // Imposta il mittente come l'email inserita dall'utente
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo "✅ Messaggio inviato con successo!";
    } else {
        echo "❌ Errore nell'invio.";
    }
} else {
    echo "Metodo non consentito.";
}
