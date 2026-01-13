// Auth check - untuk halaman yang memerlukan login
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Jika belum login, redirect ke login
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    }
}

// Check if already logged in (untuk halaman login/daftar)
function checkAlreadyLoggedIn() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Jika sudah login, redirect ke dashboard
    if (isLoggedIn === 'true') {
        window.location.href = 'dasboard.html';
    }
}

// Export functions
window.checkAuth = checkAuth;
window.logout = logout;
window.checkAlreadyLoggedIn = checkAlreadyLoggedIn;
