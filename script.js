/* ===== INDEX (HAMBURGER) PANEL ===== */
const indexToggle = document.getElementById('indexToggle');
const indexPanel = document.getElementById('indexPanel');

function toggleIndex(open){
  const isOpen = open !== undefined ? open : !indexPanel.classList.contains('open');
  indexPanel.classList.toggle('open', isOpen);
  indexToggle.setAttribute('aria-expanded', String(isOpen));
}
if(indexToggle){
  indexToggle.addEventListener('click', () => toggleIndex());
}

/* ===== SLIDES / SCROLL-SNAP SETUP ===== */
const scrollWrap = document.getElementById('scrollWrap');
const slides = Array.from(document.querySelectorAll('.slide'));
const dotNav = document.getElementById('dotNav');

/* Build dot nav buttons */
if(dotNav && slides.length){
  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    if(i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to section ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotNav.appendChild(dot);
  });
}
const dots = dotNav ? dotNav.querySelectorAll('button') : [];

function goToSlide(index){
  const target = slides[index];
  if(!target) return;
  target.scrollIntoView({ behavior:'smooth', block:'start' });
  toggleIndex(false);
}

/* Handle in-page index links + back-arrow buttons */
document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const idx = parseInt(el.getAttribute('data-target'), 10);
    goToSlide(idx);
  });
});

/* ===== ACTIVE SLIDE OBSERVER (drives the cinematic zoom/fade) ===== */
if(slides.length){
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = parseInt(entry.target.getAttribute('data-index'), 10);
      if(entry.intersectionRatio >= 0.55){
        entry.target.classList.add('active');
        dots.forEach(d => d.classList.remove('active'));
        if(dots[idx]) dots[idx].classList.add('active');

        /* trigger stat count-up once, when the numbers slide activates */
        if(entry.target.id === 'numbers'){
          animateStats();
        }
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold:[0, 0.25, 0.55, 0.75, 1] });

  slides.forEach(slide => slideObserver.observe(slide));

  /* Activate the first slide immediately on load (before any scroll/intersection fires) */
  requestAnimationFrame(() => slides[0].classList.add('active'));
}

/* ===== STAT COUNT-UP ===== */
let statsAnimated = false;
function animateStats(){
  if(statsAnimated) return;
  statsAnimated = true;
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1300;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if(progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  });
}

/* ===== KEYBOARD NAVIGATION (up/down arrows jump slides) ===== */
window.addEventListener('keydown', (e) => {
  if(indexPanel.classList.contains('open')) return;
  const current = slides.findIndex(s => s.classList.contains('active'));
  if(e.key === 'ArrowDown' || e.key === 'PageDown'){
    e.preventDefault();
    goToSlide(Math.min(current + 1, slides.length - 1));
  } else if(e.key === 'ArrowUp' || e.key === 'PageUp'){
    e.preventDefault();
    goToSlide(Math.max(current - 1, 0));
  } else if(e.key === 'Escape'){
    toggleIndex(false);
  }
});
