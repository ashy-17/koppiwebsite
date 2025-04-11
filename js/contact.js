// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
    
    // Reset the form
    this.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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
