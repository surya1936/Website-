// JavaScript to enhance animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    const animateOnScroll = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
            }
        });
    };
    
    const options = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(animateOnScroll, options);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add hover animation to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease';
            this.style.color = '#4CAF50';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transition = 'color 0.3s ease';
            this.style.color = '#333';
        });
    });
});