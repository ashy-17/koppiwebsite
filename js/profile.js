document.addEventListener('DOMContentLoaded', function() {
    // Kunin ang user data mula sa localStorage o sessionStorage
    const userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData'));
    
    if(userData) {
        // I-display ang user info sa profile header
        document.querySelector('.profile-name').textContent = userData.firstName + ' ' + (userData.lastName || '');
        document.querySelector('.profile-membership').textContent = userData.membership || 'Member';
        
        // Punuin ang form fields
        document.getElementById('firstName').value = userData.firstName || '';
        document.getElementById('lastName').value = userData.lastName || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('phone').value = userData.phone || '';
        document.getElementById('address').value = userData.address || '';
        
        // I-update ang profile button sa navbar
        const profileBtn = document.querySelector('.profile-btn');
        profileBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${userData.firstName || 'Profile'}`;
    } else {
        // Kung walang user data, redirect sa login page
        window.location.href = 'index.html';
    }

    // Logout functionality
    document.querySelector('.dropdown-item[href="index.html"]').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('userData');
        sessionStorage.removeItem('userData');
        window.location.href = 'index.html';
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
