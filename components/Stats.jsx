'use client'

import { useEffect, useState, useRef } from 'react'

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const stats = [
    { number: 100, suffix: '+', label: 'Proyectos Completados', icon: '📊' },
    { number: 50, suffix: '+', label: 'Clientes Satisfechos', icon: '😊' },
    { number: 98, suffix: '%', label: 'Tasa de Éxito', icon: '🎯' },
    { number: 5, suffix: '+', label: 'Años de Experiencia', icon: '⭐' }
  ]

  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    stats.forEach((stat, index) => {
      let currentStep = 0
      const increment = stat.number / steps

      const timer = setInterval(() => {
        currentStep++
        setCounts(prev => {
          const newCounts = [...prev]
          newCounts[index] = Math.min(Math.floor(increment * currentStep), stat.number)
          return newCounts
        })

        if (currentStep >= steps) {
          clearInterval(timer)
        }
      }, stepDuration)
    })
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-3 group"
            >
              <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-arcano-500 font-orbitron">
                {counts[index]}{stat.suffix}
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
