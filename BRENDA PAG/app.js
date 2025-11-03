// Espera a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {

    /* ==========================================
       1. PLUS: MENÚ MÓVIL (Hamburguesa)
       ========================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Función para mostrar/ocultar menú
    const toggleMenu = () => {
        navMenu.classList.toggle('show-menu');
        // Cambiar ícono (opcional, si quieres cambiar de menú a X)
        if (navToggle.firstElementChild.classList.contains('bx-menu')) {
            navToggle.firstElementChild.classList.replace('bx-menu', 'bx-x');
        } else {
            navToggle.firstElementChild.classList.replace('bx-x', 'bx-menu');
        }
    };

    // Evento al hacer clic en el botón
    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Cierra el menú cuando se hace clic en un enlace (para SPAs)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show-menu')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================
       2. PLUS: SOMBRA EN HEADER Y BOTÓN "VOLVER ARRIBA"
       ========================================== */
    const header = document.getElementById('header');
    const backToTopButton = document.querySelector('.back-to-top-fab');

    // Maneja el botón de volver arriba solo si existe
    const handleScroll = () => {
        // Lógica de la sombra del header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Lógica del botón "Volver Arriba" (solo si el botón existe)
        if (backToTopButton) {
            if (window.scrollY > 400) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    };
    
    // Agrega el listener para el scroll
    window.addEventListener('scroll', handleScroll);
    
    // Ejecuta una vez al cargar por si la página se recarga a mitad
    handleScroll(); 


    /* ==========================================
       3. PLUS: ANIMACIÓN "FADE-IN" EN SECCIONES
       ========================================== */
    
    // Configura el observador
    const revealObserverOptions = {
        root: null, // Observa en relación al viewport
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    // Función que se ejecuta cuando un elemento entra en vista
    const revealObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase 'visible' para activar la animación CSS
                entry.target.classList.add('visible');
                // Deja de observar el elemento una vez que ha sido animado
                observer.unobserve(entry.target);
            }
        });
    };

    // Crea el observador
    const revealObserver = new IntersectionObserver(revealObserverCallback, revealObserverOptions);

    // Selecciona todos los elementos que quieres animar
    const revealElements = document.querySelectorAll('.reveal');

    // Observa cada elemento
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================
       4. PLUS: RESALTADO DE MENÚ (SCROLLSPY)
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    
    // Solo ejecuta el ScrollSpy si hay secciones con ID (evita errores en páginas internas)
    if (sections.length > 0 && navLinks.length > 0) {
        const scrollSpyObserverOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px', // Activa cuando la sección está en el medio de la pantalla
            threshold: 0
        };

        const scrollSpyCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active-link');
                    });

                    const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active-link');
                    }
                }
            });
        };

        // Crea el nuevo observador
        const scrollSpyObserver = new IntersectionObserver(scrollSpyCallback, scrollSpyObserverOptions);

        // Observa todas las secciones
        sections.forEach(section => {
            scrollSpyObserver.observe(section);
        });
    }


    /* ==========================================
       5. NUEVO PLUS: FORMULARIO DE WHATSAPP
       ========================================== */
    const whatsappButton = document.getElementById('send-whatsapp-btn');

    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            
            // 1. Obtener los valores del formulario
            const phone = '524771536564'; // Tu número de WhatsApp
            const name = document.getElementById('wa_name').value;
            const service = document.getElementById('wa_service').value;
            const message = document.getElementById('wa_message').value;

            // 2. Validar que el nombre no esté vacío
            if (name.trim() === '') {
                alert('Por favor, ingresa tu nombre.');
                document.getElementById('wa_name').focus();
                return;
            }

            // 3. Crear el mensaje pre-escrito
            let text = `¡Hola Dra. Brenda! Soy *${name}*.\n\nMe gustaría agendar una cita para el servicio de: *${service}*.\n\n`;
            
            // Añadir mensaje adicional solo si existe
            if (message.trim() !== '') {
                text += `Mensaje adicional: ${message}`;
            }

            // 4. Codificar el mensaje para la URL
            const encodedText = encodeURIComponent(text);

            // 5. Crear la URL final y abrirla
            const url = `https://wa.me/${phone}?text=${encodedText}`;
            
            window.open(url, '_blank');
        });
    }

}); // Fin de DOMContentLoaded