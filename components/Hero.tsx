'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Heart, ChevronDown, Volume2, VolumeX, Play, Pause, RotateCcw, FastForward, Rewind } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

export default function WeddingHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9])

  // --- Video Controls ---
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const skip = (amount: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += amount
    }
  }

  const scrollToContent = () => {
    const element = document.getElementById('proposal-video')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative bg-[#FAFAFA]">
      
      {/* SECTION 1: THE CINEMATIC ENCOUNTER (HERO) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 md:pt-16 md:pb-0">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="romantic-blur bg-teal-100/40"
            style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

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
            <div className="relative w-48 h-64 sm:w-64 sm:h-80 md:w-80 md:h-[450px] overflow-hidden rounded-t-[100px] border-8 border-white shadow-2xl">
              <Image 
                src="https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773077889/g1_iypc3o.jpg"
                alt="David"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
            <div className="mt-3 md:mt-4 text-center">
              <span className="font-sans tracking-widest text-[10px] md:text-xs uppercase text-teal-600">The Groom</span>
              <h3 className="font-elegant text-xl md:text-2xl">David</h3>
            </div>
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
            <div className="mt-3 md:mt-4 text-center">
              <span className="font-sans tracking-widest text-[10px] md:text-xs uppercase text-pink-600">The Bride</span>
              <h3 className="font-elegant text-xl md:text-2xl">Taibat</h3>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 md:bottom-10 flex flex-col items-center text-slate-400 cursor-pointer z-20"
          onClick={scrollToContent}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-2">The Proposal</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* SECTION 2: THE PROPOSAL VIDEO REEL */}
      <section id="proposal-video" className="relative py-24 bg-white flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full max-w-4xl px-4"
        >
          <div className="text-center mb-12">
            <span className="font-sans tracking-[0.4em] text-[10px] uppercase text-pink-500 font-bold">The Journey</span>
            <h2 className="font-display text-4xl md:text-6xl mt-4 text-slate-800">The "Yes" Moment</h2>
          </div>

          <div className="relative group max-w-[320px] md:max-w-[380px] mx-auto">
            {/* Video Frame */}
            <div className="relative aspect-[9/16] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-[10px] border-slate-900 bg-slate-200">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/dq8jo2bf7/video/upload/v1773656023/Todah_proposal_pbcx4c.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* VIDEO CONTROLS OVERLAY */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div className="flex items-center justify-between gap-4">
                  {/* Skip Backward */}
                  <button onClick={() => skip(-10)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40">
                    <Rewind size={20} fill="currentColor" />
                  </button>

                  {/* Play / Pause */}
                  <button onClick={togglePlay} className="p-4 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform">
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                  </button>

                  {/* Skip Forward */}
                  <button onClick={() => skip(10)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40">
                    <FastForward size={20} fill="currentColor" />
                  </button>
                </div>
              </div>

              {/* Mute Button (Floating) */}
              <button 
                onClick={toggleMute}
                className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 hover:bg-white/40 transition-all z-30"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-onion-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
          
          <p className="text-center mt-12 font-elegant italic text-slate-500 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
            "And so, our forever begins with a simple, heartfelt promise."
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: THE ELEGANT INVITATION */}
      <section 
        id="invitation-details" 
        className="relative min-h-screen py-24 bg-[#FCFCFC] z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.03)] rounded-t-[60px] md:rounded-t-[120px] border-t border-slate-100"
      >
        <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* <p className="font-sans text-xs tracking-[0.5em] uppercase text-slate-400 font-bold">In the name of God</p> */}
            <div className="space-y-4">
               <h2 className="font-elegant text-3xl md:text-5xl text-slate-800 leading-tight">Alhaji & Mrs Ismail Alli</h2>
               <p className="font-elegant italic text-teal-500 text-2xl">&</p>
               <h2 className="font-elegant text-3xl md:text-5xl text-slate-800 leading-tight">Mr & Mrs Ganiyu Adio</h2>
            </div>
            <div className="w-12 h-[1px] bg-slate-200 mx-auto my-8"></div>
            <p className="font-elegant text-xl md:text-3xl text-slate-600 italic px-4">
              Cordially invite you to witness the beautiful union of their children
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 pt-4">
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-10 rounded-[50px] border border-teal-50 shadow-2xl shadow-teal-900/5 text-left space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/50 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-teal-50 transition-colors"></div>
              <span className="inline-block px-5 py-1.5 bg-teal-50 text-teal-700 rounded-full text-[10px] uppercase font-black tracking-widest">
                Traditional marriage rites (igbeyawo)
              </span>
              <div className="space-y-2">
                <h3 className="font-display text-4xl text-slate-800">June 18th</h3>
                <p className="font-sans text-slate-500 font-medium">Thursday, 2026 • 10:00 AM</p>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Color Code: Onion Pink & Teal</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-10 rounded-[50px] border border-pink-50 shadow-2xl shadow-pink-900/5 text-left space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50/50 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-pink-50 transition-colors"></div>
              <span className="inline-block px-5 py-1.5 bg-pink-50 text-pink-700 rounded-full text-[10px] uppercase font-black tracking-widest">
               The Church Blessing
              </span>
              <div className="space-y-2">
                <h3 className="font-display text-4xl text-slate-800">July 4th</h3>
                <p className="font-sans text-slate-500 font-medium">Saturday, 2026 • 10:00 AM</p>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Color Code: All Shades of Blue</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}