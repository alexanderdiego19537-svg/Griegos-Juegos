/* ═══════════════════════════════════════════════════════════════
   GRIEGOS JUEGOS — main.js
   Header scroll · Hamburger · Smooth scroll · AOS · Countdown · FAQ · Stats counter · Catalog filter
   ═══════════════════════════════════════════════════════════════ */

/* ─── CATALOG FILTER ─── */
function initCatalogFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.products-grid .product-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cat = card.dataset.category || 'all';
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}


(function () {
  'use strict';

  /* ─── HEADER SCROLL EFFECT ─── */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── HAMBURGER / MOBILE NAV ─── */
  const hamburger    = document.getElementById('hamburger');
  const mobileNav    = document.getElementById('mobile-nav');
  const mobileOverlay= document.getElementById('mobile-overlay');
  const mobileLinks  = document.querySelectorAll('.mobile-nav-link, .mobile-wa-cta');

  function openMobileNav() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  window.closeMobileNav = function () {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('show');
    document.body.style.overflow = '';
  };
  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
  });
  mobileLinks.forEach(l => l.addEventListener('click', closeMobileNav));

  /* ─── SMOOTH SCROLL for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMobileNav();
      const offset = header.offsetHeight + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* ─── ACTIVE NAV HIGHLIGHT ─── */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - header.offsetHeight - 80) current = s.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }

  /* ─── AOS — Animate On Scroll ─── */
  const aosEls = document.querySelectorAll('[data-aos]');
  const aosObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings within same parent
        const siblings = entry.target.parentElement.querySelectorAll('[data-aos]');
        let delay = 0;
        siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 80; });
        setTimeout(() => entry.target.classList.add('aos-visible'), delay);
        aosObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  aosEls.forEach(el => aosObs.observe(el));

  /* ─── STAT COUNTER ANIMATION ─── */
  const statEls = document.querySelectorAll('.stat-number[data-count]');
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let   current = 0;
      const duration = 1800;
      const step     = target / (duration / 16);
      const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = Math.ceil(current);
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      statObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => statObs.observe(el));

  /* ─── HERO PARTICLES ─── */
  const particleContainer = document.getElementById('hero-particles');
  if (particleContainer) {
    const PARTICLE_COUNT = 28;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      const size   = Math.random() * 3 + 1;
      const left   = Math.random() * 100;
      const dur    = Math.random() * 14 + 8;
      const delay  = Math.random() * 12;
      const opacity= Math.random() * 0.5 + 0.2;
      Object.assign(p.style, {
        width:  size + 'px',
        height: size + 'px',
        left:   left + '%',
        animationDuration:  dur + 's',
        animationDelay:    '-' + delay + 's',
        opacity: opacity,
      });
      particleContainer.appendChild(p);
    }
  }

  /* ─── HERO BG FALLBACK (if image doesn't load) ─── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const img = new Image();
    img.src = 'assets/images/hero-bg.png';
    img.onerror = () => {
      heroBg.style.backgroundImage = 'none';
      heroBg.style.background = `
        radial-gradient(ellipse at 30% 60%, rgba(127,119,221,.25) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 25%, rgba(250,199,117,.18) 0%, transparent 55%),
        radial-gradient(ellipse at 50% 50%, rgba(18,18,42,1) 0%, rgba(8,8,20,1) 100%)
      `;
    };
  }

  /* ─── FAQ ACCORDION ─── */
  window.toggleFAQ = function (id) {
    const card   = document.getElementById(id);
    const isOpen = card.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-card.open').forEach(c => {
      c.classList.remove('open');
      c.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      card.classList.add('open');
      card.querySelector('.faq-trigger').setAttribute('aria-expanded', 'true');
    }
  };

  /* ─── COUNTDOWN TIMER (72-hour offer, resets on expiry) ─── */
  const STORAGE_KEY = 'gj_offer_expiry';
  function getExpiry() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const exp = parseInt(stored, 10);
      if (exp > Date.now()) return exp;
    }
    const exp = Date.now() + 72 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(exp));
    return exp;
  }

  const expiry       = getExpiry();
  const countdownIds = ['cd-1', 'cd-2', 'cd-3'];
  const cdEls        = countdownIds.map(id => document.getElementById(id)).filter(Boolean);

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdowns() {
    const diff = expiry - Date.now();
    if (diff <= 0) {
      cdEls.forEach(el => { el.textContent = '🔥 ¡Última oportunidad!'; });
      return;
    }
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    const str = `⏰ Oferta termina en: ${pad(h)}:${pad(m)}:${pad(s)}`;
    cdEls.forEach(el => { el.textContent = str; });
  }

  updateCountdowns();
  setInterval(updateCountdowns, 1_000);

  /* ─── WHATSAPP FLOAT — hide on very small scroll to avoid overlap on mobile ─── */
  const waFloat = document.getElementById('wa-float-btn');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    if (!waFloat) return;
    const current = window.scrollY;
    // always visible — just subtle shrink while scrolling down fast
    waFloat.style.transform = current > lastScroll + 80 ? 'scale(0.88)' : 'scale(1)';
    lastScroll = current;
  }, { passive: true });

  /* ─── HERO PARALLAX (subtle, desktop only) ─── */
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      if (!heroBg) return;
      const y = window.scrollY;
      heroBg.style.transform = `scale(1.04) translateY(${y * 0.22}px)`;
    }, { passive: true });
  }

  initCatalogFilter();

  console.log('%c Griegos Juegos — cargado correctamente', 'color:#FAC775;font-weight:bold;font-size:14px;');
})();
