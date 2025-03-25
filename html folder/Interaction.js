function toggleMenu() {
    document.querySelector(".menu-icon").classList.toggle("active");
    document.getElementById("sideMenu").classList.toggle("active");
}
let lastScrollTop = 0;
const header = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 50) {
        // User is scrolling down, hide the header
        header.style.transform = "translateY(-100%)";
        header.style.opacity = "0";
    } else {
        // User is scrolling up, show the header
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values
});

// Add event listener to the menu icon
