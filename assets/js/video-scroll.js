/**
 * ═══════════════════════════════════════════════════════════════
 * VIDEO SCROLL CONTROLLER - MEJORADO
 * Frame-by-frame video control con fallback automático rápido
 * ═══════════════════════════════════════════════════════════════
 */

class VideoScrollController {
    constructor() {
        this.video = document.getElementById('heroVideo');
        this.videoSection = document.querySelector('.video-scroll-section');
        this.videoContainer = document.querySelector('.video-container');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (!this.video || !this.videoSection) {
            console.warn('Video scroll elements not found');
            return;
        }
        
        this.isVideoReady = false;
        this.loadTimeout = null;
        this.maxLoadTime = 3000; // 3 segundos máximo para cargar
        
        this.init();
    }
    
    init() {
        // Timeout de seguridad - si el video no carga en 3 segundos, usar fallback
        this.loadTimeout = setTimeout(() => {
            if (!this.isVideoReady) {
                console.warn('Video taking too long to load, using fallback');
                this.useFallback();
            }
        }, this.maxLoadTime);
        
        // Intentar cargar el video
        this.video.addEventListener('loadedmetadata', () => {
            clearTimeout(this.loadTimeout);
            this.isVideoReady = true;
            this.videoContainer.classList.remove('loading');
            console.log('✓ Video loaded successfully, duration:', this.video.duration);
            
            // Start listening to scroll
            this.setupScrollListener();
        });
        
        // Handle video load errors
        this.video.addEventListener('error', (e) => {
            clearTimeout(this.loadTimeout);
            console.error('Video loading error:', e);
            this.useFallback();
        });
        
        // Verificar si el video existe antes de intentar cargarlo
        this.checkVideoSource();
    }
    
    checkVideoSource() {
        const source = this.video.querySelector('source');
        
        if (!source || !source.src) {
            console.warn('No video source found, using fallback immediately');
            clearTimeout(this.loadTimeout);
            this.useFallback();
            return;
        }
        
        // Preload video
        this.video.load();
    }
    
    useFallback() {
        this.hideScrollIndicator();
        this.videoContainer.classList.add('video-fallback-active');
        
        // Ocultar video
        if (this.video) {
            this.video.style.display = 'none';
        }
        
        // Crear fallback visual
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'video-fallback-content';
        fallbackDiv.innerHTML = `
            <div class="fallback-inner">
                <h1 class="fallback-title">⚡ ARCANO<span class="gradient-text">AI</span></h1>
                <p class="fallback-subtitle">Transformando el futuro con IA</p>
            </div>
        `;
        
        this.videoContainer.appendChild(fallbackDiv);
        this.videoContainer.classList.remove('loading');
        
        console.log('✓ Fallback activated');
    }
    
    setupScrollListener() {
        // Use throttled scroll handler for performance
        const throttledScroll = this.throttle(() => {
            this.handleScroll();
        }, 16); // ~60fps
        
        window.addEventListener('scroll', throttledScroll, { passive: true });
        
        // Initial update
        this.handleScroll();
    }
    
    handleScroll() {
        if (!this.isVideoReady) return;
        
        // Show/hide scroll indicator
        this.updateScrollIndicator();
        
        // Get scroll progress within video section
        const scrollProgress = this.getScrollProgress();
        
        // Update video time based on scroll progress
        this.updateVideoTime(scrollProgress);
    }
    
    getScrollProgress() {
        const sectionTop = this.videoSection.offsetTop;
        const sectionHeight = this.videoSection.offsetHeight;
        const scrollY = window.scrollY;
        
        // Calculate how far we've scrolled through the section (0 to 1)
        const progress = (scrollY - sectionTop) / (sectionHeight - window.innerHeight);
        
        // Clamp between 0 and 1
        return Math.max(0, Math.min(1, progress));
    }
    
    updateVideoTime(progress) {
        if (!this.video.duration) return;
        
        // Calculate target time (leave a small buffer at the end)
        const targetTime = progress * (this.video.duration - 0.1);
        
        // Only update if the difference is significant (prevents jitter)
        const currentTime = this.video.currentTime;
        const timeDiff = Math.abs(targetTime - currentTime);
        
        if (timeDiff > 0.05) {
            this.video.currentTime = targetTime;
        }
    }
    
    updateScrollIndicator() {
        if (!this.scrollIndicator) return;
        
        const scrollY = window.scrollY;
        const fadeStart = 100;
        const fadeEnd = 400;
        
        if (scrollY < fadeStart) {
            this.scrollIndicator.style.opacity = '1';
        } else if (scrollY >= fadeEnd) {
            this.scrollIndicator.style.opacity = '0';
        } else {
            const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
            this.scrollIndicator.style.opacity = String(1 - fadeProgress);
        }
    }
    
    hideScrollIndicator() {
        if (this.scrollIndicator) {
            this.scrollIndicator.style.display = 'none';
        }
    }
    
    // Throttle utility for performance
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ─────────────────────────────────────────────────────────────── 
// INITIALIZATION
// ─────────────────────────────────────────────────────────────── 

document.addEventListener('DOMContentLoaded', () => {
    // Initialize video scroll controller
    const videoController = new VideoScrollController();
    
    console.log('🎬 Video scroll controller initialized');
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VideoScrollController };
}
