// Data toko
let tokoData = {
    namaToko: '',
    email: '',
    nomorTelepon: '',
    alamat: '',
    deskripsi: '',
    fotoProfil: null
};

// Load data from localStorage
function loadTokoData() {
    const savedData = localStorage.getItem('tokoData');
    if (savedData) {
        tokoData = JSON.parse(savedData);
        populateForm();
    }
}

// Save data to localStorage
function saveTokoData() {
    localStorage.setItem('tokoData', JSON.stringify(tokoData));
}

// Populate form with saved data
function populateForm() {
    const namaToko = document.getElementById('namaToko');
    const email = document.getElementById('email');
    const nomorTelepon = document.getElementById('nomorTelepon');
    const alamat = document.getElementById('alamat');
    const deskripsi = document.getElementById('deskripsi');
    
    if (namaToko) namaToko.value = tokoData.namaToko || '';
    if (email) email.value = tokoData.email || '';
    if (nomorTelepon) nomorTelepon.value = tokoData.nomorTelepon || '';
    if (alamat) alamat.value = tokoData.alamat || '';
    if (deskripsi) deskripsi.value = tokoData.deskripsi || '';
    
    // Update avatar if exists
    if (tokoData.fotoProfil) {
        updateAvatar(tokoData.fotoProfil);
    }
}

// Update avatar display
function updateAvatar(imageSrc) {
    const avatarContainer = document.querySelector('.avatar-container');
    const removeBtn = document.getElementById('removeAvatarBtn');
    
    if (avatarContainer) {
        avatarContainer.innerHTML = `<img src="${imageSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"/>`;
    }
    
    // Show remove button
    if (removeBtn) {
        removeBtn.style.display = 'flex';
    }
}

// Reset avatar to default
function resetAvatar() {
    const avatarContainer = document.querySelector('.avatar-container');
    const removeBtn = document.getElementById('removeAvatarBtn');
    
    if (avatarContainer) {
        avatarContainer.innerHTML = '<span class="material-symbols-rounded">photo_camera</span>';
    }
    
    // Hide remove button
    if (removeBtn) {
        removeBtn.style.display = 'none';
    }
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Show delete avatar modal
function showDeleteAvatarModal() {
    openModal('modalHapusFoto');
}

// Show success modal
function showSuccessModal() {
    openModal('modalSuccess');
    
    // Auto close after 2 seconds
    setTimeout(() => {
        closeModal('modalSuccess');
    }, 2000);
}

// Remove avatar
function removeAvatar() {
    tokoData.fotoProfil = null;
    resetAvatar();
    saveTokoData();
    closeModal('modalHapusFoto');
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('Ukuran file terlalu besar! Maksimal 5MB', 'error');
            return;
        }
        
        // Check file type
        if (!file.type.startsWith('image/')) {
            showToast('File harus berupa gambar!', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            tokoData.fotoProfil = e.target.result;
            updateAvatar(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

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
    clearError('email', 'errorEmail');
    clearError('nomorTelepon', 'errorTelepon');
}

// Save form data
function saveFormData() {
    // Clear previous errors
    clearAllErrors();
    
    const namaToko = document.getElementById('namaToko');
    const email = document.getElementById('email');
    const nomorTelepon = document.getElementById('nomorTelepon');
    const alamat = document.getElementById('alamat');
    const deskripsi = document.getElementById('deskripsi');
    
    tokoData.namaToko = namaToko.value.trim();
    tokoData.email = email.value.trim();
    tokoData.nomorTelepon = nomorTelepon.value.trim();
    tokoData.alamat = alamat.value.trim();
    tokoData.deskripsi = deskripsi.value.trim();
    
    let hasError = false;
    
    // Validation - Nama Toko (required)
    if (!tokoData.namaToko) {
        showError('namaToko', 'errorNamaToko', 'Nama toko wajib diisi');
        hasError = true;
    }
    
    // Validation - Email (required + format)
    if (!tokoData.email) {
        showError('email', 'errorEmail', 'Email wajib diisi');
        hasError = true;
    } else if (!isValidEmail(tokoData.email)) {
        showError('email', 'errorEmail', 'Format email tidak valid');
        hasError = true;
    }
    
    // Validation - Nomor Telepon (required + format)
    if (!tokoData.nomorTelepon) {
        showError('nomorTelepon', 'errorTelepon', 'Nomor telepon wajib diisi');
        hasError = true;
    } else if (!isValidPhone(tokoData.nomorTelepon)) {
        showError('nomorTelepon', 'errorTelepon', 'Nomor telepon harus 10-13 digit');
        hasError = true;
    }
    
    if (hasError) {
        return false;
    }
    
    saveTokoData();
    return true;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10,13}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

// Format phone number input
function formatPhoneInput(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Limit to 13 digits
    if (value.length > 13) {
        value = value.substring(0, 13);
    }
    
    input.value = value;
}

// Initialize
function init() {
    // Load saved data
    loadTokoData();
    
    // Create hidden file input for profile picture
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.id = 'profileImageInput';
    document.body.appendChild(fileInput);
    
    // Change profile button
    const changeProfileBtn = document.querySelector('.change-profile-btn');
    if (changeProfileBtn) {
        changeProfileBtn.addEventListener('click', () => {
            fileInput.click();
        });
    }
    
    // File input change handler
    fileInput.addEventListener('change', handleImageUpload);
    
    // Remove avatar button
    const removeAvatarBtn = document.getElementById('removeAvatarBtn');
    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showDeleteAvatarModal();
        });
    }
    
    // Confirm delete avatar button
    const confirmDeleteAvatarBtn = document.getElementById('confirmDeleteAvatarBtn');
    if (confirmDeleteAvatarBtn) {
        confirmDeleteAvatarBtn.addEventListener('click', () => {
            removeAvatar();
        });
    }
    
    // Save button
    const saveBtn = document.querySelector('.submit-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (saveFormData()) {
                showSuccessModal();
                
                // Update dashboard header if on same session
                updateDashboardHeader();
            }
        });
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
    
    // Auto-save on blur
    const allInputs = [namaToko, emailInput, phoneInput, document.getElementById('alamat'), document.getElementById('deskripsi')];
    allInputs.forEach(input => {
        if (input) {
            input.addEventListener('blur', () => {
                // Auto-save when user leaves input field
                const tempData = {
                    namaToko: namaToko?.value.trim() || '',
                    email: emailInput?.value.trim() || '',
                    nomorTelepon: phoneInput?.value.trim() || '',
                    alamat: document.getElementById('alamat')?.value.trim() || '',
                    deskripsi: document.getElementById('deskripsi')?.value.trim() || '',
                    fotoProfil: tokoData.fotoProfil
                };
                
                localStorage.setItem('tokoData', JSON.stringify(tempData));
            });
        }
    });
}

// Update dashboard header with toko name
function updateDashboardHeader() {
    // This will be used when navigating back to dashboard
    if (tokoData.namaToko) {
        localStorage.setItem('dashboardTokoName', tokoData.namaToko);
    }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions
window.tokoData = tokoData;
window.loadTokoData = loadTokoData;
window.openModal = openModal;
window.closeModal = closeModal;
window.showDeleteAvatarModal = showDeleteAvatarModal;
window.showSuccessModal = showSuccessModal;
