// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('nav-open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav-open');
    });
  });
}

// Footer "last audited" date — today's date, data-analyst flavor
const footerDate = document.getElementById('footer-date');
if (footerDate) {
  const now = new Date();
  const formatted = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
  footerDate.textContent = formatted;
  footerDate.setAttribute('datetime', now.toISOString().split('T')[0]);
}
