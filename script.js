// ==================== 1. YOUR ORIGINAL ANIMATIONS & SCROLLING ====================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Add animation on scroll for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Make hero section visible immediately
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}


// ==================== 2. NEW MINOR PROJECT FEATURES ====================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- FORM VALIDATION & SUBMISSION (Combined safely) ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevents page reload for the project demo
            alert("Form validated successfully! Thank you for your inquiry. We will get back to you soon.");
        });
    }

    // --- LOCAL STORAGE ---
    const nameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("emailAddress");

    if (nameInput && emailInput) {
        // Load saved data if it exists in the browser when page opens
        if (localStorage.getItem("savedName")) {
            nameInput.value = localStorage.getItem("savedName");
        }
        if (localStorage.getItem("savedEmail")) {
            emailInput.value = localStorage.getItem("savedEmail");
        }

        // Save data dynamically when the user types
        nameInput.addEventListener("input", () => {
            localStorage.setItem("savedName", nameInput.value);
        });
        emailInput.addEventListener("input", () => {
            localStorage.setItem("savedEmail", emailInput.value);
        });
    }

    // --- IMAGE SLIDER (WITH AUTO-SLIDE) ---
    const track = document.getElementById("galleryTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;

        // Checks if we are on a phone (1 image) or PC (3 images)
        function getItemsPerView() {
            return window.innerWidth <= 768 ? 1 : 3;
        }

        nextBtn.addEventListener("click", () => {
            const itemsPerView = getItemsPerView();
            const totalItems = track.children.length;
            if (currentIndex < totalItems - itemsPerView) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        function updateSlider() {
            const itemWidth = track.children[0].getBoundingClientRect().width;
            // Gap is 20px, so we calculate that into the slide distance
            track.style.transform = `translateX(-${currentIndex * (itemWidth + 20)}px)`;
        }

        // NEW: Automatic Sliding Feature
        function autoSlide() {
            const itemsPerView = getItemsPerView();
            const totalItems = track.children.length;
            
            if (currentIndex < totalItems - itemsPerView) {
                currentIndex++; // Move to the next image
            } else {
                currentIndex = 0; // Reset back to the first image
            }
            updateSlider();
        }

        // Run the autoSlide function automatically every 3 seconds (3000 milliseconds)
        setInterval(autoSlide, 3000);

        // Reset slider if the screen rotates or resizes
        window.addEventListener("resize", () => {
            currentIndex = 0;
            updateSlider();
        });
    }
});
