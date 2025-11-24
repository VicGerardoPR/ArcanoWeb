'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 156, 0.15) 0%, transparent 50%)`
          }}
        ></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 156, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 156, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-arcano-500 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-arcano-500 rounded-full animate-float animation-delay-200"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-arcano-500 rounded-full animate-float animation-delay-400"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-arcano-500 rounded-full animate-float animation-delay-600"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-arcano-500/10 border border-arcano-500/30 rounded-full text-arcano-500 text-sm font-medium animate-pulse-glow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-arcano-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-arcano-500"></span>
            </span>
            Transformamos tu negocio con IA
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-orbitron">
            <span className="block text-white mb-4">Bienvenido a</span>
            <span className="block gradient-text">ARCANO</span>
            <span className="block text-white mt-4">INTELLIGENCE</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            🚀 Automatización con IA • 💻 Desarrollo Web • 🎨 Branding Estratégico
          </p>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Llevamos tu empresa al siguiente nivel con soluciones tecnológicas de vanguardia 
            que optimizan procesos, aumentan productividad y generan resultados reales.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button 
              onClick={scrollToContact}
              className="btn-primary w-full sm:w-auto"
            >
              📞 Iniciar Proyecto
            </button>
            <button 
              onClick={scrollToServices}
              className="btn-secondary w-full sm:w-auto"
            >
              🔍 Ver Servicios
            </button>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
            {[
              { number: '100+', label: 'Proyectos Completados' },
              { number: '50+', label: 'Clientes Satisfechos' },
              { number: '98%', label: 'Tasa de Éxito' },
              { number: '24/7', label: 'Soporte Disponible' }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-arcano-500 font-orbitron">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-arcano-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
