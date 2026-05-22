'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/ui/Footer';
import FinalCTA from '../components/ui/FinalCTA';
import dynamic from 'next/dynamic';
const ColorBends = dynamic(() => import('../components/ui/ColorBends'), { ssr: false });
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutPage() {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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
    <main className="overflow-x-hidden bg-black selection:bg-[#E7B366] selection:text-black min-h-screen">
      <Navigation />
      
      {/* Fixed Static Background */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 opacity-70 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] pointer-events-none">
        {isMounted && !isMobile && (
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
        {isMounted && isMobile && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#E7B366]/20 via-[#E7B366]/5 to-transparent blur-3xl opacity-60 animate-pulse" />
        )}
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-48 pb-20 md:pt-64 md:pb-32 flex flex-col items-center justify-center text-center min-h-[80vh]">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#E7B366]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <motion.div 
          className="container-max relative z-10 w-full px-4"
          style={{ y: contentY, opacity }}
        >
          <motion.div
            variants={containerVariants}
            initial="visible"
            whileInView="visible" viewport={{ once: true }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase">Our Story</span>
              <div className="w-12 h-px bg-[#E7B366]/30 mx-auto mt-4" />
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-10 leading-[0.9] text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              We <em className="text-[#E7B366] italic">compose.</em>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-lg md:text-2xl text-white/70 font-light tracking-wide leading-relaxed px-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Arcam Project is a bespoke web development studio operating at the intersection of design craft and digital strategy.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Overview & Stats Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 relative z-10 bg-gradient-to-b from-transparent via-black to-black">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-white mb-8" style={{ fontFamily: "var(--font-serif)" }}>
                Architecturally Precise. <br/>
                <em className="text-[#E7B366] italic">Visually Refined.</em>
              </h2>
              <div className="space-y-6 text-white/70 font-light leading-relaxed text-lg">
                <p>
                  We build websites that are architecturally precise, visually refined, and strategically engineered to grow alongside the businesses they represent. 
                </p>
                <p>
                  The market is saturated with fast, cheap, forgettable websites. Arcam Project exists for founders and businesses who understand that quality is not a premium — it is a prerequisite. We work with clients who see their website as a long-term investment in their brand and their growth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden"
            >
              <div className="bg-black p-8 md:p-10 flex flex-col justify-center">
                <span className="text-[10px] text-[#E7B366] font-bold tracking-[0.3em] uppercase mb-2">Founded</span>
                <span className="text-3xl text-white font-light" style={{ fontFamily: "var(--font-serif)" }}>2026</span>
              </div>
              <div className="bg-black p-8 md:p-10 flex flex-col justify-center">
                <span className="text-[10px] text-[#E7B366] font-bold tracking-[0.3em] uppercase mb-2">HQ</span>
                <span className="text-xl text-white font-light" style={{ fontFamily: "var(--font-serif)" }}>India <span className="text-sm text-white/40 block mt-1">(Remote-first)</span></span>
              </div>
              <div className="bg-black p-8 md:p-10 flex flex-col justify-center col-span-2">
                <span className="text-[10px] text-[#E7B366] font-bold tracking-[0.3em] uppercase mb-2">Specialisation</span>
                <span className="text-xl text-white font-light leading-snug" style={{ fontFamily: "var(--font-serif)" }}>Custom Web Development, Conversion UI/UX, SEO Architecture</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-32 relative bg-black border-t border-white/5 z-10">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase mb-6 block">Our Mission</span>
              <p className="text-3xl md:text-4xl font-light leading-snug text-white" style={{ fontFamily: "var(--font-serif)" }}>
                To craft considered digital experiences — deliberate in structure, elegant in form, and built with the long view in mind.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase mb-6 block">Our Vision</span>
              <p className="text-3xl md:text-4xl font-light leading-snug text-white" style={{ fontFamily: "var(--font-serif)" }}>
                A world where every ambitious business has a digital presence worthy of its ambition.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
