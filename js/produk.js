// Data produk
let products = [
    {
        id: 1,
        name: 'Kerupuk Original',
        category: 'Kategori 1',
        price: 10000,
        stock: 50,
        description: 'Kerupuk renyah dengan rasa original',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzyD29lSqqqXjx8SljVUdvYd8MZO3XwfhNUbVJk8yzAOg1PXGFWo_SeVGh3X7QHEnh5yDpU3XlE5wGRQsHKfc2h-RK9id6oJhiKwC5HS0zj9g0DUITMx9KEMN5rkgmrSpj5tyOV9CSwfCZ9sTnu2RFydm_O0T2NWgoubr7UVkFb5_PP5fVR7l93FPtJsJ92IHQDjGwmIpxctyXx-gHIOKQEZCCSxUrmhyiHXztqtposm3CO0ahfrtJff8PbpGBsfX6sL7jZqQyS3I',
        hasVariants: false,
        variants: []
    },
    {
        id: 2,
        name: 'Kerupuk Pedas',
        category: 'Kategori 1',
        price: 12500,
        stock: 30,
        description: 'Kerupuk dengan sensasi pedas',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx5GOLHflF2OhZMCIJokpS0BXt5ieG4K9ItTTFzBd6GUacVuo3QZOuqicXiJVE1BSum3ZVpMJudmPQHOd7Y1nSX0usWgmSBKASLz7frXJxWPlZnEwW63tL5fR1zNcpo6H31HTDTuqzYyfbd2AwQHbcpR8Ima8GefcCTeTGfk6FsJ06eJjQOvHe4Z9kZlwo_Mr6uJXXpvhRR6-ohjTdgzrkDp1Mq-_o5VOsAhq1BifSW26avMFAtjgoq995LdYEh7p0v_i0LxNVtc0',
        hasVariants: true,
        variants: [
            { name: 'Level 1', price: 12500, image: null },
            { name: 'Level 2', price: 13500, image: null },
            { name: 'Level 3', price: 14500, image: null }
        ]
    },
    {
        id: 3,
        name: 'Kerupuk Ikan',
        category: 'Kategori 2',
        price: 15000,
        stock: 25,
        description: 'Kerupuk ikan segar',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtjawNYdQY4O18eS1Itojm7qO0_8WFQ4eJsOvZDyeQKZxKamG3emojrQp8n2tAdxZwBvfA3zAucvfQJHH2WrI1swJylX1-uv9UsT47RwSzSFAG9x1zGfB7VQb2gkjwao8b8z_OUa58xKa2OVDHPzzsg3jOEN1lbsLTozRW_Z7K9vDvr7HXnkXzNO1npAvLImCg6KN8_3fggvaHSl17rWOyOMFXDAtDoDspNzlp9JhNJGNDU0SstsOfiPHlA4nhPv3IQ9GMUUkF67E',
        hasVariants: false,
        variants: []
    },
    {
        id: 4,
        name: 'Kerupuk Udang',
        category: 'Kategori 2',
        price: 18000,
        stock: 20,
        description: 'Kerupuk udang premium',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClVom2Fs0QMET5i6SYCoETFWnJvJV621G-cpQyR5ZXYvdHYQn0tgjqfoGWgOJhB6r3aQi_iUBsquPkMS1DpCGCPBF_gqIn97zVuuSZJHmVeXu3mBt4vmIrLUF9nIESbJdmE8LNHYmrtLiArNoZzjNxgWQ0xsjx0V8Y7aLt89sSR2ztXTHb36lCs7Z4z6Wp98ke80Elhx6X1n4Gm8FXJjK53y3dwRo7BH_7QzRW85yujn5yAPUrWtEPRAk-VyapQA8MlZUQViNz5HM',
        hasVariants: true,
        variants: [
            { name: 'Kecil', price: 15000, image: null },
            { name: 'Sedang', price: 18000, image: null },
            { name: 'Besar', price: 22000, image: null }
        ]
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
                ${product.hasVariants && product.variants && product.variants.length > 0 ? 
                    `<div class="product-variant-badge">${product.variants.length} variant</div>` : ''
                }
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
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
            
            // Reset variant form
            document.getElementById('hasVariantTambah').checked = false;
            document.getElementById('variantFormTambah').style.display = 'none';
            clearVariantRows('tambah');
        }
        
        if (modalId === 'modalEditProduk') {
            // Reset variant form for edit
            document.getElementById('hasVariantEdit').checked = false;
            document.getElementById('variantFormEdit').style.display = 'none';
            clearVariantRows('edit');
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
        image: uploadedImage || 'https://via.placeholder.com/300',
        hasVariants: productData.hasVariants || false,
        variants: productData.variants || []
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
            const hasVariants = document.getElementById('hasVariantTambah').checked;
            const variants = hasVariants ? getVariantsFromForm('tambah') : [];
            
            const productData = {
                name: inputs[1].value, // Nama Produk
                category: categoryValue, // Kategori dari custom dropdown
                price: parseInt(inputs[3].value.replace(/\D/g, '')) || 0, // Harga
                stock: parseInt(inputs[4].value) || 0, // Stok
                description: inputs[5].value || '', // Deskripsi
                hasVariants: hasVariants,
                variants: variants
            };
            
            if (productData.name && productData.category) {
                // Validate variants if has variants is checked
                if (hasVariants && variants.length === 0) {
                    showToast('Silakan tambahkan minimal satu variant!', 'error');
                    return;
                }
                
                addProduct(productData);
                closeModal('modalTambahProduk');
                
                // Reset form
                document.getElementById('hasVariantTambah').checked = false;
                toggleVariantForm('tambah');
                
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
            
            const hasVariants = document.getElementById('hasVariantEdit').checked;
            const variants = hasVariants ? getVariantsFromForm('edit') : [];
            
            const productData = {
                name: document.getElementById('editNamaProduk').value,
                category: document.getElementById('editKategoriProduk').value,
                price: parseInt(document.getElementById('editHargaProduk').value.replace(/\D/g, '')) || 0,
                stock: parseInt(document.getElementById('editStokProduk').value) || 0,
                description: document.getElementById('editDeskripsiProduk').value || '',
                hasVariants: hasVariants,
                variants: variants
            };
            
            if (productData.name && productData.category && editingProductId) {
                // Validate variants if has variants is checked
                if (hasVariants && variants.length === 0) {
                    showToast('Silakan tambahkan minimal satu variant!', 'error');
                    return;
                }
                
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
    
    // Variant checkbox event listeners
    const hasVariantTambah = document.getElementById('hasVariantTambah');
    if (hasVariantTambah) {
        hasVariantTambah.addEventListener('change', () => {
            toggleVariantForm('tambah');
        });
    }
    
    const hasVariantEdit = document.getElementById('hasVariantEdit');
    if (hasVariantEdit) {
        hasVariantEdit.addEventListener('change', () => {
            toggleVariantForm('edit');
        });
    }
    
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
    
    // Handle variants
    const hasVariantCheckbox = document.getElementById('hasVariantEdit');
    hasVariantCheckbox.checked = product.hasVariants || false;
    
    if (product.hasVariants && product.variants && product.variants.length > 0) {
        toggleVariantForm('edit');
        populateVariantsInForm('edit', product.variants);
    } else {
        toggleVariantForm('edit');
    }
    
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
        product.hasVariants = productData.hasVariants;
        product.variants = productData.variants;
        
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

// Variant Functions
function toggleVariantForm(mode) {
    const checkbox = document.getElementById(`hasVariant${mode === 'tambah' ? 'Tambah' : 'Edit'}`);
    const variantForm = document.getElementById(`variantForm${mode === 'tambah' ? 'Tambah' : 'Edit'}`);
    
    if (checkbox.checked) {
        variantForm.style.display = 'block';
        // Add first variant row if none exists
        const variantList = document.getElementById(`variantList${mode === 'tambah' ? 'Tambah' : 'Edit'}`);
        if (variantList.children.length === 0) {
            addVariantRow(mode);
        }
    } else {
        variantForm.style.display = 'none';
        // Clear all variant rows
        clearVariantRows(mode);
    }
}

function addVariantRow(mode) {
    const variantList = document.getElementById(`variantList${mode === 'tambah' ? 'Tambah' : 'Edit'}`);
    const rowIndex = variantList.children.length;
    
    const variantRow = document.createElement('div');
    variantRow.className = 'variant-row';
    variantRow.innerHTML = `
        <div style="width: 100%; margin-bottom: 0.5rem;">
            <div class="form-group" style="gap: 0.25rem;">
                <label class="form-label" style="font-size: 0.75rem;">Gambar</label>
                <input class="variant-image-input" type="file" accept="image/*" style="display: none;"/>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <button type="button" style="padding: 0.375rem 0.75rem; border: 1px solid #d1d5db; background: white; border-radius: 0.375rem; font-weight: 500; font-size: 0.75rem; color: #374151; cursor: pointer; white-space: nowrap; transition: all 0.3s;" onclick="this.closest('.variant-row').querySelector('.variant-image-input').click()">
                        Choose File
                    </button>
                    <span class="variant-file-name" style="font-size: 0.75rem; color: #6b7280; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">No file chosen</span>
                </div>
            </div>
        </div>
        <div style="display: flex; gap: 0.75rem; align-items: flex-end;">
            <div class="form-group" style="flex: 1;">
                <label class="form-label">Nama Varian</label>
                <input class="form-input variant-name" type="text" placeholder="Contoh: Kecil, Level 1" required/>
            </div>
            <div class="form-group" style="flex: 0.8;">
                <label class="form-label">Harga</label>
                <input class="form-input variant-price" type="text" placeholder="Rp" required/>
            </div>
            <button type="button" class="remove-variant-btn" onclick="removeVariantRow(this)">
                <span class="material-symbols-rounded">delete</span>
            </button>
        </div>
    `;
    
    variantList.appendChild(variantRow);
    
    // Add price formatting to the new price input
    const priceInput = variantRow.querySelector('.variant-price');
    priceInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
            e.target.value = 'Rp' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
    });
    
    // Add file input handler
    const fileInput = variantRow.querySelector('.variant-image-input');
    const fileName = variantRow.querySelector('.variant-file-name');
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileName.textContent = e.target.files[0].name;
            
            // Store image data
            const reader = new FileReader();
            reader.onload = function(event) {
                fileInput.dataset.imageData = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            fileName.textContent = 'No file chosen';
        }
    });
}

function removeVariantRow(button) {
    const variantRow = button.closest('.variant-row');
    variantRow.remove();
}

function clearVariantRows(mode) {
    const variantList = document.getElementById(`variantList${mode === 'tambah' ? 'Tambah' : 'Edit'}`);
    variantList.innerHTML = '';
}

function getVariantsFromForm(mode) {
    const variantList = document.getElementById(`variantList${mode === 'tambah' ? 'Tambah' : 'Edit'}`);
    const variants = [];
    
    const variantRows = variantList.querySelectorAll('.variant-row');
    variantRows.forEach(row => {
        const nameInput = row.querySelector('.variant-name');
        const priceInput = row.querySelector('.variant-price');
        const fileInput = row.querySelector('.variant-image-input');
        
        if (nameInput.value.trim() && priceInput.value.trim()) {
            variants.push({
                name: nameInput.value.trim(),
                price: parseInt(priceInput.value.replace(/\D/g, '')) || 0,
                image: fileInput.dataset.imageData || null
            });
        }
    });
    
    return variants;
}

function populateVariantsInForm(mode, variants) {
    const variantList = document.getElementById(`variantList${mode === 'tambah' ? 'Tambah' : 'Edit'}`);
    
    // Clear existing variants
    clearVariantRows(mode);
    
    // Add variant rows for each variant
    variants.forEach(variant => {
        addVariantRow(mode);
        const lastRow = variantList.lastElementChild;
        const nameInput = lastRow.querySelector('.variant-name');
        const priceInput = lastRow.querySelector('.variant-price');
        const fileInput = lastRow.querySelector('.variant-image-input');
        const fileName = lastRow.querySelector('.variant-file-name');
        
        nameInput.value = variant.name;
        priceInput.value = formatRupiah(variant.price);
        
        if (variant.image) {
            fileInput.dataset.imageData = variant.image;
            fileName.textContent = 'Image loaded';
        }
    });
}

// Export variant functions
window.addVariantRow = addVariantRow;
window.removeVariantRow = removeVariantRow;
