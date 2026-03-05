import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import WeddingDetails from '@/components/WeddingDetails'
import GuestWishes from '@/components/GuestWishes'
import Registry from '@/components/Registry'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <OurStory />
      <WeddingDetails />
      <GuestWishes />
      <Registry />
      <Footer />
    </main>
  )
}
