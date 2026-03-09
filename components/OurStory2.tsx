'use client'

import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

const storyChapters = [
  {
    id: 0,
    title: "The Prayer Coordinator",
    text: "So in August 2024, it was a prayer. He became the Prayer Coordinator and I was the general secretary for the fellowship. The prayer department decided they wanted to do 200 days of prayer every night for one hour. Naturally, I was hearing this Brother's voice every day praying at 9 pm back to back.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065770/meet-1_nenk7o.jpg",
    caption: "First time we met",
    date: "April 2024"
  },
  {
    id: 1,
    title: "The Memorized Number",
    text: "The first time he called me from work, he said 'Oh my God, is that you?' I was like 'yeah that's me.' It was a weird Number and I knew I was being called from the landline. He said 'I'm sorry I had to memorise your number.' Why is this Brother memorising My Number? We're not even close!",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065770/meet-2_okuqjt.jpg",
    caption: "August 2024",
    date: "August 2024"
  },
  {
    id: 2,
    title: "The Video Call",
    text: "In September 2024, he called me and we were talking fellowship talk. I was home a lot and I just enjoy talking to people on video. We made a video call that lasted for maybe almost an hour or more. I thought, 'Oh my God, this is how me and my best friend always talk.'",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065771/w3_xocdvo.jpg",
    caption: "First day we met",
    date: "September 2024"
  },
  {
    id: 3,
    title: "The 'Bestie' Joke",
    text: "He said 'that's what my friend always does with his girlfriend' and I was like 'well Bestie Bestie!' So since then we started calling each other Bestie. It was a joke! I just called him Bestie because within an hour video call, you have to be my Bestie.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065771/bestie-wedding_higa75.jpg",
    caption: "The wedding photo I forced",
    date: "February 2024"
  },
  {
    id: 4,
    title: "KSOM - The Surprise",
    text: "Eventually in January 2025 he messages me: 'congratulations' and I was like why are you messaging me? He said 'oh you got into KSOM' (Koinonia School of Ministry). I asked him how do you know? He said 'the admission list page!'",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065770/ksom_g6lgic.jpg",
    caption: "KSOM Admission",
    date: "January 2025"
  },
  {
    id: 5,
    title: "London is Crazy!",
    text: "The place was in London and London is crazy man! Neither of us live in London, so we booked an Airbnb together with friends. Those three days were intense. He was the person that I was closest to during the KSM.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065771/first-date_jsuvlg.jpg",
    caption: "Our first date",
    date: "April 2025"
  },
  {
    id: 6,
    title: "Flame Fest",
    text: "We started speaking more intimately, speaking almost every day. After a while he just straight up asked me to do Life with him. We shared so many memories in such a short time, from fellowship talks to London streets.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065772/w7_itwi3v.jpg",
    caption: "Flame Fest 2025",
    date: "May 2025"
  },
  {
    id: 7,
    title: "Doing Life Together",
    text: "We prayed, we had mentors, lots of mentors, we had assignments, counseling sessions, briefing and debriefing sessions. And yeah, it was amazing. It is still amazing actually. That's the brief summary of how we met.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065772/fave-memories_smdvzb.jpg",
    caption: "Favourite memories",
    date: "Present Day"
  }
]

export default function OurStory() {
  const containerRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(0)

  // 1. Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // 2. Map the scroll progress (0 to 1) to chapter indices (0 to 7)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // We split 100% scroll into equal chunks for each chapter
    const chapterCount = storyChapters.length
    const newIndex = Math.min(
      Math.floor(latest * chapterCount),
      chapterCount - 1
    )
    if (newIndex !== activeChapter) {
      setActiveChapter(newIndex)
    }
  })

  return (
    <section 
      id="our-story" 
      ref={containerRef} 
      className="relative bg-[#FDFBF7] py-24"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <span className="font-sans text-xs uppercase tracking-[0.5em] text-teal-700">The Narration</span>
          <h2 className="font-display text-5xl md:text-8xl mt-4 text-slate-800 italic">Our Story</h2>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="relative">
            {storyChapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="transition-all duration-700 min-h-[60vh] lg:min-h-[80vh] flex flex-col justify-center"
                style={{ 
                  opacity: activeChapter === index ? 1 : 0.1,
                  transform: activeChapter === index ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                <h3 className="font-display text-3xl text-teal-800 mb-6 italic">{chapter.title}</h3>
                <p className="font-elegant text-xl md:text-2xl leading-relaxed text-slate-700">
                  {chapter.text}
                </p>
                
                {/* Mobile View - Shows image inline */}
                <div className="lg:hidden mt-10 p-4 bg-white shadow-xl rotate-1">
                  <div className="relative aspect-video">
                    <img src={chapter.image} alt={chapter.caption} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-serif italic text-center mt-4 text-slate-800">{chapter.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: STICKY IMAGES */}
          <div className="hidden lg:block sticky top-[15vh] h-[70vh] w-full">
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter}
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: (activeChapter % 2 === 0 ? -2 : 2) }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full max-w-[420px] aspect-[4/5] bg-white p-4 pb-20 shadow-2xl border-b-[15px] border-white"
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-teal-500/20 backdrop-blur-sm z-30 transform -rotate-2" 
                       style={{ clipPath: "polygon(0% 0%, 100% 5%, 95% 100%, 5% 95%)" }} />

                  <div className="relative w-full h-full overflow-hidden bg-gray-50">
                    <img 
                      src={storyChapters[activeChapter].image} 
                      alt="Story Frame"
                      className="w-full h-full object-cover sepia-[0.1]"
                    />
                  </div>

                  <div className="absolute bottom-5 left-0 right-0 text-center px-4">
                    <p className="font-serif italic text-2xl text-slate-800 leading-tight">
                      {storyChapters[activeChapter].caption}
                    </p>
                    <p className="text-[10px] tracking-widest uppercase text-teal-600 mt-2 font-bold">
                      {storyChapters[activeChapter].date}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}