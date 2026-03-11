// --- 1. GLOBALNI SELEKTORI (Keširanje) ---
const nav = document.querySelector('.nav-links');
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const galleryItems = document.querySelectorAll('.gallery-item');
const emailElement = document.getElementById("email-place");

function toggleMenu() {
    nav?.classList.toggle('active');
}

let slideIndex = 1;
let slideInterval;

function showSlides(n) {
    if (!track || slides.length === 0) return;

    slideIndex = n > slides.length ? 1 : n < 1 ? slides.length : n;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === slideIndex - 1));

    track.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
}

function resetInterval() {
    if (track) {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => showSlides(slideIndex + 1), 5000);
    }
}

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetInterval();
}

function currentSlide(n) {
    showSlides(n);
    resetInterval();
}

if (track && slides.length > 0) {
    showSlides(1);
    resetInterval();
}

let currentModalIndex = 0;

function openModal(imageSrc) {
    if (!modal || !modalImg) return;
    
    modal.style.display = "flex";
    modalImg.src = imageSrc;

    currentModalIndex = Array.from(galleryItems).findIndex(item => 
        item.getAttribute('onclick')?.includes(imageSrc)
    );
    
    if (currentModalIndex === -1) currentModalIndex = 0; // Fallback
}

function closeModal() {
    if (modal) modal.style.display = "none";
}

function changeModalImage(n) {
    if (!modalImg || galleryItems.length === 0) return;

    currentModalIndex = (currentModalIndex + n + galleryItems.length) % galleryItems.length;

    const item = galleryItems[currentModalIndex];
    const onclickAttr = item.getAttribute('onclick');
    const match = onclickAttr ? onclickAttr.match(/'([^']+)'/) : null;
    
    modalImg.src = match ? match[1] : item.querySelector('img').src;
}

window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
    if (modal?.style.display === "flex") {
        if (event.key === 'Escape') closeModal();
        else if (event.key === 'ArrowRight') changeModalImage(1);
        else if (event.key === 'ArrowLeft') changeModalImage(-1);
    }
});

/* if (emailElement) {
    const u = "contact";
    const d = "euroactive.hr";
    emailElement.innerHTML = `<a href="mailto:${u}@${d}">${u}@${d}</a>`;
} */