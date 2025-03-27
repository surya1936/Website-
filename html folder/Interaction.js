function toggleMenu() {
    document.querySelector(".menu-icon").classList.toggle("active");
    document.getElementById("sideMenu").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const header = document.querySelector(".header");

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




