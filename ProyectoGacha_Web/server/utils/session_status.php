<?php
session_start();

$response = [
  "logueado" => isset($_SESSION['usuario_id']),
  "nombre" => $_SESSION['usuario_nombre'] ?? ""
];

header('Content-Type: application/json');
echo json_encode($response);
