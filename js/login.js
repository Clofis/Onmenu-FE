// Clear error state
function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input) {
        input.classList.remove('error');
    }
    if (error) {
        error.classList.remove('show');
        error.textContent = '';
    }
}

// Show error state
function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input) {
        input.classList.add('error');
    }
    if (error) {
        error.classList.add('show');
        error.textContent = message;
    }
}

// Clear all errors
function clearAllErrors() {
    clearError('email', 'errorEmail');
    clearError('password', 'errorPassword');
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate form
function validateForm() {
    clearAllErrors();
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    let hasError = false;
    
    // Validate Email (required + format)
    if (!email.value.trim()) {
        showError('email', 'errorEmail', 'Email wajib diisi');
        hasError = true;
    } else if (!isValidEmail(email.value.trim())) {
        showError('email', 'errorEmail', 'Format email tidak valid');
        hasError = true;
    }
    
    // Validate Password (required)
    if (!password.value) {
        showError('password', 'errorPassword', 'Kata sandi wajib diisi');
        hasError = true;
    }
    
    return !hasError;
}

// Handle form submit
function handleSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Check if user exists (in real app, verify with server)
        const userData = localStorage.getItem('userData');
        
        if (userData) {
            const user = JSON.parse(userData);
            
            if (user.email === email && user.password === password) {
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login berhasil!');
                window.location.href = 'dasboard.html';
            } else {
                showError('email', 'errorEmail', 'Email atau kata sandi salah');
                showError('password', 'errorPassword', ' ');
            }
        } else {
            showError('email', 'errorEmail', 'Akun tidak ditemukan. Silakan daftar terlebih dahulu');
        }
    }
}

// Initialize
function init() {
    const form = document.getElementById('formLogin');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    // Clear error on input
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            clearError('email', 'errorEmail');
        });
    }
    
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            clearError('password', 'errorPassword');
        });
    }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
