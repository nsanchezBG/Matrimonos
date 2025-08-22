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
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
