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
 