<?php
session_start();
include_once("../db/connection.php");

header('Content-Type: application/json');

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
        $_SESSION['usuario_correo'] = $correo;

        // Verificar si es admin
        $adminSql = "SELECT 1 FROM administradores WHERE id_usuario = ? LIMIT 1";
        $adminStmt = $conn->prepare($adminSql);
        $adminStmt->bind_param("i", $usuario['id']);
        $adminStmt->execute();
        $esAdmin = $adminStmt->get_result()->num_rows > 0;
        $_SESSION['es_admin'] = $esAdmin;

        // Respuesta para JS
        echo json_encode([
            "status" => "ok",
            "es_admin" => $esAdmin
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "msg" => "Contraseña incorrecta."
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "msg" => "Usuario no encontrado."
    ]);
}
?>