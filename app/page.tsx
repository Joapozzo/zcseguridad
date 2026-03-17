import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { ConceptSection } from './components/sections/ConceptSection'
import { AppSection } from './components/sections/AppSection'
import { CapabilitiesSection } from './components/sections/CapabilitiesSection'
import { ProcessSection } from './components/sections/ProcessSection'
import { FeaturesBarSection } from './components/sections/FeaturesBarSection'
import { CTASection } from './components/sections/CTASection'

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex-1">
        <HeroSection />
        <ConceptSection />
        <AppSection />
        <FeaturesBarSection />
        <div className="w-full bg-gradient-to-b from-[#fafafa] via-[#f5f5f5] to-[#f0f0f0] section-light-block">
          <CapabilitiesSection />
          <ProcessSection />
        </div>
        <CTASection />
      </div>
      <Footer />
    </main>
  )
}
