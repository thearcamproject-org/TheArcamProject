'use client';

import Navigation from '../components/common/Navigation';
import Contact from '../components/ui/Contact';
import Footer from '../components/ui/Footer';
import { motion } from 'framer-motion';
import { Spotlight } from '../components/ui/Spotlight';
import { Suspense } from 'react';

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen relative selection:bg-[#E7B366] selection:text-black">
      <Navigation />
      
      {/* Spotlight Animation */}
      <div className="absolute top-0 left-0 w-full h-[80vh] z-0 pointer-events-none overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#E7B366" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>
      
      {/* Page Header */}
      <section className="relative pt-32 pb-20 z-10">
        <div className="container-max px-4 md:px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase mb-8 block">Connect</span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              Get in <em className="text-[#E7B366] italic not-italic">Touch</em>
            </h1>
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Whether you have a specific project in mind or just want to explore the possibilities, we&apos;re here to help you architect your digital legacy.
            </p>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<div className="h-40 flex items-center justify-center text-[#E7B366] uppercase tracking-widest text-[10px]">Loading Interface...</div>}>
        <Contact />
      </Suspense>
      
      <Footer />
    </main>
  );
}
