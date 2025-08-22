document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA PARALLAX COMPATIBLE CON FLEXBOX ---
    const parallaxContent = document.querySelectorAll('.parallax-content');

    window.addEventListener('scroll', () => {
        // La lógica original funciona perfectamente ahora que el CSS se encarga del centrado.
        // Mueve el contenido a una velocidad diferente al scroll.
        let scrollPosition = window.pageYOffset;

        parallaxContent.forEach(el => {
            // El 'data-speed' en el HTML controla la velocidad.
            let speed = parseFloat(el.dataset.speed) || 0.5;
            
            // Usamos una traslación vertical simple. Flexbox mantiene el centrado horizontal.
            // Restamos parte del scroll para que el efecto no sea tan pronunciado al inicio.
            // Este cálculo es más sutil y funciona mejor con el centrado de Flexbox.
            let parentSection = el.closest('.parallax-section');
            let sectionTop = parentSection.offsetTop;
            let relativeScroll = scrollPosition - sectionTop;
            
            // Aplicamos el efecto solo cuando la sección está cerca de la vista.
            if (scrollPosition + window.innerHeight > sectionTop && scrollPosition < sectionTop + parentSection.offsetHeight) {
                 el.style.transform = `translateY(${relativeScroll * speed * 0.5}px)`;
            }
        });
    });


    // --- 2. LÓGICA PARA LA ANIMACIÓN DE APARICIÓN (BLUR) ---
    const fadeElements = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

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
