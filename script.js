// ── Footer year ──────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Mobile nav toggle ────────────────────────────────────
const toggle   = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});

// Close mobile nav when a link is clicked
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }
});

// Close mobile nav on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.nav')) {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
  }
});

// ── Active nav link on scroll ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Fade-in on scroll ────────────────────────────────────
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ── Profile photo graceful load ──────────────────────────
const photo = document.getElementById('about-photo');
if (photo) {
  const showPhoto = () => photo.classList.add('loaded');
  if (photo.complete && photo.naturalWidth > 0) {
    showPhoto();
  } else {
    photo.addEventListener('load', showPhoto);
    photo.addEventListener('error', () => photo.remove());
  }
}
