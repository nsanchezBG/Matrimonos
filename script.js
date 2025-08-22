document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA PARA EL EFECTO PARALLAX ---
    const parallaxElements = document.querySelectorAll('.parallax-content');

    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;

        parallaxElements.forEach(el => {
            // El 'data-speed' en el HTML controla la velocidad. 0.5 = mitad de la velocidad del scroll.
            let speed = parseFloat(el.dataset.speed) || 0.5;
            
            // Movemos el elemento verticalmente usando transform para un mejor rendimiento.
            el.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });


    // --- 2. LÓGICA PARA LA ANIMACIÓN DE APARICIÓN (BLUR) ---
    const fadeElements = document.querySelectorAll('.fade-in-section');

    // IntersectionObserver es mucho más eficiente que escuchar el evento 'scroll' para esto.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento está en la pantalla (isIntersecting)
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Opcional: dejamos de observar el elemento una vez que ya ha aparecido.
                observer.unobserve(entry.target);
            }
        });
    }, {
        // threshold: 0.1 significa que la animación se dispara cuando el 10% del elemento es visible.
        threshold: 0.1
    });

    // Le decimos al observador qué elementos debe vigilar.
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    
    // --- 3. LÓGICA PARA EL FORMULARIO DE CONFIRMACIÓN ---
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', function(event) {
        // Prevenimos el envío real del formulario para mostrar un mensaje.
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        alert(`¡Gracias por confirmar, ${nombre}! Nos vemos en la boda.`);
        
        // Limpiamos el formulario.
        rsvpForm.reset();
    });

});
