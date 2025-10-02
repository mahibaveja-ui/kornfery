const allowedPages = [
    "home", 
    "about",
    "testimonials",
    "services",
    "contacts",
    "industries",
    "blog",
    "recruitment-process-outsourcing",
    "data-entry",
    "business-development",
    "payroll-outsourcing",
    "billing-invoicing",
    "purchase-order-processing",
    "data-conversion",
    "document-indexing",
    "application-processing",
    "accounting-data-entry",
    "vms-msp-delivery",
    "recruitment-support",
    "recruitment-assistance",
    "managed-searches",
    "msp_support",
    "workload_management",
    "back_end_support_system",
    "staff_augmentation",
    "rpo_talent_sourcing_screening",
    "background_checks_coordination",
    "onboarding_documentation_support",
    "training_development_content",
    "administrative_support",
    "operational_back_office",
    "add-ons",
    "Industries"
];

const content = document.getElementById("content");
const loader = document.getElementById("page-loader");
document.body.classList.add("loading");

// =======================
// Preload all images in a page
// =======================
function preloadImages(container) {
    const images = container.querySelectorAll("img");
    const promises = Array.from(images).map(img => {
        return new Promise((resolve) => {
            if (img.complete) resolve();
            else img.onload = img.onerror = resolve;
        });
    });
    return Promise.all(promises);
}

// =======================
// Load page dynamically
// =======================
function loadPage(page) {
    if (!allowedPages.includes(page)) {
        content.innerHTML = `<div style="padding:50px; text-align:center;">
            <h1 style="color:red; font-size:36px;">404 - Page Not Found</h1>
            <p>The page "${page}" you are looking for does not exist.</p>
        </div>`;
        window.location.hash = "404";
        loader.style.display = "none";
        document.body.classList.remove("loading");
        return;
    }

    loader.style.display = "flex"; // show loader
    fetch(`pages/${page}.html`)
        .then(res => {
            if (!res.ok) throw new Error("Page not found");
            return res.text();
        })
        .then(data => {
            content.innerHTML = data;
            return preloadImages(content); // wait for all images
        })
        .then(() => {
            loader.style.display = "none";
            document.body.classList.remove("loading");
        })
        .catch(() => {
            content.innerHTML = `<div style="padding:50px; text-align:center;">
                <h1 style="color:red; font-size:36px;">404 - Page Not Found</h1>
                <p>The page "${page}" you are looking for does not exist.</p>
            </div>`;
            loader.style.display = "none";
            document.body.classList.remove("loading");
        });
}

// =======================
// Handle nav links
// =======================
document.querySelectorAll("nav a, #mobile-nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.getAttribute("href").replace("/", "").toLowerCase();
        window.location.hash = page;
        if (mobileNav.style.left === '0px' || mobileNav.style.left === '0%') {
            mobileNav.style.left = '-100%';
        }
    });
});

// =======================
// Hash change listener
// =======================
window.addEventListener("hashchange", () => {
    const hashPage = window.location.hash.replace("#", "");
    if (allowedPages.includes(hashPage)) loadPage(hashPage);
    else if (hashPage === "" || hashPage === "#") loadPage("home");
    else {
        content.innerHTML = `<div style="padding:50px; text-align:center;">
            <h1 style="color:red; font-size:36px;">404 - Page Not Found</h1>
            <p>The page "${hashPage}" you are looking for does not exist.</p>
        </div>`;
    }
});

// =======================
// Initial load
// =======================
document.addEventListener("DOMContentLoaded", () => {
    const initialPage = window.location.hash.replace("#", "") || "home";
    loadPage(initialPage);
});
