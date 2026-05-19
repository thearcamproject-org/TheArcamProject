'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl"
      >
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2 className="text-2xl font-light tracking-tight text-white mb-3 font-serif">System Interruption</h2>
        <p className="text-sm text-white/50 mb-8 font-light leading-relaxed">
          We encountered an unexpected error while processing your request. Our engineering team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          Try Again
        </button>
      </motion.div>
    </main>
  );
}
