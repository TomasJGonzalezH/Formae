document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links, .nav-links-us');
    
    // Función para el scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Función para el menú móvil
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.toggle('show');
                menuIcon.classList.toggle('active');
            }
        });
    }

    // Cerrar menú al hacer click en un enlace
    const links = document.querySelectorAll('.nav-links a, .nav-links-us a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('show');
                menuIcon.classList.remove('active');
            }
        });
    });

    // Manejo de modales
    const openButtons = document.querySelectorAll('.open-btn');
    const modals = document.querySelectorAll('.css-modal');
    const closeButtons = document.querySelectorAll('.css-modal-close');
    const modalBackgrounds = document.querySelectorAll('.css-modal-bg');

    // Función para abrir modal
    openButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    // Función para cerrar modal
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Cerrar modal con el botón de cierre
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = this.closest('.css-modal');
            closeModal(modal);
        });
    });

    // Cerrar modal al hacer click en el fondo
    modalBackgrounds.forEach(bg => {
        bg.addEventListener('click', function() {
            const modal = this.closest('.css-modal');
            closeModal(modal);
        });
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // Función para inicializar los sliders
    function initProjectSliders() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const slider = card.querySelector('.slider-container');
            const slides = Array.from(slider.querySelectorAll('.slide'));
            const prevBtn = card.querySelector('.prev');
            const nextBtn = card.querySelector('.next');
            let currentSlide = 0;
            let isAnimating = false;

            // Clonar el primer y último slide para el efecto infinito
            const firstClone = slides[0].cloneNode(true);
            const lastClone = slides[slides.length - 1].cloneNode(true);
            slider.appendChild(firstClone);
            slider.insertBefore(lastClone, slides[0]);
            slides.unshift(lastClone);
            slides.push(firstClone);



            // Función para cambiar de slide
            function changeSlide(direction) {
                if (isAnimating) return;
                isAnimating = true;

                const currentSlideElement = slides[currentSlide];
                let nextSlideIndex;

                if (direction === 'next') {
                    nextSlideIndex = currentSlide + 1;
                    currentSlideElement.classList.remove('active');
                    currentSlideElement.classList.add('prev');
                } else {
                    nextSlideIndex = currentSlide - 1;
                    currentSlideElement.classList.remove('active');
                    currentSlideElement.classList.add('next');
                }

                const nextSlideElement = slides[nextSlideIndex];
                nextSlideElement.classList.remove('prev', 'next');
                nextSlideElement.classList.add('active');

                // Actualizar el índice actual
                currentSlide = nextSlideIndex;

                // Manejar el bucle infinito
                if (currentSlide === 0) {
                    setTimeout(() => {
                        currentSlide = slides.length - 2;
                        slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));
                        slides[currentSlide].classList.add('active');
                        slides.slice(0, currentSlide).forEach(slide => slide.classList.add('prev'));
                        slides.slice(currentSlide + 1).forEach(slide => slide.classList.add('next'));
                        isAnimating = false;
                    }, 500);
                } else if (currentSlide === slides.length - 1) {
                    setTimeout(() => {
                        currentSlide = 1;
                        slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));
                        slides[currentSlide].classList.add('active');
                        slides.slice(0, currentSlide).forEach(slide => slide.classList.add('prev'));
                        slides.slice(currentSlide + 1).forEach(slide => slide.classList.add('next'));
                        isAnimating = false;
                    }, 500);
                } else {
                    setTimeout(() => {
                        slides.forEach((slide, index) => {
                            if (index !== currentSlide) {
                                slide.classList.remove('active', 'prev', 'next');
                                if (index > currentSlide) {
                                    slide.classList.add('next');
                                } else {
                                    slide.classList.add('prev');
                                }
                            }
                        });
                        isAnimating = false;
                    }, 500);
                }
            }

            // Event listeners para los botones
            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    changeSlide('prev');
                });
                
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    changeSlide('next');
                });
            }
        });
    }

    // Inicializar los sliders cuando el DOM esté cargado
    if (document.querySelector('.project-card')) {
        initProjectSliders();
    }

    // Manejo del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            alert(`¡Gracias ${firstName}! Tu mensaje ha sido recibido. Te contactaremos pronto a ${email}.`);
            
            contactForm.reset();
        });
    }
}); 