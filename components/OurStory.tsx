'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function OurStory() {
  return (
    <section id="our-story" className="py-24 px-4 bg-gradient-to-b from-white to-teal-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-deep-black">
            Our Love Story
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-teal-500" />
            <Heart className="w-5 h-5 fill-onion-pink-500 text-onion-pink-500 animate-pulse-slow" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-onion-pink-500" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-4xl text-teal-600">How We Met</h3>
            <div className="prose prose-lg">
              <p className="font-sans text-base leading-relaxed text-deep-black">
                Story here about how you both met
              </p>
              <p className="font-sans text-base leading-relaxed text-deep-black mt-4">
                More details about your journey together, special moments, and what makes your love unique
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-teal-200 to-onion-pink-200 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/p1.jpg"
                alt="Taibat & Oluwasegun"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-onion-pink-500 to-teal-500 rounded-full blur-3xl opacity-30"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-2 border-teal-100"
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-3xl text-onion-pink-600 mb-2">The Proposal</h3>
            <p className="font-elegant italic text-smoke">A moment we'll never forget</p>
          </div>
          <p className="font-sans text-base leading-relaxed text-deep-black max-w-4xl mx-auto">
           the story of how Oluwasegun proposed to Taibat
          </p>
        </motion.div>
      </div>
    </section>
  )
}
