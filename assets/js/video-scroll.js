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
        // Configurar video
        this.video.preload = 'auto';
        this.video.muted = true;
        this.video.playsInline = true;
        
        // Timeout más corto - si no carga en 3 segundos, usar fallback
        this.maxLoadTime = 3000;
        this.loadTimeout = setTimeout(() => {
            if (!this.isVideoReady) {
                console.warn('Video timeout - using fallback');
                this.useFallback();
            }
        }, this.maxLoadTime);
        
        // Intentar cargar el video inmediatamente
        this.video.load();
        
        // Múltiples puntos de entrada para marcar como listo
        const markAsReady = () => {
            if (!this.isVideoReady) {
                clearTimeout(this.loadTimeout);
                this.isVideoReady = true;
                this.videoContainer.classList.remove('loading');
                this.setupScrollListener();
                console.log('✓ Video ready, readyState:', this.video.readyState);
            }
        };
        
        // Evento más temprano - solo metadata
        this.video.addEventListener('loadedmetadata', () => {
            console.log('✓ Metadata loaded, duration:', this.video.duration);
            // Si tenemos metadata, podemos empezar (aunque sea básico)
            if (this.video.duration && this.video.readyState >= 1) {
                setTimeout(markAsReady, 500); // Dar un poco más de tiempo
            }
        });
        
        // Cuando hay datos básicos
        this.video.addEventListener('loadeddata', () => {
            console.log('✓ Data loaded, readyState:', this.video.readyState);
            markAsReady();
        });
        
        // Cuando puede reproducir
        this.video.addEventListener('canplay', () => {
            console.log('✓ Can play');
            markAsReady();
        });
        
        // Cuando puede reproducir sin pausas
        this.video.addEventListener('canplaythrough', () => {
            console.log('✓ Can play through');
            markAsReady();
        });
        
        // Manejar errores
        this.video.addEventListener('error', (e) => {
            clearTimeout(this.loadTimeout);
            const error = this.video.error;
            console.error('Video error:', error ? {
                code: error.code,
                message: error.message
            } : 'Unknown error');
            this.useFallback();
        });
        
        // Verificar estado periódicamente como fallback
        let checkCount = 0;
        const checkInterval = setInterval(() => {
            checkCount++;
            
            // Si tenemos metadata después de 1 segundo, intentar usar el video
            if (checkCount >= 2 && this.video.readyState >= 1 && this.video.duration) {
                console.log('✓ Video has metadata, enabling scrubbing');
                markAsReady();
                clearInterval(checkInterval);
            }
            
            // Si pasaron 10 intentos (5 segundos), usar fallback
            if (checkCount >= 10) {
                clearInterval(checkInterval);
                if (!this.isVideoReady) {
                    console.warn('Video check timeout - using fallback');
                    this.useFallback();
                }
            }
        }, 500);
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
        if (!this.video || !this.video.duration) return;
        
        // Calculate target time
        const targetTime = progress * this.video.duration;
        
        // Solo actualizar si la diferencia es significativa (previene jitter)
        const currentTime = this.video.currentTime || 0;
        const timeDiff = Math.abs(targetTime - currentTime);
        
        if (timeDiff > 0.1) {
            try {
                // Intentar establecer el tiempo - el navegador cargará los datos si es necesario
                this.video.currentTime = targetTime;
            } catch (e) {
                // Si falla, el video probablemente no tiene datos para ese punto
                // El navegador intentará cargar automáticamente
                console.warn('Could not set video time:', targetTime, e);
            }
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
