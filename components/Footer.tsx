'use client'

import { motion } from 'framer-motion'
import { Heart, Instagram, Mail, Phone, Share2 } from 'lucide-react'

export default function Footer() {
  const hashtag = "#GenerationDavid"

  const copyHashtag = () => {
    navigator.clipboard.writeText(hashtag)
    // Optional: Add a toast notification here if you have one
    alert("Hashtag copied to clipboard!")
  }

  return (
    <footer className="relative bg-gradient-to-br from-teal-800 to-pink-700 text-white py-20 px-4 overflow-hidden">
      {/* Decorative Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-display text-6xl md:text-8xl mb-4 tracking-tighter">TODAH</h3>
          <p className="font-elegant text-2xl italic mb-2 text-pink-100">Taibat & David</p>
          <p className="font-sans text-sm tracking-[0.3em] uppercase opacity-80 mb-8">
            June 18 & July 4, 2026
          </p>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-12 h-px bg-white/30" />
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            <div className="w-12 h-px bg-white/30" />
          </div>

          {/* HASHTAG SECTION */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-block mb-12 cursor-pointer group"
            onClick={copyHashtag}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.5em] mb-3 opacity-70 group-hover:opacity-100 transition-opacity">
              Share the love with our hashtag
            </p>
            <div className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all">
              <span className="font-display text-2xl md:text-3xl tracking-wide text-pink-100">
                {hashtag}
              </span>
              <Share2 size={18} className="text-teal-200" />
            </div>
            <p className="mt-2 text-[9px] italic opacity-0 group-hover:opacity-60 transition-opacity">
              Click to copy
            </p>
          </motion.div>

          {/* SOCIAL LINKS */}
          {/* <div className="flex items-center justify-center gap-5 mb-12">
            {[
              { icon: <Instagram size={20} />, href: "https://instagram.com", label: "Instagram" },
              { icon: <Mail size={20} />, href: "mailto:todah@wedding.com", label: "Email" },
              { icon: <Phone size={20} />, href: "tel:+1234567890", label: "Phone" }
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith('http') ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-4 bg-white/10 rounded-full border border-white/5 hover:bg-pink-500 hover:scale-110 transition-all duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div> */}

          <div className="pt-8 border-t border-white/10">
            <p className="font-sans text-[10px] tracking-widest uppercase opacity-60">
              © 2026 TODAH Wedding • Made with Love
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}