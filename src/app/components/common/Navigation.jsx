'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Client Portal', href: '/portal' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const headerRef = useRef(null);
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    lastPathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (mobileOpen) setMobileOpen(false);
    };

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sections = navItems.filter(item => item.href.includes('#')).map(item => item.href.split('#')[1]);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      // Force full reload on back/forward to ensure WebGL/Animations reset, but ignore hash changes
      if (window.location.pathname !== lastPathnameRef.current) {
        window.location.reload();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center items-center pointer-events-none pt-6 md:pt-8">
        <motion.header
          ref={headerRef}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative pointer-events-auto w-full flex justify-center"
        >
          <nav
            className={`flex items-center justify-between gap-4 md:gap-8 px-4 md:px-8 py-0 transition-all duration-500 ease-in-out border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-[90%] ${
              scrolled 
                ? 'rounded-full bg-black/60 backdrop-blur-2xl' 
                : 'rounded-[2rem] bg-white/[0.05] backdrop-blur-xl'
            }`}
          >
            {/* Logo */}
            <motion.a
              href="/#home"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 group"
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 overflow-hidden transition-all duration-300">
                <Image
                  src="/logo.webp"
                  alt="Arcam Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden lg:flex flex-col ml-1">
                <span className="text-lg md:text-xl font-light tracking-[0.4em] text-[#E7B366] leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                  ARCAM
                </span>
              </div>
            </motion.a>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    whileHover={{ scale: 1.05 }}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.a
              href={pathname === '/services' || pathname === '/configure' ? '/portal' : '/services'}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:flex items-center px-8 py-3.5 rounded-full bg-[#E7B366] text-black font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_10px_40px_rgba(231,179,102,0.3)] relative overflow-hidden group"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <span className="relative z-10">
                {pathname === '/services' || pathname === '/configure' ? 'Client Portal' : 'Start Project'}
              </span>
            </motion.a>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </nav>

          {/* Mobile Menu - Moved outside nav for perfect centering */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 right-0 mx-auto mt-4 w-[calc(100vw-3rem)] max-w-[340px] rounded-[2.5rem] bg-black/90 backdrop-blur-3xl border border-white/20 p-4 shadow-2xl z-[120]"
              >
                <div className="flex flex-col gap-2">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] transition-colors group"
                    >
                      <span className="text-sm font-semibold text-white group-hover:text-[#E7B366] tracking-[0.2em] uppercase transition-colors">{item.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>

    </>
  );
}
