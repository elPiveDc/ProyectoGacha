<?php
session_start();
require_once("../db/connection.php");

$usuario_id = $_SESSION['usuario_id'] ?? null;

// Si se solicita solo la puntuación del usuario logueado
if (isset($_GET['usuario']) && $usuario_id) {
    // Consulta con ROW_NUMBER() para encontrar la posición
    $sql = "
        SELECT * FROM (
            SELECT u.nombre, p.puntuacion, 
                   ROW_NUMBER() OVER (ORDER BY p.puntuacion DESC) AS ranking
            FROM puntuaciones p
            JOIN usuarios u ON p.id_usuario = u.id
        ) AS ranking_general
        WHERE nombre = (
            SELECT nombre FROM usuarios WHERE id = ?
        )
        LIMIT 1
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $usuario_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $fila = $result->fetch_assoc();

    if ($fila) {
        echo json_encode(["status" => "ok", "data" => $fila]);
    } else {
        echo json_encode(["status" => "no_score", "msg" => "Aún no tienes puntuación registrada. Juega para obtenerla."]);
    }
    exit;
}

// Consulta global para el ranking general (top 10)
$sql = "
    SELECT u.nombre, p.puntuacion 
    FROM puntuaciones p
    JOIN usuarios u ON p.id_usuario = u.id
    ORDER BY p.puntuacion DESC 
    LIMIT 10
";

$result = $conn->query($sql);
$datos = [];

while ($fila = $result->fetch_assoc()) {
    $datos[] = $fila;
}

echo json_encode($datos);
?>
