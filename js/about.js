 // Animation on scroll
 function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

// Run on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const logoutLink = document.querySelector('.dropdown-item[href="index.html"]');

    if (logoutLink) {
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault(); // Iwas page redirect kaagad
            // Clear any stored session or local data
            sessionStorage.clear();
            localStorage.clear();

            // Optional: you can also clear cookies here if needed

            // Redirect to login page
            window.location.href = "index.html";
        });
    }
});
