'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-arcano-500/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('hero')}
              className="hover:scale-105 transition-transform"
            >
              <Image 
                src="/Assets/arcano-logo.png" 
                alt="Arcano Intelligence" 
                width={150}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <button onClick={() => scrollToSection('services')} className="nav-link">Servicios</button>
              <button onClick={() => scrollToSection('about')} className="nav-link">Nosotros</button>
              <button onClick={() => scrollToSection('process')} className="nav-link">Proceso</button>
              <button onClick={() => scrollToSection('portfolio')} className="nav-link">Portfolio</button>
              <button onClick={() => scrollToSection('contact')} className="btn-primary">
                Contactar
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-arcano-500 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-lg border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => scrollToSection('services')} className="mobile-nav-link">Servicios</button>
            <button onClick={() => scrollToSection('about')} className="mobile-nav-link">Nosotros</button>
            <button onClick={() => scrollToSection('process')} className="mobile-nav-link">Proceso</button>
            <button onClick={() => scrollToSection('portfolio')} className="mobile-nav-link">Portfolio</button>
            <button onClick={() => scrollToSection('contact')} className="mobile-nav-link text-arcano-500">
              Contactar
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-link {
          @apply text-gray-300 hover:text-arcano-500 transition-colors duration-200 font-medium;
        }
        .mobile-nav-link {
          @apply block px-3 py-2 text-base font-medium text-gray-300 hover:text-arcano-500 hover:bg-gray-900/50 rounded-md transition-all;
        }
      `}</style>
    </nav>
  )
}
