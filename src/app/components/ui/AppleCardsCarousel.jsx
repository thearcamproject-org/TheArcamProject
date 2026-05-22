'use client';

import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll, checkScrollability]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // py-32 md:py-64
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition - carouselRef.current.clientWidth / 2,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div className="flex justify-center md:justify-end gap-3 mb-6 md:mb-2 px-4 md:mr-10">
          <button
            className="relative z-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-[#E7B366] hover:border-[#E7B366] group transition-all duration-500 shadow-xl"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-black transition-colors"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            className="relative z-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-[#E7B366] hover:border-[#E7B366] group transition-all duration-500 shadow-xl"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-black transition-colors"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div className="relative">
          {/* Edge Fades */}
          <div 
            className={`absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-black to-transparent z-[20] pointer-events-none transition-opacity duration-500 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} 
          />
          <div 
            className={`absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-black to-transparent z-[20] pointer-events-none transition-opacity duration-500 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} 
          />

          <div
            className="flex w-full overflow-x-scroll overscroll-x-contain py-4 md:py-8 scroll-smooth [scrollbar-width:none]"
            ref={carouselRef}
            onScroll={checkScrollability}
          >
            <div className="flex flex-row justify-start gap-6 pl-4 md:pl-20">
              {items.map((item, index) => (
                <motion.div
                  initial="hidden"
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * index, ease: 'easeOut' } }}
                  key={'card' + index}
                  className="rounded-3xl"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [onCardClose, index]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, handleClose]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-[80] overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/95 backdrop-blur-3xl h-full w-full fixed inset-0 cursor-pointer"
              onClick={handleClose}
            />
            <motion.div
              initial="hidden"
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-6xl mx-auto bg-[#0A0A0A] h-fit z-[90] mt-24 md:mt-32 mb-10 p-6 md:p-16 rounded-3xl font-sans relative border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <button
                className="sticky top-0 h-10 w-10 right-0 ml-auto bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E7B366] group/close transition-all duration-300 z-[100]"
                onClick={handleClose}
              >
                <X className="h-6 w-6 text-white group-hover/close:text-black" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.category}` : undefined}
                className="text-base font-medium text-[#E7B366] tracking-widest uppercase mb-4"
              >
                {card.category}
              </motion.p>
              <motion.h2
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-white mt-4"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {card.title}
              </motion.h2>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={handleOpen}
        layoutId={layout ? `card-${card.title}` : undefined}
        className="rounded-3xl bg-neutral-900 h-[22rem] w-72 md:h-[28rem] md:w-[42rem] overflow-hidden flex flex-col items-start justify-start relative z-10 border border-white/5 group shadow-2xl transition-all duration-500 text-left cursor-pointer focus:outline-none w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent z-30 pointer-events-none group-hover:from-black/90 group-hover:via-black/50 transition-all duration-700" />
        <div className="relative z-40 p-6 md:p-10 h-full w-full flex flex-col backdrop-blur-none group-hover:backdrop-blur-[2px] transition-all duration-700">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-[#E7B366] text-[10px] md:text-xs font-bold font-sans text-left tracking-[0.4em] uppercase mb-3 drop-shadow-md"
          >
            {card.category}
          </motion.p>
          <motion.h2
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-2xl md:text-5xl font-light max-w-3xl text-left [text-wrap:balance] leading-[1.1] group-hover:text-[#E7B366] transition-colors duration-500 drop-shadow-2xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {card.title}
          </motion.h2>
          <div className="mt-auto flex items-end justify-between w-full">
             <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-[#E7B366] group-hover:border-[#E7B366] transition-all duration-500 shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-black"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
             </div>
             {card.website && (
               <span className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase group-hover:text-white/80 transition-colors drop-shadow-md">
                 {card.website}
               </span>
             )}
          </div>
        </div>
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute inset-0 z-10 transition-transform duration-1000 group-hover:scale-105"
        />
      </motion.button>
    </>
  );
};
