<?php
session_start();
require_once("../db/connection.php");

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "error", "msg" => "No autorizado."]);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mensaje = trim($_POST['mensaje']);

    $sql = "INSERT INTO comentarios (id_usuario, mensaje) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $usuario_id, $mensaje);

    if ($stmt->execute()) {
        echo json_encode(["status" => "ok", "msg" => "Comentario guardado"]);
    } else {
        echo json_encode(["status" => "error", "msg" => $stmt->error]);
    }
    $stmt->close();
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Verificar si es administrador
    $checkAdmin = $conn->prepare("SELECT * FROM administradores WHERE id_usuario = ?");
    $checkAdmin->bind_param("i", $usuario_id);
    $checkAdmin->execute();
    $isAdmin = $checkAdmin->get_result()->num_rows > 0;
    $checkAdmin->close();

    if (!$isAdmin) {
        echo json_encode(["status" => "error", "msg" => "Acceso denegado"]);
        exit;
    }

    // Obtener comentarios con nombres
    $sql = "SELECT c.id, u.nombre, c.mensaje, c.fecha FROM comentarios c JOIN usuarios u ON c.id_usuario = u.id ORDER BY c.fecha DESC";
    $result = $conn->query($sql);
    $comentarios = [];
    while ($fila = $result->fetch_assoc()) {
        $comentarios[] = $fila;
    }
    echo json_encode(["status" => "ok", "data" => $comentarios]);
}
$conn->close();
?>