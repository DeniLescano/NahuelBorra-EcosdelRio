document.addEventListener("DOMContentLoaded", () => {
    
    // --- Carrusel Infinito (Código Mejorado) ---
    const carruselInner = document.querySelector('.carrusel-inner');
    if (carruselInner) {
        const originalSlides = carruselInner.querySelectorAll('img');
        const slideCount = originalSlides.length;
        
        // 1. No hacer nada si no hay imágenes
        if (slideCount > 0) {
            // 2. Clonar todas las imágenes y añadirlas al final para el efecto de bucle
            originalSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                carruselInner.appendChild(clone);
            });

            let currentIndex = 0;
            const intervalTime = 4000; // 4 segundos entre cada foto

            const moveNext = () => {
                currentIndex++;
                // Mueve el carrusel hacia la izquierda
                carruselInner.style.transform = `translateX(-${currentIndex * 100}vw)`;
                
                // 3. Lógica para el reinicio "mágico"
                // Cuando llegamos al final de las imágenes originales (ahora estamos en los clones)
                if (currentIndex >= slideCount) {
                    // Esperamos a que la transición CSS termine (1s)
                    setTimeout(() => {
                        // Desactivamos la animación de transición
                        carruselInner.style.transition = 'none';
                        // Saltamos de vuelta al inicio sin que el usuario lo vea
                        currentIndex = 0;
                        carruselInner.style.transform = 'translateX(0)';
                        
                        // Forzamos al navegador a aplicar el cambio y LUEGO reactivamos la transición
                        // para que el siguiente movimiento sea suave.
                        setTimeout(() => {
                            carruselInner.style.transition = 'transform 1s ease-in-out';
                        }, 50); // Un pequeño retardo es suficiente

                    }, 1000); // Este tiempo debe coincidir con la duración de la transición en tu CSS
                }
            };

            setInterval(moveNext, intervalTime);
        }
    }

    // --- Modal ---
    const modal = document.getElementById("modalTransferencia");
    const btn = document.getElementById("btnAbrirModal");
    const span = document.querySelector(".cerrar");

    // Tu código del modal está perfecto, puedes dejarlo como está.
    if (btn && modal && span) {
        btn.onclick = () => {
            // Pequeña corrección: usa 'flex' en lugar de 'block' para que el centrado vertical funcione mejor.
            modal.style.display = "flex";
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

    // --- Cuenta regresiva ---
    // Tu código de la cuenta regresiva también está perfecto. Déjalo como está.
    const fechaObjetivo = new Date("2025-08-03T00:00:00");

    function actualizarCuenta() {
        const ahora = new Date();
        const diferencia = fechaObjetivo - ahora;

        if (diferencia <= 0) {
            const contadorElement = document.querySelector(".contador-v2");
            if(contadorElement) {
                contadorElement.innerHTML = "¡El evento ya comenzó!";
            }
            clearInterval(intervalo);
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        
        const diasEl = document.getElementById("dias");
        const horasEl = document.getElementById("horas");
        const minutosEl = document.getElementById("minutos");

        if(diasEl) diasEl.textContent = dias;
        if(horasEl) horasEl.textContent = horas;
        if(minutosEl) minutosEl.textContent = minutos;
    }

    const intervalo = setInterval(actualizarCuenta, 1000);
    actualizarCuenta();
});