const allowedPages = ["home", "about", "services", "contacts", "industries", "blog","data-entry","business-development","payroll-outsourcing"];
const content = document.getElementById("content");

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
        return;
    }

    fetch(`pages/${page}.html`)
        .then(res => {
            if (!res.ok) throw new Error("Page not found");
            return res.text();
        })
        .then(data => {
            content.innerHTML = data;
        })
        .catch(() => {
            content.innerHTML = `<div style="padding:50px; text-align:center;">
            <h1 style="color:red; font-size:36px;">404 - Page Not Found</h1>
            <p>The page "${page}" you are looking for does not exist.</p>
          </div>`;
        });
}

// =======================
// Handle all nav links (desktop + mobile)
// =======================
document.querySelectorAll("nav a, #mobile-nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.getAttribute("href").replace("/", "").toLowerCase();
        window.location.hash = page; // set hash
        // Close mobile sidebar if open
        if (mobileNav.style.left === '0px' || mobileNav.style.left === '0%') {
            mobileNav.style.left = '-100%';
        }
    });
});

// =======================
// Handle hash change
// =======================
window.addEventListener("hashchange", () => {
    const hashPage = window.location.hash.replace("#", "");
    if (allowedPages.includes(hashPage)) {
        loadPage(hashPage);
    } else if (hashPage === "" || hashPage === "#") {
        loadPage("home");
    } else {
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
    if (allowedPages.includes(initialPage)) {
        loadPage(initialPage);
    } else if (initialPage === "" || initialPage === "#") {
        loadPage("home");
    } else {
        content.innerHTML = `<div style="padding:50px; text-align:center;">
          <h1 style="color:red; font-size:36px;">404 - Page Not Found</h1>
          <p>The page "${initialPage}" you are looking for does not exist.</p>
        </div>`;
    }
});
