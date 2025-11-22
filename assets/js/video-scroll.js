/**
 * ═══════════════════════════════════════════════════════════════
 * VIDEO SCROLL CONTROLLER
 * Frame-by-frame video control synchronized with scroll position
 * ═══════════════════════════════════════════════════════════════
 */

class VideoScrollController {
    constructor() {
        this.video = document.getElementById('heroVideo');
        this.videoSection = document.querySelector('.video-scroll-section');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (!this.video || !this.videoSection) {
            console.warn('Video scroll elements not found');
            return;
        }
        
        this.isVideoReady = false;
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        // Wait for video metadata to load
        this.video.addEventListener('loadedmetadata', () => {
            this.isVideoReady = true;
            this.videoSection.classList.remove('loading');
            console.log('✓ Video metadata loaded, duration:', this.video.duration);
            
            // Start listening to scroll
            this.setupScrollListener();
        });
        
        // Handle video load errors
        this.video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
            this.hideScrollIndicator();
        });
        
        // Preload video
        this.video.load();
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
// ALTERNATIVE: SIMPLER VIDEO BACKGROUND (if no video file)
// ─────────────────────────────────────────────────────────────── 

class VideoFallback {
    constructor() {
        this.video = document.getElementById('heroVideo');
        this.videoSection = document.querySelector('.video-scroll-section');
        
        if (!this.video) return;
        
        // Check if video source exists
        this.checkVideoSource();
    }
    
    checkVideoSource() {
        const source = this.video.querySelector('source');
        
        if (!source || !source.src) {
            this.createFallbackBackground();
            return;
        }
        
        // Try to load video
        this.video.addEventListener('error', () => {
            console.warn('Video failed to load, using fallback');
            this.createFallbackBackground();
        });
    }
    
    createFallbackBackground() {
        // Hide video and create animated gradient background
        if (this.video) {
            this.video.style.display = 'none';
        }
        
        if (this.videoSection) {
            this.videoSection.style.background = `
                linear-gradient(135deg, 
                    #000000 0%, 
                    #0a0e27 25%,
                    #111827 50%,
                    #0a0e27 75%,
                    #000000 100%
                )
            `;
            this.videoSection.style.backgroundSize = '400% 400%';
            this.videoSection.style.animation = 'gradientShift 15s ease infinite';
        }
        
        // Add keyframe animation if not exists
        if (!document.getElementById('gradient-animation')) {
            const style = document.createElement('style');
            style.id = 'gradient-animation';
            style.textContent = `
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ─────────────────────────────────────────────────────────────── 
// INITIALIZATION
// ─────────────────────────────────────────────────────────────── 

document.addEventListener('DOMContentLoaded', () => {
    // Initialize video scroll controller
    const videoController = new VideoScrollController();
    
    // Initialize fallback handler
    const videoFallback = new VideoFallback();
    
    console.log('🎬 Video scroll controller initialized');
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VideoScrollController, VideoFallback };
}
