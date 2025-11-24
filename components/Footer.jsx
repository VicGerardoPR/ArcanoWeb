'use client'

import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Automatización con IA', href: '#services' },
      { name: 'Desarrollo Web', href: '#services' },
      { name: 'Branding Estratégico', href: '#services' },
      { name: 'Consultoría', href: '#contact' }
    ],
    company: [
      { name: 'Sobre Nosotros', href: '#about' },
      { name: 'Nuestro Proceso', href: '#process' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Testimonios', href: '#testimonials' }
    ],
    legal: [
      { name: 'Política de Privacidad', href: '#' },
      { name: 'Términos de Servicio', href: '#' },
      { name: 'Cookies', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📸', href: '#' },
    { name: 'GitHub', icon: '💻', href: '#' }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="relative bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <button 
              onClick={scrollToTop}
              className="hover:scale-105 transition-transform"
            >
              <Image 
                src="/Assets/arcano-logo.png" 
                alt="Arcano Intelligence" 
                width={200}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </button>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Transformamos negocios con soluciones tecnológicas de vanguardia. 
              Automatización con IA, desarrollo web y branding estratégico para 
              llevar tu empresa al siguiente nivel.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-3">
                <span className="text-arcano-500">📧</span>
                <a href="mailto:info@arcanointelligence.com" className="hover:text-arcano-500 transition-colors">
                  info@arcanointelligence.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-arcano-500">📱</span>
                <a href="https://wa.me/17871234567" className="hover:text-arcano-500 transition-colors">
                  +1 (787) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-arcano-500">📍</span>
                <span>Puerto Rico</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-arcano-500 transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-arcano-500 transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-arcano-500 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm">
              Síguenos en redes sociales 🚀
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900/50 border border-gray-800 rounded-lg 
                           flex items-center justify-center hover:border-arcano-500 
                           hover:bg-arcano-500/10 transition-all duration-300 text-2xl
                           hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">
              Mantente <span className="gradient-text">Actualizado</span> 📨
            </h3>
            <p className="text-gray-400 mb-6">
              Suscríbete para recibir las últimas noticias sobre IA, desarrollo web y tendencias tecnológicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                         text-white placeholder-gray-500 focus:outline-none focus:border-arcano-500 
                         transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} <span className="text-arcano-500 font-semibold">Arcano Intelligence</span>. 
              Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-2">
              Hecho con <span className="text-arcano-500 animate-pulse">💚</span> en Puerto Rico
            </p>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-arcano-500 text-black rounded-full 
                   flex items-center justify-center hover:bg-arcano-500/90 
                   shadow-[0_0_20px_rgba(0,255,156,0.5)] hover:shadow-[0_0_30px_rgba(0,255,156,0.8)]
                   transition-all duration-300 hover:scale-110 z-40 text-2xl"
          aria-label="Volver arriba"
        >
          ↑
        </button>
      </div>
    </footer>
  )
}
