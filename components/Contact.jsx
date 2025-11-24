'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    // Simular envío (aquí conectarías con tu backend o servicio de email)
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'info@arcanointelligence.com',
      link: 'mailto:info@arcanointelligence.com'
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      value: '+1 (787) 123-4567',
      link: 'https://wa.me/17871234567'
    },
    {
      icon: '📍',
      title: 'Ubicación',
      value: 'Puerto Rico',
      link: null
    },
    {
      icon: '⏰',
      title: 'Horario',
      value: 'Lun - Vie: 9AM - 6PM',
      link: null
    }
  ]

  const services = [
    'Automatización con IA',
    'Desarrollo Web',
    'Branding Estratégico',
    'Consultoría Tecnológica',
    'Otro'
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            Hablemos de Tu <span className="gradient-text">Proyecto</span>
          </h2>
          <p className="section-subtitle">
            Estamos listos para transformar tus ideas en realidad. Contáctanos hoy mismo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-dark">
            <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje 💬</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:border-arcano-500 
                           transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:border-arcano-500 
                           transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:border-arcano-500 
                           transition-colors"
                  placeholder="+1 (787) 123-4567"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                  Servicio de Interés *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-arcano-500 transition-colors"
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:border-arcano-500 
                           transition-colors resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje 🚀'}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="p-4 bg-arcano-500/10 border border-arcano-500/30 rounded-lg text-arcano-500 text-center">
                  ✓ Mensaje enviado exitosamente. Te contactaremos pronto.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="card-dark text-center group cursor-pointer"
                  onClick={() => info.link && window.open(info.link, '_blank')}
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{info.title}</div>
                  <div className="text-gray-300 font-medium group-hover:text-arcano-500 transition-colors">
                    {info.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Why Contact Us */}
            <div className="card-dark">
              <h3 className="text-xl font-bold mb-6">¿Por qué elegirnos? ⭐</h3>
              <ul className="space-y-4">
                {[
                  'Consultoría inicial gratuita sin compromiso',
                  'Respuesta en menos de 24 horas',
                  'Presupuestos transparentes y competitivos',
                  'Soporte continuo post-lanzamiento',
                  'Equipo experto con años de experiencia',
                  'Tecnologías de última generación'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-arcano-500 mt-1">✓</span>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Proof */}
            <div className="card-dark text-center">
              <div className="text-4xl mb-4">🏆</div>
              <div className="text-3xl font-bold text-arcano-500 mb-2">50+</div>
              <div className="text-gray-400">
                Clientes confían en nosotros para transformar sus negocios
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
