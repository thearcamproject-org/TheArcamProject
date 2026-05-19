'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Award, TrendingUp, Layers, Zap, Handshake, Shield } from 'lucide-react';

const benefits = [
  {
    title: 'Craft over convenience',
    description: 'We take time to get things right. Speed is never a substitute for precision.',
    icon: Award,
  },
  {
    title: 'Restraint as a virtue',
    description: 'In a world of visual noise, we believe in the power of considered space, clean lines, and purposeful design.',
    icon: Layers,
  },
  {
    title: 'Strategy before aesthetics',
    description: 'Beautiful websites that do not convert are decoration. We build beauty that performs.',
    icon: TrendingUp,
  },
  {
    title: 'Long-term thinking',
    description: 'We are not interested in quick wins. We build foundations that support years of growth.',
    icon: Shield,
  },
  {
    title: 'Asset, not a cost',
    description: 'Most businesses treat their website as a line item. The right website generates leads and compounds in value.',
    icon: Handshake,
  },
  {
    title: 'Outlast trends',
    description: 'Considered design, clean architecture, and strategic intent produce work that endures. This is not nostalgia — it is craft.',
    icon: Zap,
  },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const benefitVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section ref={ref} className="relative py-20 md:py-24 bg-black overflow-hidden antialiased min-h-fit lg:min-h-screen flex flex-col justify-center">
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[#E7B366]/5 rounded-full blur-[160px] pointer-events-none opacity-30" />

      <div className="container-max relative z-10">
        {/* Section Header - Highly Compact */}
        <motion.div
          initial="hidden"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="flex flex-col items-center gap-4 mb-10">
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase">Core Philosophy</span>
            <div className="w-12 h-px bg-[#E7B366]/30" />
          </div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white" style={{ fontFamily: "var(--font-serif)" }}>
            The <em className="text-[#E7B366] italic">Arcam</em> Edge
          </h2>
        </motion.div>

        {/* High-Density Benefits Grid - Optimized for Mobile Comparison */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView='visible' viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={benefitVariants}
              className="group relative bg-black p-6 md:p-12 hover:bg-white/[0.02] transition-all duration-700 min-h-[160px] md:min-h-[260px] flex flex-col justify-center items-center text-center md:items-start md:text-left"
            >
              {/* Subtle Icon Background */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
                <benefit.icon 
                  size={24} 
                  strokeWidth={1} 
                  className="text-[#E7B366] md:size-[40px]" 
                />
              </div>

              <h3 className="font-medium text-lg md:text-2xl text-white mb-2 md:mb-4 tracking-tight group-hover:text-[#E7B366] transition-colors duration-700 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                {benefit.title}
              </h3>
              <p className="text-white/70 text-[9px] md:text-sm font-light leading-snug md:leading-relaxed group-hover:text-white transition-colors duration-500 max-w-[140px] md:max-w-[280px]">
                {benefit.description}
              </p>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E7B366]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-center"
        >
          <div className="w-1 h-12 bg-gradient-to-b from-[#E7B366]/40 to-transparent mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
