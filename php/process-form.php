<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = $_GET["cf-name"];
    $email = $_GET["cf-email"];
    $message = $_GET["cf-message"];

    // Adresse e-mail de destination
    $to = "sydoladomade@gmail.com";

    // Sujet de l'e-mail
    $subject = "Nouveau message depuis votre site internet";

    // Corps de l'e-mail
    $body = "Nom: $name\n";
    $body .= "E-mail: $email\n";
    $body .= "Message:\n$message";

    // En-têtes de l'e-mail
    $headers = "From: $email";

    // Envoyer l'e-mail
    mail($to, $subject, $body, $headers);
} 
?>
