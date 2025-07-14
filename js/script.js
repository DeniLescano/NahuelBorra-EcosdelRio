document.addEventListener("DOMContentLoaded", () => {
  // Carrusel automático
  const carruselInner = document.querySelector('.carrusel-inner');
  let index = 0;

  setInterval(() => {
    index = (index + 1) % 4; // cambia cada 4 imágenes
    carruselInner.style.transform = `translateX(-${index * 100}%)`;
  }, 4000); // cada 4 segundos

  // Modal
  const modal = document.getElementById("modalTransferencia");
  const btn = document.getElementById("btnAbrirModal");
  const span = document.querySelector(".cerrar");

  if (btn && modal && span) {
    btn.onclick = () => {
      modal.style.display = "block";
    };

    span.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  // Cuenta regresiva
  const fechaObjetivo = new Date("2025-08-03T00:00:00");

  function actualizarCuenta() {
    const ahora = new Date();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
      document.querySelector(".contador-v2").innerHTML = "¡El evento ya comenzó!";
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
  }

  const intervalo = setInterval(actualizarCuenta, 1000);
  actualizarCuenta();
});
