document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and project cards
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Remove visible class first
                card.classList.remove('visible');
                
                // Filter logic
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Add small delay before adding visible class
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initial animation
    setTimeout(() => {
        projectCards.forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all animated elements
document.querySelectorAll('.fade-in-up, .loading-bar').forEach(el => observer.observe(el)); 