// Sticky header active state
const header = document.querySelector('[data-header]');
const onScroll = () => {
    if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
    }
};
window.addEventListener('scroll', onScroll);

// Mobile nav toggle
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav]');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('show');
    });
}

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('a[href^="#"]')) {
        const id = target.getAttribute('href');
        if (id && id.length > 1) {
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    }
}, true);

// Testimonials slider
const slides = document.querySelector('[data-slides]');
const prevBtn = document.querySelector('[data-prev]');
const nextBtn = document.querySelector('[data-next]');
const scrollByAmount = () => Math.min(420, window.innerWidth * 0.6);
if (slides && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        slides.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        slides.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
    });
}

// Dynamic year
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Buy button (placeholder checkout)
const buyBtn = document.querySelector('[data-buy]');
if (buyBtn) {
    buyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Simulate checkout open
        alert('Checkout coming soon. Contact sales@phantomtrack.com');
    });
}

// Product: thumbnails switching
const thumbs = document.querySelectorAll('[data-thumbs] .thumb');
const mainImage = document.querySelector('[data-main-image]');
if (thumbs.length && mainImage) {
    thumbs.forEach((btn) => {
        btn.addEventListener('click', () => {
            thumbs.forEach((b) => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const thumbImg = btn.querySelector('.thumb-img');
            if (thumbImg && mainImage) {
                mainImage.src = thumbImg.src;
                mainImage.alt = thumbImg.alt;
            }
        });
    });
}

// Product: size buttons
const sizeButtons = document.querySelectorAll('[data-sizes] .size-btn');
if (sizeButtons.length) {
    sizeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach((b) => b.classList.remove('is-selected'));
            btn.classList.add('is-selected');
        });
    });
}

// Product: quantity control
const qty = document.querySelector('[data-qty]');
if (qty) {
    const input = qty.querySelector('.qty-input');
    const dec = qty.querySelector('[data-dec]');
    const inc = qty.querySelector('[data-inc]');
    const clamp = (v) => Math.max(1, Math.min(99, v));
    const read = () => clamp(parseInt(input.value || '1', 10));
    dec.addEventListener('click', () => { input.value = String(clamp(read() - 1)); });
    inc.addEventListener('click', () => { input.value = String(clamp(read() + 1)); });
}

// Product: lightbox
const lightbox = document.querySelector('[data-lightbox]');
const lightboxTrigger = document.querySelector('[data-lightbox-trigger]');
const lightboxClose = document.querySelector('[data-lightbox-close]');
if (lightbox && lightboxTrigger && lightboxClose) {
    const open = () => lightbox.classList.remove('hidden');
    const close = () => lightbox.classList.add('hidden');
    lightboxTrigger.addEventListener('click', open);
    lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}


