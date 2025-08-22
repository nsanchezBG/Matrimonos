document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA MEJORADA PARA EL EFECTO PARALLAX (VERSIÓN PARA ABSOLUTE POSITIONING) ---
    const parallaxSections = document.querySelectorAll('.parallax-section');

    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const content = section.querySelector('.parallax-content');
            if (!content) return; 

            const rect = section.getBoundingClientRect();
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                let speed = parseFloat(content.dataset.speed) || 0.5;
                let offset = rect.top * speed;

                // Combinamos el centrado inicial con el desplazamiento del parallax
                content.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
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
