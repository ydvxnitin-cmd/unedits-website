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
