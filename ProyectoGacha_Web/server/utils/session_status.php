<?php
session_start();

// Preparar la respuesta
$response = [
  "logueado" => isset($_SESSION['usuario_id']),
  "nombre"   => $_SESSION['usuario_nombre'] ?? "",
  "correo"   => $_SESSION['usuario_correo'] ?? "",
  "es_admin" => $_SESSION['es_admin'] ?? false
];

// Enviar como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
