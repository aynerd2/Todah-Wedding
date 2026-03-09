'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation, Info, Hotel } from 'lucide-react'

export default function TravelAndVenue() {
  const churchAddress = "Living Stones Baptist Church, 1798 Catherine St, Plymouth PL1 2AD";
  
  // This link opens the user's Map App (Google/Apple) for GPS navigation
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchAddress)}`;
  
  // This is the Standard Embed URL (No API Key Required)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.8565159155!2d-4.148152523447954!3d50.36940387157644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486c9349633e654b%3A0x6b77209930f772!2sLiving%20Stones%20Baptist%20Church!5e0!3m2!1sen!2suk!4v1709560000000!5m2!1sen!2suk";

  return (
    <section id="travel" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs uppercase tracking-[0.5em] text-teal-600 mb-4 block">The Destination</span>
          <h2 className="font-display text-5xl md:text-7xl text-slate-800 italic mb-6">Venue & Travel</h2>
          <p className="font-elegant text-xl text-slate-600 italic max-w-2xl mx-auto">
            Our ceremony will take place in the heart of Plymouth. We’ve highlighted the location and nearby stays for your convenience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          
          {/* INFO COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6 flex flex-col justify-center"
          >
            <div className="p-8 bg-teal-50/50 rounded-[40px] border border-teal-100 shadow-sm">
              <MapPin className="text-teal-600 w-8 h-8 mb-4" />
              <h3 className="font-display text-3xl text-slate-800 mb-2">The Church</h3>
              <p className="font-sans text-slate-700 leading-relaxed mb-8">
                Living Stones Baptist Church<br />
                1798 Catherine Street<br />
                Plymouth, PL1 2AD
              </p>
              
              <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full font-sans text-[10px] uppercase tracking-widest font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/10"
              >
                <Navigation size={14} /> Open in Maps
              </a>
            </div>

            <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm">
              <div className="flex gap-4 items-start">
                <Hotel className="text-pink-500 w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-slate-800 mb-2 uppercase text-[10px] tracking-widest">Nearby Hotels</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Most hotels are located 5-10 minutes away toward the city center. You can see them marked with <strong>bed icons</strong> on the interactive map.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* MAP COLUMN */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative min-h-[450px] rounded-[50px] overflow-hidden border-8 border-white shadow-2xl bg-slate-100"
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}