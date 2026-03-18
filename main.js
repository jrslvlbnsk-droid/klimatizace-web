/* ============================================
   NAVIGATION – scroll effect + hamburger
   ============================================ */
const header     = document.getElementById('header');
const hamburger  = document.getElementById('hamburger');
const navList    = document.getElementById('navList');
const navLinks   = navList.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  hamburger.classList.toggle('is-open', open);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    hamburger.classList.remove('is-open');
  });
});

/* ============================================
   PRICING TABS
   ============================================ */
const tabs   = document.querySelectorAll('.pricing__tab');
const panels = document.querySelectorAll('.pricing__panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('pricing__tab--active'));
    panels.forEach(p => p.classList.remove('pricing__panel--active'));
    tab.classList.add('pricing__tab--active');
    document.getElementById(tab.dataset.target).classList.add('pricing__panel--active');
  });
});

/* ============================================
   SCROLL ANIMATIONS (lightweight AOS)
   ============================================ */
const animTargets = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animTargets.forEach(el => observer.observe(el));

/* ============================================
   CONTACT FORM VALIDATION
   ============================================ */
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const formSuccess= document.getElementById('formSuccess');

const rules = {
  name: {
    el: () => document.getElementById('name'),
    err: () => document.getElementById('nameError'),
    validate: v => v.trim().length >= 2 ? '' : 'Zadejte prosím celé jméno.'
  },
  phone: {
    el: () => document.getElementById('phone'),
    err: () => document.getElementById('phoneError'),
    validate: v => /^[+\d\s\-()]{7,20}$/.test(v.trim()) ? '' : 'Zadejte platné telefonní číslo.'
  },
  email: {
    el: () => document.getElementById('email'),
    err: () => document.getElementById('emailError'),
    validate: v => v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Zadejte platnou e-mailovou adresu.'
  },
  message: {
    el: () => document.getElementById('message'),
    err: () => document.getElementById('messageError'),
    validate: v => v.trim().length >= 10 ? '' : 'Napište prosím alespoň 10 znaků.'
  },
  gdpr: {
    el: () => document.getElementById('gdpr'),
    err: () => document.getElementById('gdprError'),
    validate: v => v ? '' : 'Souhlas se zpracováním údajů je povinný.'
  }
};

function validateField(key) {
  const rule = rules[key];
  const el   = rule.el();
  const val  = el.type === 'checkbox' ? el.checked : el.value;
  const msg  = rule.validate(val);
  rule.err().textContent = msg;
  if (el.type !== 'checkbox') el.classList.toggle('error', !!msg);
  return !msg;
}

// Live validation on blur
Object.keys(rules).forEach(key => {
  const el = rules[key].el();
  if (el) el.addEventListener('blur', () => validateField(key));
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const valid = Object.keys(rules).map(k => validateField(k)).every(Boolean);
  if (!valid) return;

  // Simulate async submit (replace with real fetch to backend)
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Odesílám…';

  await new Promise(r => setTimeout(r, 1200));

  form.reset();
  submitBtn.disabled = false;
  submitBtn.querySelector('span').textContent = 'Odeslat poptávku';
  formSuccess.classList.add('show');

  setTimeout(() => formSuccess.classList.remove('show'), 6000);
});

/* ============================================
   SMOOTH ACTIVE NAV LINK HIGHLIGHT
   ============================================ */
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'nav__link--active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));
