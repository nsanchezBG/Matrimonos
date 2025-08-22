document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA PARALLAX ---
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

    // --- 2. LÓGICA DE ANIMACIÓN ---
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

    // --- 3. LÓGICA PARA ENVIAR EL FORMULARIO A GOOGLE APPS SCRIPT ---
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const button = form.querySelector('button');
        const originalButtonText = button.textContent;
        
        // PEGA AQUÍ LA URL DE TU APLICACIÓN WEB QUE COPIASTE EN EL PASO 3
        const webAppUrl = 'https://script.google.com/macros/s/AKfycbzmE6gpYWrsrmXU2LY214o967nWjFHHTVOQFGX76KtBNYA2bCEUi-IJySVPjzmXXouH6w/exec'; 

        button.textContent = 'Enviando...';
        button.disabled = true;

        fetch(webAppUrl, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                form.reset();
                button.textContent = '¡Confirmado!';
                setTimeout(() => {
                    button.textContent = originalButtonText;
                    button.disabled = false;
                }, 3000);
            } else {
                // Si algo saliera mal en el script, lo veríamos aquí
                throw new Error('El servidor respondió con un error.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar la confirmación. Por favor, inténtalo de nuevo.');
            button.textContent = originalButtonText;
            button.disabled = false;
        });
    });
});
