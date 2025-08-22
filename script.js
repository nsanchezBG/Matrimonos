document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA PARALLAX COMPATIBLE CON FLEXBOX ---
    const parallaxContent = document.querySelectorAll('.parallax-content');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        parallaxContent.forEach(el => {
            let speed = parseFloat(el.dataset.speed) || 0.5;
            let parentSection = el.closest('.parallax-section');
            if (!parentSection) return;
            let sectionTop = parentSection.offsetTop;
            let relativeScroll = scrollPosition - sectionTop;
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
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));

    // --- 3. LÓGICA PARA ENVIAR EL FORMULARIO A GOOGLE SHEETS SIN REDIRECCIÓN ---
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene que la página se recargue

        const form = event.target;
        const formData = new FormData(form);
        const button = form.querySelector('button');
        const originalButtonText = button.textContent;
        
        // ¡ESTA ES TU URL! YA ESTÁ LISTA.
        const googleFormUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeRFRgmDIKoPfOaOEPv29tlYyPhKZvKffbOl63nfC3k49JCfg/formResponse'; 

        button.textContent = 'Enviando...';
        button.disabled = true;

        // Enviamos los datos en segundo plano
        fetch(googleFormUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Modo especial para evitar errores de CORS con Google
        })
        .then(() => {
            // El envío fue exitoso
            form.reset(); // Limpia el formulario
            button.textContent = '¡Confirmado!';
            setTimeout(() => {
                button.textContent = originalButtonText; // Restaura el texto original del botón
                button.disabled = false;
            }, 3000); // Después de 3 segundos
        })
        .catch(error => {
            // Ocurrió un error de red
            console.error('Error:', error);
            alert('Hubo un error al enviar la confirmación. Por favor, inténtalo de nuevo.');
            button.textContent = originalButtonText;
            button.disabled = false;
        });
    });
});
