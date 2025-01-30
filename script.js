// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Smooth scroll functionality
    function smoothScroll(sectionId) {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open on mobile devices
        if (window.innerWidth < 1024) {
            closeMobileMenu();
        }
    }

    // Add click handlers for navigation links
    const navLinks = {
        'home': '#home',
        'about': '#about',
        'services': '#services',
        'portfolio': '#portfolio',
        'contact': '#contact'
    };

    Object.entries(navLinks).forEach(([section, selector]) => {
        const link = document.querySelector(`a[href="${selector}"]`);
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                smoothScroll(section);
            });
        }
    });
});

// Typing effect
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
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize Typing Effect
document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.getElementById('typed-text');
    const words = ['Frontend Developer', 'Web Developer'];
    const wait = 1500;
    new TypeWriter(txtElement, words, wait);
});
 
// Availablity Status Dot
function updateAvailabilityStatus() {
    const statusElement = document.querySelector('.availability-status');
    const statusText = statusElement.childNodes[0].textContent.trim();
    
    // Clear existing status classes
    statusElement.classList.remove(
        'status-available',
        'status-unavailable',
        'status-busy'
    );
    
    // Set new status class
    if (statusText === 'Unavailable' || statusText === 'Currently Unavailable') {
        statusElement.classList.add('status-unavailable');
    } else if (statusText === 'Busy') {
        statusElement.classList.add('status-busy');
    } else {
        statusElement.classList.add('status-available');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateAvailabilityStatus();
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact form');
    const successMessage = document.getElementById('success-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    const successSound = new Audio('sounds/success-notification.mp3'); // You'll need to add this file

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            </span>
        `;

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            // Play success sound
            try {
                successSound.play();
            } catch (err) {
                console.log('Error playing sound:', err);
            }

            // Show success message
            successMessage.classList.remove('hidden');
            successMessage.classList.add('show');
            
            setTimeout(() => {
                successMessage.classList.remove('show');
                successMessage.classList.add('hidden');
            }, 4800);
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
            form.reset();
        });
    });
});

