// --- Mobile Menu Toggle ---
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('active');
}

// --- Carousel Logic ---
let slideIndex = 1; // Start index at 1 for simpler array access later
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const intervalTime = 5000; // 5 seconds
let slideInterval; // Variable to hold the interval timer

// Function to reset the interval timer
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoAdvance, intervalTime);
}

// Core function to display the correct slide
function showSlides(n) {
    if (slides.length === 0) return;

    // Handle wrapping around the slides
    if (n > slides.length) { slideIndex = 1 } 
    else if (n < 1) { slideIndex = slides.length }
    else { slideIndex = n; }

    // Hide all slides and remove active state from dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide and set active dot
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

// Function called by the Prev/Next arrows
function plusSlides(n) {
    showSlides(slideIndex + n);
    resetInterval(); // Reset timer on manual navigation
}

// Function called by the dot indicators
function currentSlide(n) {
    showSlides(n);
    resetInterval(); // Reset timer on manual navigation
}

// Function for auto-advancing the carousel
function autoAdvance() {
    showSlides(slideIndex + 1);
}

// Initialize the carousel and start auto-play
if (slides.length > 0) {
    // Start with the first slide visible (this is also set in HTML, but ensures sync)
    showSlides(1);
    
    // Start auto-play
    slideInterval = setInterval(autoAdvance, intervalTime);
}

// Function called by the Prev/Next arrows
function plusSlides(n) {
    showSlides(slideIndex + n);
    resetInterval(); // Reset timer on manual navigation
}

// Function called by the dot indicators
function currentSlide(n) {
    showSlides(n);
    resetInterval(); // Reset timer on manual navigation
}

// Function for auto-advancing the carousel
function autoAdvance() {
    showSlides(slideIndex + 1);
}

// Initialize the carousel and start auto-play
if (slides.length > 0) {
    // Start with the first slide visible (this is also set in HTML, but ensures sync)
    showSlides(1);
    
    // Start auto-play
    slideInterval = setInterval(autoAdvance, intervalTime);
}

// Function to open the modal and display the image
function openModal(imageSrc, imageAlt) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const captionText = document.getElementById("caption");
    
    // Show the modal
    modal.style.display = "block";
    
    // Set the image source and alt text for the full image
    modalImg.src = imageSrc;
    captionText.innerHTML = imageAlt;
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none";
}

// Optional: Allow closing the modal by pressing the ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});