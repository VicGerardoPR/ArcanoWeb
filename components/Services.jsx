'use client'

export default function Services() {
  const services = [
    {
      icon: '🤖',
      title: 'Automatización con IA',
      description: 'Implementamos sistemas de inteligencia artificial que automatizan tareas repetitivas, optimizan procesos y reducen costos operativos hasta un 70%.',
      features: [
        'Chatbots inteligentes 24/7',
        'Análisis predictivo de datos',
        'Automatización de workflows',
        'Procesamiento de documentos con IA',
        'Asistentes virtuales personalizados'
      ]
    },
    {
      icon: '💻',
      title: 'Desarrollo Web',
      description: 'Creamos sitios web y aplicaciones modernas, rápidas y escalables que convierten visitantes en clientes y destacan tu marca en el mundo digital.',
      features: [
        'Landing pages de alta conversión',
        'E-commerce y tiendas online',
        'Aplicaciones web personalizadas',
        'Diseño responsive y UX/UI',
        'Optimización SEO avanzada'
      ]
    },
    {
      icon: '🎨',
      title: 'Branding Estratégico',
      description: 'Desarrollamos identidades de marca únicas y memorables que conectan emocionalmente con tu audiencia y posicionan tu negocio como líder del mercado.',
      features: [
        'Diseño de logotipos profesionales',
        'Manual de identidad corporativa',
        'Estrategia de marca integral',
        'Material publicitario digital',
        'Guías de estilo y brandbook'
      ]
    }
  ]

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="section-title">
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="section-subtitle">
            Soluciones tecnológicas completas para impulsar tu negocio hacia el futuro
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-dark group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-arcano-500 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-gray-300">
                    <span className="text-arcano-500 mt-1">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-arcano-500/50 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block card-dark max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas una solución personalizada? 🎯
            </h3>
            <p className="text-gray-400 mb-6">
              Cada negocio es único. Contáctanos para desarrollar una estrategia 
              a medida que se adapte perfectamente a tus necesidades.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Solicitar Consultoría Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
