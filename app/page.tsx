import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import WeddingDetails from '@/components/WeddingDetails'
import GuestWishes from '@/components/GuestWishes'
import Registry from '@/components/Registry'
import Footer from '@/components/Footer'
import OurStory2 from '@/components/OurStory2'
import TravelAndVenue from '@/components/TravelAndVenue'
import WishesGallery from '@/components/WishesGallery'


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <OurStory2/>
      <WeddingDetails />
      <Registry />
      <WishesGallery/>
      <GuestWishes />
      <TravelAndVenue/>
      <Footer />
    </main>
  )
}
