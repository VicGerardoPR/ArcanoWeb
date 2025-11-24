'use client'

import { useState, useEffect } from 'react'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: 'María González',
      role: 'CEO, TechStart',
      company: 'Startup Tecnológica',
      text: 'Arcano Intelligence transformó completamente nuestros procesos. La automatización con IA redujo nuestros costos operativos en un 60% y mejoró la satisfacción del cliente significativamente.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Director Marketing',
      company: 'E-Commerce Global',
      text: 'El sitio web que desarrollaron superó todas nuestras expectativas. Las conversiones aumentaron un 200% en el primer mes. Su equipo es profesional, creativo y siempre disponible.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Ana Martínez',
      role: 'Fundadora',
      company: 'Brand Studio',
      text: 'La identidad de marca que crearon para nosotros es espectacular. Capturaron perfectamente nuestra visión y la llevaron al siguiente nivel. Ahora destacamos en el mercado.',
      rating: 5,
      avatar: '👩‍🎨'
    },
    {
      name: 'Roberto Silva',
      role: 'CTO',
      company: 'FinTech Solutions',
      text: 'Implementaron un chatbot con IA que maneja el 85% de nuestras consultas automáticamente. La calidad técnica y el soporte post-lanzamiento son excepcionales.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Laura Pérez',
      role: 'Gerente General',
      company: 'Retail Plus',
      text: 'Profesionales de primer nivel. Nos ayudaron a digitalizar todo nuestro negocio y ahora competimos con empresas mucho más grandes. Totalmente recomendados.',
      rating: 5,
      avatar: '👩‍💼'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            Lo Que Dicen <span className="gradient-text">Nuestros Clientes</span>
          </h2>
          <p className="section-subtitle">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card-dark text-center relative overflow-hidden">
            {/* Quote Icon */}
            <div className="text-6xl text-arcano-500/20 mb-6">"</div>

            {/* Avatar */}
            <div className="text-6xl mb-6">
              {testimonials[activeIndex].avatar}
            </div>

            {/* Rating */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <span key={i} className="text-2xl text-arcano-500">★</span>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-xl text-gray-300 leading-relaxed mb-8 italic">
              {testimonials[activeIndex].text}
            </p>

            {/* Author Info */}
            <div className="space-y-1">
              <div className="text-lg font-bold text-white">
                {testimonials[activeIndex].name}
              </div>
              <div className="text-arcano-500 font-medium">
                {testimonials[activeIndex].role}
              </div>
              <div className="text-gray-500 text-sm">
                {testimonials[activeIndex].company}
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-arcano-500/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-arcano-500 w-8'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* All Testimonials Grid (Desktop) */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mt-16">
          {testimonials.filter((_, i) => i !== activeIndex).slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className="card-dark text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setActiveIndex(testimonials.indexOf(testimonial))}
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-arcano-500">★</span>
                ))}
              </div>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3 italic">
                "{testimonial.text}"
              </p>
              <div className="text-sm font-bold text-white">{testimonial.name}</div>
              <div className="text-xs text-gray-500">{testimonial.company}</div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-3xl">⭐</div>
            <div className="text-2xl font-bold text-arcano-500">4.9/5</div>
            <div className="text-sm text-gray-400">Calificación Promedio</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl">💯</div>
            <div className="text-2xl font-bold text-arcano-500">100%</div>
            <div className="text-sm text-gray-400">Satisfacción Cliente</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl">🚀</div>
            <div className="text-2xl font-bold text-arcano-500">50+</div>
            <div className="text-sm text-gray-400">Proyectos Exitosos</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl">🏆</div>
            <div className="text-2xl font-bold text-arcano-500">98%</div>
            <div className="text-sm text-gray-400">Tasa de Retención</div>
          </div>
        </div>
      </div>
    </section>
  )
}
