'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hyperspeed from './Hyperspeed';

export default function FinalCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-20 md:py-32">
      {/* Cinematic Hyperspeed Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_10%,_black_80%)]" />
        <div className="w-full h-full transform scale-125 opacity-70 -translate-y-[15%]">
          <Hyperspeed
            effectOptions={{
              onSpeedUp: () => { },
              onSlowDown: () => { },
              distortion: 'turbulentDistortion',
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 4,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2,
              carLightsFade: 0.8,
              totalSideLightSticks: 8,
              lightPairsPerRoadWay: 5,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [10, 15],
              movingCloserSpeed: [-20, -30],
              carLightsLength: [400 * 0.03, 400 * 0.2],
              carLightsRadius: [0.05, 0.14],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0xE7B366,
                brokenLines: 0xE7B366,
                leftCars: [0xE7B366, 0xD4AF37, 0xFBF2C0],
                rightCars: [0xE7B366, 0xB38728, 0xC5A028],
                sticks: 0xE7B366
              }
            }}
          />
        </div>
      </div>

      <div className="container-max relative z-20 text-center px-4">
        <motion.div
          initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-extralight tracking-tighter text-white mb-12 leading-[0.85] uppercase" style={{ fontFamily: "var(--font-serif)" }}>
            Build Your<br />
            <em className="text-[#E7B366] italic not-italic">Legacy</em>
          </h2>

          <p className="text-lg md:text-xl text-white/30 font-light tracking-wide mb-16 max-w-2xl mx-auto leading-relaxed">
            Join the elite circle of brands redefined by Arcam&apos;s high-velocity digital engineering. Your future begins with a single move.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <motion.a
              href="/services"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 rounded-2xl bg-white text-black font-semibold text-xs tracking-[0.3em] uppercase hover:bg-[#E7B366] transition-all duration-700 shadow-[0_20px_80px_rgba(255,255,255,0.15)] hover:shadow-[0_20px_80px_rgba(231,179,102,0.4)] flex items-center justify-center"
            >
              Start Project
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 font-semibold text-xs tracking-[0.3em] uppercase hover:bg-[#E7B366]/5 hover:border-[#E7B366]/40 hover:text-[#E7B366] transition-all duration-700 shadow-none hover:shadow-[0_0_40px_rgba(231,179,102,0.1)] flex items-center justify-center"
            >
              Contact Advisory
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade Gradient for Footer Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
