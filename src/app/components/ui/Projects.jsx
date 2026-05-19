'use client';

import React from "react";
import { Carousel, Card } from "./AppleCardsCarousel";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS } from "@/app/lib/projects-data";

export default function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cards = PROJECTS.map((card, index) => (
    <Card 
      key={card.src} 
      card={{
        ...card,
        content: <ProjectContent title={card.title} description={card.description} image={card.src} />
      }} 
      index={index} 
    />
  ));

  return (
    <section ref={ref} id="work" className="relative min-h-screen flex flex-col justify-center py-10 md:py-16 bg-black overflow-hidden antialiased">
      <div className="w-full relative z-10">
        {/* Section Header - Fixed Mobile Centering */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="container-max mx-auto mb-8 md:mb-16 text-center px-6"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase">Selected Works</span>
            <div className="w-12 h-px bg-[#E7B366]/30" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tighter text-white leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
            The <em className="text-[#E7B366] italic">Portfolio</em>
          </h2>
          <p className="mt-6 text-sm md:text-base text-white/40 max-w-xl mx-auto font-light leading-relaxed">
            A curated selection of high-velocity digital ecosystems engineered for the world's most ambitious brands.
          </p>
        </motion.div>

        <div className="w-full relative overflow-x-hidden">
          <Carousel items={cards} />
        </div>
      </div>
    </section>
  );
}

const ProjectContent = ({ title, description, image }) => {
  return (
    <div className="bg-[#0A0A0A] p-8 md:p-14 rounded-3xl mb-4 border border-white/5">
      <p className="text-white/80 text-base md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
        <span className="font-bold text-[#E7B366] mb-4 block text-3xl md:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
          {title}
        </span>
        {description}
      </p>
      <div className="mt-12 relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
