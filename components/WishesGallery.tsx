'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { Heart, Sparkles, Loader2, X, Maximize2, User } from 'lucide-react'

interface Wish {
  id: string
  name: string
  message: string
  imageUrl: string | null
  createdAt: any
}

export default function WishesGallery() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null)
  const [filter, setFilter] = useState<'all' | 'withPhotos' | 'messages'>('all')

  useEffect(() => {
    const q = query(
      collection(db, "wishes"), 
      where("status", "==", "approved"),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesData: Wish[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Wish[]
      
      setWishes(wishesData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const filteredWishes = wishes.filter(wish => {
    if (filter === 'withPhotos') return wish.imageUrl
    if (filter === 'messages') return !wish.imageUrl
    return true
  })

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
       <Loader2 className="w-8 h-8 text-pink-300 animate-spin" />
       <p className="font-serif italic text-slate-400">Gathering love for Taibat & David...</p>
    </div>
  )

  return (
    <section id="gallery" className="py-24 px-4 md:px-6 bg-gradient-to-b from-[#fffafa] to-pink-50/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-pink-100 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">Memory Wall</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-4">
            Love & Blessings
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-8">
            {wishes.length} beautiful {wishes.length === 1 ? 'message' : 'messages'} for Taibat & David
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex items-center gap-2 p-1 bg-white rounded-full border border-pink-100 shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All ({wishes.length})
            </button>
            <button
              onClick={() => setFilter('withPhotos')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'withPhotos' 
                  ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Photos ({wishes.filter(w => w.imageUrl).length})
            </button>
            <button
              onClick={() => setFilter('messages')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'messages' 
                  ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Messages ({wishes.filter(w => !w.imageUrl).length})
            </button>
          </div>
        </motion.div>

        {/* Compact Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredWishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="break-inside-avoid relative group cursor-pointer"
                onClick={() => setSelectedWish(wish)}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-50/50 hover:border-pink-200">
                  
                  {/* Image if present */}
                  {wish.imageUrl && (
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={wish.imageUrl} 
                        alt={wish.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Expand icon */}
                      <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <Maximize2 className="w-3 h-3 text-pink-500" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className={`p-4 ${!wish.imageUrl ? 'pt-6' : ''}`}>
                    {!wish.imageUrl && (
                      <Heart className="w-4 h-4 text-pink-200 mb-3 fill-pink-100" />
                    )}
                    
                    <p className="font-serif text-sm leading-relaxed text-slate-700 line-clamp-3 mb-3">
                      "{wish.message}"
                    </p>
                    
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-pink-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-900 truncate">{wish.name}</p>
                        {wish.createdAt && (
                          <p className="text-[10px] text-slate-400">
                            {wish.createdAt.toDate().toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Empty State */}
        {!loading && filteredWishes.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-dashed border-pink-100 rounded-3xl bg-white/50"
          >
            <Heart className="w-12 h-12 mx-auto text-pink-100 mb-4 fill-pink-50" />
            <p className="font-serif italic text-xl text-slate-300">
              {filter === 'all' 
                ? 'Be the first to leave a blessing.'
                : `No ${filter === 'withPhotos' ? 'photos' : 'messages'} yet.`
              }
            </p>
          </motion.div>
        )}
      </div>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWish(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md cursor-zoom-out overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedWish(null)}
              className="fixed top-4 right-4 md:top-6 md:right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all shadow-lg z-10 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl cursor-default my-8"
            >
              {/* Image */}
              {selectedWish.imageUrl && (
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100">
                  <img 
                    src={selectedWish.imageUrl} 
                    alt={selectedWish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest font-black text-pink-400">From</p>
                    <p className="font-serif text-2xl text-slate-900">{selectedWish.name}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="font-serif text-xl md:text-2xl leading-relaxed text-slate-800 italic">
                    "{selectedWish.message}"
                  </p>
                </div>

                {selectedWish.createdAt && (
                  <div className="flex items-center gap-2 pt-6 border-t border-slate-100">
                    <Sparkles className="w-4 h-4 text-pink-300" />
                    <p className="text-sm text-slate-400">
                      Shared on {selectedWish.createdAt.toDate().toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}