document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("nombre");
  const correoInput = document.getElementById("correo");
  const mensajeInput = document.getElementById("mensaje");
  const form = document.getElementById("form-contacto");
  const enviarBtn = document.getElementById("enviar");

  let usuarioLogueado = false;

  fetch("../server/utils/session_status.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.logueado) {
        // Si es admin, redirigir automáticamente
        if (data.es_admin) {
          window.location.href = "/ProyectoGacha_Web/pages/vercomentarios.html";
          return;
        }

        nombreInput.value = data.nombre;
        correoInput.value = data.correo;
        nombreInput.readOnly = true;
        correoInput.readOnly = true;
        usuarioLogueado = true;
      }
    });

  // Manejo del envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!usuarioLogueado) {
      document.getElementById("popup-alerta3").style.display = "flex";
      return;
    }

    const mensaje = mensajeInput.value.trim();
    if (!mensaje) {
      alert("Por favor escribe un mensaje.");
      return;
    }

    const formData = new FormData();
    formData.append("mensaje", mensaje);

    const res = await fetch("../server/controllers/comentarioController.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.status === "ok") {
      alert("Mensaje enviado. ¡Gracias por contactarnos! 😊");
      mensajeInput.value = "";
    } else {
      alert("Error: " + data.msg);
    }
  });
});

function cerrarPopup3() {
  document.getElementById("popup-alerta3").style.display = "none";
}
