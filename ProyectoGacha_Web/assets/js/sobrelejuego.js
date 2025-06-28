document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  function mostrarSlide() {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });

    index = (index + 1) % slides.length;
  }

  mostrarSlide(); // Mostrar el primero
  setInterval(mostrarSlide, 4000); // Cambiar cada 4 segundos
});
