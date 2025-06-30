document.addEventListener("DOMContentLoaded", function () {
  fetch("nav.html")
    .then((response) => response.text())
    .then((data) => {
      const container = document.getElementById("nav-container");
      container.innerHTML = data;
      container.style.display = "block";

      const existingLink = document.querySelector(
        "link[href='/ProyectoGacha_Web/assets/css/nav.css']"
      );
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/ProyectoGacha_Web/assets/css/nav.css";
        document.head.appendChild(link);
      }
    })
    .catch((error) => console.error("Error al cargar el menú:", error));
});


// ===============================
// VERIFICACIÓN DE SESIÓN Y ACTUALIZACIÓN DEL NAV
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  fetch("/ProyectoGacha_Web/server/utils/session_status.php")
    .then((response) => response.json())
    .then((data) => {
      const nombre = document.getElementById("nombre");
      const navUsuario = document.getElementById("nav-usuario");
      const btnDescarga = document.getElementById("btn-descargar");

      if (data.logueado) {
        // Mostrar nav con nombre y cerrar sesión
        

        nombre.innerHTML = `<p>Hola, ${data.nombre}</p>`;
        navUsuario.innerHTML = `<a href="/ProyectoGacha_Web/server/utils/logout.php">Cerrar sesión</a>`;

        // Activar enlace de descarga real
        btnDescarga.setAttribute(
          "href",
          "https://youtu.be/-wdR-fBr8oo?si=NLcKMMMRYXA_wcix"
        );
        btnDescarga.onclick = null;
      } else {
        // Usuario no logueado: proteger botón
        btnDescarga.onclick = protegerDescarga;
      }
    });
});

// ===============================
// FUNCIÓN PARA BLOQUEAR DESCARGA SIN SESIÓN
// ===============================
function protegerDescarga() {
  const popup = document.getElementById("popup-alerta");
  if (popup) {
    popup.style.display = "flex";
  }
}

function cerrarPopup() {
    document.getElementById('popup-alerta').style.display = 'none';
  }