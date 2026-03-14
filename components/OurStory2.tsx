'use client'

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState,} from 'react'


const storyChapters = [
  {
    id: 0,
    title: "Chapter 1 — The First Meeting",
    text: "And it came to pass in the month of April, in the year 2024, that the brethren and sisters of the Fellowship of Christian Nurses (FCN) gathered themselves together for a prayer retreat. Among them were Taibat the daughter of Ismail Alli, who had journeyed from Plymouth, and David the son of Ganiyu Adio, who had come from Liverpool. Though they were present in the same place, they had little interaction, for their paths had not yet fully crossed. The hour came for evangelism; the leaders sent the brethren forth two by two into the streets to proclaim the good news. And it came to pass that Taibat and David were paired together. Taibat, knowing that evangelism was not her strongest labour, allowed David to take the lead. And David spoke boldly unto the people, while Taibat stood beside him, adding a word here and there. Soon after, the retreat had ended, Taibat returned unto Plymouth and David returned unto Liverpool, and it seemed as though their paths had parted.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065770/meet-1_nenk7o.jpg",
    caption: "First time we met",
    date: "April 2024"
  },
  {
    id: 1,
    title: "Chapter 2 — I have entered your DM",
    text: "But a few days after these things, David texted Taibat and said, “Sister Taibat, I have come into your DM.” And he asked her many questions, saying, “Where are you from? How old are you?” And Taibat answered him and introduced herself. And they spoke for a little while. Yet after this their conversation rested for a season, and many days passed without much speaking between them.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065770/meet-2_okuqjt.jpg",
    caption: "The DM",
    date: "April 2024"
  },
  {
    id: 2,
    title: "Chapter 3 — The Altar of 200 Days of Prayer",
    text: "And it came to pass in the month of August that David was appointed Prayer Coordinator within the fellowship, while Taibat served as General Secretary. The prayer unit purposed that FCN brethren should raise an altar of prayer before the Lord for 200 days. Therefore, they declared that for two hundred days the brethren should gather online at the 9th hour daily to pray. Taibat heard the voice of David leading the people in prayer daily and developed deep reverence and admiration for his consistency.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065771/w3_xocdvo.jpg",
    caption: "200 Days of Prayer",
    date: "August 2024"
  },
  {
    id: 3,
    title: "Chapter 4 — The memorised contact number",
    text: "Now it came to pass that one day David called Taibat from his place of work. And when she answered, David said with surprise, “Ah! I am so sorry—oh my God, is that you?” For he had called her from a landline, using a number that seemed strange unto her. And David said unto Taibat, “I had to memorise your number.” And Taibat wondered within herself, saying, “Why has David memorised my number? For we are not even close, neither are we friends.” Yet David asked her for help concerning sending reminders for prayers, and Taibat helped him. And from time-to-time David would call again, often to catch up on FCN meetings missed and thus their conversations slowly increased.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065771/bestie-wedding_higa75.jpg",
    caption: "The memorised contact number",
    date: "2024"
  },
  {
    id: 4,
    title: "Chapter 5 — ‘The Bestie’ joke",
    text: "And it came to pass in the month of September 2024 that David called Taibat again, and they spoke concerning the fellowship, but their conversation continued longer than was usual. And Taibat said unto David, “Let us speak by video.” They therefore spoke face to face for nearly an hour. And when their words had quieted, they remained upon the call, each going about their own matters while the other stayed present. And Taibat remembered how she often did this with her closest friend. And Taibat said in jest unto David, “Well then—you must be my Bestie.” And David received the appellation with laughter. And from that day forward Taibat and David called one another Bestie, though neither of them yet knew what the Lord was preparing.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065770/ksom_g6lgic.jpg",
    caption: "‘The Bestie’ joke",
    date: "September 2024"
  },
  {
    id: 5,
    title: "Chapter 6 — The Koinonia School of Ministry (KSOM) Admission",
    text: "And it came to pass in the month of January, in the year 2025, that David sent a message unto Taibat, saying, “Congratulations.” And Taibat asked David, “Why do you congratulate me?” And David answered, “Because you have been accepted into KSOM.\" For Taibat had applied unto this course, which was a gathering of teaching and ministry for three days. And Taibat marvelled and asked David, “How do you know this?” And David replied, “I saw your name on the admissions page.” And Taibat was astonished that David had noticed.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065771/first-date_jsuvlg.jpg",
    caption: "KSOM Admission",
    date: "January 2025"
  },
  {
    id: 6,
    title: "Chapter 7 — The Journey to London",
    text: "Now the school was held in the great city of London. Neither Taibat nor David lived there. And the friends of Taibat who lived near the city were yet far from the place of gathering. Therefore, Taibat and David joined themselves together with certain friends and rented a house for the three days. And their company numbered six. And the men dwelt on one side of the house, and the women on another but each damsel paired up with a young man and then again; David and Taibat were paired. For though they had known each other before, it was during this time that their friendship deepened greatly. And after these things Taibat and David began to speak more often, even almost every day.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065772/w7_itwi3v.jpg",
    caption: "The Journey to London",
    date: "2025"
  },
  {
    id: 7,
    title: "Chapter 8 — From Bestie to Courtship",
    text: "And after a season David spoke plainly unto Taibat and said, “Will you do life with me?” And by this David asked that Taibat should be his beloved. But Taibat and David were wise in their hearts. Therefore, they did not take the matter lightly. Instead, they both took time to pray and sought counsel from their mentors. And Taibat and David were given assignments to complete. And they attended sessions of counsel, both briefing and debriefing, that their hearts might be prepared.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065772/fave-memories_smdvzb.jpg",
    caption: "The Proposal",
    date: "2025"
  },
  {
    id: 8,
    title: "Chapter 9 — The Joshua Season",
    text: "And through prayer, counsel, and obedience Taibat and David walked together in wisdom. And the journey that began at a prayer retreat, with evangelism in the streets, and with a remembered blue suit, continued to unfold. It came to pass in the month of April 2025 when the brethren of FCN were gathered for a prayer retreat, the atmosphere- spiritual, the word-flowing with grace and wisdom. Taibat gave David his answer for it was a yes. For the Lord had quietly been writing the story of Taibat and David from the beginning. And it is a story of Love, prophesy and kingdom service.",
    image: "https://res.cloudinary.com/dq8jo2bf7/image/upload/v1773065772/fave-memories_smdvzb.jpg",
    caption: "The Yes",
    date: "April 2025"
  }
];


export default function OurStory() {
  const containerRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
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
          <h2 className="font-display text-5xl md:text-8xl mt-4 text-slate-800 italic">The Chronicles of Gen David, Book of Todah.</h2>
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
                
                {/* Mobile/Tablet View - Shows image inline with portrait aspect ratio */}
                <div className="lg:hidden mt-10 p-4 bg-white shadow-xl rotate-1">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={chapter.image} alt={chapter.caption} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-serif italic text-center mt-4 text-slate-800">{chapter.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: STICKY IMAGES (desktop only) */}
          <div className="hidden lg:block sticky top-[15vh] h-[70vh] w-full">
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter}
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: (activeChapter % 2 === 0 ? -2 : 2) }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full max-w-[420px] aspect-[4/5] bg-white p-4 shadow-2xl border-b-[15px] border-white"
                >
                  <div
                    className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-teal-500/20 backdrop-blur-sm z-30 transform -rotate-2"
                    style={{ clipPath: "polygon(0% 0%, 100% 5%, 95% 100%, 5% 95%)" }}
                  />

                  <div className="absolute inset-4 bottom-16 overflow-hidden bg-gray-50">
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