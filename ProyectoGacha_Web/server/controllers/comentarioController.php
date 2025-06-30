<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "error", "msg" => "No autorizado."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario_id = $_SESSION['usuario_id'];
    $mensaje = trim($_POST['mensaje']);

    include_once("../db/connection.php");

    $sql = "INSERT INTO comentarios (id_usuario, mensaje) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $usuario_id, $mensaje);

    if ($stmt->execute()) {
        echo json_encode(["status" => "ok", "msg" => "Comentario guardado"]);
    } else {
        echo json_encode(["status" => "error", "msg" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>