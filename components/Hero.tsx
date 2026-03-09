'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

export default function WeddingHero() {
  const containerRef = useRef(null)
  
  // Parallax and Fade effects for the Hero content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const scrollToContent = () => {
    const element = document.getElementById('invitation-details')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative bg-[#FAFAFA]">
      
      {/* SECTION 1: THE CINEMATIC ENCOUNTER (HERO) */}
      {/* pt-28 ensures images clear the navbar on mobile; md:pt-16 for desktop */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 md:pt-16 md:pb-0">
        
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="romantic-blur bg-teal-100/40"
            style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* THE MEETING CENTERPIECE */}
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 w-full max-w-6xl px-4"
        >
          {/* GROOM SIDE */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative group flex flex-col items-center"
          >
            {/* Responsive Frame: smaller on mobile (w-48 h-64) to prevent overlap */}
            <div className="relative w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-[450px] overflow-hidden rounded-t-[100px] border-8 border-white shadow-2xl">
              <Image 
                src="https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773077889/g1_iypc3o.jpg"
                alt="Oluwasegun"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-3 md:mt-4 text-center"
            >
              <span className="font-sans tracking-widest text-[10px] md:text-xs uppercase text-teal-600">The Groom</span>
              <h3 className="font-elegant text-xl md:text-2xl">David</h3>
            </motion.div>
          </motion.div>

          {/* CENTER ORNAMENT */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="z-20 -my-4 md:-my-0 md:-mx-8 bg-white p-4 md:p-6 rounded-full shadow-xl border border-teal-50"
          >
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-500 fill-pink-500 animate-pulse" />
          </motion.div>

          {/* BRIDE SIDE */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative group flex flex-col items-center"
          >
            <div className="relative w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-[450px] overflow-hidden rounded-t-[100px] border-8 border-white shadow-2xl">
              <Image 
                src="https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773077889/b1_mgssbx.jpg" 
                alt="Taibat"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-3 md:mt-4 text-center"
            >
              <span className="font-sans tracking-widest text-[10px] md:text-xs uppercase text-pink-600">The Bride</span>
              <h3 className="font-elegant text-xl md:text-2xl">Taibat</h3>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 md:bottom-10 flex flex-col items-center text-slate-400 cursor-pointer z-20"
          onClick={scrollToContent}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-2">The Invitation</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* SECTION 2: THE ELEGANT INVITATION (TEXT CONTENT) */}
      <section 
        id="invitation-details" 
        className="relative min-h-screen py-24 bg-white z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.05)] rounded-t-[50px] md:rounded-t-[100px]"
      >
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          
          {/* Header */}
          
          {/* Parents Narration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-slate-500">The Families of</p>
            <div className="space-y-2">
               <h2 className="font-elegant text-3xl md:text-4xl text-slate-800">Alhaji & Mrs Ismaila Alli</h2>
               <p className="font-elegant italic text-teal-500">and</p>
               <h2 className="font-elegant text-3xl md:text-4xl text-slate-800">Mr & Mrs Ganiyu Adio</h2>
            </div>
            <p className="font-elegant text-xl md:text-2xl text-slate-600 italic pt-6">
              Invite you to witness the union of their children
            </p>
          </motion.div>

          {/* Event Cards */}
          <div className="grid md:grid-cols-2 gap-8 pt-12">
            {/* Traditional Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[40px] border border-teal-50 shadow-xl shadow-teal-900/5 text-left space-y-4"
            >
              <span className="inline-block px-4 py-1 bg-teal-50 text-teal-700 rounded-full text-[10px] uppercase font-bold tracking-widest">
                Traditional
              </span>
              <h3 className="font-display text-3xl text-slate-800">June 18th</h3>
              <p className="font-sans text-slate-500 text-sm">Thursday, 2026 • 10:00 AM</p>
              <div className="pt-2">
                <p className="text-xs font-semibold text-pink-500 italic">Color: Onion Pink & Teal</p>
              </div>
            </motion.div>

            {/* Church Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[40px] border border-pink-50 shadow-xl shadow-pink-900/5 text-left space-y-4"
            >
              <span className="inline-block px-4 py-1 bg-pink-50 text-pink-700 rounded-full text-[10px] uppercase font-bold tracking-widest">
                White Wedding
              </span>
              <h3 className="font-display text-3xl text-slate-800">July 4th</h3>
              <p className="font-sans text-slate-500 text-sm">Saturday, 2026 • 11:00 AM</p>
              <div className="pt-2">
                <p className="text-xs font-semibold text-teal-600 italic">Color: All Shades of Blue</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}