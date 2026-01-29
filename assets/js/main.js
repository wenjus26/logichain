// Sticky Header Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Senior Sidebar Logic
const sidebar = document.getElementById('mobile-sidebar');
const backdrop = document.getElementById('sidebar-backdrop');
const menuToggle = document.querySelector('.menu-toggle');
const closeBtn = document.querySelector('.sidebar-close');
const sidebarLinks = document.querySelectorAll('.sidebar-links a');

function openSidebar() {
    sidebar.classList.add('active');
    backdrop.classList.add('active');
    document.body.classList.add('no-scroll');
    sidebar.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');

    // Focus first link after animation
    setTimeout(() => {
        sidebarLinks[0].focus();
    }, 500);
}

function closeSidebar() {
    sidebar.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.classList.remove('no-scroll');
    sidebar.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
}

if (menuToggle) menuToggle.addEventListener('click', openSidebar);
if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
if (backdrop) backdrop.addEventListener('click', closeSidebar);

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// Focus Trap Logic (Senior approach)
sidebar.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusable = sidebar.querySelectorAll('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) { // Back tab
        if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
        }
    } else { // Normal tab
        if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
        }
    }
});

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== GESTION SIMPLE ET ROBUSTE DE GOOGLE TRANSLATE =====
function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Domain=' + window.location.hostname + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function triggerGoogleTranslate(lang) {
    const langButtons = document.querySelectorAll(".lang-btn");

    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (lang === 'fr') {
        deleteCookie('googtrans');
        document.cookie = "googtrans=; path=/; domain=" + document.domain;
        document.cookie = "googtrans=; path=/";
        window.location.reload();
    } else {
        const select = document.querySelector("select.goog-te-combo");
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change'));
        } else {
            setTimeout(() => triggerGoogleTranslate(lang), 500);
        }
    }
}

// Active link highlighting
function highlightActiveLinks() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a, .sidebar-links a, .footer-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            if (!link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    highlightActiveLinks();
    lucide.createIcons();
});
