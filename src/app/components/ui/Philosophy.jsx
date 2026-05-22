'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import TiltCard from './TiltCard';

const principles = [
  {
    title: 'Innovation',
    description: 'Cutting-edge technology and forward-thinking solutions',
  },
  {
    title: 'Excellence',
    description: 'Uncompromising quality in every detail and interaction',
  },
  {
    title: 'Simplicity',
    description: 'Elegant interfaces that are intuitive and powerful',
  },
  {
    title: 'Integrity',
    description: 'Transparent partnerships built on trust and results',
  },
  {
    title: 'Strategy',
    description: 'Data-driven decisions aligned with business goals',
  },
  {
    title: 'Impact',
    description: 'Measurable outcomes that drive real business value',
  },
];

export default function Philosophy() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section ref={ref} id="solutions" className="relative py-20 md:py-32 bg-black overflow-hidden antialiased">
      <div className="container-max relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-32 text-center"
        >
          <div className="flex flex-col items-center gap-4 mb-10">
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase">Core Ethos</span>
            <div className="w-12 h-px bg-[#E7B366]/30" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter text-white pb-6" style={{ fontFamily: "'Cinzel', serif" }}>
            Our <em className="text-[#E7B366] italic">Philosophy</em>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/30 max-w-xl mx-auto font-light leading-relaxed">
            Exceptional digital experiences are architected on a foundation of strategy, precision, and avant-garde craftsmanship.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView='visible' viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
        >
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <TiltCard className="h-full">
                <div className="relative shadow-2xl bg-white/[0.01] border border-white/5 px-8 py-12 h-full overflow-hidden rounded-[3rem] flex flex-col justify-start items-start hover:border-[#E7B366]/20 transition-all duration-700 group backdrop-blur-3xl">
                  
                  <div className="h-14 w-14 rounded-[1.25rem] border flex items-center justify-center mb-8 border-white/10 bg-white/[0.02] group-hover:border-[#E7B366]/40 group-hover:bg-[#E7B366]/5 transition-all duration-700 overflow-hidden p-3">
                    <div className="relative w-full h-full brightness-0 invert opacity-30 group-hover:opacity-100 transition-all duration-700">
                      <Image
                        src="/logo.webp"
                        alt="Arcam Logo"
                        fill
                        sizes="32px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h3 className="font-medium text-2xl text-white mb-3 relative z-50 tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                    {principle.title}
                  </h3>
                  <p className="text-white/30 text-sm font-light leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                    {principle.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
