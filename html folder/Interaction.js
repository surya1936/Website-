function toggleMenu() {
    document.querySelector(".menu-icon").classList.toggle("active");
    document.getElementById("sideMenu").classList.toggle("active");
}
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




