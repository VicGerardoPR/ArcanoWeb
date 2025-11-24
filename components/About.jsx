'use client'

export default function About() {
  const values = [
    {
      icon: '⚡',
      title: 'Innovación',
      description: 'Utilizamos las últimas tecnologías y metodologías para crear soluciones que marquen la diferencia.'
    },
    {
      icon: '🎯',
      title: 'Resultados',
      description: 'Nos enfocamos en métricas reales y ROI medible. Tu éxito es nuestro éxito.'
    },
    {
      icon: '🤝',
      title: 'Colaboración',
      description: 'Trabajamos codo a codo contigo, convirtiéndonos en parte de tu equipo.'
    },
    {
      icon: '💎',
      title: 'Calidad',
      description: 'Cada proyecto se entrega con los más altos estándares de excelencia y profesionalismo.'
    }
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <span className="text-arcano-500 font-semibold text-sm uppercase tracking-wider">
                Sobre Nosotros
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Transformamos <span className="gradient-text">Ideas</span> en{' '}
                <span className="gradient-text">Realidad Digital</span>
              </h2>
            </div>

            <p className="text-lg text-gray-400 leading-relaxed">
              En <span className="text-arcano-500 font-semibold">Arcano Intelligence</span>, somos un equipo de 
              expertos apasionados por la tecnología y la innovación. Desde 2020, hemos ayudado a empresas 
              de todos los tamaños a transformarse digitalmente y alcanzar sus objetivos de negocio.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              Combinamos expertise en inteligencia artificial, desarrollo web y diseño estratégico 
              para crear soluciones que no solo se ven increíbles, sino que generan resultados 
              tangibles y escalables.
            </p>

            {/* Key Points */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-arcano-500">5+</div>
                <div className="text-gray-400">Años de Experiencia</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-arcano-500">15+</div>
                <div className="text-gray-400">Tecnologías Dominadas</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-arcano-500">100%</div>
                <div className="text-gray-400">Compromiso</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-arcano-500">∞</div>
                <div className="text-gray-400">Posibilidades</div>
              </div>
            </div>

            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary mt-8"
            >
              Trabajemos Juntos 🚀
            </button>
          </div>

          {/* Right Column - Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="card-dark text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-arcano-500 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold mb-8">
            Tecnologías que <span className="gradient-text">Dominamos</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              'React', 'Next.js', 'Node.js', 'Python', 'TensorFlow',
              'OpenAI', 'Tailwind CSS', 'PostgreSQL', 'AWS', 'Vercel'
            ].map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-lg 
                         hover:border-arcano-500/50 hover:shadow-[0_0_20px_rgba(0,255,156,0.2)]
                         transition-all duration-300 cursor-pointer"
              >
                <span className="text-gray-300 font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
