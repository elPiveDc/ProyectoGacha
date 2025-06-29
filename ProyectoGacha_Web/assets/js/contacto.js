function mostrarPopup() {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !correo || !mensaje) {
    alert("Por favor completa todos los campos.");
    return false;
  }

  // Mostrar el popup
  const popup = document.getElementById("popup-confirmacion");
  popup.style.display = "flex";

  // Limpiar el formulario
  document.getElementById("form-contacto").reset();

  return false;
}

function cerrarPopup() {
  const popup = document.getElementById("popup-confirmacion");
  popup.style.display = "none";
}
