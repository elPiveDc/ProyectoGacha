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

/* ================================
  VER 👁️ Y OCULTAR 🙈 CONTRASEÑA 
================================== */

function togglePassword(inputId, toggleIcon) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  toggleIcon.textContent = isPassword ? "🙈" : "👁️";
}
