// Toast notification system
function showToast(message, type = 'success', duration = 3000) {
    // Create toast container if not exists
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Icon mapping
    const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info'
    };
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <span class="material-symbols-rounded">${icons[type] || icons.info}</span>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <span class="material-symbols-rounded">close</span>
        </button>
    `;
    
    // Add to container
    container.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
            // Remove container if empty
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    }, duration);
}

// Export to window
window.showToast = showToast;
