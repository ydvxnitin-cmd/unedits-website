function openDrawer(){
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('open');
}
function closeDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
}

/* ===== Services marquee cards ===== */
const services = [
  { mark:"“", title:"Video Editing", desc:"Every frame cut with intention — pace, rhythm, and story shaped for the platform it lives on.", num:"01" },
  { mark:"“", title:"Graphic Design", desc:"Visuals that hold attention for a reason, built on a clear hierarchy and a disciplined hand.", num:"02" },
  { mark:"“", title:"Branding", desc:"Identity systems that carry a point of view — from mark to voice to the smallest detail.", num:"03" },
  { mark:"“", title:"UI / UX Design", desc:"Interfaces designed around how people actually move through a screen, not how it looks in a deck.", num:"04" },
  { mark:"“", title:"Website Design", desc:"Sites built to load fast, read clearly, and convert — form always in service of function.", num:"05" },
];

const track = document.getElementById('servicesTrack');
if(track){
  const renderSet = () => services.map(s => `
    <div class="service-card">
      <span class="service-mark">${s.mark}</span>
      <h3 class="service-title">${s.title}</h3>
      <p class="service-desc">${s.desc}</p>
      <div class="service-foot">
        <span class="service-num">${s.num} / UNEDITS</span>
        <span class="service-dot"></span>
      </div>
    </div>
  `).join('');
  track.innerHTML = renderSet() + renderSet();
}

/* ===== Scroll-reveal for sections ===== */
const revealEls = document.querySelectorAll('.reveal-up');
if(revealEls.length){
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

/* ===== Transparent header over hero, solid elsewhere ===== */
const heroSection = document.getElementById('hero');
const headerEl = document.querySelector('header');
if(heroSection && headerEl){
  const toggleHeader = () => {
    if(window.scrollY < heroSection.offsetHeight - 100){
      headerEl.classList.add('header-transparent');
    } else {
      headerEl.classList.remove('header-transparent');
    }
  };
  toggleHeader();
  window.addEventListener('scroll', toggleHeader, { passive: true });
}
/* ===== Hero work carousel ===== */
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDotsWrap = document.getElementById('carouselDots');
if(carouselSlides.length && carouselDotsWrap){
  let currentSlide = 0;

  carouselSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    if(i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    carouselDotsWrap.appendChild(dot);
  });
  const dots = carouselDotsWrap.querySelectorAll('button');

  function goToSlide(index){
    carouselSlides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    carouselSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  setInterval(() => {
    const next = (currentSlide + 1) % carouselSlides.length;
    goToSlide(next);
  }, 5000);
}
