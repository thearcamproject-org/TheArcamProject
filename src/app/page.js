/**
 * The Arcam Project - Premium Digital Agency Homepage
 * EST. 2026 | Timeless By Design
 */

import dynamic from 'next/dynamic';
import Navigation from '@/app/components/common/Navigation';
import Hero from '@/app/components/ui/Hero';
import Marquee from './components/ui/Marquee';

// Dynamically load below-the-fold components
const Projects = dynamic(() => import('@/app/components/ui/Projects'));
const Services = dynamic(() => import('@/app/components/ui/Services'));
const Process = dynamic(() => import('@/app/components/ui/Process'));
const ROI = dynamic(() => import('@/app/components/ui/ROI'));
const WhyChooseUs = dynamic(() => import('@/app/components/ui/WhyChooseUs'));
const Contact = dynamic(() => import('@/app/components/ui/Contact'));
const FinalCTA = dynamic(() => import('@/app/components/ui/FinalCTA'));
const Footer = dynamic(() => import('@/app/components/ui/Footer'));

export default function Home() {
  const CAPABILITIES = ['Bespoke Engineering', 'Cinematic Motion', 'Elite UX Design', 'High-Velocity Performance', 'Strategic Architecture', 'AI Integration', 'Digital Legacy'];
  const VALUES = ['Uncompromising Quality', 'Surgical Precision', 'Avant-Garde Aesthetics', 'Timeless Innovation', 'High-Impact Outcomes'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'The Arcam Project',
    image: 'https://thearcamproject.in/logo.png',
    description: 'Premium digital agency crafting world-class websites, bespoke engineering, and elite brand experiences.',
    url: 'https://thearcamproject.in',
    telephone: '',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://github.com/imharry18',
    ]
  };

  return (
    <main className="overflow-x-hidden bg-black selection:bg-[#E7B366] selection:text-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navigation />
      
      <Hero />
      
      <Marquee items={CAPABILITIES} speed={40} />
      
      <Projects />
      
      <Marquee items={VALUES} speed={50} reverse />
      
      <Services />
      
      <Process />
      <WhyChooseUs />
      <ROI />
      
      <Contact />
      
      <FinalCTA />
      
      <Footer />
    </main>
  );
}
