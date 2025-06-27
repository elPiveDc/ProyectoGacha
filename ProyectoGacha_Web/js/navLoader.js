document.addEventListener("DOMContentLoaded", function () {
  fetch("nav.html")
    .then((response) => response.text())
    .then((data) => {
      const container = document.getElementById("nav-container");
      container.innerHTML = data;
      container.style.display = "block";
    })
    .catch((error) => console.error("Error al cargar el menú:", error));
});
