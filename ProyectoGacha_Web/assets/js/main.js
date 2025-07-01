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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("/ProyectoGacha_Web/server/controllers/logincontroller.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((respuesta) => {
        if (respuesta.status === "ok") {
          if (respuesta.es_admin) {
            // Mostrar confirmación con opciones
            const irComentarios = confirm(
              "Has iniciado sesión como administrador.\n¿Deseas ir a la página de revisión de comentarios?"
            );
            if (irComentarios) {
              window.location.href =
                "/ProyectoGacha_Web/pages/vercomentarios.html";
            } else {
              window.location.href =
                "/ProyectoGacha_Web/pages/menuPrincipal.html";
            }
          } else {
            // Redirigir normal
            window.location.href =
              "/ProyectoGacha_Web/pages/menuPrincipal.html";
          }
        } else {
          alert(respuesta.msg);
        }
      })
      .catch((err) => {
        console.error("Error al iniciar sesión:", err);
        alert("Ocurrió un error al iniciar sesión.");
      });
  });
});

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

/* ================================
  VER 👁️ Y OCULTAR 🙈 CONTRASEÑA 
================================== */

function togglePassword(inputId, toggleIcon) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  toggleIcon.textContent = isPassword ? "🙈" : "👁️";
}
