document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla-comentarios");
  const filtroUsuario = document.getElementById("filtro-usuario");
  const filtroReciente = document.getElementById("filtro-reciente");
  const btnInicio = document.getElementById("btn-inicio");

  let comentarios = [];

  function cargarComentarios() {
    fetch("/ProyectoGacha_Web/server/controllers/comentarioController.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "ok") {
          alert(data.msg);
          window.location.href = "/ProyectoGacha_Web/pages/menuPrincipal.html";
          return;
        }

        comentarios = data.data;
        renderizarComentarios(comentarios);
      })
      .catch((err) => {
        console.error("Error cargando comentarios:", err);
        alert("Error al cargar comentarios.");
      });
  }

  function renderizarComentarios(lista) {
    tabla.innerHTML = "";
    if (lista.length === 0) {
      alert("No se encontraron comentarios para este filtro.");
      return;
    }

    lista.forEach((com) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${com.nombre}</td>
        <td>${com.mensaje}</td>
        <td>${new Date(com.fecha).toLocaleString()}</td>
      `;
      tabla.appendChild(fila);
    });
  }

  filtroUsuario.addEventListener("input", () => {
    const nombre = filtroUsuario.value.toLowerCase();
    const filtrados = comentarios.filter((c) =>
      c.nombre.toLowerCase().includes(nombre)
    );
    renderizarComentarios(filtrados);
  });

  filtroReciente.addEventListener("change", () => {
    const ordenado = [...comentarios];
    ordenado.sort((a, b) => {
      return filtroReciente.value === "recientes"
        ? new Date(b.fecha) - new Date(a.fecha)
        : new Date(a.fecha) - new Date(b.fecha);
    });
    renderizarComentarios(ordenado);
  });

  btnInicio.addEventListener("click", () => {
    window.location.href = "/ProyectoGacha_Web/pages/menuPrincipal.html";
  });

  cargarComentarios();
});
