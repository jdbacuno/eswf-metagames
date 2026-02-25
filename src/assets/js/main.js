// Mobile Menu
const btn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');
let isOpen = false;

btn.addEventListener('click', () => {
  isOpen = !isOpen;
  navLinks.classList.toggle('hidden', !isOpen);
  navLinks.classList.toggle('flex', isOpen);
  iconOpen.classList.toggle('hidden', isOpen);
  iconClose.classList.toggle('hidden', !isOpen);
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (isOpen) {
      isOpen = false;
      navLinks.classList.add('hidden');
      navLinks.classList.remove('flex');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    }
  });
});

// Active Nav Link Scrollspy
const navLinkEls = document.querySelectorAll('.nav-link[data-section]');

function setActiveLink(sectionId) {
  navLinkEls.forEach((link) => {
    const isActive = link.dataset.section === sectionId;
    link.classList.toggle('active', isActive);
  });
}

const sectionIds = Array.from(navLinkEls).map((link) => link.dataset.section);

const observerOptions = {
  root: null,
  // Fire when section crosses the top 20% of viewport (nav area)
  rootMargin: '-10% 0px -80% 0px',
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, observerOptions);

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// Sports & Games Slider
const slider = document.getElementById('sports-slider');
const leftBtn = document.getElementById('slider-left');
const rightBtn = document.getElementById('slider-right');
const dotsContainer = document.getElementById('slider-dots');

const slides = document.querySelectorAll('.sports-slider-card');
const totalSlides = slides.length;

let currentIndex = 0;

function updateSlider() {
  const slideWidth = slider.clientWidth;
  slider.scrollTo({
    left: slideWidth * currentIndex,
    behavior: 'smooth',
  });

  document.querySelectorAll('.slider-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (index === 0) dot.classList.add('active');

  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });

  dotsContainer.appendChild(dot);
});

// Next Button
rightBtn.addEventListener('click', () => {
  if (currentIndex === totalSlides - 1) {
    currentIndex = 0; // go to first
  } else {
    currentIndex++;
  }
  updateSlider();
});

// Prev Button
leftBtn.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = totalSlides - 1; // go to last
  } else {
    currentIndex--;
  }
  updateSlider();
});

//  sync dots when user scrolls manually
slider.addEventListener('scroll', () => {
  const slideWidth = slider.clientWidth;
  const index = Math.round(slider.scrollLeft / slideWidth);
  currentIndex = index;

  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
});

// Roulette Spinner
const wheelMobile = document.getElementById('wheel');
const wheelDesktop = document.getElementById('wheel-desktop');
const titleMobile = document.getElementById('title-mobile');
const subtitleMobile = document.getElementById('subtitle-mobile');
const titleDesktop = document.getElementById('title-desktop');
const subtitleDesktop = document.getElementById('subtitle-desktop');

const segments = [
  { color: 'Green', text: 'Multi-Cultural Sports' },
  { color: 'Blue', text: 'Electronic Sports' },
  { color: 'Yellow', text: 'Traditional Sports' },
  { color: 'Red', text: 'Active/Digital/Virtual Sports' },
  { color: 'White', text: 'The ESWF Member Nations' },
  { color: 'Black', text: 'The Meta Movement' },
  { color: 'Grey', text: 'Professional & Amateur Sports' },
];

const segmentAngle = 360 / segments.length;
let currIndex = 0;
let totalRotationMobile = 0;
let totalRotationDesktop = 0;

function getPointerAngle(isMobile) {
  return isMobile ? 180 : 90;
}

function updateContent() {
  titleMobile.textContent = segments[currIndex].color;
  subtitleMobile.textContent = segments[currIndex].text;
  titleDesktop.textContent = segments[currIndex].color;
  subtitleDesktop.textContent = segments[currIndex].text;
}

function initWheels() {
  const segmentCenter = currIndex * segmentAngle + segmentAngle / 2;

  totalRotationMobile = 180 - segmentCenter;
  wheelMobile.style.transition = 'none';
  wheelMobile.style.transform = `rotate(${totalRotationMobile}deg)`;

  totalRotationDesktop = 90 - segmentCenter;
  wheelDesktop.style.transition = 'none';
  wheelDesktop.style.transform = `rotate(${totalRotationDesktop}deg)`;

  updateContent();
}

function prev() {
  currIndex = (currIndex - 1 + segments.length) % segments.length;
  totalRotationMobile += segmentAngle;
  totalRotationDesktop += segmentAngle;
  wheelMobile.style.transition = 'transform 0.6s ease';
  wheelMobile.style.transform = `rotate(${totalRotationMobile}deg)`;
  wheelDesktop.style.transition = 'transform 0.6s ease';
  wheelDesktop.style.transform = `rotate(${totalRotationDesktop}deg)`;
  updateContent();
}

function next() {
  currIndex = (currIndex + 1) % segments.length;
  totalRotationMobile -= segmentAngle;
  totalRotationDesktop -= segmentAngle;
  wheelMobile.style.transition = 'transform 0.6s ease';
  wheelMobile.style.transform = `rotate(${totalRotationMobile}deg)`;
  wheelDesktop.style.transition = 'transform 0.6s ease';
  wheelDesktop.style.transform = `rotate(${totalRotationDesktop}deg)`;
  updateContent();
}

document.getElementById('prevBtn-mobile').addEventListener('click', prev);
document.getElementById('nextBtn-mobile').addEventListener('click', next);
document.getElementById('prevBtn-desktop').addEventListener('click', prev);
document.getElementById('nextBtn-desktop').addEventListener('click', next);

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initWheels, 150);
});

initWheels();
