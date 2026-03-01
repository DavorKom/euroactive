// --- Mobile Menu Toggle ---
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('active');
}

// --- Carousel Logic ---
let slideIndex = 1; 
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const intervalTime = 5000; // 5 seconds
let slideInterval; 

// Function to reset the interval timer
// This clears the old countdown and starts a fresh 5-second one
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoAdvance, intervalTime);
}

// Core function to display the correct slide
function showSlides(n) {
    if (slides.length === 0) return;

    // Logic to wrap around index
    if (n > slides.length) { slideIndex = 1 } 
    else if (n < 1) { slideIndex = slides.length }
    else { slideIndex = n; }

    // 1. Update Dots (Visual only)
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }

    // 2. Move the Track
    const track = document.querySelector('.carousel-track');
    // We calculate percentage: (Index - 1) * 100
    // Example: Slide 1 = 0%, Slide 2 = -100%, Slide 3 = -200%
    const translateValue = (slideIndex - 1) * 100;
    track.style.transform = `translateX(-${translateValue}%)`;
}

// Function called by the Prev/Next arrows
function plusSlides(n) {
    showSlides(slideIndex + n);
    resetInterval(); // Kills the old timer and starts a new 5s countdown
}

// Function called by the dot indicators
function currentSlide(n) {
    showSlides(n);
    resetInterval(); // Kills the old timer and starts a new 5s countdown
}

// Function for auto-advancing the carousel
function autoAdvance() {
    showSlides(slideIndex + 1);
}

// Initialize the carousel
if (slides.length > 0) {
    showSlides(1);
    resetInterval(); // Start the first timer
}

// --- Modal Logic ---
function openModal(imageSrc) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    modal.style.display = "flex";
    modalImg.src = imageSrc;
}

function closeModal() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none";
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
// Get a list of all images in the gallery
const galleryImages = document.querySelectorAll('.gallery-item img'); 
let currentModalIndex = 0;

function openModal(imageSrc) {
    modal.style.display = "flex";
    modalImg.src = imageSrc;

    // Find which image was clicked to set the starting index
    galleryImages.forEach((img, index) => {
        if (img.src === imageSrc) {
            currentModalIndex = index;
        }
    });
}

function closeModal() {
    modal.style.display = "none";
}

// Function to switch images (1 for next, -1 for prev)
function changeModalImage(n) {
    currentModalIndex += n;

    // Loop back to the beginning if we reach the end
    if (currentModalIndex >= galleryImages.length) {
        currentModalIndex = 0;
    } 
    // Loop to the end if we go back past the beginning
    else if (currentModalIndex < 0) {
        currentModalIndex = galleryImages.length - 1;
    }

    // Update the modal image source
    modalImg.src = galleryImages[currentModalIndex].src;
}

// Close modal if user clicks on the black background area (but not the image/arrows)
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Keyboard controls (Arrow keys to switch, Escape to close)
document.addEventListener('keydown', function(event) {
    if (modal.style.display === "flex") {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowRight') {
            changeModalImage(1);
        } else if (event.key === 'ArrowLeft') {
            changeModalImage(-1);
        }
    }
});

// This assembles the email so bots can't scrape it easily
const user = "contact";
const domain = "euroactive.hr";
const emailElement = document.getElementById("email-place");

if(emailElement) {
    emailElement.innerHTML = `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`;
}