// ===============================
// VALIDACIÓN DE FORMULARIO DE LOGIN
// ===============================
function validarFormulario() {
  const correo = document.getElementById("correo").value.trim();
  const contraseña = document.getElementById("contraseña").value.trim();

  if (correo === "" || contraseña === "") {
    alert("Por favor completa todos los campos.");
    return false;
  }

  return true;
}

// ===============================
// VALIDACIÓN DE FORMULARIO DE REGISTRO
// ===============================
function validarRegistro() {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contraseña = document.getElementById("contraseña").value;
  const confirmar = document.getElementById("confirmar").value;

  if (!nombre || !correo || !contraseña || !confirmar) {
    alert("Por favor completa todos los campos.");
    return false;
  }

  if (contraseña !== confirmar) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  if (contraseña.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return false;
  }

  return true;
}

// ===============================
// VERIFICACIÓN DE SESIÓN Y ACTUALIZACIÓN DEL NAV
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  fetch("/ProyectoGacha_Web/server/utils/session_status.php")
    .then((response) => response.json())
    .then((data) => {
      const navUsuario = document.getElementById("nav-usuario");
      const btnDescarga = document.getElementById("btn-descargar");

      if (data.logueado) {
        // Mostrar nav con nombre y cerrar sesión
        navUsuario.innerHTML = `
          <span style="color: white;">Hola, ${data.nombre}</span>
          <a href="/ProyectoGacha_Web/server/utils/logout.php">Cerrar sesión</a>
        `;

        // Activar enlace de descarga real
        btnDescarga.setAttribute("href", "https://youtu.be/-wdR-fBr8oo?si=NLcKMMMRYXA_wcix");
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

/* ================================
  VER 👁️ Y OCULTAR 🙈 CONTRASEÑA 
================================== */

function togglePassword(inputId, toggleIcon) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  toggleIcon.textContent = isPassword ? "🙈" : "👁️";
}

