'use client';

import Navigation from '../components/common/Navigation';
import Footer from '../components/ui/Footer';
import Process from '../components/ui/Process';
import WhyChooseUs from '../components/ui/WhyChooseUs';
import { motion } from 'framer-motion';
import { SERVICE_TIERS, ADDONS } from '@/app/lib/services-data';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Spotlight } from '../components/ui/Spotlight';
import { Meteors } from '../components/ui/Meteors';

export default function ServicesPage() {
  return (
    <main className="bg-black min-h-screen selection:bg-[#E7B366] selection:text-black">
      <Navigation />
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden flex items-center min-h-[70vh]">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#E7B366" />
        <div className="absolute inset-0 w-full h-full">
          <Meteors number={20} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black z-0 pointer-events-none" />
        
        <div className="container-max px-4 md:px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase mb-8 block">The Offering Suite</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white mb-8 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Digital <br className="hidden md:block" />
              <em className="text-[#E7B366] italic">Architectures</em>
            </h1>
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
              We do not build standard websites. We engineer high-velocity digital ecosystems designed to dominate markets and drive revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="#tiers"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.02] text-white font-semibold text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500"
              >
                Explore Tiers <ArrowRight size={14} />
              </motion.a>
              <motion.a
                href="/roi"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E7B366] text-black font-semibold text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-[0_10px_30px_rgba(231,179,102,0.25)]"
              >
                ROI Calculator <ArrowRight size={14} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. The Foundation: Tier Deep Dives */}
      <section id="tiers" className="py-20">
        <div className="container-max px-4 md:px-10 space-y-32">
          {SERVICE_TIERS.map((tier, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={tier.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Visual Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2"
                >
                  <div className="aspect-[4/3] rounded-[3rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E7B366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay" />
                    
                    <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                      <Image
                        src={tier.image}
                        alt={tier.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>

                    {/* Faded Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="relative w-32 h-32 rounded-full border border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:bg-[#E7B366]/10 group-hover:border-[#E7B366]/30 group-hover:scale-110 transition-all duration-700">
                        <tier.icon size={56} strokeWidth={1} className="text-white/70 group-hover:text-[#E7B366] transition-colors duration-700" />
                      </div>
                    </div>

                    {tier.popular && (
                      <div className="absolute top-8 left-8 z-30">
                        <span className="px-4 py-1.5 rounded-full bg-[#E7B366] text-black text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">Most Popular</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2"
                >
                  <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.4em] uppercase mb-4 block">{tier.subtitle}</span>
                  <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>{tier.title}</h2>
                  <p className="text-white/60 font-light leading-relaxed mb-8 text-lg">{tier.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                    {tier.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <div className="mt-1 p-1 rounded-full bg-[#E7B366]/10 text-[#E7B366]">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-white/80 text-sm font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                      <p className="text-[9px] text-[#E7B366] uppercase tracking-[0.3em] font-semibold mb-1">Starting Investment</p>
                      <p className="text-3xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>₹{tier.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <Link href={`/configure?tier=${tier.id}`} className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-[10px] tracking-[0.3em] uppercase hover:bg-[#E7B366] transition-all duration-500 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_30px_rgba(231,179,102,0.3)]">
                        Configure Tier
                      </button>
                    </Link>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 3. The Enhancements: A La Carte Showcase */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_#E7B3660A_0%,_transparent_60%)]" />
        
        <div className="container-max px-4 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase mb-6 block">A La Carte</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white" style={{ fontFamily: "var(--font-serif)" }}>
              Premium Enhancements
            </h2>
            <p className="mt-6 text-white/50 max-w-xl mx-auto font-light leading-relaxed">
              Tailor your foundational architecture with specialized modules engineered for maximum performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADDONS.map((addon, index) => (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-[2rem] border transition-all duration-500 flex flex-col h-full relative overflow-hidden group ${
                  addon.popular
                    ? 'bg-[#E7B366]/[0.02] border-[#E7B366]/20 hover:border-[#E7B366]/40 hover:bg-[#E7B366]/[0.04]'
                    : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10'
                }`}
              >
                {addon.popular && (
                  <div className="absolute top-4 right-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E7B366] text-black text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] shadow-2xl">Popular</span>
                  </div>
                )}
                
                <div className="p-4 rounded-2xl bg-white/5 w-max mb-6 text-white/40">
                  <addon.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-1">{addon.title}</h3>
                {addon.subtitle && <p className="text-[10px] text-[#E7B366] tracking-widest uppercase mb-3 font-bold">{addon.subtitle}</p>}
                
                <p className="text-sm text-white/50 font-light mb-4 leading-relaxed">{addon.description}</p>
                
                {addon.features && (
                  <ul className="space-y-1.5 mb-4">
                    {addon.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 text-white/70 text-xs font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E7B366] mt-1.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {addon.outcome && (
                  <p className="text-xs text-[#E7B366]/80 font-light italic mb-8 mt-auto">
                    Outcome: {addon.outcome}
                  </p>
                )}
                
                <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
                  <p className="text-xl text-white font-medium" style={{ fontFamily: "var(--font-serif)" }}>
                    {addon.id === 'addon-hosting' 
                      ? '₹6,000 - ₹20,000' 
                      : `+₹${addon.price.toLocaleString('en-IN')}`
                    }
                  </p>
                  {addon.isMonthly && <span className="text-[8px] text-[#E7B366] uppercase tracking-[0.2em] font-bold px-2 py-1 bg-[#E7B366]/10 rounded-full">Monthly</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Integration of Process & Why Choose Us */}
      <Process />
      <WhyChooseUs />

      {/* 5. Final CTA specific to Configuration */}
      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="container-max px-4 md:px-10 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-light text-white mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              Ready to Architect <br /> Your <em className="text-[#E7B366] italic">Legacy?</em>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <Link href="/configure">
                <button className="px-12 py-5 rounded-full bg-[#E7B366] text-black font-semibold text-[10px] tracking-[0.3em] uppercase hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(231,179,102,0.3)]">
                  Open Configurator
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-12 py-5 rounded-full border border-white/10 bg-transparent text-white font-semibold text-[10px] tracking-[0.3em] uppercase hover:bg-white/5 transition-all duration-500">
                  Talk to an Architect
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
// Refresh trigger
