document.addEventListener('DOMContentLoaded', function () {

  const themeToggle = document.getElementById('theme-toggle');
  const body        = document.body;
  const savedTheme  = localStorage.getItem('theme') || 'dark';

  applyTheme(savedTheme);

  themeToggle.addEventListener('click', function () {
    const isLight = body.classList.contains('light-theme');
    applyTheme(isLight ? 'dark' : 'light');
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-theme');
      themeToggle.textContent = '🌙';
    } else {
      body.classList.remove('light-theme');
      themeToggle.textContent = '☀️';
    }
    localStorage.setItem('theme', theme);
  }


  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });


  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) { a.classList.remove('active'); });
        const activeLink = document.querySelector(
          '.nav-links a[href="#' + entry.target.id + '"]'
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { root: null, rootMargin: '-10% 0px -50% 0px', threshold: 0 });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });


  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', function () {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput    = document.getElementById('nome');
    const emailInput   = document.getElementById('email');
    const messageInput = document.getElementById('mensagem');

    clearErrors();

    let isValid = true;

    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Por favor, informe seu nome.');
      isValid = false;
    }

    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Por favor, informe seu e-mail.');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Informe um e-mail válido (ex: usuario@dominio.com).');
      isValid = false;
    }

    if (messageInput.value.trim() === '') {
      showError(messageInput, 'Por favor, escreva sua mensagem.');
      isValid = false;
    }

    if (isValid) {
      openModal();
      contactForm.reset();
    }
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('has-error');
    formGroup.querySelector('.error-msg').textContent = message;
    input.focus();
  }

  function clearErrors() {
    document.querySelectorAll('.form-group').forEach(function (group) {
      group.classList.remove('has-error');
      group.querySelector('.error-msg').textContent = '';
    });
  }


  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose   = document.getElementById('modal-close');

  function openModal() {
    modalOverlay.classList.add('active');
    setTimeout(function () { modalClose.focus(); }, 100);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', function (event) {
    if (event.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });


  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

});
