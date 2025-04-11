 // Navbar background change on scroll
 window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'var(--dark-color)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(45, 36, 36, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});document.addEventListener("DOMContentLoaded", function () {
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
