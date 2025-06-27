<?php
session_start();
include_once("/ProyectoGacha_Web/server/db/connection.php");

$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];

$sql = "SELECT * FROM usuarios WHERE correo = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($usuario = $result->fetch_assoc()) {
    if (password_verify($contraseña, $usuario['contraseña'])) {
        // Guardar en sesión
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_nombre'] = $usuario['nombre'];

        // Redirigir a la pantalla flotante de bienvenida
        header("Location: /ProyectoGacha_Web/pages/menuPrincipal.html");
        exit();
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "Usuario no encontrado.";
}
