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
    const mobileHeader = document.querySelector('.lg\\:hidden');
    const mobileHeaderHeight = mobileHeader ? mobileHeader.offsetHeight : 0;
    
    // Calculate scroll position with offset for mobile header
    const scrollPosition = aboutSection.offsetTop - mobileHeaderHeight;
    
    // Smooth scroll to position
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
    
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

// Add this function for all navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const mobileHeader = document.querySelector('.lg\\:hidden');
    const mobileHeaderHeight = mobileHeader ? mobileHeader.offsetHeight : 0;
    
    // Calculate scroll position with offset for mobile header
    const scrollPosition = section.offsetTop - mobileHeaderHeight;
    
    // Smooth scroll to position
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
    
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

        // Handle service card animations
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            if (!animatedElements.has(card) && isInViewport(card)) {
                card.classList.add('visible');
                animatedElements.add(card);
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

// Add this function to handle active navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections that have an ID defined
    const sections = document.querySelectorAll("section[id], div[id]");
    
    // Get all nav items
    const navItems = document.querySelectorAll(".nav-item");
    
    // Add active class to nav items
    function makeNavActive() {
        let current = '';
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; // Add offset for better trigger point
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;
            
            // Check if the section is currently in view
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Remove active class from all items first
        navItems.forEach((item) => {
            item.classList.remove('active');
        });

        // Add active class to current section's nav item
        if (current) {
            const activeItem = document.querySelector(`.nav-item[href="#${current}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }
    }

    // Add scroll event listener with throttling
    let isScrolling;
    window.addEventListener('scroll', () => {
        // Clear the timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {
            makeNavActive();
        }, 50);
    });
    
    // Call once on load
    makeNavActive();
});

// Add these functions for the profile popup
function openProfilePopup() {
    const popup = document.getElementById('profilePopup');
    document.body.style.overflow = 'hidden';
    popup.style.display = 'flex';
    // Trigger reflow
    popup.offsetHeight;
    popup.classList.add('show');
}

function closeProfilePopup() {
    const popup = document.getElementById('profilePopup');
    popup.classList.add('closing');
    popup.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        popup.classList.remove('closing');
        popup.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Close popup when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('profilePopup');
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closeProfilePopup();
        }
    });
});




 