'use client'

import { motion } from 'framer-motion'
import { Gift, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function Registry() {
  const [copied, setCopied] = useState(false)

  const bankDetails = {
    accountName: 'Taibat & Oluwasegun Wedding',
    accountNumber: '1234567890',
    bankName: 'Your Bank Name',
    sortCode: '12-34-56',
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="registry" className="py-24 px-4 bg-gradient-to-b from-white to-teal-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Gift className="w-16 h-16 mx-auto text-teal-500 mb-6" />
          <h2 className="font-display text-5xl md:text-7xl mb-6 text-deep-black">
            Gift Registry
          </h2>
          <p className="font-elegant text-xl text-smoke italic">
            Your presence is the greatest gift, but if you wish to bless us
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border-t-4 border-todah-gradient"
        >
          <h3 className="font-display text-3xl text-center text-teal-600 mb-8">
            Bank Details
          </h3>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex justify-between items-center p-4 bg-teal-50 rounded-lg">
              <div>
                <p className="font-sans text-sm text-smoke mb-1">Account Name</p>
                <p className="font-sans font-semibold text-deep-black">{bankDetails.accountName}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.accountName)}
                className="p-2 hover:bg-teal-100 rounded transition-colors"
              >
                {copied ? <Check size={18} className="text-teal-600" /> : <Copy size={18} className="text-teal-600" />}
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-teal-50 rounded-lg">
              <div>
                <p className="font-sans text-sm text-smoke mb-1">Account Number</p>
                <p className="font-sans font-semibold text-deep-black">{bankDetails.accountNumber}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.accountNumber)}
                className="p-2 hover:bg-teal-100 rounded transition-colors"
              >
                {copied ? <Check size={18} className="text-teal-600" /> : <Copy size={18} className="text-teal-600" />}
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-teal-50 rounded-lg">
              <div>
                <p className="font-sans text-sm text-smoke mb-1">Bank Name</p>
                <p className="font-sans font-semibold text-deep-black">{bankDetails.bankName}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.bankName)}
                className="p-2 hover:bg-teal-100 rounded transition-colors"
              >
                {copied ? <Check size={18} className="text-teal-600" /> : <Copy size={18} className="text-teal-600" />}
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-teal-50 rounded-lg">
              <div>
                <p className="font-sans text-sm text-smoke mb-1">Sort Code</p>
                <p className="font-sans font-semibold text-deep-black">{bankDetails.sortCode}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.sortCode)}
                className="p-2 hover:bg-teal-100 rounded transition-colors"
              >
                {copied ? <Check size={18} className="text-teal-600" /> : <Copy size={18} className="text-teal-600" />}
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="font-elegant text-2xl italic text-onion-pink-600">
              Thank you for celebrating with us! 💝
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
