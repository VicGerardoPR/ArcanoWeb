'use client'

import { useState } from 'react'

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      title: 'E-Commerce Premium',
      category: 'web',
      description: 'Tienda online con sistema de pagos integrado y gestión de inventario automatizada.',
      tags: ['Next.js', 'Stripe', 'AI'],
      image: '🛍️',
      stats: { conversion: '+150%', performance: '98/100' }
    },
    {
      title: 'ChatBot Inteligente',
      category: 'ai',
      description: 'Asistente virtual con IA que automatiza el 80% de las consultas de clientes.',
      tags: ['OpenAI', 'NLP', 'Python'],
      image: '🤖',
      stats: { efficiency: '+80%', satisfaction: '4.8/5' }
    },
    {
      title: 'Brand Identity',
      category: 'branding',
      description: 'Renovación completa de identidad corporativa para startup tecnológica.',
      tags: ['Logo', 'UI/UX', 'Strategy'],
      image: '🎨',
      stats: { recognition: '+200%', engagement: '+120%' }
    },
    {
      title: 'SaaS Dashboard',
      category: 'web',
      description: 'Panel de control con analytics en tiempo real y visualización de datos.',
      tags: ['React', 'D3.js', 'API'],
      image: '📊',
      stats: { users: '10K+', uptime: '99.9%' }
    },
    {
      title: 'Sistema de Automatización',
      category: 'ai',
      description: 'Workflow automatizado que procesa y clasifica documentos con IA.',
      tags: ['TensorFlow', 'OCR', 'Cloud'],
      image: '⚡',
      stats: { timeSaved: '40hrs/week', accuracy: '96%' }
    },
    {
      title: 'Landing Page',
      category: 'web',
      description: 'Página de alta conversión con animaciones y optimización SEO.',
      tags: ['Next.js', 'SEO', 'Analytics'],
      image: '🚀',
      stats: { speed: '95/100', leads: '+300%' }
    }
  ]

  const filters = [
    { id: 'all', label: 'Todos', icon: '🌟' },
    { id: 'web', label: 'Web', icon: '💻' },
    { id: 'ai', label: 'IA', icon: '🤖' },
    { id: 'branding', label: 'Branding', icon: '🎨' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            Nuestro <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="section-subtitle">
            Proyectos que demuestran nuestra capacidad para generar resultados excepcionales
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-arcano-500 text-black shadow-[0_0_20px_rgba(0,255,156,0.5)]'
                  : 'bg-gray-900/50 text-gray-300 border border-gray-800 hover:border-arcano-500/50'
              }`}
            >
              {filter.icon} {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="card-dark group cursor-pointer h-full flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image/Icon */}
              <div className="text-6xl mb-6 text-center transform group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>

              {/* Project Title */}
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-arcano-500 transition-colors">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-800">
                {Object.entries(project.stats).map(([key, value], i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold text-arcano-500">{value}</div>
                    <div className="text-xs text-gray-500 capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full 
                             border border-gray-700 group-hover:border-arcano-500/50 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-6 text-lg">
            Estos son solo algunos ejemplos. Cada proyecto es único y diseñado específicamente 
            para las necesidades de nuestros clientes.
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Ver Tu Proyecto Aquí 🎯
          </button>
        </div>
      </div>
    </section>
  )
}
