'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Meteors } from './Meteors';
import Image from 'next/image';
import TiltCard from './TiltCard';
import { SERVICE_TIERS } from '@/app/lib/services-data';

import { ArrowRight, Layers } from 'lucide-react';

export default function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section ref={ref} id="services" className="relative py-12 md:py-32 bg-black overflow-hidden antialiased">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E7B366]/5 via-transparent to-transparent opacity-30" />
      
      <div className="w-full px-4 md:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-32 text-center"
        >
          <div className="flex flex-col items-center gap-4 mb-10">
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase">Offering Suite</span>
            <div className="w-12 h-px bg-[#E7B366]/30" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter text-white pb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Our <em className="text-[#E7B366] italic">Capabilities</em>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl mx-auto font-light leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Fusing avant-garde design with high-velocity engineering to build the future of digital luxury.
          </p>
        </motion.div>

        {/* Services Grid - Optimized for Mobile 2x2 Comparison */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView='visible' viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-2 sm:px-4 max-w-[90rem] mx-auto mb-20"
        >
          {SERVICE_TIERS.map((service, index) => {
            const shades = ['bg-[#060606]', 'bg-[#0A0A0A]', 'bg-[#080808]', 'bg-[#0C0C0C]'];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="w-full relative"
              >
                <TiltCard className="h-full">
                <div className={`relative shadow-2xl ${shades[index % 4]} border border-white/5 p-4 md:px-6 md:py-12 h-full overflow-hidden rounded-[2rem] md:rounded-[3rem] flex flex-col justify-start items-start hover:border-[#E7B366]/20 transition-colors duration-700 group backdrop-blur-3xl min-h-[280px] sm:min-h-[360px] md:min-h-[600px]`}>
                  {service.popular && (
                    <div className="absolute top-4 md:top-8 right-4 md:right-10">
                      <span className="px-1.5 py-0.5 md:px-4 md:py-1 rounded-full bg-[#E7B366] text-black text-[5px] sm:text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#E7B366]/20">Popular</span>
                    </div>
                  )}

                  <div className="h-10 w-10 md:h-16 md:w-16 rounded-xl md:rounded-[1.5rem] border flex items-center justify-center mb-4 md:mb-8 border-white/10 bg-white/[0.02] shadow-[0_0_30px_rgba(231,179,102,0.05)] group-hover:border-[#E7B366]/40 group-hover:bg-[#E7B366]/5 transition-all duration-700 overflow-hidden">
                    <service.icon 
                      size={20} 
                      className="text-white/30 group-hover:text-[#E7B366] transition-all duration-700" 
                    />
                  </div>
                  
                  <h3 className="font-medium text-[13px] sm:text-lg md:text-2xl lg:text-3xl text-white mb-0.5 md:mb-3 relative z-50 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
                    {service.title}
                  </h3>

                  <p className="font-semibold text-[7px] sm:text-[8px] md:text-[10px] text-[#E7B366] mb-2 md:mb-6 relative z-50 leading-relaxed uppercase tracking-[0.3em]">
                    {service.subtitle}
                  </p>

                  {service.description && (
                    <p className="text-[9px] sm:text-[10px] md:text-sm text-white/50 mb-3 md:mb-8 relative z-50 font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                      {service.description}
                    </p>
                  )}

                  <ul className="space-y-2 md:space-y-4 mb-8 md:mb-12 relative z-50 flex-grow w-full hidden md:block">
                    {service.features.slice(0, 4).map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 md:gap-4 text-white/70 text-[9px] md:text-sm font-light leading-snug group-hover:text-white transition-colors duration-500">
                        <div className="w-1 h-1 rounded-full bg-[#E7B366] mt-1.5 md:mt-2 flex-shrink-0" />
                        <span className="flex-1 line-clamp-1 md:line-clamp-none">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing & CTA Section */}
                  <div className="mt-auto w-full pt-4 md:pt-8 border-t border-white/5 relative z-50">
                    <div className="mb-3 md:mb-6">
                      <p className="text-[7px] sm:text-[8px] md:text-[10px] text-[#E7B366] uppercase tracking-[0.2em] font-semibold mb-1">Starting at</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-xl md:text-4xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>₹{service.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <motion.a
                      href={`/configure?tier=${service.id}`}
                      className="w-full group/btn relative py-2 md:py-5 rounded-md md:rounded-xl border border-[#E7B366]/20 bg-white/5 overflow-hidden transition-all duration-500 hover:border-[#E7B366]/40 hover:shadow-[0_0_20px_rgba(231,179,102,0.1)] flex items-center justify-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#E7B366] to-[#C89B55] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 text-white/80 group-hover:text-black font-semibold text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.4em] uppercase transition-all duration-500 text-center">
                        Acquire
                      </span>
                    </motion.a>
                  </div>

                  {/* Meteor effect */}
                  <Meteors number={12} />
                </div>
              </TiltCard>
              </motion.div>
            );
          })}

          {/* 4th Card in 2x2 Grid (Mobile Only) */}
          <motion.div
            variants={cardVariants}
            className="w-full relative md:hidden"
          >
            <TiltCard className="h-full">
              <a href="/configure" className="relative shadow-2xl bg-gradient-to-br from-[#060606] to-[#120F0A] border border-[#E7B366]/15 p-4 h-full overflow-hidden rounded-[2rem] flex flex-col justify-start items-start hover:border-[#E7B366]/40 transition-colors duration-700 group backdrop-blur-3xl min-h-[280px] sm:min-h-[360px]">
                {/* Arrow Icon in Top Right */}
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full border border-[#E7B366]/20 bg-[#E7B366]/5 flex items-center justify-center text-[#E7B366] group-hover:bg-[#E7B366] group-hover:text-black transition-all duration-500">
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>

                <div className="h-10 w-10 rounded-xl border flex items-center justify-center mb-4 border-[#E7B366]/25 bg-[#E7B366]/5 shadow-[0_0_30px_rgba(231,179,102,0.05)] group-hover:border-[#E7B366]/50 group-hover:bg-[#E7B366]/10 transition-all duration-700">
                  <Layers size={18} className="text-[#E7B366]/60 group-hover:text-[#E7B366] transition-all duration-700" />
                </div>

                <h3 className="font-medium text-[13px] sm:text-lg text-white mb-0.5 relative z-50 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
                  Explore Capabilities
                </h3>

                <p className="font-semibold text-[7px] sm:text-[8px] text-[#E7B366] mb-2 relative z-50 leading-relaxed uppercase tracking-[0.3em]">
                  A La Carte Options
                </p>

                <p className="text-[9px] sm:text-[10px] text-white/50 mb-4 relative z-50 font-light leading-relaxed line-clamp-3">
                  Design your customized blueprint. Select from our foundational tiers and enrich with premium enhancements like Growth Retainers, Managed Hosting, and Custom Animations.
                </p>

                <div className="mt-auto w-full pt-4 border-t border-white/5 relative z-50">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[7px] sm:text-[8px] text-white/40 uppercase tracking-[0.2em] font-bold">Custom Build</span>
                    <span className="text-[8px] sm:text-[9px] text-[#E7B366] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-500">
                      Configure <ArrowRight size={10} />
                    </span>
                  </div>
                </div>

                <Meteors number={12} />
              </a>
            </TiltCard>
          </motion.div>
        </motion.div>

        {/* Explore All Button */}
        <motion.div 
          initial="hidden"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex justify-center"
        >
          <motion.a
            href="/services"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-6 rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-[#E7B366] hover:border-[#E7B366]/30 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 text-[10px] font-bold tracking-[0.4em] uppercase">Explore All Capabilities</span>
            <div className="absolute inset-0 bg-[#E7B366]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
