'use client';

import React from "react";
import { Carousel, Card } from "./AppleCardsCarousel";
import Image from "next/image";
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
        content: (
          <ProjectContent 
            title={card.title} 
            description={card.description} 
            image={card.src} 
            url={card.url} 
            website={card.website} 
          />
        )
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
            A curated selection of high-velocity digital ecosystems engineered for the world&apos;s most ambitious brands.
          </p>
        </motion.div>

        <div className="w-full relative overflow-x-hidden">
          <Carousel items={cards} />
        </div>
      </div>
    </section>
  );
}

const ProjectContent = ({ title, description, image, url, website }) => {
  return (
    <div className="bg-[#0A0A0A] p-6 md:p-12 rounded-3xl mb-4 border border-white/5 flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col gap-6">
        <p className="text-white/80 text-base md:text-2xl font-light max-w-3xl leading-relaxed">
          <span className="font-bold text-[#E7B366] mb-4 block text-3xl md:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
            {title}
          </span>
          {description}
        </p>

        {url && (
          <div className="flex justify-start">
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-[#E7B366] text-black font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-500 hover:shadow-[0_15px_45px_rgba(231,179,102,0.25)] flex items-center gap-2 group/btn cursor-pointer"
            >
              <span>Visit Website</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transform transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </motion.a>
          </div>
        )}
      </div>

      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>
    </div>
  );
};
