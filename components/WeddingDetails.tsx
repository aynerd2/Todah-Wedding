'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Heart } from 'lucide-react'

export default function WeddingDetails() {
  return (
    <section id="wedding-details" className="py-24 px-4 bg-gradient-to-b from-teal-50 to-onion-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-deep-black">Wedding Events</h2>
          <p className="font-elegant text-xl text-smoke italic">Join us in celebrating our love</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Traditional Wedding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-teal-500"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-onion-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
            
            <h3 className="font-display text-3xl text-center text-teal-600 mb-6">Traditional Wedding</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-sans font-semibold text-deep-black">Thursday, June 18th, 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-sans font-semibold text-deep-black">10:00 AM</p>
                  <p className="font-sans text-sm text-smoke">Reception follows afterwards</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-sans font-semibold text-deep-black">The Amazing Place Event Centre</p>
                  <p className="font-sans text-sm text-smoke">Opp. 1st Weli-Weli Block Industry</p>
                  <p className="font-sans text-sm text-smoke">Oda Road, Akure</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-teal-100">
              <p className="text-center font-semibold text-onion-pink-600 mb-2">Dress Code</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-onion-pink-500 border-2 border-white shadow-lg"></div>
                <span className="font-sans text-lg">+</span>
                <div className="w-12 h-12 rounded-full bg-teal-500 border-2 border-white shadow-lg"></div>
              </div>
              <p className="text-center text-sm text-smoke mt-2">Onion Pink & Teal</p>
            </div>
          </motion.div>

          {/* Church Wedding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-onion-pink-500"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-onion-pink-500 to-teal-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
            
            <h3 className="font-display text-3xl text-center text-onion-pink-600 mb-6">Church Wedding</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-onion-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-sans font-semibold text-deep-black">Friday, July 4th, 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-onion-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-sans font-semibold text-deep-black">11:00 AM</p>
                  <p className="font-sans text-sm text-smoke">Praise party follows afterwards</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-onion-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-sans font-semibold text-deep-black">RCCG Church Without Walls</p>
                  <p className="font-sans text-sm text-smoke">PL2 2BR</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-onion-pink-100">
              <p className="text-center font-semibold text-teal-600 mb-2">Dress Code</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-white shadow-lg"></div>
                <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-lg"></div>
                <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white shadow-lg"></div>
                <div className="w-10 h-10 rounded-full bg-blue-300 border-2 border-white shadow-lg"></div>
              </div>
              <p className="text-center text-sm text-smoke mt-2">All Shades of Blue</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
