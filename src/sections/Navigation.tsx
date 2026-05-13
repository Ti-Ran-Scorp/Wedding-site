import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Приглашение', href: '#invitation' },
  { label: 'Дата', href: '#date' },
  { label: 'Место', href: '#venue' },
  { label: 'Программа', href: '#timeline' },
  { label: 'Дресс-код', href: '#dresscode' },
  { label: 'Анкета', href: '#form' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (window.scrollY > 50) setIsMobileMenuOpen(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/[0.92] backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Couple names - always visible */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="font-display text-olive text-lg sm:text-xl font-bold tracking-wide"
        >
          Алина <span className="text-blush">&</span> Кирилл
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-body text-[0.8rem] text-olive font-normal hover:text-blush transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[2px] bg-olive transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-olive transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-olive transition-transform duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-14 left-0 right-0 bg-white/[0.98] backdrop-blur-2xl overflow-hidden transition-all duration-400 ease-out ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col items-center py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-body text-[1.1rem] text-olive py-3 hover:text-blush transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
