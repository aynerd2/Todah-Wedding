'use client'

import { motion } from 'framer-motion'
import { Heart, ChevronDown, Sparkles } from 'lucide-react'

export default function Hero() {
  const scrollToContent = () => {
    const element = document.getElementById('our-story')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-onion-pink-50 overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="romantic-blur bg-gradient-to-br from-teal-400 to-teal-600"
          style={{ width: '350px', height: '350px', top: '10%', left: '10%' }}
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="romantic-blur bg-gradient-to-br from-onion-pink-400 to-onion-pink-600"
          style={{ width: '400px', height: '400px', bottom: '10%', right: '10%' }}
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [-20, -60, -100],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Sparkles className="w-4 h-4 text-teal-400" />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-8 sm:space-y-12">
          
          {/* Top ornament */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-2 border-teal-400 flex items-center justify-center"
            >
              <Heart className="w-6 h-6 text-teal-500 fill-teal-500" />
            </motion.div>
          </motion.div>

          {/* TODAH trademark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <motion.h1
              className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] mb-4 text-todah-gradient"
              style={{ letterSpacing: '0.05em' }}
            >
              TODAH
            </motion.h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-teal-500 to-onion-pink-500 rounded-full"></div>
          </motion.div>

          {/* Couples names */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-4"
          >
            <h2 className="font-elegant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-deep-black">
              Taibat Abosede Alli
            </h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block"
            >
              <span className="font-elegant text-4xl sm:text-5xl md:text-6xl text-teal-500 italic">
                &
              </span>
            </motion.div>
            <h2 className="font-elegant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-deep-black">
              Oluwasegun David Ganiyu
            </h2>
          </motion.div>

          {/* Families */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="max-w-3xl mx-auto"
          >
            <p className="font-sans text-sm sm:text-base text-smoke mb-4">
              The Families of
            </p>
            <div className="space-y-2">
              <p className="font-elegant text-xl sm:text-2xl text-deep-black">
                Alhaji & Mrs Ismaila Alli
              </p>
              <p className="font-elegant text-lg text-teal-600 italic">and</p>
              <p className="font-elegant text-xl sm:text-2xl text-deep-black">
                Mr & Mrs Ganiyu Adio
              </p>
            </div>
            <p className="font-sans text-sm sm:text-base text-smoke mt-6 italic">
              cordially invite you to the wedding ceremony
            </p>
          </motion.div>

          {/* Wedding dates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {/* Traditional Wedding */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-teal-200 shadow-xl"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-onion-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h3 className="font-display text-2xl text-teal-600 mb-2">Traditional Wedding</h3>
              <p className="font-elegant text-3xl text-deep-black mb-2">June 18th</p>
              <p className="font-sans text-sm text-smoke">Thursday, 2025</p>
              <p className="font-sans text-sm text-smoke mt-2">10:00 AM</p>
              <div className="mt-4 pt-4 border-t border-teal-100">
                <p className="text-xs text-onion-pink-600 font-semibold">Color Code</p>
                <p className="text-sm text-smoke">Onion Pink & Teal</p>
              </div>
            </motion.div>

            {/* Church Wedding */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-onion-pink-200 shadow-xl"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-onion-pink-500 to-teal-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h3 className="font-display text-2xl text-onion-pink-600 mb-2">Church Wedding</h3>
              <p className="font-elegant text-3xl text-deep-black mb-2">July 4th</p>
              <p className="font-sans text-sm text-smoke">Friday, 2025</p>
              <p className="font-sans text-sm text-smoke mt-2">11:00 AM</p>
              <div className="mt-4 pt-4 border-t border-onion-pink-100">
                <p className="text-xs text-teal-600 font-semibold">Color Code</p>
                <p className="text-sm text-smoke">All Shades of Blue</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Save the date CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="pt-8"
          >
            <button
              onClick={scrollToContent}
              className="btn-primary"
            >
              View Details
            </button>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-sans text-smoke group-hover:text-teal-600 transition-colors">
            Scroll
          </span>
          <ChevronDown className="w-6 h-6 text-smoke group-hover:text-teal-600 transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  )
}
