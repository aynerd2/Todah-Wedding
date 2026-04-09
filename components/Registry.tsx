'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Copy, Check, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

interface AccountDetails {
  label: string;
  bank: string;
  number: string;
  name: string;
  sortCode?: string;
}

const accounts: Record<'NGN' | 'UK', AccountDetails> = {
  NGN: {
    label: "Nigeria",
    bank: "First Bank PLC",
    number: "3136510391",
    name: "Ganiyu Oluwasegun David",
  },
  UK: {
    label: "United Kingdom",
    bank: "Barclays Bank",
    number: "00309966",
    sortCode: "20-26-78",
    name: "Taibat Alli",
  }
}

const AMAZON_REGISTRY_URL = "https://www.amazon.co.uk/hz/wishlist/ls/112T1QULFVCEF?ref_=wl_share"

export default function Registry() {
  const [activeTab, setActiveTab] = useState<keyof typeof accounts>('NGN')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const CopyButton = ({ text, id }: { text: string, id: string }) => (
    <button
      onClick={() => copyToClipboard(text, id)}
      className="p-2 hover:bg-teal-100 rounded-full transition-colors group"
      title="Copy to clipboard"
    >
      {copiedField === id ? (
        <Check size={18} className="text-green-600" />
      ) : (
        <Copy size={18} className="text-teal-400 group-hover:text-teal-600" />
      )}
    </button>
  )

  const currentAccount = accounts[activeTab]

  return (
    <section id="registry" className="py-24 px-4 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 rounded-full bg-teal-50 mb-6">
            <Gift className="w-10 h-10 text-teal-600" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-slate-800 italic">
            Registry
          </h2>
          <p className="font-elegant text-xl text-slate-600 italic max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift we could ask for. However, if you wish to honor us with a gift, a contribution towards our new home would be sincerely appreciated.
          </p>
        </motion.div>

        {/* Amazon Registry Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 bg-white rounded-[40px] shadow-xl border border-amber-100 overflow-hidden"
        >
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-full bg-amber-50 shrink-0">
                <ShoppingBag className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-amber-500 font-black mb-1">
                  Amazon Wishlist
                </p>
                <h3 className="font-sans font-bold text-slate-800 text-lg">
                  Shop our Amazon Registry
                </h3>
                <p className="font-sans text-slate-500 text-sm mt-0.5">
                  Browse and send gifts directly from our curated wishlist.
                </p>
              </div>
            </div>
            <a
              href={AMAZON_REGISTRY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-block px-8 py-3.5 rounded-full text-sm font-black uppercase tracking-widest bg-amber-400 text-white hover:bg-amber-500 shadow-md hover:shadow-amber-200 transition-all"
            >
              View Wishlist
            </a>
          </div>
        </motion.div>

        {/* Bank Transfer Card */}
        <div className="bg-white rounded-[40px] shadow-xl border border-teal-50 overflow-hidden">

          {/* Tab Switcher */}
          <div className="flex border-b border-teal-50">
            <button
              onClick={() => setActiveTab('NGN')}
              className={`flex-1 py-6 font-sans text-xs uppercase tracking-[0.3em] transition-all ${activeTab === 'NGN' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-teal-600'}`}
            >
              Nigeria (NGN)
            </button>
            <button
              onClick={() => setActiveTab('UK')}
              className={`flex-1 py-6 font-sans text-xs uppercase tracking-[0.3em] transition-all ${activeTab === 'UK' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-teal-600'}`}
            >
              UK (GBP)
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === 'NGN' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === 'NGN' ? 20 : -20 }}
                className="max-w-md mx-auto space-y-4"
              >
                {/* Account Name */}
                <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Account Name</p>
                    <p className="font-sans font-medium text-slate-800">{currentAccount.name}</p>
                  </div>
                  <CopyButton text={currentAccount.name} id="name" />
                </div>

                {/* Bank Name */}
                <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Bank</p>
                    <p className="font-sans font-medium text-slate-800">{currentAccount.bank}</p>
                  </div>
                </div>

                {/* Account Number */}
                <div className="flex justify-between items-center p-5 bg-teal-50/50 rounded-2xl border border-teal-100">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-teal-600 mb-1">Account Number</p>
                    <p className="font-display text-2xl text-slate-800 tracking-tight">{currentAccount.number}</p>
                  </div>
                  <CopyButton text={currentAccount.number} id="number" />
                </div>

                {/* Sort Code (UK only) */}
                {currentAccount.sortCode && (
                  <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Sort Code</p>
                      <p className="font-sans font-medium text-slate-800">{currentAccount.sortCode}</p>
                    </div>
                    <CopyButton text={currentAccount.sortCode} id="sort" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="text-center mt-12">
              <p className="font-elegant text-2xl italic text-teal-800">
                Thank you for celebrating our love! 💝
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}