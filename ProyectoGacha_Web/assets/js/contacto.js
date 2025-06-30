document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("nombre");
  const correoInput = document.getElementById("correo");
  const mensajeInput = document.getElementById("mensaje");
  const popup = document.getElementById("popup-alerta");
  const form = document.getElementById("form-contacto");

  let usuarioLogueado = false;

  fetch("../server/utils/session_status.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.logueado) {
        nombreInput.value = data.nombre;
        correoInput.value = data.correo;
        nombreInput.readOnly = true;
        correoInput.readOnly = true;
        usuarioLogueado = true;
      }
    });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!usuarioLogueado) {
      popup.style.display = "flex";
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
      alert(`Mensaje enviado. ¡Gracias por contactarnos! 😊`);
      mensajeInput.value = "";
    } else {
      alert("Error: " + data.msg);
    }
  });
});
