// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        // Toggle menu icon
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Add this function for home scrolling
function scrollToHome() {
    const homeSection = document.getElementById('home');
    homeSection.scrollIntoView({ behavior: 'smooth' });
    
    // Close mobile menu if open
    if (window.innerWidth < 1024) {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
}

// Add this typing effect code
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.getElementById('typed-text');
    const words = ['Web Developer', 'Frontend Developer', 'UI/UX Designer'];
    const wait = 3000;
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// Add this function for smooth scrolling to about section
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
    
    // Close mobile menu if open
    if (window.innerWidth < 1024) {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
}

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport with buffer
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) || // Element is visible from top
            (rect.bottom >= 0 && rect.top <= windowHeight) // Element is visible from bottom
        );
    }

    // Keep track of animated elements
    const animatedElements = new Set();

    // Function to handle scroll animation
    function handleScrollAnimation() {
        // Handle all fade animations
        const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        fadeElements.forEach(element => {
            if (!animatedElements.has(element) && isInViewport(element)) {
                element.classList.add('visible');
                animatedElements.add(element);
            }
        });

        // Handle loading bar animations separately
        const loadingBars = document.querySelectorAll('.loading-bar');
        loadingBars.forEach((bar) => {
            if (!animatedElements.has(bar) && isInViewport(bar)) {
                const delay = bar.closest('.skill-item') 
                    ? parseInt(bar.closest('.skill-item').dataset.index) * 200
                    : 400;
                
                setTimeout(() => {
                    bar.classList.add('animate');
                    animatedElements.add(bar);
                }, delay);
            }
        });
    }

    // Initial check for elements in viewport
    handleScrollAnimation();

    // Add debounced scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            handleScrollAnimation();
        });
    });
});

// Add this function to handle availability status
function updateAvailabilityStatus() {
    const statusElement = document.querySelector('.availability-status');
    const statusText = statusElement.childNodes[0].textContent.trim();
    const dots = statusElement.querySelectorAll('.status-dot, .status-dot-ping');
    
    if (statusText === 'Unavailable') {
        dots.forEach(dot => {
            dot.style.backgroundColor = 'rgb(239 68 68)'; // red-500
        });
    } else {
        dots.forEach(dot => {
            dot.style.backgroundColor = 'rgb(34 197 94)'; // green-500
        });
    }
}

// Call this when the DOM loads
document.addEventListener('DOMContentLoaded', function() {
    updateAvailabilityStatus();
});




 