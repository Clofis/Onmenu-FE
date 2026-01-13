// Data kategori dengan jumlah produk
let categories = [
    { id: 1, name: 'Kategori 1', productCount: 12 },
    { id: 2, name: 'Kategori 2', productCount: 8 },
    { id: 3, name: 'Kategori 3', productCount: 5 }
];

let editingCategoryId = null;
let deletingCategoryId = null;

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

// Render kategori list
function renderCategories() {
    const categoryList = document.querySelector('.category-list');
    if (!categoryList) return;
    
    categoryList.innerHTML = categories.map(cat => `
        <div class="category-item" data-id="${cat.id}">
            <span class="category-name">${cat.name}</span>
            <div class="category-actions">
                <button class="edit-button" onclick="editCategory(${cat.id})">
                    <span class="material-symbols-rounded">edit_note</span>
                    <span>Edit</span>
                </button>
                <button class="delete-button" onclick="showDeleteModal(${cat.id})">
                    <span class="material-symbols-rounded">delete</span>
                    <span>Hapus</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Tambah kategori
function addCategory(name) {
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    categories.push({ id: newId, name: name, productCount: 0 });
    renderCategories();
    
    console.log('Kategori berhasil ditambahkan:', name);
}

// Edit kategori
function editCategory(id) {
    const category = categories.find(c => c.id === id);
    if (!category) return;
    
    editingCategoryId = id;
    const input = document.getElementById('editKategoriInput');
    if (input) {
        input.value = category.name;
    }
    
    openModal('modalEdit');
}

// Update kategori
function updateCategory(id, newName) {
    const category = categories.find(c => c.id === id);
    if (category) {
        category.name = newName;
        renderCategories();
        console.log('Kategori berhasil diupdate:', newName);
    }
}

// Show delete modal
function showDeleteModal(id) {
    const category = categories.find(c => c.id === id);
    if (!category) return;
    
    deletingCategoryId = id;
    
    // Update modal content
    const nameSpan = document.getElementById('deleteKategoriName');
    const countSpan = document.getElementById('deleteProductCount');
    
    if (nameSpan) nameSpan.textContent = category.name;
    if (countSpan) countSpan.textContent = category.productCount;
    
    openModal('modalHapus');
}

// Delete kategori
function deleteCategory() {
    if (!deletingCategoryId) return;
    
    categories = categories.filter(c => c.id !== deletingCategoryId);
    renderCategories();
    closeModal('modalHapus');
    
    console.log('Kategori berhasil dihapus');
    deletingCategoryId = null;
}

// Search kategori
function searchCategories(query) {
    const categoryItems = document.querySelectorAll('.category-item');
    const searchQuery = query.toLowerCase();
    
    categoryItems.forEach(item => {
        const categoryName = item.querySelector('.category-name').textContent.toLowerCase();
        if (categoryName.includes(searchQuery)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize
function init() {
    // Render initial categories
    renderCategories();
    
    // Tombol Tambah Kategori
    const addButton = document.querySelector('.add-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            openModal('modalTambah');
        });
    }
    
    // Form Tambah Kategori
    const formTambah = document.getElementById('formTambahKategori');
    if (formTambah) {
        formTambah.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = formTambah.querySelector('input[type="text"]');
            if (input && input.value.trim()) {
                addCategory(input.value.trim());
                input.value = '';
                closeModal('modalTambah');
            }
        });
    }
    
    // Form Edit Kategori
    const formEdit = document.getElementById('formEditKategori');
    if (formEdit) {
        formEdit.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('editKategoriInput');
            if (input && input.value.trim() && editingCategoryId) {
                updateCategory(editingCategoryId, input.value.trim());
                closeModal('modalEdit');
                editingCategoryId = null;
            }
        });
    }
    
    // Confirm Delete Button
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            deleteCategory();
        });
    }
    
    // Close modal when clicking overlay - DISABLED
    // User harus klik tombol close atau batal untuk menutup modal
    /*
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    */
    
    // ESC key to close modal - DISABLED
    // User harus klik tombol close atau batal untuk menutup modal
    /*
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('modalTambah');
            closeModal('modalEdit');
            closeModal('modalHapus');
        }
    });
    */
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions untuk digunakan di HTML
window.editCategory = editCategory;
window.showDeleteModal = showDeleteModal;
window.closeModal = closeModal;
