<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "proyecto_gacha";
$puerto = 3306;

$conn = new mysqli($host, $user, $pass, $db, $puerto);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

?>