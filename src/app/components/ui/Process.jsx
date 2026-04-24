'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Immersion into your brand DNA and vision.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Architecting a precision technology roadmap.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Crafting cinematic, high-fidelity interfaces.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'Engineering robust, high-performance ecosystems.',
  },
  {
    number: '05',
    title: 'Deploy',
    description: 'Precision launch and recursive optimization.',
  },
];

export default function Process() {
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
    <section ref={ref} id="process" className="relative py-12 md:py-24 bg-black overflow-hidden antialiased min-h-fit lg:min-h-screen flex flex-col justify-center">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#E7B366]/30 to-transparent" />
      </div>

      <div className="container-max relative z-10">
        {/* Section Header - Compact */}
        <motion.div
          initial="hidden"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 text-center"
        >
          <div className="flex flex-col items-center gap-4 mb-10">
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase">Execution Protocol</span>
            <div className="w-12 h-px bg-[#E7B366]/30" />
          </div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white" style={{ fontFamily: "var(--font-serif)" }}>
            The <em className="text-[#E7B366] italic">Blueprint</em>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl mx-auto font-light leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Our work begins with intention and ends with architecture. We compose, we do not produce templates.
          </p>
        </motion.div>

        {/* Process Steps - Optimized for Mobile Single-Screen View */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView='visible' viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/5 border-y border-white/5"
        >
          {processSteps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group relative bg-black p-5 md:p-10 hover:bg-white/[0.02] transition-all duration-700 min-h-[100px] md:min-h-[320px] flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0"
            >
              {/* Vertical accent on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#E7B366] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex-shrink-0 md:mb-12">
                <span className="text-3xl md:text-5xl font-light text-[#E7B366]/20 group-hover:text-[#E7B366] transition-all duration-700" style={{ fontFamily: "var(--font-serif)" }}>
                  {step.number}
                </span>
              </div>

              <div className="flex-grow md:mt-auto">
                <h3 className="text-lg md:text-2xl font-medium text-white mb-1 md:mb-4 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-700" style={{ fontFamily: "var(--font-serif)" }}>
                  {step.title}
                </h3>
                <p className="text-[11px] md:text-sm text-white/30 group-hover:text-white/60 transition-colors duration-700 leading-tight md:leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Connecting line for desktop */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-[#E7B366]/10 z-20 group-hover:bg-[#E7B366]/30 transition-colors" />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 md:mt-16 text-center"
        >
          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.5em]">Engineered for Velocity</p>
        </motion.div>
      </div>
    </section>
  );
}
