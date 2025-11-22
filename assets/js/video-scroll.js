/**
 * ═══════════════════════════════════════════════════════════════
 * VIDEO SCROLL CONTROLLER - ULTRA OPTIMIZADO
 * Carga inmediata del primer frame + scroll sincronizado
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
        
        this.init();
    }
    
    init() {
        // CONFIGURACIÓN CRÍTICA para carga rápida
        this.video.preload = 'metadata'; // Solo metadata primero (más rápido)
        this.video.muted = true;
        this.video.playsInline = true;
        this.video.defaultMuted = true;
        
        // Establecer el primer frame INMEDIATAMENTE
        this.video.currentTime = 0.1; // Forzar carga del primer frame
        
        // Timeout de seguridad - 2 segundos
        this.loadTimeout = setTimeout(() => {
            if (!this.isVideoReady) {
                console.warn('⏱️ Video timeout - usando fallback');
                this.useFallback();
            }
        }, 2000);
        
        // Cargar video inmediatamente
        this.video.load();
        
        // Handler unificado para marcar como listo
        const markAsReady = () => {
            if (!this.isVideoReady && this.video.readyState >= 1) {
                clearTimeout(this.loadTimeout);
                this.isVideoReady = true;
                this.videoContainer.classList.remove('loading');
                console.log('✅ Video listo - readyState:', this.video.readyState, 'duration:', this.video.duration);
                
                // Configurar scroll listener
                this.setupScrollListener();
                
                // Forzar actualización inicial
                this.handleScroll();
            }
        };
        
        // Evento LOADEDMETADATA - El más temprano y confiable
        this.video.addEventListener('loadedmetadata', () => {
            console.log('📹 Metadata cargada - duration:', this.video.duration);
            markAsReady();
        }, { once: true });
        
        // Evento LOADEDDATA - Primer frame disponible
        this.video.addEventListener('loadeddata', () => {
            console.log('🎬 Primer frame disponible');
            markAsReady();
        }, { once: true });
        
        // Manejar errores
        this.video.addEventListener('error', (e) => {
            clearTimeout(this.loadTimeout);
            const error = this.video.error;
            console.error('❌ Error de video:', error ? {
                code: error.code,
                message: this.getErrorMessage(error.code)
            } : 'Error desconocido');
            this.useFallback();
        });
        
        // Verificación de respaldo cada 200ms (más frecuente)
        let checks = 0;
        const checkInterval = setInterval(() => {
            checks++;
            
            // Si tenemos metadata o readyState >= 1, activar
            if (this.video.readyState >= 1 && this.video.duration > 0) {
                console.log('✅ Video verificado - activando');
                markAsReady();
                clearInterval(checkInterval);
            }
            
            // Máximo 10 intentos (2 segundos)
            if (checks >= 10) {
                clearInterval(checkInterval);
                if (!this.isVideoReady) {
                    console.warn('⏱️ Verificación timeout - usando fallback');
                    this.useFallback();
                }
            }
        }, 200);
    }
    
    getErrorMessage(code) {
        const errors = {
            1: 'MEDIA_ERR_ABORTED - Descarga abortada',
            2: 'MEDIA_ERR_NETWORK - Error de red',
            3: 'MEDIA_ERR_DECODE - Error al decodificar',
            4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - Formato no soportado o archivo no encontrado'
        };
        return errors[code] || 'Error desconocido';
    }
    
    useFallback() {
        this.hideScrollIndicator();
        this.videoContainer.classList.add('video-fallback-active');
        this.videoContainer.classList.remove('loading');
        
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
        
        console.log('🎨 Fallback activado');
    }
    
    setupScrollListener() {
        // Throttled scroll handler optimizado
        const throttledScroll = this.throttle(() => {
            this.handleScroll();
        }, 16); // ~60fps
        
        window.addEventListener('scroll', throttledScroll, { passive: true });
        
        console.log('🎯 Scroll listener activado');
    }
    
    handleScroll() {
        if (!this.isVideoReady) return;
        
        // Actualizar indicador de scroll
        this.updateScrollIndicator();
        
        // Obtener progreso del scroll
        const scrollProgress = this.getScrollProgress();
        
        // Actualizar frame del video
        this.updateVideoTime(scrollProgress);
    }
    
    getScrollProgress() {
        const sectionTop = this.videoSection.offsetTop;
        const sectionHeight = this.videoSection.offsetHeight;
        const scrollY = window.scrollY;
        
        // Calcular progreso (0 a 1)
        const progress = (scrollY - sectionTop) / (sectionHeight - window.innerHeight);
        
        // Limitar entre 0 y 1
        return Math.max(0, Math.min(1, progress));
    }
    
    updateVideoTime(progress) {
        if (!this.video || !this.video.duration || this.video.duration === Infinity) {
            return;
        }
        
        // Calcular tiempo objetivo
        const targetTime = progress * this.video.duration;
        
        // Obtener tiempo actual
        const currentTime = this.video.currentTime || 0;
        const timeDiff = Math.abs(targetTime - currentTime);
        
        // Solo actualizar si la diferencia es > 0.05 segundos (evita jitter)
        if (timeDiff > 0.05) {
            try {
                this.video.currentTime = targetTime;
            } catch (e) {
                // Silencioso - el navegador cargará cuando pueda
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
    
    // Throttle utility
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
    console.log('🚀 Inicializando Arcano Intelligence...');
    
    // Initialize video scroll controller
    const videoController = new VideoScrollController();
    
    console.log('✅ Video scroll controller inicializado');
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VideoScrollController };
}
