'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const LinkedInIcon = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GitHubIcon = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-4.51-2-7-2" />
  </svg>
);

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: LinkedInIcon },
    { name: 'Twitter', url: '#', icon: TwitterIcon },
    { name: 'GitHub', url: '#', icon: GitHubIcon },
  ];

  const navLinks = [
    { name: 'Our Capabilities', url: '#services' },
    { name: 'Process', url: '#process' },
    { name: 'Case Studies', url: '#work' },
    { name: 'Contact', url: '#contact' },
  ];

  const companyLinks = [
    { name: 'About Us', url: '/about' },
    { name: 'Terms & Conditions', url: '#' },
    { name: 'Privacy Policy', url: '#' },
  ];

  return (
    <footer
      ref={ref}
      className="relative border-t border-white/5 bg-black pt-20 pb-6 md:pt-32 md:pb-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#E7B366]/10 via-black to-black opacity-30 pointer-events-none" />
      
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-20">
          {/* Left: Brand */}
          <motion.div
            initial="hidden"
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-5 lg:col-span-4"
          >
            <div className="flex items-center gap-4 mb-8 group cursor-pointer">
              <div className="relative w-16 h-16 brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-500">
                <Image src="/logo.png" alt="Arcam Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-light tracking-[0.4em] text-[#E7B366] leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                  ARCAM
                </span>
                <span className="text-[9px] font-bold text-[#E7B366] uppercase tracking-[0.4em] mt-2">Bespoke Web Development</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed font-light tracking-wide mb-10 max-w-sm">
              Bespoke digital presences designed to endure. Timeless by design.
            </p>
            <div className="flex gap-5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#E7B366] transition-all duration-300 bg-white/[0.02]"
                    title={social.name}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-3 lg:col-span-2"
          >
            <h4 className="text-[10px] font-bold text-[#E7B366] mb-8 uppercase tracking-[0.3em]">Directory</h4>
            <div className="space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="block text-sm text-white/70 hover:text-white transition-all duration-300 font-light"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            initial="hidden"
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-3 lg:col-span-2"
          >
            <h4 className="text-[10px] font-bold text-[#E7B366] mb-8 uppercase tracking-[0.3em]">Agency</h4>
            <div className="space-y-4">
              {companyLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="block text-sm text-white/70 hover:text-white transition-all duration-300 font-light"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-5 lg:col-span-4"
          >
            <h4 className="text-[10px] font-bold text-[#E7B366] mb-8 uppercase tracking-[0.3em]">General Inquiries</h4>
            <p className="text-xl font-light text-white mb-4 hover:text-[#E7B366] transition-all duration-300 cursor-pointer">
              hello@arcamproject.com
            </p>
            <p className="text-sm text-white/60 font-light tracking-wide leading-relaxed">
              Based in India.<br />
              Remote-first, serving clients globally.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
              © 2025 Arcam Project. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
