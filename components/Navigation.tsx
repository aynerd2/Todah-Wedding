'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Our Story', href: '#our-story' },
    { name: 'Wedding Details', href: '#wedding-details' },
    { name: 'Guest Wishes', href: '#guest-wishes' },
    { name: 'Registry', href: '#registry' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
    
            <motion.a
              href="/"
              className="relative flex items-center justify-start cursor-pointer z-50 flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#');
              }}
            >
              <img
                src="https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773654717/logo2_hzztg0.png"
                alt="TODAH Wedding Logo"
                className="h-24 md:h-32 w-auto object-contain block max-w-none"
              />
            </motion.a>


            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="font-sans text-sm tracking-wider text-deep-black hover:text-teal-600 transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-onion-pink-500 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-deep-black"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-deep-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-white md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="font-sans text-lg tracking-wider py-4 border-b border-pearl text-left text-deep-black hover:text-teal-600 transition-colors"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
