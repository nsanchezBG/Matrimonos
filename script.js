document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA MEJORADA PARA EL EFECTO PARALLAX ---
    // Seleccionamos las secciones parallax, no solo el contenido
    const parallaxSections = document.querySelectorAll('.parallax-section');

    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const content = section.querySelector('.parallax-content');
            if (!content) return; // Si no hay contenido, no hagas nada

            // Obtenemos la posición de la sección en la ventana
            const rect = section.getBoundingClientRect();
            
            // 'rect.top' es la distancia desde la parte superior de la ventana a la sección.
            // Cuando la sección está en el centro de la pantalla, rect.top es cercano a 0 o negativo.
            // El cálculo asegura que el efecto se aplique mientras la sección es visible.
            const scrollValue = window.innerHeight - rect.top;
            
            // Verificamos si la sección está en el viewport para optimizar
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                let speed = parseFloat(content.dataset.speed) || 0.5;
                
                // Calculamos el desplazamiento relativo
                // Lo dividimos por un factor (ej: 4) para suavizar el efecto y evitar que se mueva demasiado
                let offset = (rect.top * speed) / 2;

                content.style.transform = `translateY(${offset}px)`;
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
