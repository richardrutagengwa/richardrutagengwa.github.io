
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

/* Reliable anchor navigation: wait for layout, then position the target below the fixed header. */
(() => {
  const headerOffset = () => {
    const header = document.querySelector('.site-header');
    return (header?.getBoundingClientRect().height || 74) + 12;
  };

  const scrollToSection = (hash, behavior = 'auto') => {
    if (!hash || hash === '#') return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;

    const move = () => {
      const top = window.scrollY + target.getBoundingClientRect().top - headerOffset();
      window.scrollTo({
        top: Math.max(0, top),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : behavior
      });
    };

    requestAnimationFrame(() => requestAnimationFrame(move));
  };

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      nav?.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);
      scrollToSection(hash, 'smooth');
    });
  });

  const alignInitialHash = () => scrollToSection(window.location.hash, 'auto');
  window.addEventListener('load', alignInitialHash);
  window.addEventListener('hashchange', alignInitialHash);
  window.addEventListener('popstate', alignInitialHash);
  if (document.readyState === 'complete') alignInitialHash();
})();
