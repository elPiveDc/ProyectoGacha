document.addEventListener("DOMContentLoaded", () => {
  iniciarCarrusel();
  cargarPuntajes();
});

// ========================
// CARRUSEL
// ========================
function iniciarCarrusel() {
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  function mostrarSlide() {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });

    index = (index + 1) % slides.length;
  }

  mostrarSlide();
  setInterval(mostrarSlide, 4000);
}

// ========================
// CARGAR RANKING COMPLETO
// ========================
function cargarPuntajes() {
  fetch("/ProyectoGacha_Web/server/controllers/tablaPuntajeController.php")
    .then((res) => res.json())
    .then((datos) => {
      const tbody = document.querySelector("#tabla-puntajes tbody");
      tbody.innerHTML = "";

      fetch("/ProyectoGacha_Web/server/utils/session_status.php")
        .then((res) => res.json())
        .then((session) => {
          const usuarioActual = session.logueado ? session.nombre : null;

          datos.forEach((fila, index) => {
            const tr = document.createElement("tr");

            if (index === 0) tr.classList.add("top1");
            else if (index === 1) tr.classList.add("top2");
            else if (index === 2) tr.classList.add("top3");

            if (fila.nombre === usuarioActual) {
              tr.classList.add("usuario-actual");
            }

            tr.innerHTML = `
              <td>${index + 1}</td>
              <td>${fila.nombre}</td>
              <td>${fila.puntuacion}</td>
            `;
            tbody.appendChild(tr);
          });
        });
    })
    .catch((error) => console.error("Error al cargar los puntajes:", error));
}

// ========================
// BUSCAR PUNTAJE PROPIO
// ========================
function buscarMiPuntaje() {
  fetch("/ProyectoGacha_Web/server/utils/session_status.php")
    .then((res) => res.json())
    .then((data) => {

      if (!data.logueado) {
        document.getElementById("popup-alerta2").style.display = "flex";
        return;
      }

      fetch("/ProyectoGacha_Web/server/controllers/tablaPuntajeController.php?usuario=1")
        .then((res) => res.json())
        .then((datos) => {
          const tbody = document.querySelector("#tabla-puntajes tbody");
          tbody.innerHTML = "";

          if (datos.status === "ok") {
            const fila = datos.data;

            const tr = document.createElement("tr");
            tr.classList.add("usuario-actual");

            // Añadir clase de medalla si está en el top 3
            if (fila.ranking === 1) tr.classList.add("top1");
            else if (fila.ranking === 2) tr.classList.add("top2");
            else if (fila.ranking === 3) tr.classList.add("top3");

            tr.innerHTML = `
              <td>${fila.ranking}</td>
              <td>${fila.nombre}</td>
              <td>${fila.puntuacion}</td>
            `;
            tbody.appendChild(tr);
          } else if (datos.status === "no_score") {
            alert(datos.msg);
          }
        });
    })
    .catch((err) => console.error("Error al buscar puntuación:", err));
}

// ========================
// CERRAR POPUP
// ========================
function cerrarPopup2() {
  document.getElementById("popup-alerta2").style.display = "none";
}
