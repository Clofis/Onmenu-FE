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
    clearError('namaToko', 'errorNamaToko');
    clearError('nomorTelepon', 'errorTelepon');
    clearError('email', 'errorEmail');
    clearError('password', 'errorPassword');
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number (10-13 digits)
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10,13}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

// Format phone number input (only numbers)
function formatPhoneInput(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Limit to 13 digits
    if (value.length > 13) {
        value = value.substring(0, 13);
    }
    
    input.value = value;
}

// Validate form
function validateForm() {
    clearAllErrors();
    
    const namaToko = document.getElementById('namaToko');
    const nomorTelepon = document.getElementById('nomorTelepon');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    let hasError = false;
    
    // Validate Nama Toko (required)
    if (!namaToko.value.trim()) {
        showError('namaToko', 'errorNamaToko', 'Nama toko wajib diisi');
        hasError = true;
    }
    
    // Validate Nomor Telepon (required + format)
    if (!nomorTelepon.value.trim()) {
        showError('nomorTelepon', 'errorTelepon', 'Nomor telepon wajib diisi');
        hasError = true;
    } else if (!isValidPhone(nomorTelepon.value.trim())) {
        showError('nomorTelepon', 'errorTelepon', 'Nomor telepon harus 10-13 digit');
        hasError = true;
    }
    
    // Validate Email (required + format)
    if (!email.value.trim()) {
        showError('email', 'errorEmail', 'Email wajib diisi');
        hasError = true;
    } else if (!isValidEmail(email.value.trim())) {
        showError('email', 'errorEmail', 'Format email tidak valid');
        hasError = true;
    }
    
    // Validate Password (required + min length)
    if (!password.value) {
        showError('password', 'errorPassword', 'Kata sandi wajib diisi');
        hasError = true;
    } else if (password.value.length < 6) {
        showError('password', 'errorPassword', 'Kata sandi minimal 6 karakter');
        hasError = true;
    }
    
    return !hasError;
}

// Handle form submit
function handleSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const namaToko = document.getElementById('namaToko').value.trim();
        const nomorTelepon = document.getElementById('nomorTelepon').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Save to localStorage (in real app, send to server)
        const userData = {
            namaToko,
            nomorTelepon,
            email,
            password,
            registeredAt: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        showToast('Pendaftaran berhasil!', 'success');
        
        setTimeout(() => {
            window.location.href = 'dasboard.html';
        }, 1000);
    }
}

// Initialize
function init() {
    const form = document.getElementById('formDaftar');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('nomorTelepon');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            formatPhoneInput(e.target);
        });
        
        // Clear error on input
        phoneInput.addEventListener('input', () => {
            clearError('nomorTelepon', 'errorTelepon');
        });
    }
    
    // Clear error on input for other fields
    const namaToko = document.getElementById('namaToko');
    if (namaToko) {
        namaToko.addEventListener('input', () => {
            clearError('namaToko', 'errorNamaToko');
        });
    }
    
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
