// Data statistik untuk dashboard
const dashboardData = {
    totalPendapatan: 2500000,
    jumlahTransaksi: 145,
    jumlahMenu: 24,
    jumlahKategori: 8,
    
    // Data per bulan (30 hari untuk setiap bulan)
    statistikBulanan: {
        0: generateMonthData(800000, 1200000), // Januari
        1: generateMonthData(750000, 1100000), // Februari
        2: generateMonthData(900000, 1300000), // Maret
        3: generateMonthData(850000, 1250000), // April
        4: generateMonthData(950000, 1400000), // Mei
        5: generateMonthData(800000, 1200000), // Juni
        6: generateMonthData(900000, 1350000), // Juli
        7: generateMonthData(850000, 1300000), // Agustus
        8: generateMonthData(950000, 1450000), // September
        9: generateMonthData(900000, 1400000), // Oktober
        10: generateMonthData(1000000, 1500000), // November
        11: generateMonthData(1100000, 1600000)  // Desember
    }
};

// Generate data acak untuk bulan
function generateMonthData(min, max) {
    const days = 30;
    const data = [];
    
    for (let i = 1; i <= days; i++) {
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        data.push({
            tanggal: i,
            pendapatan: value
        });
    }
    
    return data;
}

// Format angka ke Rupiah
function formatRupiah(angka) {
    return 'Rp' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Format angka ke format K/M (ribuan/jutaan)
function formatK(angka) {
    if (angka >= 1000000) {
        return 'Rp' + (angka / 1000000).toFixed(1).replace('.0', '') + 'M';
    } else if (angka >= 1000) {
        return 'Rp' + (angka / 1000).toFixed(0) + 'K';
    }
    return 'Rp' + angka;
}

// Update card values
function updateCards() {
    const cards = document.querySelectorAll('.card-value');
    
    if (cards[0]) cards[0].textContent = formatRupiah(dashboardData.totalPendapatan);
    if (cards[1]) cards[1].textContent = dashboardData.jumlahTransaksi;
    if (cards[2]) cards[2].textContent = dashboardData.jumlahMenu;
    if (cards[3]) cards[3].textContent = dashboardData.jumlahKategori;
}

// Generate chart path berdasarkan data
function generateChartPath(monthData) {
    // Ambil sample data (7 titik dari 30 hari)
    const sampleIndices = [0, 5, 10, 15, 20, 25, 29];
    const data = sampleIndices.map(i => monthData[i]);
    
    const maxValue = Math.max(...monthData.map(d => d.pendapatan));
    const width = 400;
    const height = 200;
    const padding = 10;
    
    // Calculate points
    const points = data.map((item, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((item.pendapatan / maxValue) * (height - padding * 2)) - padding;
        return { x, y, value: item.pendapatan };
    });
    
    // Generate smooth curve using quadratic bezier
    let linePath = `M${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const midX = (current.x + next.x) / 2;
        const midY = (current.y + next.y) / 2;
        
        linePath += ` Q${current.x},${current.y} ${midX},${midY}`;
        
        if (i === points.length - 2) {
            linePath += ` Q${next.x},${next.y} ${next.x},${next.y}`;
        }
    }
    
    // Generate area path (with fill)
    let areaPath = linePath + ` L${width},${height} L0,${height} Z`;
    
    return { linePath, areaPath, points, maxValue };
}

// Update chart
function updateChart(monthIndex) {
    const monthData = dashboardData.statistikBulanan[monthIndex];
    const { linePath, areaPath, points, maxValue } = generateChartPath(monthData);
    
    // Update paths
    const areaPathElement = document.getElementById('areaPath');
    const linePathElement = document.getElementById('linePath');
    
    if (areaPathElement) areaPathElement.setAttribute('d', areaPath);
    if (linePathElement) linePathElement.setAttribute('d', linePath);
    
    // Update dots
    updateChartDots(points);
    
    // Update labels
    updateChartLabels(maxValue);
    
    // Update dates
    updateChartDates();
}

// Update chart dots
function updateChartDots(points) {
    const dotsContainer = document.getElementById('chartDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    points.forEach(point => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#f25c29');
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '2');
        
        dotsContainer.appendChild(circle);
    });
}

// Update chart labels (Y-axis)
function updateChartLabels(maxValue) {
    const labels = document.querySelectorAll('.chart-labels span');
    
    if (labels.length === 5) {
        labels[0].textContent = formatK(maxValue);
        labels[1].textContent = formatK(maxValue * 0.75);
        labels[2].textContent = formatK(maxValue * 0.5);
        labels[3].textContent = formatK(maxValue * 0.25);
        labels[4].textContent = formatK(0);
    }
}

// Update chart dates (X-axis)
function updateChartDates() {
    const datesContainer = document.getElementById('chartDates');
    if (!datesContainer) return;
    
    const dates = [1, 5, 10, 15, 20, 25, 30];
    datesContainer.innerHTML = dates.map(d => `<span>${d}</span>`).join('');
}

// Animasi counter untuk card values
function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('Rp')) {
            element.textContent = formatRupiah(Math.floor(current));
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animasi untuk cards dengan delay
function animateCards() {
    const cards = document.querySelectorAll('.card-value');
    const values = [
        dashboardData.totalPendapatan,
        dashboardData.jumlahTransaksi,
        dashboardData.jumlahMenu,
        dashboardData.jumlahKategori
    ];
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            animateCounter(card, values[index], 1500);
        }, index * 100);
    });
}

// Set bulan saat ini
function setCurrentMonth() {
    const monthFilter = document.getElementById('monthFilter');
    if (monthFilter) {
        const currentMonth = new Date().getMonth();
        monthFilter.value = currentMonth;
        updateChart(currentMonth);
    }
}

// Initialize dashboard
function initDashboard() {
    // Load toko name from localStorage
    loadTokoName();
    
    // Update cards
    updateCards();
    
    // Set bulan saat ini dan update chart
    setCurrentMonth();
    
    // Setup month filter event
    const monthFilter = document.getElementById('monthFilter');
    if (monthFilter) {
        monthFilter.addEventListener('change', (e) => {
            const monthIndex = parseInt(e.target.value);
            updateChart(monthIndex);
        });
    }
    
    // Animasi cards saat load
    setTimeout(() => {
        animateCards();
    }, 300);
}

// Load toko name from localStorage
function loadTokoName() {
    const tokoData = localStorage.getItem('tokoData');
    const userData = localStorage.getItem('userData');
    
    let namaToko = 'Nama Toko';
    
    if (tokoData) {
        const data = JSON.parse(tokoData);
        namaToko = data.namaToko || 'Nama Toko';
    } else if (userData) {
        const data = JSON.parse(userData);
        namaToko = data.namaToko || 'Nama Toko';
    }
    
    // Update header
    const headerTitle = document.querySelector('.header-text h1');
    if (headerTitle) {
        headerTitle.textContent = namaToko;
    }
}

// Fungsi untuk update data (bisa dipanggil dari luar)
function updateDashboardData(newData) {
    Object.assign(dashboardData, newData);
    updateCards();
    
    const monthFilter = document.getElementById('monthFilter');
    if (monthFilter) {
        const monthIndex = parseInt(monthFilter.value);
        updateChart(monthIndex);
    }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

// Export functions untuk digunakan di tempat lain
window.dashboardData = dashboardData;
window.updateDashboardData = updateDashboardData;

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

// Show logout modal
function showLogoutModal() {
    openModal('modalLogout');
}

// Confirm logout
function confirmLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

// Profile dropdown toggle
function toggleProfileMenu() {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const profileWrapper = document.querySelector('.profile-menu-wrapper');
    const dropdown = document.getElementById('profileDropdown');
    
    if (dropdown && profileWrapper && !profileWrapper.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Export modal functions
window.openModal = openModal;
window.closeModal = closeModal;
window.showLogoutModal = showLogoutModal;
window.confirmLogout = confirmLogout;
window.toggleProfileMenu = toggleProfileMenu;
