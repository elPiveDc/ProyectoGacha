// ===============================
// CARGAR NAV Y VERIFICAR SESIÓN
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  fetch("nav.html")
    .then((response) => response.text())
    .then((data) => {
      // Insertar el nav cargado dinámicamente
      const container = document.getElementById("nav-container");
      container.innerHTML = data;
      container.style.display = "block";

      // Asegurar que el CSS del nav está cargado
      const existingLink = document.querySelector(
        "link[href='/ProyectoGacha_Web/assets/css/nav.css']"
      );
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/ProyectoGacha_Web/assets/css/nav.css";
        document.head.appendChild(link);
      }

      // Ahora que el nav existe en el DOM, verificar sesión
      fetch("/ProyectoGacha_Web/server/utils/session_status.php")
        .then((response) => response.json())
        .then((data) => {
          const nombre = document.getElementById("nombre");
          const navUsuario = document.getElementById("nav-usuario");
          const btnDescarga = document.getElementById("btn-descargar");
          const btnDescargaMobile = document.getElementById("btn-descargar-mobile");

          if (data.logueado) {
            // Usuario logueado
            if (nombre) nombre.textContent = `Hola, ${data.nombre}`;
            if (navUsuario) {
              navUsuario.textContent = "Cerrar sesión";
              navUsuario.setAttribute(
                "href",
                "/ProyectoGacha_Web/server/utils/logout.php"
              );
            }
            if (btnDescarga) {
              btnDescarga.setAttribute(
                "href",
                "https://youtu.be/-wdR-fBr8oo?si=NLcKMMMRYXA_wcix"
              );
              btnDescarga.onclick = null;
            }
            if (btnDescargaMobile) {
              btnDescargaMobile.setAttribute(
                "href",
                "https://youtu.be/-wdR-fBr8oo?si=NLcKMMMRYXA_wcix"
              );
              btnDescargaMobile.onclick = null;
            }
          } else {
            // Usuario no logueado
            if (btnDescarga) btnDescarga.onclick = protegerDescarga;
            if (btnDescargaMobile) btnDescargaMobile.onclick = protegerDescarga;
          }
        })
        .catch((error) =>
          console.error("Error al verificar la sesión:", error)
        );
    })
    .catch((error) => console.error("Error al cargar el menú:", error));
});

// ===============================
// BLOQUEAR DESCARGA SIN SESIÓN
// ===============================

function protegerDescarga() {
  const popup = document.getElementById("popup-alerta");
  if (popup) {
    popup.style.display = "flex";
  }
}

function cerrarPopup() {
  const popup = document.getElementById("popup-alerta");
  if (popup) {
    popup.style.display = "none";
  }
}

// ===============================
// MENÚ LATERAL
// ===============================

function abrirMenu() {
  const menu = document.getElementById("menu-lateral");
  if (menu) {
    menu.style.width = "250px";
    menu.classList.add("open");
  }
  const overlay = document.getElementById("menu-overlay");
  if (overlay) {
    overlay.classList.add("active");
  }
}

function cerrarMenu() {
  const menu = document.getElementById("menu-lateral");
  if (menu) {
    menu.style.width = "0";
    menu.classList.remove("open");
  }
  const overlay = document.getElementById("menu-overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
}