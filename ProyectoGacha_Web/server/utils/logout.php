<?php
session_start();
session_unset();
session_destroy();
header("Location: /ProyectoGacha_Web/pages/menuPrincipal.html"); 
exit();
?>