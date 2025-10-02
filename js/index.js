// ===============================
// Select elements
// ===============================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');
let navbarHasBg = false;

// Scroll animation elements
let animatedElements = [];

// ===============================
// Animate on scroll function
// ===============================
function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    animatedElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            if (!el.classList.contains('animated')) {
                el.classList.add('animated', el.dataset.animate);
            }
        } else {
            el.classList.remove('animated', el.dataset.animate);
        }
    });
}

// ===============================
// Navbar scroll effect
// ===============================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50 && !navbarHasBg) {
        navbarHasBg = true;
        navbar.classList.add('shadow-lg');
        navbar.style.transition = 'background 0.4s ease, box-shadow 0.4s ease';
        navbar.style.background = '#000000';
    } else if (scrollY <= 50 && navbarHasBg) {
        navbarHasBg = false;
        navbar.style.transition = 'background 0.4s ease, box-shadow 0.4s ease';
        navbar.style.background = 'transparent';
        navbar.classList.remove('shadow-lg');
    }

    animateOnScroll(); // safe now
});


// ===============================
// Mobile sidebar toggle
// ===============================
navToggle.addEventListener('click', () => {
    mobileNav.style.left = '0';
});

mobileClose.addEventListener('click', () => {
    mobileNav.style.left = '-100%';
});

window.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
        mobileNav.style.left = '-100%';
    }
});



// Mobile sidebar
const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

mobileDropdownToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        const dropdown = btn.nextElementSibling;
        const isOpen = dropdown.style.maxHeight && dropdown.style.maxHeight !== '0px';
        dropdown.style.maxHeight = isOpen ? '0' : dropdown.scrollHeight + 'px';
    });
});





// ===============================
// Slider JS
// ===============================
const sliderContainer = document.getElementById('news-slider');
if (sliderContainer) {
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

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }, 4000);

    indicators.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            showSlide(currentIndex);
        });
    });
}

// ===============================
// On load
// ===============================
window.addEventListener('load', () => {
    // Initialize animated elements
    animatedElements = document.querySelectorAll('[data-animate]');
    animateOnScroll();
    
});


// Utility to wait for elements (plural support)
function waitForElements(selector, callback, timeout = 10000) {
  console.log(`[waitForElements] Searching for elements "${selector}"`);

  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    console.log(`[waitForElements] Found ${elements.length} elements immediately`);
    callback(elements);
    return;
  }

  const start = Date.now();
  const interval = setInterval(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log(`[waitForElements] Found ${elements.length} elements after ${Date.now() - start}ms`);
      clearInterval(interval);
      callback(elements);
    } else if (Date.now() - start > timeout) {
      console.error(`[waitForElements] Elements with selector "${selector}" not found after ${timeout}ms`);
      clearInterval(interval);
    }
  }, 100);

  const observer = new MutationObserver(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log(`[waitForElements] Found ${elements.length} elements via MutationObserver`);
      clearInterval(interval);
      observer.disconnect();
      callback(elements);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    observer.disconnect();
    console.log(`[waitForElements] Stopped MutationObserver for "${selector}"`);
  }, timeout);
}

// Main carousel initializer (can handle multiple carousels)
function initializeCarousel(carousel) {
  console.log('[initializeCarousel] Carousel element found:', carousel);

  const prevBtn = carousel.parentElement.querySelector('#prevBtn');
  const nextBtn = carousel.parentElement.querySelector('#nextBtn');
  const cards = carousel.querySelectorAll('.carousel-card');

  if (!cards.length) {
    console.error('[initializeCarousel] No carousel cards found!');
    return;
  }

  console.log(`[initializeCarousel] Found ${cards.length} carousel cards`);

  let autoScrollInterval;

  // Debounce
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Update active card
  const updateActiveCard = debounce(() => {
    const center = carousel.scrollLeft + carousel.offsetWidth / 2;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(center - cardCenter);
      card.classList.remove('active');
      if (diff < card.offsetWidth / 2) {
        card.classList.add('active');
        console.log(`[updateActiveCard] Active card: ${index}`);
      }
    });
  }, 100);

  // Scroll by one card
  function scrollCarousel(direction = 1) {
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight || 0);
    carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    console.log(`[scrollCarousel] Scrolling ${direction > 0 ? 'forward' : 'backward'}`);
  }

  // Auto scroll
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      const lastCard = cards[cards.length - 1];
      const carouselRight = carousel.scrollLeft + carousel.offsetWidth;
      if (carouselRight >= lastCard.offsetLeft + lastCard.offsetWidth - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
        console.log('[startAutoScroll] Reset to start');
      } else {
        scrollCarousel(1);
      }
    }, 4000);
    console.log('[startAutoScroll] Auto-scroll started');
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(autoScrollInterval);
      scrollCarousel(-1);
      console.log('[prevBtn] Clicked previous button');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(autoScrollInterval);
      scrollCarousel(1);
      console.log('[nextBtn] Clicked next button');
    });
  }

  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
    console.log('[carousel] Mouse entered, auto-scroll paused');
  });

  carousel.addEventListener('mouseleave', () => {
    startAutoScroll();
    console.log('[carousel] Mouse left, auto-scroll resumed');
  });

  carousel.addEventListener('scroll', updateActiveCard);
  window.addEventListener('resize', updateActiveCard);

  // Lazy load images
  const images = carousel.querySelectorAll('.card-img');
  images.forEach((img, index) => {
    img.setAttribute('loading', 'lazy');
    console.log(`[initializeCarousel] Set lazy loading for image ${index}: ${img.src}`);
  });

  // Initial setup
  updateActiveCard();
  startAutoScroll();
}

// Run initialization on DOM load
document.addEventListener('DOMContentLoaded', () => {
  console.log('[DOMContentLoaded] DOM fully loaded, initializing carousels');
  waitForElements('.carousel-wrapper, #appleCarousel', (carousels) => {
    carousels.forEach((carousel) => initializeCarousel(carousel));
  });
});

