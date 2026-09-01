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

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   SCROLL REVEAL
========================================================= */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    // slight stagger within groups for a nicer cascade
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
    observer.observe(el);
  });
})();

/* =========================================================
   METRIC COUNT-UP
========================================================= */
(function initCountUp() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  function formatValue(value, format) {
    if (format === 'comma') return Math.round(value).toLocaleString('en-US');
    return Math.round(value).toString();
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const suffix = el.getAttribute('data-suffix') || '';
    const format = el.getAttribute('data-format') || 'plain';
    const unit = el.querySelector('.ledger-unit');
    const unitHTML = unit ? unit.outerHTML : '';

    if (prefersReducedMotion || isNaN(target)) {
      el.innerHTML = formatValue(target, format) + suffix + unitHTML;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;
      el.innerHTML = formatValue(current, format) + suffix + unitHTML;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => counterObserver.observe(el));
})();

/* =========================================================
   EXPERIENCE: FILTER + EXPAND/COLLAPSE
========================================================= */
(function initExperience() {
  const filterBar = document.getElementById('filter-bar');
  const entries = Array.from(document.querySelectorAll('.entry'));
  const expandToggle = document.getElementById('expand-toggle');
  const noResults = document.getElementById('no-results');
  if (!entries.length) return;

  // Filtering
  let activeFilter = 'all';

  function applyFilter() {
    let visibleCount = 0;
    entries.forEach(entry => {
      const tags = (entry.getAttribute('data-tags') || '').split(' ');
      const match = activeFilter === 'all' || tags.includes(activeFilter);
      entry.classList.toggle('is-filtered-out', !match);
      if (match) visibleCount++;
    });
    if (noResults) noResults.hidden = visibleCount > 0;
  }

  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilter();
    });
  }

  // Expand/collapse individual entries
  entries.forEach(entry => {
    const summary = entry.querySelector('.entry-summary');
    if (!summary) return;
    summary.addEventListener('click', () => {
      const isOpen = summary.getAttribute('aria-expanded') === 'true';
      summary.setAttribute('aria-expanded', String(!isOpen));
      syncExpandAllLabel();
    });
  });

  // Expand-all / collapse-all
  function syncExpandAllLabel() {
    if (!expandToggle) return;
    const summaries = entries.map(e => e.querySelector('.entry-summary'));
    const allOpen = summaries.every(s => s && s.getAttribute('aria-expanded') === 'true');
    expandToggle.setAttribute('aria-expanded', String(allOpen));
    const icon = expandToggle.querySelector('.expand-icon');
    const label = expandToggle.querySelector('.expand-label');
    if (icon) icon.textContent = allOpen ? '⊖' : '⊕';
    if (label) label.textContent = allOpen ? ' Collapse all' : ' Expand all';
  }

  if (expandToggle) {
    expandToggle.addEventListener('click', () => {
      const shouldOpen = expandToggle.getAttribute('aria-expanded') !== 'true';
      entries.forEach(entry => {
        const summary = entry.querySelector('.entry-summary');
        if (summary) summary.setAttribute('aria-expanded', String(shouldOpen));
      });
      syncExpandAllLabel();
    });
  }
})();

