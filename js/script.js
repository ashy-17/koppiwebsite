document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var messageDiv = document.getElementById("message");
    
    // Clear previous state
    messageDiv.className = "alert";
    messageDiv.innerHTML = "";
    
    // Simple validation
    if (!email.includes("@") || !email.includes(".")) {
        messageDiv.className += " alert-danger";
        messageDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Please enter a valid email address';
        messageDiv.classList.remove("d-none");
        return;
    }
    
    if (password.length < 6) {
        messageDiv.className += " alert-danger";
        messageDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Password must be at least 8 characters';
        messageDiv.classList.remove("d-none");
        return;
    }
    
    // Check credentials (demo purposes)
    if (email === "admin@coffee.com" && password === "coffee123") {
        messageDiv.className += " alert-success";
        messageDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i>Login successful! Redirecting...';
        messageDiv.classList.remove("d-none");
        
        // Simulate redirect
        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 1500);
    } else {
        messageDiv.className += " alert-danger";
        messageDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Invalid email or password. Please try again.';
        messageDiv.classList.remove("d-none");
        
        // Shake animation for wrong credentials
        document.getElementById("loginForm").animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 300,
            iterations: 1
        });
    }
});

// Add focus effects
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.color = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.querySelector('label').style.color = 'var(--dark-color)';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    // Check if user is already logged in
    if(localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'home.html';
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;

        // Simple validation - replace with your actual authentication
        if(email && password) {
            // For demo purposes, let's accept any non-empty email and password
            // In a real app, you would verify against a database
            
            // Store login state
            if(rememberMe) {
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                sessionStorage.setItem('isLoggedIn', 'true');
            }
            
            // Show success message
            messageDiv.textContent = 'Login successful! Redirecting...';
            messageDiv.classList.remove('d-none', 'alert-danger');
            messageDiv.classList.add('alert-success');
            
            // Redirect after 1 second
            setTimeout(function() {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            // Show error message
            messageDiv.textContent = 'Please enter both email and password';
            messageDiv.classList.remove('d-none', 'alert-success');
            messageDiv.classList.add('alert-danger');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;

        if(email && password) {
            // Store user data
            const userData = {
                firstName: email.split('@')[0], // Extract name from email
                email: email
            };
            
            if(rememberMe) {
                localStorage.setItem('userData', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('userData', JSON.stringify(userData));
            }
            
            messageDiv.textContent = 'Login successful! Redirecting...';
            messageDiv.classList.remove('d-none', 'alert-danger');
            messageDiv.classList.add('alert-success');
            
            setTimeout(function() {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            messageDiv.textContent = 'Please enter both email and password';
            messageDiv.classList.remove('d-none', 'alert-success');
            messageDiv.classList.add('alert-danger');
        }
    });
    
});