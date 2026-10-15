
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


// Accessible certificate slideshow controls (manual navigation; no auto-advance).
const certificateSlides = Array.from(document.querySelectorAll('.certificate-slide'));
const certificateDots = Array.from(document.querySelectorAll('.certificate-dots button'));
let activeCertificate = 0;
function showCertificate(index) {
  if (!certificateSlides.length) return;
  activeCertificate = (index + certificateSlides.length) % certificateSlides.length;
  certificateSlides.forEach((slide, i) => {
    const active = i === activeCertificate;
    slide.hidden = !active;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  certificateDots.forEach((dot, i) => {
    const active = i === activeCertificate;
    dot.classList.toggle('is-active', active);
    dot.setAttribute('aria-pressed', String(active));
  });
}
document.querySelector('.certificate-prev')?.addEventListener('click', () => showCertificate(activeCertificate - 1));
document.querySelector('.certificate-next')?.addEventListener('click', () => showCertificate(activeCertificate + 1));
certificateDots.forEach((dot, i) => dot.addEventListener('click', () => showCertificate(i)));
