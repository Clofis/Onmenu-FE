# Onmenu - Prototype Aplikasi Manajemen Toko

Prototype aplikasi manajemen toko dengan fitur lengkap untuk mengelola produk, kategori, pesanan, dan pengaturan toko.

## Fitur

### 1. Autentikasi
- **Login** (`login.html`) - Halaman login dengan validasi email dan password
- **Daftar** (`daftar.html`) - Halaman registrasi untuk toko baru
- **Logout** - Tombol logout di dashboard (pojok kiri atas)

### 2. Dashboard (`dasboard.html`)
- Statistik toko (Total Pendapatan, Jumlah Transaksi, Jumlah Menu, Jumlah Kategori)
- Grafik pendapatan bulanan dengan animasi
- Filter bulan untuk melihat statistik per bulan
- Menampilkan nama toko dari data registrasi

### 3. Kategori (`kategori.html`)
- Tambah kategori baru
- Edit kategori
- Hapus kategori dengan konfirmasi modal
- Search kategori

### 4. Produk (`produk.html`)
- Tambah produk dengan upload gambar
- Edit produk
- Hapus produk dengan konfirmasi modal
- Search produk
- Filter produk berdasarkan kategori
- Format harga otomatis (Rupiah)

### 5. Pesanan (`pesanan.html`)
- Daftar pesanan masuk
- Button "Lihat" dengan icon WhatsApp
- Search pesanan

### 6. Setting (`setting.html`)
- Upload/ganti foto profil toko
- Hapus foto profil dengan konfirmasi modal
- Edit informasi toko (Nama, Email, Telepon, Alamat, Deskripsi)
- Validasi form dengan error message
- Auto-save data ke localStorage

## Navigasi

Semua halaman terhubung dengan navigasi bottom bar:
- Home (Dashboard)
- Grid View (Kategori)
- Inventory (Produk)
- Shopping Bag (Pesanan)
- Settings (Pengaturan)

## Teknologi

- **HTML5** - Struktur halaman
- **CSS3** - Styling dengan dark mode support
- **JavaScript (Vanilla)** - Interaktivitas dan logika
- **LocalStorage** - Penyimpanan data sementara (prototype)

## Cara Menggunakan

1. Buka `login.html` atau `daftar.html` di browser
2. Untuk daftar: Isi form registrasi → otomatis redirect ke dashboard
3. Untuk login: Isi email dan password → redirect ke dashboard
4. Navigasi antar halaman menggunakan bottom navigation bar
5. Logout menggunakan tombol merah di pojok kiri atas dashboard

## Data Storage

Saat ini menggunakan **localStorage** untuk menyimpan:
- Status login (`isLoggedIn`)
- Data user (`userData`, `userEmail`)
- Data toko (`tokoData`)
- Data produk (di `js/produk.js`)
- Data kategori (di `js/kategori.js`)

## Integrasi Backend (Laravel)

Prototype ini **siap untuk integrasi backend** tanpa perlu mengubah struktur navigasi:

### Yang Perlu Diubah:
1. **Form Submit** → Kirim ke Laravel API endpoint
   ```javascript
   // Contoh: Login
   fetch('/api/login', {
       method: 'POST',
       body: JSON.stringify({ email, password })
   })
   ```

2. **LocalStorage** → Ganti dengan API calls
   ```javascript
   // Contoh: Get Products
   fetch('/api/products')
       .then(res => res.json())
       .then(data => renderProducts(data))
   ```

3. **Auth Check** → Ganti dengan session/token check
   ```javascript
   // Cek token dari Laravel
   const token = localStorage.getItem('auth_token');
   ```

### Yang Tetap Dipakai:
- Semua HTML structure
- Semua CSS styling
- Navigasi antar halaman
- Modal, form validation, UI interactions
- Event handlers dan fungsi JavaScript

## File Structure

```
├── login.html              # Halaman login
├── daftar.html            # Halaman registrasi
├── dasboard.html          # Dashboard utama
├── kategori.html          # Manajemen kategori
├── produk.html            # Manajemen produk
├── pesanan.html           # Daftar pesanan
├── setting.html           # Pengaturan toko
├── css/
│   ├── login.css
│   ├── daftar.css
│   ├── dasboard.css
│   ├── kategori.css
│   ├── produk.css
│   ├── pesanan.css
│   └── setting.css
└── js/
    ├── auth.js            # Autentikasi & auth check
    ├── login.js           # Logic login
    ├── daftar.js          # Logic registrasi
    ├── dashboard.js       # Logic dashboard & chart
    ├── kategori.js        # Logic kategori
    ├── produk.js          # Logic produk
    └── setting.js         # Logic pengaturan
```

## Fitur Tambahan

- **Dark Mode** - Toggle di setiap halaman
- **Responsive Design** - Optimal untuk mobile (max-width: 430px)
- **Smooth Animations** - Transisi dan animasi halus
- **Form Validation** - Validasi input dengan error message
- **Custom Modals** - Modal konfirmasi yang konsisten
- **Auto Format** - Format Rupiah otomatis untuk harga

## Notes

- Prototype ini menggunakan data dummy untuk demonstrasi
- Semua data disimpan di localStorage (akan hilang jika clear browser data)
- Siap untuk integrasi dengan Laravel backend
- Navigasi sudah terhubung dan berfungsi penuh
