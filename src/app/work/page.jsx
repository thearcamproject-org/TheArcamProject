'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/common/Navigation';
import Footer from '@/app/components/ui/Footer';
import Projects from '@/app/components/ui/Projects';
import { Spotlight } from '@/app/components/ui/Spotlight';
import { ArrowRight, Key, X, Loader2 } from 'lucide-react';

export default function WorkPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectKey, setProjectKey] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleKeySubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');

    try {
      const response = await fetch('/api/portal/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectKey, password })
      });

      const data = await response.json();

      if (response.ok && data.user) {
        // In a production app, the server would set an HttpOnly cookie here.
        // For this implementation, we still pass the ID to fetch details on the portal.
        router.push(`/portal?id=${data.user.id}`);
      } else {
        setError(data.error || 'Invalid Project Key. Please try again.');
        setIsAuthenticating(false);
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      setIsAuthenticating(false);
    }
  };

  return (
    <main className="bg-black min-h-screen selection:bg-[#E7B366] selection:text-black relative">
      <Navigation />
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[80vh]">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#E7B366" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#E7B36605_0%,_transparent_70%)]" />
      </div>

      <section className="pt-40 md:pt-48 pb-20 relative z-10">
        <div className="container-max px-4 md:px-10 text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase mb-8 block">Our Portfolio</span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-10" style={{ fontFamily: "var(--font-serif)" }}>
              The <em className="text-[#E7B366] italic not-italic">Archive</em>
            </h1>
            
            <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Explore our curation of high-velocity digital ecosystems. Each project is a testament to architectural precision and visual excellence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href="/services"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#E7B366] text-black font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-500 hover:shadow-[0_20px_60px_rgba(231,179,102,0.3)] flex items-center justify-center gap-3"
              >
                <span>Create Project</span>
                <ArrowRight size={14} />
              </motion.a>
              
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-white/10 transition-all duration-500 backdrop-blur-md hover:border-white/30 flex items-center justify-center gap-3"
              >
                <span>See your work</span>
                <Key size={14} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Client Portal Access Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => !isAuthenticating && setIsModalOpen(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E7B366]/5 to-transparent pointer-events-none" />
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isAuthenticating}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  <X size={16} />
                </button>

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto bg-[#E7B366]/10 rounded-full flex items-center justify-center mb-6 border border-[#E7B366]/20">
                    <Key className="text-[#E7B366]" size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-light text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>Client Portal Access</h3>
                  <p className="text-sm text-white/50 font-light mb-8">Enter your Project Key and portal password to access your dashboard.</p>

                  <form onSubmit={handleKeySubmit} className="space-y-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        value={projectKey}
                        onChange={(e) => setProjectKey(e.target.value)}
                        placeholder="Project Key (e.g. ARCAM-1A2B)"
                        disabled={isAuthenticating}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-center text-white placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/40 transition-all duration-300 tracking-widest font-mono"
                        required
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Portal Password"
                        disabled={isAuthenticating}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-center text-white placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/40 transition-all duration-300"
                      />
                    </div>
                    
                    <AnimatePresence>
                      {error && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs font-medium"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <button 
                      type="submit"
                      disabled={isAuthenticating || !projectKey}
                      className="w-full py-4 rounded-2xl bg-[#E7B366] text-black font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-500 hover:shadow-[0_10px_30px_rgba(231,179,102,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                    >
                      {isAuthenticating ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <span>Access Portal</span>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Reuse the Projects component which already has the gallery logic */}
        <div id="work">
          <Projects />
        </div>
      </section>

      <Footer />
    </main>
  );
}
