/**
 * 2027 IEEE 6th International Conference — Main JavaScript
 * ====================================================================
 * EDITABLE CONFIGURATION BLOCK — Change values here easily
 * ====================================================================
 */

/* ──────────────────────────────────────────────────────────────────
   CONFIGURATION: Edit these values to update conference info sitewide
   ────────────────────────────────────────────────────────────────── */
const CONFIG = {
  /** Conference Number — #74427 */
  ieeeRecordNumber: '74427',

  /**
   * Conference start date/time in IST (UTC+5:30)
   * Format: 'YYYY-MM-DDTHH:mm:ss+05:30'
   * Current setting: 22 Oct 2027, 09:00 IST
   */
  conferenceStart: '2027-10-22T09:00:00+05:30',

  /**
   * Registration URL — replace '#register' with the actual URL
   * TODO: Update this when the registration portal is live
   */
  registrationUrl: '#register',

  /**
   * Call for Papers URL — replace '#dates' with the actual submission URL
   * TODO: Update this when the submission portal is live
   */
  callForPapersUrl: '#dates',
};

/* ──────────────────────────────────────────────────────────────────
   DOMCONTENTLOADED: All initialisation runs here
   ────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initIeeeRecordPill();
  initCountdown();
  initStickyHeader();
  initMobileMenu();
  initDropdowns();
  initSearch();
  initScrollReveal();
  initActiveNavHighlight();
  initSmoothScroll();
  initBackToTop();
  updateRegistrationLinks();
});

/* ──────────────────────────────────────────────────────────────────
   1. IEEE RECORD PILL
   ────────────────────────────────────────────────────────────────── */
function initIeeeRecordPill() {
  const pill = document.getElementById('ieee-record-pill');
  if (!pill) return;
  pill.textContent = `Conference Number: #${CONFIG.ieeeRecordNumber}`;
}

/* ──────────────────────────────────────────────────────────────────
   2. COUNTDOWN TIMER
   Counts down to CONFIG.conferenceStart. Once past, shows live msg.
   ────────────────────────────────────────────────────────────────── */
function initCountdown() {
  const targetDate = new Date(CONFIG.conferenceStart).getTime();

  const elDays    = document.getElementById('cd-days');
  const elHours   = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');
  const elSeconds = document.getElementById('cd-seconds');
  const container = document.getElementById('countdown-container');
  const liveMsg   = document.getElementById('countdown-live');

  if (!elDays || !container || !liveMsg) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const now  = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      // Conference is live or past
      container.hidden = true;
      liveMsg.hidden   = false;
      return; // stop ticking
    }

    const totalSecs = Math.floor(diff / 1000);
    const days    = Math.floor(totalSecs / 86400);
    const hours   = Math.floor((totalSecs % 86400) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    elDays.textContent    = pad(days);
    elHours.textContent   = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);

    setTimeout(tick, 1000);
  }

  tick();
}

/* ──────────────────────────────────────────────────────────────────
   3. STICKY HEADER — Adds .is-stuck class on scroll > 110px
   Only the nav bar is sticky on scroll (soft shadow when stuck)
   ────────────────────────────────────────────────────────────────── */
function initStickyHeader() {
  const navBar = document.getElementById('main-nav-bar');
  if (!navBar) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 110) {
          navBar.classList.add('is-stuck');
        } else {
          navBar.classList.remove('is-stuck');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ──────────────────────────────────────────────────────────────────
   4. MOBILE HAMBURGER MENU
   ────────────────────────────────────────────────────────────────── */
function initMobileMenu() {
  const btn   = document.getElementById('hamburger-btn');
  const menu  = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : btn.getAttribute('aria-expanded') === 'false';
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menu.hidden = !isOpen;
  }

  btn.addEventListener('click', () => toggleMenu());

  // Close on any mobile nav link or sub-link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      btn.focus();
    }
  });
}

/* ──────────────────────────────────────────────────────────────────
   4.1 ACCESSIBLE DROPDOWNS (Authors & Programs)
   ────────────────────────────────────────────────────────────────── */
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    const parent = toggle.closest('.has-dropdown');
    const menu   = parent ? parent.querySelector('.dropdown-menu') : null;
    if (!parent || !menu) return;

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        toggle.setAttribute('aria-expanded', 'true');
        menu.classList.add('show');
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    parent.addEventListener('focusout', (e) => {
      if (!parent.contains(e.relatedTarget)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
      }
    });

    parent.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
        toggle.focus();
      }
    });
  });
}

/* ──────────────────────────────────────────────────────────────────
   4.2 CLIENT-SIDE SEARCH BOX
   ────────────────────────────────────────────────────────────────── */
function initSearch() {
  const form  = document.getElementById('header-search-form');
  const input = document.getElementById('header-search-input');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    // Search through visible content elements
    const elements = Array.from(document.querySelectorAll('main h1, main h2, main h3, main h4, main p, main li, main strong'));
    const match = elements.find(el => el.textContent.toLowerCase().includes(query) && el.offsetParent !== null);

    if (match) {
      match.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const origBg    = match.style.backgroundColor;
      const origTrans = match.style.transition;
      match.style.transition = 'background-color 0.4s ease';
      match.style.backgroundColor = '#fbeeed';
      setTimeout(() => {
        match.style.backgroundColor = origBg;
        match.style.transition = origTrans;
      }, 2500);
    } else {
      input.classList.add('search-not-found');
      setTimeout(() => input.classList.remove('search-not-found'), 600);
    }
  });
}

/* ──────────────────────────────────────────────────────────────────
   5. SCROLL REVEAL (IntersectionObserver)
   Elements with class .reveal-up fade up when entering viewport.
   ────────────────────────────────────────────────────────────────── */
function initScrollReveal() {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-up').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────────────────────────
   6. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
   Uses IntersectionObserver on each section; highlights matching link.
   ────────────────────────────────────────────────────────────────── */
function initActiveNavHighlight() {
  const sectionIds = ['home', 'theme', 'about', 'host', 'structure', 'dates', 'register', 'contact'];
  const navLinks   = document.querySelectorAll('.nav-link');

  // Build map: sectionId → navLink element
  const linkMap = {};
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap[href.slice(1)] = link;
    }
  });

  let currentActive = null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (currentActive) currentActive.classList.remove('active');
          currentActive = linkMap[id];
          if (currentActive) currentActive.classList.add('active');
        }
      });
    },
    { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' }
  );

  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

/* ──────────────────────────────────────────────────────────────────
   7. SMOOTH SCROLL for anchor links
   Native CSS smooth-scroll handles most cases; this ensures
   offset accounts for the sticky header height.
   ────────────────────────────────────────────────────────────────── */
function initSmoothScroll() {
  const headerH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '72',
    10
  );

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top });
      } else {
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ──────────────────────────────────────────────────────────────────
   8. BACK TO TOP BUTTON
   Shows after scrolling 400px; hides when at top.
   ────────────────────────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.hidden = window.scrollY < 400;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ──────────────────────────────────────────────────────────────────
   9. UPDATE REGISTRATION LINKS sitewide from CONFIG
   ────────────────────────────────────────────────────────────────── */
function updateRegistrationLinks() {
  // All links with href="#register" that are meant to be registration CTAs
  // are already set in HTML. If CONFIG.registrationUrl differs from '#register',
  // update them programmatically.
  if (CONFIG.registrationUrl === '#register') return;

  document.querySelectorAll('a[href="#register"]').forEach(link => {
    // Don't update nav section anchor links that are for navigation only
    if (!link.classList.contains('nav-link') && !link.classList.contains('mobile-nav-link')) {
      link.href = CONFIG.registrationUrl;
    }
  });
}
