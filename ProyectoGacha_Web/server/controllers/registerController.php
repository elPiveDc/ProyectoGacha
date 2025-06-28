<?php
include_once("../db/connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = trim($_POST['nombre']);
    $correo = trim($_POST['correo']);
    $contraseña = $_POST['contraseña'];

    // Encriptar la contraseña
    $hash = password_hash($contraseña, PASSWORD_DEFAULT);

    // Insertar en la BD
    $sql = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nombre, $correo, $hash);

    if ($stmt->execute()) {
        header("Location: /ProyectoGacha_Web/pages/iniciosesion.html");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Acceso no permitido.";
}
?>