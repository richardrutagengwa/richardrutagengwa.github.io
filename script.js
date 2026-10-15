
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


// Contact form: prepare an email in the visitor's default email application.
document.getElementById('contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (!email || !message) return;
  const subject = encodeURIComponent('Portfolio enquiry from ' + email);
  const body = encodeURIComponent('Reply to: ' + email + '\\n\\n' + message);
  window.location.href = 'mailto:rrutagengwa@gmail.com?subject=' + subject + '&body=' + body;
});
