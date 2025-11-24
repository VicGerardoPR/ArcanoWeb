'use client'

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Consulta Inicial',
      description: 'Nos reunimos contigo para entender tus objetivos, necesidades y visión. Analizamos tu situación actual y definimos metas claras.',
      icon: '💬',
      color: 'from-arcano-500 to-emerald-400'
    },
    {
      number: '02',
      title: 'Estrategia & Planificación',
      description: 'Diseñamos una estrategia personalizada con roadmap detallado, cronograma de entregas y KPIs medibles para garantizar el éxito.',
      icon: '🎯',
      color: 'from-emerald-400 to-teal-400'
    },
    {
      number: '03',
      title: 'Desarrollo & Implementación',
      description: 'Nuestro equipo de expertos da vida a tu proyecto utilizando las mejores prácticas y tecnologías de vanguardia.',
      icon: '⚙️',
      color: 'from-teal-400 to-cyan-400'
    },
    {
      number: '04',
      title: 'Pruebas & Optimización',
      description: 'Realizamos pruebas exhaustivas, optimizamos el rendimiento y nos aseguramos de que todo funcione perfectamente.',
      icon: '🔍',
      color: 'from-cyan-400 to-blue-400'
    },
    {
      number: '05',
      title: 'Lanzamiento & Entrega',
      description: 'Desplegamos tu proyecto y te capacitamos para que puedas aprovechar al máximo todas las funcionalidades.',
      icon: '🚀',
      color: 'from-blue-400 to-indigo-400'
    },
    {
      number: '06',
      title: 'Soporte & Crecimiento',
      description: 'Te acompañamos con soporte continuo, actualizaciones y mejoras para mantener tu proyecto en la cima.',
      icon: '📈',
      color: 'from-indigo-400 to-arcano-500'
    }
  ]

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="section-title">
            Nuestro <span className="gradient-text">Proceso</span>
          </h2>
          <p className="section-subtitle">
            Un enfoque estructurado y probado para llevar tu proyecto del concepto al éxito
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card */}
              <div className="card-dark h-full relative overflow-hidden">
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-800 font-orbitron">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4 text-white relative z-10">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              </div>

              {/* Connection Line (hidden on mobile, last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-arcano-500/50 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block card-dark max-w-3xl">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para comenzar tu transformación digital? ✨
            </h3>
            <p className="text-gray-400 mb-6">
              Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Agendar Consulta Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
