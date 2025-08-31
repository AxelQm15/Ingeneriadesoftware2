(function () {
  'use strict';
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => r.querySelectorAll(s);

  document.addEventListener('DOMContentLoaded', function () {
    /* Header: sombra al hacer scroll */
    const header = $('.topbar');
    const onScrollHeader = () => { if (header) header.classList.toggle('scrolled', window.scrollY > 10); };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });

    /* Mega-menú móvil/tablet */
    const hasMega = $('.has-mega');
    const toggle  = hasMega ? $('.categories-toggle', hasMega) : null;
    if (toggle && hasMega) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
          e.preventDefault();
          const open = hasMega.classList.toggle('open');
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
      });
      document.addEventListener('click', (e) => {
        if (window.innerWidth < 992 && hasMega.classList.contains('open') && !hasMega.contains(e.target)) {
          hasMega.classList.remove('open'); toggle.setAttribute('aria-expanded','false');
        }
      });
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) { hasMega.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hasMega.classList.contains('open')) {
          hasMega.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.focus();
        }
      });
    }

    /* Carrusel: barra de progreso */
    const carouselEl = $('#heroCarousel');
    const bar = $('.carousel-progress .bar');
    const interval = carouselEl ? Number(carouselEl.getAttribute('data-bs-interval')) || 4200 : 4200;
    function startBar() {
      if (!bar) return;
      bar.style.transition = 'none'; bar.style.width = '0%';
      void bar.offsetWidth;
      bar.style.transition = `width ${interval}ms linear`;
      bar.style.width = '100%';
    }
    if (carouselEl) {
      carouselEl.addEventListener('slide.bs.carousel', startBar);
      startBar();
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (typeof bootstrap !== 'undefined') bootstrap.Carousel.getOrCreateInstance(carouselEl, { interval: false });
      }
    }

    /* Scroll reveal */
    const revealTargets = $$('.p-card, .circle-cat, .promo-banner, .logo-band img, .quote, .section-title');
    revealTargets.forEach(el => el.classList.add('reveal'));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((ents)=>{
        ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target);} });
      }, {threshold:.15});
      revealTargets.forEach(el => io.observe(el));
    } else {
      revealTargets.forEach(el => el.classList.add('show'));
    }

    /* Botón volver arriba */
    const toTop = $('#toTop');
    if (toTop) {
      const onScrollTopBtn = () => toTop.classList.toggle('show', window.scrollY > 400);
      onScrollTopBtn();
      window.addEventListener('scroll', onScrollTopBtn, { passive:true });
      toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    }

    /* Atajo "/" para enfocar búsqueda */
    const searchInput = $('.search-wrap input');
    window.addEventListener('keydown', (e)=>{
      const tag = document.activeElement?.tagName || '';
      if (e.key === '/' && !/input|textarea|select/i.test(tag)) { e.preventDefault(); searchInput?.focus(); }
    });

    /* Tema: color de marca + modo oscuro (persisten) */
    const root = document.documentElement;
    const savedAccent = localStorage.getItem('accent'); if (savedAccent) root.style.setProperty('--accent', savedAccent);
    const savedTheme  = localStorage.getItem('theme');  if (savedTheme === 'dark') document.body.classList.add('dark');
    $$('.theme-colors [data-accent]').forEach(btn=>{
      btn.addEventListener('click', ()=> {
        const c = btn.getAttribute('data-accent'); if (!c) return;
        root.style.setProperty('--accent', c); localStorage.setItem('accent', c);
      });
    });
    $('#toggleTheme')?.addEventListener('click', ()=>{
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    /* Respeta reduce-motion global */
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (carouselEl && typeof bootstrap !== 'undefined') {
        bootstrap.Carousel.getOrCreateInstance(carouselEl, { interval: false });
      }
    }
  });
})();
// Header fijo: espacio dinámico + estado scrolled + capas con offcanvas
(() => {
  const header = document.querySelector('.topbar');

  const syncHeaderSpace = () => {
    if (!header) return;
    const h = header.offsetHeight || 0;
    document.documentElement.style.setProperty('--topbar-h', h + 'px');
  };

  // Altura real del header (load, resize, fonts cargadas)
  window.addEventListener('load', syncHeaderSpace);
  window.addEventListener('resize', syncHeaderSpace);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncHeaderSpace);
  }

  // Sombra al hacer scroll
  document.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 4) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Cuando abre/cierra el carrito, desactiva clics en header (para que no se "cuelen")
  document.addEventListener('show.bs.offcanvas', () => header && header.classList.add('overlay-open'));
  document.addEventListener('hidden.bs.offcanvas', () => header && header.classList.remove('overlay-open'));

  // (Opcional) En móvil, abrir/cerrar el mega por click en "CATEGORÍAS"
  const catToggle = document.querySelector('.categories-toggle');
  const hasMega = catToggle?.closest('.has-mega');
  if (catToggle && hasMega) {
    catToggle.addEventListener('click', (e) => {
      // solo útil en pantallas táctiles; en desktop se abre por hover con CSS
      if (matchMedia('(hover: none)').matches) {
        e.preventDefault();
        hasMega.classList.toggle('open');
      }
    });
  }
})();
(() => {
  const header = document.querySelector('.topbar');

  const syncHeaderSpace = () => {
    if (!header) return;
    const h = header.offsetHeight || 82;
    document.documentElement.style.setProperty('--topbar-h', h + 'px');
  };

  window.addEventListener('load', syncHeaderSpace);
  window.addEventListener('resize', syncHeaderSpace);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHeaderSpace);

  document.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 4) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Evitar clics en header cuando el carrito está abierto
  document.addEventListener('show.bs.offcanvas', () => header?.classList.add('overlay-open'));
  document.addEventListener('hidden.bs.offcanvas', () => header?.classList.remove('overlay-open'));

  // En móvil, abrir/cerrar mega por click (en desktop ya abre por hover)
  const catToggle = document.querySelector('.categories-toggle');
  const hasMega = catToggle?.closest('.has-mega');
  if (catToggle && hasMega) {
    catToggle.addEventListener('click', (e) => {
      if (matchMedia('(hover: none)').matches) { e.preventDefault(); hasMega.classList.toggle('open'); }
    });
  }
})();
