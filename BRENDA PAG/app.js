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
    // NUEVO: Selecciona el botón de "Volver Arriba"
    const backToTopButton = document.querySelector('.back-to-top-fab');

    window.addEventListener('scroll', function() {
        // Lógica de la sombra del header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // NUEVO: Lógica del botón "Volver Arriba"
        // Muestra el botón después de bajar 400px
        if (window.scrollY > 400) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

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
       4. NUEVO PLUS: RESALTADO DE MENÚ (SCROLLSPY)
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpyObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Activa cuando la sección está en el medio de la pantalla
        threshold: 0
    };

    const scrollSpyCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Obtiene el ID de la sección (ej: "servicios")
                const id = entry.target.getAttribute('id');
                
                // Quita la clase 'active-link' de TODOS los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                });

                // Añade la clase 'active-link' solo al enlace correspondiente
                // Usamos querySelector para encontrar el enlace que tiene el href correcto
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

}); // Fin de DOMContentLoaded