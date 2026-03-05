'use client'

import { motion } from 'framer-motion'
import { Heart, Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-teal-600 to-onion-pink-600 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-display text-6xl md:text-7xl mb-4">TODAH</h3>
          <p className="font-elegant text-xl italic mb-2">Taibat & Oluwasegun</p>
          <p className="font-sans text-sm opacity-90 mb-8">
            June 18 & July 4, 2025
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-white/50" />
            <Heart className="w-5 h-5 fill-white" />
            <div className="w-16 h-px bg-white/50" />
          </div>

          <div className="flex items-center justify-center gap-6 mb-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="mailto:todah@wedding.com"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Mail size={20} />
            </a>
            <a
              href="tel:+1234567890"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Phone size={20} />
            </a>
          </div>

          <p className="font-sans text-sm opacity-75">
            © 2025 TODAH Wedding. Made with love. 💕
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
