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
        // Timeout de seguridad - si el video no carga en 5 segundos, usar fallback
        this.maxLoadTime = 5000;
        this.loadTimeout = setTimeout(() => {
            if (!this.isVideoReady) {
                console.warn('Video taking too long to load, using fallback');
                this.useFallback();
            }
        }, this.maxLoadTime);
        
        // Configurar video para carga completa
        this.video.preload = 'auto';
        this.video.muted = true;
        this.video.playsInline = true;
        
        // Esperar a que cargue metadata primero
        this.video.addEventListener('loadedmetadata', () => {
            console.log('✓ Video metadata loaded, duration:', this.video.duration);
            
            // Intentar cargar más datos del video
            this.loadVideoData();
        });
        
        // Cuando hay suficientes datos para reproducir
        this.video.addEventListener('loadeddata', () => {
            console.log('✓ Video data loaded, ready for scrubbing');
            clearTimeout(this.loadTimeout);
            this.isVideoReady = true;
            this.videoContainer.classList.remove('loading');
            
            // Start listening to scroll
            this.setupScrollListener();
        });
        
        // Cuando hay datos suficientes para reproducir sin interrupciones
        this.video.addEventListener('canplay', () => {
            console.log('✓ Video can play');
            if (!this.isVideoReady) {
                clearTimeout(this.loadTimeout);
                this.isVideoReady = true;
                this.videoContainer.classList.remove('loading');
                this.setupScrollListener();
            }
        });
        
        // Handle video load errors
        this.video.addEventListener('error', (e) => {
            clearTimeout(this.loadTimeout);
            const error = this.video.error;
            if (error) {
                console.error('Video loading error:', {
                    code: error.code,
                    message: error.message
                });
            }
            this.useFallback();
        });
        
        // Manejar problemas de red
        this.video.addEventListener('stalled', () => {
            console.warn('Video stalled, attempting to reload');
            if (this.video.readyState < 2) {
                this.video.load();
            }
        });
        
        this.video.addEventListener('suspend', () => {
            console.warn('Video loading suspended');
        });
        
        // Cuando el video puede reproducirse sin interrupciones
        this.video.addEventListener('canplaythrough', () => {
            console.log('✓ Video can play through without buffering');
            if (!this.isVideoReady) {
                clearTimeout(this.loadTimeout);
                this.isVideoReady = true;
                this.videoContainer.classList.remove('loading');
                this.setupScrollListener();
            }
        });
        
        // Verificar si el video existe antes de intentar cargarlo
        this.checkVideoSource();
    }
    
    loadVideoData() {
        // Intentar cargar más datos del video
        if (this.video.readyState < 3) {
            // Forzar carga de más datos
            this.video.load();
            
            // Intentar reproducir un frame para cargar datos
            this.video.currentTime = 0.1;
            
            // Esperar un momento y verificar
            setTimeout(() => {
                if (this.video.readyState >= 2) {
                    console.log('✓ Video data loaded via forced load');
                    if (!this.isVideoReady) {
                        clearTimeout(this.loadTimeout);
                        this.isVideoReady = true;
                        this.videoContainer.classList.remove('loading');
                        this.setupScrollListener();
                    }
                }
            }, 500);
        }
    }
    
    checkVideoSource() {
        const source = this.video.querySelector('source');
        
        if (!source || !source.src) {
            console.warn('No video source found, using fallback immediately');
            clearTimeout(this.loadTimeout);
            this.useFallback();
            return;
        }
        
        // Verificar que el archivo existe haciendo una petición HEAD
        fetch(source.src, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    console.warn('Video file not found, using fallback');
                    clearTimeout(this.loadTimeout);
                    this.useFallback();
                    return;
                }
                
                // Preload video de manera agresiva
                this.video.load();
                
                // Forzar carga de datos
                this.forceVideoLoad();
            })
            .catch(error => {
                console.warn('Error checking video source:', error);
                clearTimeout(this.loadTimeout);
                this.useFallback();
            });
    }
    
    forceVideoLoad() {
        // Estrategia agresiva para cargar el video
        const checkReadyState = () => {
            if (this.video.readyState >= 3) {
                // HAVE_FUTURE_DATA o HAVE_ENOUGH_DATA
                if (!this.isVideoReady) {
                    clearTimeout(this.loadTimeout);
                    this.isVideoReady = true;
                    this.videoContainer.classList.remove('loading');
                    this.setupScrollListener();
                    console.log('✓ Video fully loaded via force load');
                }
            } else if (this.video.readyState >= 2) {
                // HAVE_CURRENT_DATA - intentar cargar más
                this.video.currentTime = 0.1;
                setTimeout(() => {
                    if (this.video.readyState < 3) {
                        // Intentar cargar más datos saltando a diferentes puntos
                        const duration = this.video.duration;
                        if (duration) {
                            this.video.currentTime = duration * 0.25;
                            setTimeout(() => {
                                this.video.currentTime = duration * 0.5;
                                setTimeout(() => {
                                    this.video.currentTime = duration * 0.75;
                                    setTimeout(() => {
                                        this.video.currentTime = 0;
                                        checkReadyState();
                                    }, 200);
                                }, 200);
                            }, 200);
                        }
                    } else {
                        checkReadyState();
                    }
                }, 200);
            }
        };
        
        // Verificar periódicamente
        const interval = setInterval(() => {
            if (this.isVideoReady) {
                clearInterval(interval);
                return;
            }
            checkReadyState();
        }, 500);
        
        // Limpiar después de 10 segundos
        setTimeout(() => {
            clearInterval(interval);
        }, 10000);
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
        
        // Calculate target time (leave a small buffer at the end)
        const targetTime = progress * (this.video.duration - 0.1);
        
        // Verificar que el video tenga suficientes datos para ese tiempo
        const buffered = this.video.buffered;
        let hasData = false;
        
        for (let i = 0; i < buffered.length; i++) {
            if (buffered.start(i) <= targetTime && buffered.end(i) >= targetTime) {
                hasData = true;
                break;
            }
        }
        
        // Si no hay datos, intentar cargar más
        if (!hasData && this.video.readyState < 3) {
            this.video.load();
            return;
        }
        
        // Only update if the difference is significant (prevents jitter)
        const currentTime = this.video.currentTime;
        const timeDiff = Math.abs(targetTime - currentTime);
        
        if (timeDiff > 0.05 && hasData) {
            try {
                this.video.currentTime = targetTime;
            } catch (e) {
                console.warn('Error setting video time:', e);
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
