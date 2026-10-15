
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


// Contact form: open WhatsApp with a prefilled message to Richard.
document.getElementById('contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (!email || !message) return;
  const body = 'Hello Richard, I am contacting you from your portfolio.\\n\\nMy email: ' + email + '\\n\\n' + message;
  const url = 'https://wa.me/250788426156?text=' + encodeURIComponent(body);
  window.open(url, '_blank', 'noopener,noreferrer');
});
