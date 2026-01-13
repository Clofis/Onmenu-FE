// Data produk
let products = [
    {
        id: 1,
        name: 'Kerupuk Original',
        category: 'Kategori 1',
        price: 10000,
        stock: 50,
        description: 'Kerupuk renyah dengan rasa original',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzyD29lSqqqXjx8SljVUdvYd8MZO3XwfhNUbVJk8yzAOg1PXGFWo_SeVGh3X7QHEnh5yDpU3XlE5wGRQsHKfc2h-RK9id6oJhiKwC5HS0zj9g0DUITMx9KEMN5rkgmrSpj5tyOV9CSwfCZ9sTnu2RFydm_O0T2NWgoubr7UVkFb5_PP5fVR7l93FPtJsJ92IHQDjGwmIpxctyXx-gHIOKQEZCCSxUrmhyiHXztqtposm3CO0ahfrtJff8PbpGBsfX6sL7jZqQyS3I'
    },
    {
        id: 2,
        name: 'Kerupuk Pedas',
        category: 'Kategori 1',
        price: 12500,
        stock: 30,
        description: 'Kerupuk dengan sensasi pedas',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx5GOLHflF2OhZMCIJokpS0BXt5ieG4K9ItTTFzBd6GUacVuo3QZOuqicXiJVE1BSum3ZVpMJudmPQHOd7Y1nSX0usWgmSBKASLz7frXJxWPlZnEwW63tL5fR1zNcpo6H31HTDTuqzYyfbd2AwQHbcpR8Ima8GefcCTeTGfk6FsJ06eJjQOvHe4Z9kZlwo_Mr6uJXXpvhRR6-ohjTdgzrkDp1Mq-_o5VOsAhq1BifSW26avMFAtjgoq995LdYEh7p0v_i0LxNVtc0'
    },
    {
        id: 3,
        name: 'Kerupuk Ikan',
        category: 'Kategori 2',
        price: 15000,
        stock: 25,
        description: 'Kerupuk ikan segar',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtjawNYdQY4O18eS1Itojm7qO0_8WFQ4eJsOvZDyeQKZxKamG3emojrQp8n2tAdxZwBvfA3zAucvfQJHH2WrI1swJylX1-uv9UsT47RwSzSFAG9x1zGfB7VQb2gkjwao8b8z_OUa58xKa2OVDHPzzsg3jOEN1lbsLTozRW_Z7K9vDvr7HXnkXzNO1npAvLImCg6KN8_3fggvaHSl17rWOyOMFXDAtDoDspNzlp9JhNJGNDU0SstsOfiPHlA4nhPv3IQ9GMUUkF67E'
    },
    {
        id: 4,
        name: 'Kerupuk Udang',
        category: 'Kategori 2',
        price: 18000,
        stock: 20,
        description: 'Kerupuk udang premium',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClVom2Fs0QMET5i6SYCoETFWnJvJV621G-cpQyR5ZXYvdHYQn0tgjqfoGWgOJhB6r3aQi_iUBsquPkMS1DpCGCPBF_gqIn97zVuuSZJHmVeXu3mBt4vmIrLUF9nIESbJdmE8LNHYmrtLiArNoZzjNxgWQ0xsjx0V8Y7aLt89sSR2ztXTHb36lCs7Z4z6Wp98ke80Elhx6X1n4Gm8FXJjK53y3dwRo7BH_7QzRW85yujn5yAPUrWtEPRAk-VyapQA8MlZUQViNz5HM'
    }
];

let uploadedImage = null;

// Render products
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img alt="${product.name}" src="${product.image}"/>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatRupiah(product.price)}</p>
                <div class="product-actions">
                    <button class="edit-btn" onclick="editProduct(${product.id})">
                        <span class="material-symbols-rounded">edit</span>
                        Edit
                    </button>
                    <button class="delete-btn" onclick="showDeleteProductModal(${product.id})">
                        <span class="material-symbols-rounded">delete</span>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Search products
function searchProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    const searchQuery = query.toLowerCase().trim();
    
    if (!searchQuery) {
        // Show all products if search is empty
        productCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
        
        if (productName.includes(searchQuery) || productCategory.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter products by category
function filterByCategory(categoryName) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productCategory = card.querySelector('.product-category').textContent.trim();
        
        if (categoryName === 'Semua' || productCategory === categoryName) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Clear search input when filtering by category
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
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
        
        // Reset form dan image preview
        if (modalId === 'modalTambahProduk') {
            const form = document.getElementById('formTambahProduk');
            if (form) form.reset();
            resetImagePreview();
        }
    }
}

// Format Rupiah
function formatRupiah(angka) {
    return 'Rp' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Image upload handler
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage = e.target.result;
            updateImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Update image preview
function updateImagePreview(imageSrc) {
    const preview = document.getElementById('imagePreview');
    if (preview) {
        preview.innerHTML = `<img src="${imageSrc}" alt="Preview"/>`;
    }
}

// Reset image preview
function resetImagePreview() {
    const preview = document.getElementById('imagePreview');
    if (preview) {
        preview.innerHTML = '<span class="material-symbols-rounded">photo_camera</span>';
    }
    uploadedImage = null;
    
    const imageInput = document.getElementById('imageInput');
    if (imageInput) imageInput.value = '';
}

// Add product
function addProduct(productData) {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        name: productData.name,
        category: productData.category,
        price: productData.price,
        stock: productData.stock,
        description: productData.description,
        image: uploadedImage || 'https://via.placeholder.com/300'
    };
    
    products.push(newProduct);
    console.log('Produk berhasil ditambahkan:', newProduct);
    
    // Refresh product list
    renderProducts();
}

// Initialize
function init() {
    // Render initial products
    renderProducts();
    
    // Tombol Tambah Produk
    const addButton = document.querySelector('.add-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            openModal('modalTambahProduk');
        });
    }
    
    // Image input handler
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }
    
    // Image input handler for edit
    const imageInputEdit = document.getElementById('imageInputEdit');
    if (imageInputEdit) {
        imageInputEdit.addEventListener('change', handleImageUploadEdit);
    }
    
    // Form Tambah Produk
    const formTambah = document.getElementById('formTambahProduk');
    if (formTambah) {
        formTambah.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = formTambah.querySelectorAll('input, textarea');
            const categoryValue = document.getElementById('selectedCategoryTambah').value;
            
            const productData = {
                name: inputs[1].value, // Nama Produk
                category: categoryValue, // Kategori dari custom dropdown
                price: parseInt(inputs[3].value.replace(/\D/g, '')) || 0, // Harga
                stock: parseInt(inputs[4].value) || 0, // Stok
                description: inputs[5].value || '' // Deskripsi
            };
            
            if (productData.name && productData.category) {
                addProduct(productData);
                closeModal('modalTambahProduk');
                
                // Reset custom select
                const customSelect = document.getElementById('customSelectTambah');
                if (customSelect) {
                    const valueSpan = customSelect.querySelector('.custom-select-value');
                    if (valueSpan) {
                        valueSpan.textContent = 'Pilih Kategori';
                        valueSpan.classList.add('placeholder');
                    }
                }
                document.getElementById('selectedCategoryTambah').value = '';
                
                // Show success message
                showToast('Produk berhasil ditambahkan!', 'success');
            }
        });
        
        // Format harga input
        const hargaInput = formTambah.querySelector('input[placeholder="Rp"]');
        if (hargaInput) {
            hargaInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value) {
                    e.target.value = 'Rp' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                }
            });
        }
    }
    
    // Form Edit Produk
    const formEdit = document.getElementById('formEditProduk');
    if (formEdit) {
        formEdit.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const productData = {
                name: document.getElementById('editNamaProduk').value,
                category: document.getElementById('editKategoriProduk').value,
                price: parseInt(document.getElementById('editHargaProduk').value.replace(/\D/g, '')) || 0,
                stock: parseInt(document.getElementById('editStokProduk').value) || 0,
                description: document.getElementById('editDeskripsiProduk').value || ''
            };
            
            if (productData.name && productData.category && editingProductId) {
                updateProduct(productData);
                closeModal('modalEditProduk');
                resetImagePreviewEdit();
                editingProductId = null;
                
                // Show success message
                showToast('Produk berhasil diupdate!', 'success');
            }
        });
        
        // Format harga input for edit
        const hargaInputEdit = document.getElementById('editHargaProduk');
        if (hargaInputEdit) {
            hargaInputEdit.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value) {
                    e.target.value = 'Rp' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                }
            });
        }
    }
    
    // Add click event to all edit buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.edit-btn')) {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = parseInt(productCard.dataset.id);
                editProduct(productId);
            }
        }
        
        if (e.target.closest('.delete-btn')) {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = parseInt(productCard.dataset.id);
                showDeleteProductModal(productId);
            }
        }
    });
    
    // Confirm Delete Button
    const confirmDeleteBtn = document.getElementById('confirmDeleteProductBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            deleteProduct();
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProducts(e.target.value);
        });
    }
    
    // Category filter functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            e.target.classList.add('active');
            
            // Filter products by category
            const categoryName = e.target.textContent.trim();
            filterByCategory(categoryName);
        });
    });
    
    // Close modal when clicking overlay - DISABLED
    // User harus klik tombol close untuk menutup modal
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
    // User harus klik tombol close untuk menutup modal
    /*
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('modalTambahProduk');
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

// Export functions
window.openModal = openModal;
window.closeModal = closeModal;


// Edit product variables
let editingProductId = null;
let uploadedImageEdit = null;
let deletingProductId = null;

// Edit product function
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    editingProductId = id;
    
    // Fill form with product data
    document.getElementById('editNamaProduk').value = product.name;
    document.getElementById('editKategoriProduk').value = product.category;
    document.getElementById('editHargaProduk').value = formatRupiah(product.price);
    document.getElementById('editStokProduk').value = product.stock;
    document.getElementById('editDeskripsiProduk').value = product.description || '';
    
    // Update custom select display
    const customSelect = document.getElementById('customSelectEdit');
    if (customSelect) {
        const valueSpan = customSelect.querySelector('.custom-select-value');
        if (valueSpan) {
            valueSpan.textContent = product.category;
            valueSpan.classList.remove('placeholder');
        }
    }
    
    // Show product image
    if (product.image) {
        updateImagePreviewEdit(product.image);
    }
    
    openModal('modalEditProduk');
}

// Update product
function updateProduct(productData) {
    const product = products.find(p => p.id === editingProductId);
    if (product) {
        product.name = productData.name;
        product.category = productData.category;
        product.price = productData.price;
        product.stock = productData.stock;
        product.description = productData.description;
        
        if (uploadedImageEdit) {
            product.image = uploadedImageEdit;
        }
        
        console.log('Produk berhasil diupdate:', product);
        
        // Refresh product list
        renderProducts();
    }
}

// Image upload handler for edit
function handleImageUploadEdit(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImageEdit = e.target.result;
            updateImagePreviewEdit(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Update image preview for edit
function updateImagePreviewEdit(imageSrc) {
    const preview = document.getElementById('imagePreviewEdit');
    if (preview) {
        preview.innerHTML = `<img src="${imageSrc}" alt="Preview"/>`;
    }
}

// Reset image preview for edit
function resetImagePreviewEdit() {
    const preview = document.getElementById('imagePreviewEdit');
    if (preview) {
        preview.innerHTML = '<span class="material-symbols-rounded">photo_camera</span>';
    }
    uploadedImageEdit = null;
    
    const imageInput = document.getElementById('imageInputEdit');
    if (imageInput) imageInput.value = '';
}

// Export edit function
window.editProduct = editProduct;

// Show delete modal
function showDeleteProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    deletingProductId = id;
    
    // Update modal content
    const nameSpan = document.getElementById('deleteProductName');
    if (nameSpan) nameSpan.textContent = product.name;
    
    openModal('modalHapusProduk');
}

// Delete product
function deleteProduct() {
    if (!deletingProductId) return;
    
    products = products.filter(p => p.id !== deletingProductId);
    console.log('Produk berhasil dihapus');
    
    // Refresh product list
    renderProducts();
    
    closeModal('modalHapusProduk');
    deletingProductId = null;
    
    // Show success message
    showToast('Produk berhasil dihapus!', 'success');
}

// Export delete function
window.showDeleteProductModal = showDeleteProductModal;

// Category Picker Functions
let currentPickerMode = null; // 'tambah' or 'edit'

function openCategoryPicker(mode) {
    currentPickerMode = mode;
    const overlay = document.getElementById('categoryPickerOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update selected state
        const currentValue = mode === 'edit' 
            ? document.getElementById('editKategoriProduk').value
            : document.getElementById('selectedCategoryTambah').value;
        
        updateCategorySelection(currentValue);
    }
}

function closeCategoryPicker() {
    const overlay = document.getElementById('categoryPickerOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function selectCategory(categoryValue) {
    if (currentPickerMode === 'edit') {
        // Update edit form
        document.getElementById('editKategoriProduk').value = categoryValue;
        const customSelect = document.getElementById('customSelectEdit');
        if (customSelect) {
            const valueSpan = customSelect.querySelector('.custom-select-value');
            if (valueSpan) {
                valueSpan.textContent = categoryValue;
                valueSpan.classList.remove('placeholder');
            }
        }
    } else if (currentPickerMode === 'tambah') {
        // Update tambah form
        document.getElementById('selectedCategoryTambah').value = categoryValue;
        const customSelect = document.getElementById('customSelectTambah');
        if (customSelect) {
            const valueSpan = customSelect.querySelector('.custom-select-value');
            if (valueSpan) {
                valueSpan.textContent = categoryValue;
                valueSpan.classList.remove('placeholder');
            }
        }
    }
    
    // Update visual selection
    updateCategorySelection(categoryValue);
    
    // Close picker after short delay
    setTimeout(() => {
        closeCategoryPicker();
    }, 200);
}

function updateCategorySelection(selectedValue) {
    const options = document.querySelectorAll('.category-option');
    options.forEach(option => {
        if (option.dataset.value === selectedValue) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Export category picker functions
window.openCategoryPicker = openCategoryPicker;
window.closeCategoryPicker = closeCategoryPicker;
window.selectCategory = selectCategory;
