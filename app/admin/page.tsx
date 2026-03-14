'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase' 
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail, Heart, Loader2, Sparkles, Eye, EyeOff } from 'lucide-react' // Added Eye icons
import { toast } from 'sonner'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // Added toggle state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Welcome back, Curator")
      router.push('/admin/moderation')
    } catch (err: any) {
      const msg = "The keys to the garden don't seem to match."
      setError(msg)
      toast.error(msg)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#fffafa] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-pink-100/50 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-teal-50/60 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-pink-100 to-teal-50 rounded-2xl mb-6 shadow-inner"
            >
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500/10" />
            </motion.div>
            <h2 className="font-serif text-3xl text-slate-900 mb-2 tracking-tight">Curator Access</h2>
            <p className="text-sm text-slate-500 font-light italic">Enter your credentials to manage memories.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
              <input 
                type="email" 
                required
                placeholder="Curator Email" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/5 transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            {/* Password Field with Eyes */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="Secret Key" 
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/5 transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-red-500 text-center font-medium italic"
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            <button 
              disabled={loading}
              className="relative w-full overflow-hidden group bg-slate-900 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-slate-800 active:scale-[0.98] disabled:bg-slate-400"
            >
              <span className={`flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                Open Dashboard <Sparkles className="w-4 h-4" />
              </span>
              
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                </div>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => router.push('/')}
              className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-teal-600 transition-colors font-bold"
            >
              ← Back to Wedding Site
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom Decorative Element */}
      <div className="absolute bottom-8 text-center w-full opacity-20">
        <p className="font-serif text-sm italic text-slate-900">Taibat & David • 2026</p>
      </div>
    </div>
  )
}