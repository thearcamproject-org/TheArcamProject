'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spotlight } from './Spotlight';
import ColorBends from './ColorBends';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  const { ref: heroRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0, // Unmounts as soon as it fully leaves the screen
    rootMargin: '200px 0px 200px 0px', // Keep alive slightly off-screen
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="home" ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black antialiased">
      {/* Background Shader Effect */}
      <div className="absolute inset-0 z-0 opacity-70 [mask-image:linear-gradient(to_bottom,white_60%,transparent)]">
        {inView && (
          <ColorBends
          colors={["#FFF176", "#FFEE58", "#E7B366"]}
          rotation={66}
          speed={0.2}
          scale={0.7}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0}
          noise={0.15}
          parallax={0}
          iterations={1}
          intensity={2.0}
          bandWidth={6}
          transparent
          autoRotate={0}
          color="#e4d091"
        />
        )}
      </div>

      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-[0.03] pointer-events-none" />

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(231, 179, 102, 0.3)" // Warm Gold
      />
      
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute top-[20%] right-[10%] w-[70vw] h-[70vh] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E7B366]/5 via-purple-900/5 to-transparent blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[10%] w-[60vw] h-[60vh] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#E7B366]/5 to-transparent blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 container-max w-full pt-32 pb-20 flex flex-col items-center justify-center text-center min-h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto flex flex-col items-center"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-medium tracking-tighter mb-10 leading-[0.95] text-white drop-shadow-[0_10px_30px_rgba(231,179,102,0.15)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="block mb-2 font-light">Timeless</span>
            <span className="text-[#E7B366] italic">by design.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-3xl text-lg md:text-xl text-white/70 font-light tracking-wide mb-14 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Arcam Project builds digital presences that outlast trends — architecturally precise, visually refined, and engineered to grow with the businesses they represent.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <motion.a
              href="/services"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 rounded-2xl bg-[#E7B366] text-black font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:shadow-[0_20px_60px_rgba(231,179,102,0.3)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <span className="relative z-10">Start Project</span>
            </motion.a>
            <motion.a
              href="/work"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-bold text-xs tracking-[0.3em] uppercase hover:bg-white/10 transition-all duration-500 backdrop-blur-md hover:border-white/30"
            >
              Portfolio
            </motion.a>
          </motion.div>

        </motion.div>
        
      </div>

    </section>
  );
}
