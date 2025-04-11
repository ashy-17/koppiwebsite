
        // Password strength indicator
        document.getElementById('password')?.addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.getElementById('passwordStrength');
            const hints = {
                length: document.getElementById('lengthHint'),
                number: document.getElementById('numberHint'),
                special: document.getElementById('specialHint')
            };
            
            // Reset hints
            Object.values(hints).forEach(hint => hint.classList.remove('valid'));
            
            let strength = 0;
            
            // Length check
            if (password.length >= 8) {
                strength += 30;
                hints.length.classList.add('valid');
            }
            
            // Number check
            if (/\d/.test(password)) {
                strength += 30;
                hints.number.classList.add('valid');
            }
            
            // Special character check
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                strength += 40;
                hints.special.classList.add('valid');
            }
            
            // Update strength bar
            strengthBar.style.width = strength + '%';
            
            // Change color based on strength
            if (strength < 50) {
                strengthBar.style.backgroundColor = '#dc3545'; // Red
            } else if (strength < 80) {
                strengthBar.style.backgroundColor = 'var(--accent-color)'; // Gold
            } else {
                strengthBar.style.backgroundColor = '#28a745'; // Green
            }
        });
        
        // Form validation
        document.getElementById('signupForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const messageDiv = document.getElementById('message');
            
            // Clear previous messages
            messageDiv.className = 'alert d-none';
            
            // Validate passwords match
            if (document.getElementById('password').value !== 
                document.getElementById('confirmPassword').value) {
                showError('Passwords do not match');
                return;
            }
            
            // Validate terms accepted
            if (!document.getElementById('terms').checked) {
                showError('You must accept the terms and conditions');
                return;
            }
            
            // If all validations pass
            showSuccess('Account created successfully! Redirecting...');
            
            // In a real app, you would submit to server here
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
        
        function showError(message) {
            const messageDiv = document.getElementById('message');
            messageDiv.className = 'alert alert-danger';
            messageDiv.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
            messageDiv.classList.remove('d-none');
            
            // Shake animation (matches login page)
            document.getElementById('signupForm').animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300, iterations: 1 });
        }
        
        function showSuccess(message) {
            const messageDiv = document.getElementById('message');
            messageDiv.className = 'alert alert-success';
            messageDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
            messageDiv.classList.remove('d-none');
        }