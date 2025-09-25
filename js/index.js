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
        navbar.style.background = '#3c506a';
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
