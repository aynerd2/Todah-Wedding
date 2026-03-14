'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Heart, Send, Loader2, CheckCircle2, X } from 'lucide-react'
import { db, storage } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toast } from 'sonner' // Added Sonner import

export default function GuestWishes() {
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // Size check for better UX
      if (selectedFile.size > 10 * 1024 * 1024) {
        return toast.error("Photo is too large. Please keep it under 10MB.")
      }
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!name || !message) {
      return toast.error("Please provide your name and a message.")
    }

    setIsSubmitting(true)

    // Logic wrapped in a function for the toast promise
    const submitWish = async () => {
      let imageUrl: string | null = null

      if (file) {
        const fileRef = ref(storage, `wishes/${Date.now()}_${file.name}`)
        const uploadResult = await uploadBytes(fileRef, file)
        imageUrl = await getDownloadURL(uploadResult.ref)
      }

      return await addDoc(collection(db, "wishes"), {
        name,
        message,
        imageUrl,
        status: 'pending', // Added: ensure it goes to moderation
        createdAt: serverTimestamp(),
      })
    }

    toast.promise(submitWish(), {
      loading: 'Sending your love to the couple...',
      success: () => {
        setIsSuccess(true)
        setName('')
        setMessage('')
        setFile(null)
        setPreview(null)
        return "Wish sent! It's waiting for approval. ❤️"
      },
      error: (err) => {
        console.error("Submission Error:", err)
        setIsSubmitting(false)
        return "Something went wrong. Please check your connection."
      },
      finally: () => setIsSubmitting(false)
    })
  }

  return (
    <section id="guest-wishes" className="py-24 px-4 bg-gradient-to-b from-pink-50 to-white selection:bg-pink-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif italic text-5xl md:text-7xl mb-6 text-slate-900 tracking-tight">
            Share Your <span className="text-pink-500">Love</span>
          </h2>
          <p className="font-serif text-xl text-slate-500 italic">
            Upload photos and send your blessings to Taibat & David
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Photo Upload Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl shadow-pink-100/20 border border-white relative group"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                <Camera className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="font-serif text-2xl text-slate-800 mb-2">Capture a Moment</h3>
              <p className="text-sm text-slate-400 font-light">Share a snapshot from today or a favorite memory.</p>
            </div>

            {!preview ? (
              <div className="relative border-2 border-dashed border-teal-100 rounded-[2rem] p-12 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-all cursor-pointer group/upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="photo-upload"
                />
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-full w-fit mx-auto shadow-sm group-hover/upload:scale-110 transition-transform">
                    <Camera className="w-6 h-6 text-teal-400" />
                  </div>
                  <p className="font-bold text-xs uppercase tracking-widest text-slate-500">Tap to upload</p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-[2rem] overflow-hidden aspect-square md:aspect-video shadow-2xl border-4 border-white">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={removeFile}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Message Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-pink-100/20 border border-white relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-serif text-3xl text-slate-800 mb-4">Sent with Love</h3>
                  <p className="text-slate-500 italic mb-8">Your message is being polished and will appear in the gallery soon.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-[10px] uppercase tracking-widest font-black text-teal-600 hover:text-teal-700 underline underline-offset-8"
                  >
                    Send another wish
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <Heart className="w-12 h-12 mx-auto text-pink-500 fill-pink-100 mb-4 animate-pulse" />
                    <h3 className="font-serif text-2xl text-slate-800 mb-2">Your Blessing</h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none font-serif text-lg italic"
                      placeholder="Your name (or nickname)..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-2">Message</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none font-serif text-lg italic resize-none"
                      placeholder="May your home be filled with laughter..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl disabled:bg-slate-200 disabled:text-slate-400 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Publish Wish'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}