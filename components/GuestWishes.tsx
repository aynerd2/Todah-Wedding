'use client'

import { motion } from 'framer-motion'
import { Camera, Heart, Send } from 'lucide-react'
import { useState } from 'react'

export default function GuestWishes() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  return (
    <section id="guest-wishes" className="py-24 px-4 bg-gradient-to-b from-onion-pink-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-deep-black">
            Share Your Love
          </h2>
          <p className="font-elegant text-xl text-smoke italic">
            Upload photos and send your wishes to the couple
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Photo Upload */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <div className="text-center mb-6">
              <Camera className="w-12 h-12 mx-auto text-teal-500 mb-4" />
              <h3 className="font-display text-2xl text-teal-600 mb-2">Upload Your Photos</h3>
              <p className="font-sans text-sm text-smoke">
                Share your favorite moments with us!
              </p>
            </div>

            <div className="border-2 border-dashed border-teal-300 rounded-xl p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Camera className="w-16 h-16 mx-auto text-teal-400 mb-4" />
                <p className="font-sans text-sm text-smoke mb-2">Click to upload or drag and drop</p>
                <p className="font-sans text-xs text-smoke">PNG, JPG up to 10MB</p>
              </label>
            </div>

            <p className="text-xs text-center text-smoke mt-4">
              Note: Photo upload requires backend setup. See documentation.
            </p>
          </motion.div>

          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <div className="text-center mb-6">
              <Heart className="w-12 h-12 mx-auto text-onion-pink-500 fill-onion-pink-500 mb-4" />
              <h3 className="font-display text-2xl text-onion-pink-600 mb-2">Send Your Wishes</h3>
              <p className="font-sans text-sm text-smoke">
                Leave a message for the happy couple!
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-sans text-smoke mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-sans text-smoke mb-2">Your Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors resize-none"
                  placeholder="Write your wishes and blessings..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Wishes
              </button>
            </form>

            <p className="text-xs text-center text-smoke mt-4">
              Note: Message submission requires backend setup. See documentation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
