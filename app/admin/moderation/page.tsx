'use client'

import { useEffect, useState, useMemo } from 'react'
import { db, auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { 
  collection, query, where, onSnapshot, doc, 
  writeBatch, deleteDoc, Timestamp, orderBy 
} from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { 
  Check, Trash2, Image as ImageIcon, LogOut, 
  EyeOff, Sparkles, Heart, Search, X, Maximize2, Calendar,
  CheckSquare, Square, Filter, Grid, List, User, MessageSquare,
  Clock, Eye, XCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface Wish {
  id: string;
  name: string;
  message: string;
  imageUrl?: string;
  status: 'pending' | 'approved';
  createdAt: Timestamp;
}

export default function ModerationPage() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending')
  const [searchQuery, setSearchQuery] = useState('')
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null)
  
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/admin')
      else setCheckingAuth(false)
    })
    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    if (checkingAuth) return;
    const q = query(
      collection(db, "wishes"), 
      where("status", "==", activeTab),
      orderBy("createdAt", "desc")
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Wish))
      setWishes(docs)
      setSelectedIds([])
    })
    return () => unsubscribe()
  }, [activeTab, checkingAuth])

  const filteredWishes = useMemo(() => {
    return wishes.filter(wish => 
      wish.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.message?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [wishes, searchQuery])

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredWishes.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredWishes.map(w => w.id))
    }
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleApprove = async (id: string) => {
    const ref = doc(db, "wishes", id)
    toast.promise(
      writeBatch(db).update(ref, { status: 'approved' }).commit(),
      { success: '✅ Approved!', error: 'Failed to approve' }
    )
  }

  const handleReject = async (id: string) => {
    if (!confirm('Delete this wish forever?')) return
    toast.promise(
      deleteDoc(doc(db, "wishes", id)),
      { success: '🗑️ Deleted', error: 'Failed to delete' }
    )
  }

  const handleBulkStatus = async (newStatus: 'approved' | 'pending') => {
    const batch = writeBatch(db)
    selectedIds.forEach(id => {
      const ref = doc(db, "wishes", id)
      batch.update(ref, { status: newStatus })
    })
    toast.promise(batch.commit(), {
      loading: `Updating ${selectedIds.length} items...`,
      success: `✨ ${selectedIds.length} wishes updated!`,
      error: 'Failed to update'
    })
    setSelectedIds([])
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} wishes permanently?`)) return
    const batch = writeBatch(db)
    selectedIds.forEach(id => batch.delete(doc(db, "wishes", id)))
    toast.promise(batch.commit(), {
      success: `🗑️ Deleted ${selectedIds.length} items`,
      error: 'Delete failed'
    })
    setSelectedIds([])
  }

  if (checkingAuth) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-teal-50/30 pb-32">
      
      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6 cursor-zoom-out"
          >
            <button className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20">
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }}
              src={selectedImage} 
              className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl border-4 border-white/10" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWish(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-md p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              {selectedWish.imageUrl && (
                <div className="relative aspect-video bg-gradient-to-br from-pink-100 to-teal-100">
                  <img src={selectedWish.imageUrl} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-teal-400 flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedWish.name}</h3>
                    <p className="text-sm text-slate-400 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {selectedWish.createdAt?.toDate?.()?.toLocaleString() || 'Just now'}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                  <p className="font-serif text-lg leading-relaxed text-slate-700 italic">
                    "{selectedWish.message}"
                  </p>
                </div>

                <div className="flex gap-3">
                  {activeTab === 'pending' ? (
                    <>
                      <button
                        onClick={() => { handleApprove(selectedWish.id); setSelectedWish(null); }}
                        className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Approve
                      </button>
                      <button
                        onClick={() => { handleReject(selectedWish.id); setSelectedWish(null); }}
                        className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-semibold hover:bg-red-100 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => { handleReject(selectedWish.id); setSelectedWish(null); }}
                      className="flex-1 py-3 bg-red-50 text-red-600 rounded-2xl font-semibold hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedWish(null)}
                    className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-semibold hover:bg-slate-200 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-teal-400 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-br from-pink-500 to-teal-500 p-3 rounded-2xl shadow-lg">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Wishes Dashboard</h1>
                <p className="text-sm text-slate-400">Manage blessings for Taibat & David</p>
              </div>
            </div>

            <button 
              onClick={() => signOut(auth)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-all font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-3xl font-bold text-slate-900">{filteredWishes.length}</p>
                <p className="text-sm text-slate-400">Total Wishes</p>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div>
                <p className="text-2xl font-bold text-teal-600">{wishes.filter(w => w.status === 'approved').length}</p>
                <p className="text-sm text-slate-400">Approved</p>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div>
                <p className="text-2xl font-bold text-pink-600">{wishes.filter(w => w.status === 'pending').length}</p>
                <p className="text-sm text-slate-400">Pending</p>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search wishes..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none w-64 transition-all"
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Status Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'pending' 
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab('approved')}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'approved' 
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Approved
                </button>
              </div>

              {/* Select All */}
              {filteredWishes.length > 0 && (
                <button
                  onClick={toggleSelectAll}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Select All"
                >
                  {selectedIds.length === filteredWishes.length 
                    ? <CheckSquare className="w-5 h-5 text-teal-600" /> 
                    : <Square className="w-5 h-5 text-slate-400" />
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredWishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`relative bg-white rounded-2xl border-2 transition-all cursor-pointer group ${
                    selectedIds.includes(wish.id) 
                      ? 'border-teal-500 shadow-lg shadow-teal-100' 
                      : 'border-slate-100 hover:border-slate-200 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedWish(wish)}
                >
                  {/* Selection Checkbox */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSelectOne(wish.id); }}
                    className="absolute top-3 left-3 z-10 p-1.5 bg-white rounded-lg shadow-md hover:scale-110 transition-transform"
                  >
                    {selectedIds.includes(wish.id) 
                      ? <CheckSquare className="w-4 h-4 text-teal-600" /> 
                      : <Square className="w-4 h-4 text-slate-300" />
                    }
                  </button>

                  {/* Image */}
                  {wish.imageUrl && (
                    <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-gradient-to-br from-pink-100 to-teal-100">
                      <img 
                        src={wish.imageUrl} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(wish.imageUrl!); }}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Maximize2 className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    {!wish.imageUrl && <Heart className="w-5 h-5 text-pink-200 mb-3 fill-pink-100" />}
                    
                    <p className="font-serif text-sm text-slate-700 line-clamp-2 mb-3 italic">
                      "{wish.message}"
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-teal-400 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{wish.name}</p>
                          <p className="text-[10px] text-slate-400">
                            {wish.createdAt?.toDate?.()?.toLocaleDateString() || 'Today'}
                          </p>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      {activeTab === 'pending' && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleApprove(wish.id); }}
                            className="p-1.5 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleReject(wish.id); }}
                            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 w-10">
                      <button onClick={toggleSelectAll}>
                        {selectedIds.length === filteredWishes.length && filteredWishes.length > 0
                          ? <CheckSquare className="w-5 h-5 text-teal-600" />
                          : <Square className="w-5 h-5 text-slate-300" />
                        }
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Guest</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Message</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase">Photo</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {filteredWishes.map((wish) => (
                      <motion.tr
                        key={wish.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`group transition-colors ${
                          selectedIds.includes(wish.id) ? 'bg-teal-50/50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <button onClick={() => toggleSelectOne(wish.id)}>
                            {selectedIds.includes(wish.id)
                              ? <CheckSquare className="w-5 h-5 text-teal-600" />
                              : <Square className="w-5 h-5 text-slate-300" />
                            }
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-slate-900">{wish.name}</p>
                            <p className="text-xs text-slate-400">
                              {wish.createdAt?.toDate?.()?.toLocaleDateString() || 'Today'}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-md">
                          <p className="text-sm text-slate-600 line-clamp-2 italic">"{wish.message}"</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {wish.imageUrl ? (
                            <button
                              onClick={() => setSelectedImage(wish.imageUrl!)}
                              className="w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-100 hover:border-teal-500 transition-all inline-block"
                            >
                              <img src={wish.imageUrl} className="w-full h-full object-cover" />
                            </button>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setSelectedWish(wish)}
                              className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {activeTab === 'pending' && (
                              <button
                                onClick={() => handleApprove(wish.id)}
                                className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleReject(wish.id)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredWishes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200"
          >
            <MessageSquare className="w-16 h-16 mx-auto text-slate-200 mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No wishes found</h3>
            <p className="text-sm text-slate-300">
              {searchQuery ? 'Try a different search term' : `No ${activeTab} wishes yet`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Floating Bulk Action Bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-3xl"
          >
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-5 flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-pink-500 to-teal-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  {selectedIds.length} Selected
                </div>
                <span className="text-white/80 text-sm">Bulk Actions</span>
              </div>

              <div className="flex items-center gap-3">
                {activeTab === 'pending' && (
                  <button
                    onClick={() => handleBulkStatus('approved')}
                    className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-2xl font-semibold hover:bg-teal-500 hover:text-white transition-all shadow-lg"
                  >
                    <Check className="w-5 h-5" />
                    Approve All
                  </button>
                )}
                {activeTab === 'approved' && (
                  <button
                    onClick={() => handleBulkStatus('pending')}
                    className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-2xl font-semibold hover:bg-yellow-500 hover:text-white transition-all shadow-lg"
                  >
                    <EyeOff className="w-5 h-5" />
                    Unpublish All
                  </button>
                )}
                <button
                  onClick={handleBulkDelete}
                  className="p-3 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="w-px h-8 bg-white/10 mx-1" />
                <button
                  onClick={() => setSelectedIds([])}
                  className="p-3 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}