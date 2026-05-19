/**
 * The Arcam Project - Premium Digital Agency Homepage
 * EST. 2026 | Timeless By Design
 */

import { Suspense } from 'react';
import Navigation from '@/app/components/common/Navigation';
import Hero from '@/app/components/ui/Hero';
import Projects from '@/app/components/ui/Projects';
import Services from '@/app/components/ui/Services';
import Process from '@/app/components/ui/Process';
import WhyChooseUs from '@/app/components/ui/WhyChooseUs';
import FinalCTA from '@/app/components/ui/FinalCTA';
import Footer from '@/app/components/ui/Footer';
import Marquee from './components/ui/Marquee';
import Contact from '@/app/components/ui/Contact';

export const dynamic = 'force-dynamic';

export default function Home() {
  const CAPABILITIES = ['Bespoke Engineering', 'Cinematic Motion', 'Elite UX Design', 'High-Velocity Performance', 'Strategic Architecture', 'AI Integration', 'Digital Legacy'];
  const VALUES = ['Uncompromising Quality', 'Surgical Precision', 'Avant-Garde Aesthetics', 'Timeless Innovation', 'High-Impact Outcomes'];

  return (
    <main className="overflow-x-hidden bg-black selection:bg-[#E7B366] selection:text-black min-h-screen">
      <Navigation />
      
      <Hero />
      
      <Marquee items={CAPABILITIES} speed={40} />
      
      <Projects />
      
      <Marquee items={VALUES} speed={50} reverse />
      
      <Services />
      
      <Process />
      
      <WhyChooseUs />
      
      <Suspense fallback={<div className="py-20 text-center text-[#E7B366] text-xs uppercase tracking-widest">Loading Contact...</div>}>
        <Contact />
      </Suspense>
      
      <FinalCTA />
      
      <Footer />
    </main>
  );
}
// Tree refresh
