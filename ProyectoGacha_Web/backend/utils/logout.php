<?php
session_start();
session_unset();
session_destroy();
header("Location: ../../principal.html"); // subir dos niveles
exit();