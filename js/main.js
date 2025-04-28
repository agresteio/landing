/**
 * main.js - Agreste.io
 * Scripts principales del sitio web
 */

document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const portfolioFilters = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.add('active');
            
            // Crear botón para cerrar menú si no existe
            if (!document.querySelector('.menu-close')) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'menu-close';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                closeBtn.setAttribute('aria-label', 'Cerrar menú');
                nav.appendChild(closeBtn);
                
                closeBtn.addEventListener('click', () => {
                    nav.classList.remove('active');
                });
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Header scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navegación smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo si el enlace apunta a un ID en la misma página
            if (this.getAttribute('href').startsWith('#') && this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - header.offsetHeight - 20;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Tabs de soluciones
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Agregar clase active al botón clickeado
                button.classList.add('active');
                
                // Mostrar contenido correspondiente
                const tabId = button.getAttribute('data-tab');
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // Filtro de portfolio
    if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remover clase active de todos los filtros
                portfolioFilters.forEach(btn => btn.classList.remove('active'));
                
                // Agregar clase active al filtro clickeado
                filter.classList.add('active');
                
                const category = filter.getAttribute('data-filter');
                
                // Filtrar elementos
                portfolioItems.forEach(item => {
                    if (category === 'all' || item.classList.contains(category)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Añadir animaciones al hacer scroll
    const animateElements = document.querySelectorAll('.animate-zoomIn, .animate-slideInUp');
    
    if (animateElements.length > 0) {
        // Inicialmente configurar los elementos como invisibles
        animateElements.forEach(el => {
            el.style.opacity = '0';
        });
        
        // Función para animar elementos cuando son visibles
        const animateOnScroll = () => {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150; // Píxeles antes de que el elemento sea visible
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                }
            });
        };
        
        // Ejecutar una vez al cargar
        animateOnScroll();
        
        // Ejecutar al hacer scroll
        window.addEventListener('scroll', animateOnScroll);
    }

    // Validación del formulario de contacto
    const contactForm = document.querySelector('.contacto-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            
            // Validaciones básicas
            if (!nombre.value.trim()) {
                showError(nombre, 'Por favor ingresa tu nombre');
                isValid = false;
            } else {
                removeError(nombre);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Por favor ingresa tu correo electrónico');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor ingresa un correo electrónico válido');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (!mensaje.value.trim()) {
                showError(mensaje, 'Por favor ingresa tu mensaje');
                isValid = false;
            } else {
                removeError(mensaje);
            }
            
            if (isValid) {
                // Aquí iría el código para enviar el formulario
                // Por ahora solo simulamos el envío
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = 'Enviando...';
                
                setTimeout(() => {
                    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }, 2000);
            }
        });
    }

    // Funciones auxiliares para la validación
    function showError(input, message) {
        const formGroup = input.parentElement;
        
        if (!formGroup.querySelector('.error-message')) {
            const error = document.createElement('small');
            error.className = 'error-message';
            error.style.color = 'red';
            error.style.display = 'block';
            error.style.marginTop = '5px';
            error.textContent = message;
            
            formGroup.appendChild(error);
        } else {
            formGroup.querySelector('.error-message').textContent = message;
        }
        
        input.style.borderColor = 'red';
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message');
        
        if (error) {
            formGroup.removeChild(error);
        }
        
        input.style.borderColor = '';
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    // Newsletter
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                alert('Por favor ingresa un correo electrónico válido');
                return;
            }
            
            alert('¡Gracias por suscribirte a nuestro newsletter!');
            this.reset();
        });
    }

    // Añadir botón de WhatsApp flotante
    if (!document.querySelector('.whatsapp-float')) {
        const whatsappBtn = document.createElement('a');
        whatsappBtn.className = 'whatsapp-float';
        whatsappBtn.href = 'https://wa.me/5215512345678'; // Cambiar por el número real
        whatsappBtn.target = '_blank';
        whatsappBtn.rel = 'noopener noreferrer';
        whatsappBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        
        document.body.appendChild(whatsappBtn);
    }
}); 