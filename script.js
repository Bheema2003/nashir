const preloader = document.querySelector('.preloader');
const scrollTopBtn = document.querySelector('.scroll-top');
const progressBar = document.querySelector('.progress-bar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const testimonials = document.querySelectorAll('.testimonial-card');
const faqItems = document.querySelectorAll('.faq-item');
const typingText = document.querySelector('.typing-text');

const servicesNav = document.querySelectorAll('.nav-link');

const phrases = [
  'Android apps with clean UI.',
  'Responsive websites for brands.',
  'Software solutions for growth.',
  'Digital products for modern businesses.'
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingText) return;
  const currentPhrase = phrases[phraseIndex];
  if (!deleting) {
    typingText.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingText.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeEffect, deleting ? 80 : 120);
}

function updateScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  if (scrollTop > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

function smoothScroll(event) {
  if (!event.target.classList.contains('nav-link')) return;
  event.preventDefault();
  const targetId = event.target.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    const offset = targetSection.offsetTop - 75;
    window.scrollTo({ top: offset, behavior: 'smooth' });
    navMenu.classList.remove('active');
  }
}

function toggleNav() {
  navMenu.classList.toggle('active');
}

function nextTestimonial() {
  const active = document.querySelector('.testimonial-card.active');
  const next = active.nextElementSibling || testimonials[0];
  active.classList.remove('active');
  next.classList.add('active');
}

function handleFaq(event) {
  const item = event.currentTarget;
  const content = item.querySelector('.faq-content');
  const icon = item.querySelector('.faq-icon');
  const expanded = item.classList.toggle('active');
  content.style.maxHeight = expanded ? `${content.scrollHeight}px` : '0';
  icon.textContent = expanded ? '−' : '+';
}

function initAnimations() {
  setTimeout(() => document.body.classList.add('loaded'), 600);
  setInterval(nextTestimonial, 7000);
  typeEffect();
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const duration = 1800;
    let count = 0;
    const step = Math.ceil(target / (duration / 30));
    const update = () => {
      count += step;
      if (count >= target) count = target;
      counter.textContent = count;
      if (count < target) requestAnimationFrame(update);
    };
    update();
  });
}

window.addEventListener('scroll', updateScroll);
window.addEventListener('load', () => {
  initAnimations();
  updateScroll();
  initCounters();
});

if (navToggle) navToggle.addEventListener('click', toggleNav);
if (navMenu) navMenu.addEventListener('click', smoothScroll);
if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
faqItems.forEach(item => item.addEventListener('click', handleFaq));
