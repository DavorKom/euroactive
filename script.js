// --- 1. GLOBALNI SELEKTORI (Keširanje) ---
const nav = document.querySelector('.nav-links');
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const galleryItems = document.querySelectorAll('.gallery-item');
const emailElement = document.getElementById("email-place");

// --- 2. MOBILE MENU ---
// Koristimo klasičnu funkciju zbog poziva direktno iz HTML-a
function toggleMenu() {
    nav?.classList.toggle('active');
}

// --- 3. CAROUSEL LOGIC (Samo za Home stranicu) ---
let slideIndex = 1;
let slideInterval;

function showSlides(n) {
    if (!track || slides.length === 0) return;

    // Određivanje tačnog indeksa slajda
    slideIndex = n > slides.length ? 1 : n < 1 ? slides.length : n;

    // Ažuriraj točkice (efikasnije, u jednom prolazu)
    dots.forEach((dot, i) => dot.classList.toggle('active', i === slideIndex - 1));

    // Pomakni track
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

// Inicijalizacija karusela
if (track && slides.length > 0) {
    showSlides(1);
    resetInterval();
}

// --- 4. MODAL / GALLERY LOGIC (Samo za News stranicu) ---
let currentModalIndex = 0;

function openModal(imageSrc) {
    if (!modal || !modalImg) return;
    
    modal.style.display = "flex";
    modalImg.src = imageSrc;

    // Efikasno pronalaženje indeksa (oslanja se na onclick atribut da zaobiđe razlike u URL-u)
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

    // Elegantan matematički način za kruženje kroz slike (napred-nazad)
    currentModalIndex = (currentModalIndex + n + galleryItems.length) % galleryItems.length;

    // Izvlačenje originalne (high-res) slike direktno iz onclick atributa roditelja
    const item = galleryItems[currentModalIndex];
    const onclickAttr = item.getAttribute('onclick');
    const match = onclickAttr ? onclickAttr.match(/'([^']+)'/) : null;
    
    modalImg.src = match ? match[1] : item.querySelector('img').src;
}

// Zatvaranje modala na klik izvan slike
window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

// Kontrole preko tastature
document.addEventListener('keydown', (event) => {
    if (modal?.style.display === "flex") {
        if (event.key === 'Escape') closeModal();
        else if (event.key === 'ArrowRight') changeModalImage(1);
        else if (event.key === 'ArrowLeft') changeModalImage(-1);
    }
});

// --- 5. EMAIL PROTECTION ---
if (emailElement) {
    const u = "contact";
    const d = "euroactive.hr";
    emailElement.innerHTML = `<a href="mailto:${u}@${d}">${u}@${d}</a>`;
}