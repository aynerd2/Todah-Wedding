'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Clock, Heart, Sparkles } from 'lucide-react'

// --- Countdown Component ---
const CountdownDisplay = ({ targetDate, label }: { targetDate: string, label: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const distance = new Date(targetDate).getTime() - now

      if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTime())
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const TimeUnit = ({ value, unit }: { value: number, unit: string }) => (
    <div className="flex flex-col items-center px-3 md:px-6">
      <motion.span 
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-5xl font-display text-teal-600"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="text-[9px] uppercase tracking-widest text-smoke font-bold mt-1">{unit}</span>
    </div>
  )

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-3 h-3 text-onion-pink-400" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-smoke/60">Countdown to {label}</span>
        <Sparkles className="w-3 h-3 text-onion-pink-400" />
      </div>
      <div className="flex justify-center items-center divide-x divide-teal-100 bg-white/40 backdrop-blur-md py-8 px-4 rounded-[2rem] border border-white/60 shadow-xl shadow-teal-900/5">
        <TimeUnit value={timeLeft.days} unit="Days" />
        <TimeUnit value={timeLeft.hours} unit="Hours" />
        <TimeUnit value={timeLeft.minutes} unit="Mins" />
        <TimeUnit value={timeLeft.seconds} unit="Secs" />
      </div>
    </div>
  )
}

export default function WeddingDetails() {
  const [activeEvent, setActiveEvent] = useState<'traditional' | 'church'>('traditional')

  const events = {
    traditional: {
      date: "2026-06-18T10:00:00",
      label: "Traditional Ceremony",
      accent: "teal"
    },
    church: {
      date: "2026-07-04T11:00:00",
      label: "Church Blessing",
      accent: "onion-pink"
    }
  }

  return (
    <section id="wedding-details" className="py-24 px-4 bg-gradient-to-b from-teal-50 via-white to-onion-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-5xl md:text-7xl mb-4 text-deep-black">Wedding Events</h2>
          <p className="font-elegant text-xl text-smoke italic mb-10">Two celebrations, one beautiful journey</p>
          
          {/* Event Toggle Switch */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
              <button 
                onClick={() => setActiveEvent('traditional')}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeEvent === 'traditional' ? 'bg-white text-teal-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                TRADITIONAL
              </button>
              <button 
                onClick={() => setActiveEvent('church')}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeEvent === 'church' ? 'bg-white text-onion-pink-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                CHURCH
              </button>
            </div>
          </div>

          {/* Animated Countdown Section */}
          <div className="min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                <CountdownDisplay 
                  targetDate={events[activeEvent].date} 
                  label={events[activeEvent].label} 
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mt-20">
          {/* Traditional Wedding Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`bg-white p-10 rounded-[2.5rem] shadow-2xl border-t-8 border-teal-500 transition-all ${activeEvent === 'traditional' ? 'ring-4 ring-teal-500/10 scale-[1.02]' : 'opacity-80'}`}
          >
             <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-500">
                <Heart className="w-7 h-7 fill-current" />
              </div>
              <div className="px-4 py-1.5 bg-teal-50 rounded-full text-[10px] font-black text-teal-600 uppercase tracking-widest">Akure, Nigeria</div>
            </div>
            
            <h3 className="font-display text-3xl text-teal-600 mb-8">Traditional marriage rites (igbeyawo)</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <Calendar className="w-6 h-6 text-teal-500 mt-1" />
                <div>
                  <p className="font-sans font-bold text-lg text-deep-black">Thursday, June 18, 2026</p>
                  <p className="text-sm text-smoke">10:00 AM Prompt</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <MapPin className="w-6 h-6 text-teal-500 mt-1" />
                <div>
                  <p className="font-sans font-bold text-deep-black">The Amazing Place Event Centre</p>
                  <p className="font-sans text-sm text-smoke leading-relaxed">Opp. 1st Weli-Weli Block Industry, Oda Road, Akure</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-black text-smoke/50 uppercase tracking-widest mb-3">Dress Code</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-onion-pink-500 border-2 border-white shadow-md"></div>
                    <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white shadow-md"></div>
                    <span className="text-xs font-bold text-smoke">Onion Pink & Teal</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Church Wedding Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`bg-white p-10 rounded-[2.5rem] shadow-2xl border-t-8 border-onion-pink-500 transition-all ${activeEvent === 'church' ? 'ring-4 ring-onion-pink-500/10 scale-[1.02]' : 'opacity-80'}`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-onion-pink-50 rounded-2xl flex items-center justify-center text-onion-pink-500">
                <Heart className="w-7 h-7 fill-current" />
              </div>
              <div className="px-4 py-1.5 bg-onion-pink-50 rounded-full text-[10px] font-black text-onion-pink-600 uppercase tracking-widest">Plymouth, UK</div>
            </div>
            
            <h3 className="font-display text-3xl text-onion-pink-600 mb-8">The Church Blessing</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <Calendar className="w-6 h-6 text-onion-pink-500 mt-1" />
                <div>
                  <p className="font-sans font-bold text-lg text-deep-black">Friday, July 4, 2026</p>
                  <p className="text-sm text-smoke">11:00 AM Prompt</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <MapPin className="w-6 h-6 text-onion-pink-500 mt-1" />
                <div>
                  <p className="font-sans font-bold text-deep-black">Living Stones Baptist Church</p>
                  <p className="font-sans text-sm text-smoke leading-relaxed">1798 Catherine Street, Plymouth PL1 2AD</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-black text-smoke/50 uppercase tracking-widest mb-3">Dress Code</p>
                  <div className="flex items-center gap-2">
                    {[ '#1E3A8A', '#2563EB', '#93C5FD'].map((c, i) => (
                      <div key={i} style={{backgroundColor: c}} className="w-6 h-6 rounded-full border border-white shadow-sm"></div>
                    ))}
                    <span className="text-xs font-bold text-smoke ml-2">All Shades of Blue</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}