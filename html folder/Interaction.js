function toggleMenu() {
    document.querySelector(".menu-icon").classList.toggle("active");
    document.getElementById("sideMenu").classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling Down - Hide Header
            header.classList.add("hidden");
        } else {
            // Scrolling Up - Show Header
            header.classList.remove("hidden");
        }

        lastScrollTop = scrollTop;
    });
});

const slider = document.querySelector('.product-slider');

// Pause animation on hover (desktop)
slider.addEventListener('mouseenter', () => {
    slider.style.animationPlayState = 'paused';
});

// Resume animation when mouse leaves
slider.addEventListener('mouseleave', () => {
    slider.style.animationPlayState = 'running';
});

// Pause animation on touch (mobile)
slider.addEventListener('touchstart', () => {
    slider.style.animationPlayState = 'paused';
});

// Resume animation when touch ends
slider.addEventListener('touchend', () => {
    slider.style.animationPlayState = 'running';
});

// dropdown silder 
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.image-slider');
    const slides = document.querySelector('.slides');
    const dotsContainer = document.querySelector('.slider-nav');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    // Create dots
    const slidesCount = document.querySelectorAll('.slide').length;
    for (let i = 0; i < slidesCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.slider-dot');
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    function updateSlider() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slidesCount;
        updateSlider();
        resetAutoSlide();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slidesCount) % slidesCount;
        updateSlider();
        resetAutoSlide();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});







