const navbar = document.getElementById('navbar');
const heroOverlay = document.getElementById('hero-overlay');
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

let navbarHasBg = false;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    // Hero overlay effect: opacity + blur
    const scrollPercent = Math.min(scrollY / heroHeight, 1);
    heroOverlay.style.background = `rgba(0,0,0,${0.3 + scrollPercent * 0.5})`;
    heroOverlay.style.backdropFilter = `blur(${scrollPercent * 5}px)`;

    // Navbar background & shadow with animation
    if (scrollY > 50 && !navbarHasBg) {
        navbarHasBg = true;
        navbar.classList.add('shadow-lg');
        // Animate in
        navbar.style.transition = 'background 0.4s ease, box-shadow 0.4s ease';
        navbar.style.background = '#00664f';
    } else if (scrollY <= 50 && navbarHasBg) {
        navbarHasBg = false;
        // Animate out
        navbar.style.transition = 'background 0.4s ease, box-shadow 0.4s ease';
        navbar.style.background = 'transparent';
        navbar.classList.remove('shadow-lg');
    }
});

// Mobile nav toggle
navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
});



// <!-- Slider JS -->


const sliderContainer = document.getElementById('news-slider');
const slides = sliderContainer.children;
const indicators = document.querySelectorAll('.slider-indicator');
let currentIndex = 0;
const totalSlides = slides.length;

function showSlide(index) {
    sliderContainer.style.transform = `translateX(-${index * 100}%)`;
    indicators.forEach((dot, i) => {
        dot.classList.toggle('bg-[#0B5E40]', i === index);
        dot.classList.toggle('bg-[#D9D9D9]', i !== index);
    });
}

// Auto-slide every 4 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}, 4000);

// Optional: allow manual clicking on indicators
indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentIndex = i;
        showSlide(currentIndex);
    });
});


// animation 

  // Select all elements with Animate.css classes
  const animateElements = document.querySelectorAll('.animate__animated');

  // Intersection Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // Remove and re-add animation classes to replay animation
        el.classList.remove('animate__animated');
        void el.offsetWidth; // Trigger reflow
        el.classList.add('animate__animated');
      }
    });
  }, { threshold: 0.3 }); // 30% visible triggers animation

  // Observe all animate__animated elements
  animateElements.forEach(el => observer.observe(el));