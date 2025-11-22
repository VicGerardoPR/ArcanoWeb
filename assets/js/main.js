/**
 * ═══════════════════════════════════════════════════════════════
 * ARCANO INTELLIGENCE - MAIN JAVASCRIPT
 * All interactive functionality and animations
 * ═══════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────── 
// 1. NAVIGATION
// ─────────────────────────────────────────────────────────────── 

class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll behavior
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Smooth scroll
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    smoothScroll(e) {
        const href = e.target.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = this.navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────── 
// 2. CONTACT FORM
// ─────────────────────────────────────────────────────────────── 

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Enviando...</span>';
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Simulate API call (replace with your actual endpoint)
            await this.simulateAPICall(data);
            
            // Success
            this.showMessage('¡Mensaje preparado! Se abrió tu cliente de correo. Los datos también se copiaron al portapapeles.', 'success');
            this.form.reset();
        } catch (error) {
            // Error
            this.showMessage('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    }
    
    async simulateAPICall(data) {
        const subject = `Nuevo contacto - ${data.service ? this.getServiceLabel(data.service) : 'Consulta general'}`;
        const body = [
            'Nuevo mensaje desde ArcanoWeb:',
            `Nombre: ${data.name || 'No indicado'}`,
            `Email: ${data.email || 'No indicado'}`,
            `Empresa: ${data.company || 'No indicado'}`,
            `Servicio de interés: ${data.service ? this.getServiceLabel(data.service) : 'Consulta general'}`,
            '',
            'Mensaje:',
            data.message || '—'
        ].join('\n');
        
        // Copy to clipboard
        await this.copyToClipboard(body);
        
        // Open email client
        const mailtoLink = `mailto:info@arcanointelligence.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        return Promise.resolve();
    }
    
    getServiceLabel(value) {
        const labels = {
            ia: 'Automatización con IA',
            web: 'Desarrollo Web',
            branding: 'Branding & Diseño',
            all: 'Todos los servicios'
        };
        return labels[value] || 'Consulta general';
    }
    
    async copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (err) {
                console.warn('Clipboard API no disponible', err);
            }
        }
        
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: rgba(0, 255, 136, 0.1); color: #00ff88; border: 1px solid rgba(0, 255, 136, 0.3);' 
                : 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'
            }
        `;
        
        this.form.insertBefore(messageDiv, this.form.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// ─────────────────────────────────────────────────────────────── 
// 3. SCROLL ANIMATIONS
// ─────────────────────────────────────────────────────────────── 

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.init();
    }
    
    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersect(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        // Observe all elements
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once animated
                // this.observer.unobserve(entry.target);
            }
        });
    }
}

// ─────────────────────────────────────────────────────────────── 
// 4. COUNTER ANIMATION
// ─────────────────────────────────────────────────────────────── 

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        this.init();
    }
    
    init() {
        if (this.counters.length === 0) return;
        
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersect(entries),
            { threshold: 0.5 }
        );
        
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }
    
    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.hasAnimated) {
                this.hasAnimated = true;
                this.animateCounter(entry.target);
            }
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
}

// ─────────────────────────────────────────────────────────────── 
// 5. LAZY LOADING IMAGES
// ─────────────────────────────────────────────────────────────── 

class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersect(entries),
                { rootMargin: '50px' }
            );
            
            this.images.forEach(img => {
                this.observer.observe(img);
            });
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }
    
    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    }
    
    loadAllImages() {
        this.images.forEach(img => this.loadImage(img));
    }
}

// ─────────────────────────────────────────────────────────────── 
// 6. UTILITIES
// ─────────────────────────────────────────────────────────────── 

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ─────────────────────────────────────────────────────────────── 
// 7. INITIALIZATION
// ─────────────────────────────────────────────────────────────── 

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ContactForm();
    new ScrollAnimations();
    new CounterAnimation();
    new LazyLoadImages();
    
    // Add reveal class to elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.service-card, .tech-category, .process-step, .stat-item'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    console.log('🚀 Arcano Intelligence - Initialized');
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations/videos when page is hidden
        console.log('Page hidden - pausing animations');
    } else {
        console.log('Page visible - resuming animations');
    }
});

// Log performance metrics (optional)
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});
