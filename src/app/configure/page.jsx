'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_TIERS, ADDONS, getAddonPrice } from '@/app/lib/services-data';
import Navigation from '../components/common/Navigation';
import Footer from '../components/ui/Footer';
import { Check, Plus, Minus, ArrowRight, ShoppingCart, ShieldCheck, Info, X } from 'lucide-react';
import Image from 'next/image';
import { Spotlight } from '../components/ui/Spotlight';

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTierId = searchParams.get('tier') || 'tier-1';
  const initialAddonIds = searchParams.get('addons')?.split(',') || [];

  const [selectedTier, setSelectedTier] = useState(
    SERVICE_TIERS.find(t => t.id === initialTierId) || SERVICE_TIERS[0]
  );
  
  const initialAddons = initialAddonIds.map(id => ADDONS.find(a => a.id === id)).filter(Boolean);
  const [selectedAddons, setSelectedAddons] = useState(initialAddons);
  
  // State for details modals
  const [activeModalTier, setActiveModalTier] = useState(null);
  const [activeModalAddon, setActiveModalAddon] = useState(null);
  const alacarteRef = useRef(null);
  
  const [isAlacarteVisible, setIsAlacarteVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAlacarteVisible(entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight);
      },
      {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0,
      }
    );

    const currentRef = alacarteRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleScrollToAlacarte = () => {
    if (alacarteRef.current) {
      alacarteRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && alacarteRef.current) {
      setTimeout(() => {
        alacarteRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + getAddonPrice(addon, selectedTier.id), 0);
  const totalPrice = selectedTier.price + addonsTotal;

  const toggleAddon = (addon) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleFinalize = () => {
    const queryParams = new URLSearchParams();
    queryParams.set('tier', selectedTier.id);
    if (selectedAddons.length > 0) {
      const addonIds = selectedAddons.map(a => a.id).join(',');
      queryParams.set('addons', addonIds);
    }
    router.push(`/contact?${queryParams.toString()}`);
  };

  return (
    <>
      <div className="container-max px-4 md:px-10 pt-0 pb-36 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Base Tier Selection */}
          <div className="lg:col-span-7 space-y-10">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[9px] font-bold text-[#E7B366] tracking-[0.4em] uppercase">Step 01</span>
                <h2 className="text-3xl font-light text-white tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>Select Foundational Tier</h2>
              </div>
              
              <div className="space-y-6">
                {SERVICE_TIERS.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => handleSelectTier(tier)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectTier(tier);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className={`relative text-left rounded-[2rem] overflow-hidden transition-all duration-700 group h-[16rem] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E7B366]/50 ${
                        isSelected 
                          ? 'border border-[#E7B366]/50 shadow-[0_0_50px_rgba(231,179,102,0.15)] scale-[1.01]' 
                          : 'border border-white/5 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]'
                      }`}
                    >
                      <div className="absolute inset-0 bg-black">
                        <Image 
                          src={tier.image} 
                          alt={tier.title} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 740px"
                          className={`object-cover transition-all duration-1000 ${isSelected ? 'scale-110 opacity-55' : 'opacity-25 group-hover:opacity-40 grayscale group-hover:grayscale-0'}`} 
                        />
                      </div>
                      
                      {/* Overlay gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-700 ${isSelected ? 'from-black via-black/80 to-transparent' : 'from-black via-black/90 to-black/50'}`} />

                      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                        <div className="flex items-center justify-between mb-auto">
                          <div className={`p-3.5 rounded-2xl border transition-all duration-500 backdrop-blur-md ${
                            isSelected ? 'bg-[#E7B366]/20 text-[#E7B366] border-[#E7B366]/50' : 'bg-white/5 text-white/50 border-white/10 group-hover:text-white group-hover:bg-white/10'
                          }`}>
                            <tier.icon size={20} strokeWidth={1.5} />
                          </div>
                          
                          {isSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#E7B366] bg-[#E7B366]/10 p-1.5 rounded-full backdrop-blur-md border border-[#E7B366]/20">
                              <Check size={14} strokeWidth={3} />
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <h3 className={`text-xl font-medium mb-1 transition-colors duration-500 ${isSelected ? 'text-[#E7B366]' : 'text-white group-hover:text-[#E7B366]/80'}`}>{tier.title}</h3>
                            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold mb-2">{tier.subtitle}</p>
                            <p className="text-2xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>₹{tier.price.toLocaleString('en-IN')}</p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2 mb-0.5 max-w-[160px] sm:max-w-[220px]">
                            {/* Key features displayed above the Info button */}
                            <div className="flex flex-col gap-1 text-right mb-0.5">
                              {tier.features.slice(0, 4).map((feat, idx) => (
                                <span key={idx} className="text-[10px] sm:text-[11px] text-[#E7B366]/80 font-light truncate leading-none">
                                  {feat}
                                </span>
                              ))}
                            </div>
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalTier(tier);
                              }}
                              className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-[#E7B366] hover:border-[#E7B366]/50 hover:bg-[#E7B366]/10 backdrop-blur-md transition-all z-20 hover:scale-110"
                              aria-label="View details"
                            >
                              <Info size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: A La Carte Enhancements */}
          <div ref={alacarteRef} className="lg:col-span-5 space-y-10 mt-12 lg:mt-0">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[9px] font-bold text-[#E7B366] tracking-[0.4em] uppercase">Step 02</span>
                <h2 className="text-3xl font-light text-white tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>A La Carte</h2>
              </div>
              
              <div className="space-y-4">
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddons.find(a => a.id === addon.id);
                  const dynamicPrice = getAddonPrice(addon, selectedTier.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 flex items-center justify-between gap-4 relative overflow-hidden group cursor-pointer ${
                        addon.popular
                          ? isSelected
                            ? 'bg-[#E7B366]/[0.08] border-[#E7B366]/60 shadow-[0_0_30px_rgba(231,179,102,0.15)] scale-[1.01]'
                            : 'bg-[#E7B366]/[0.02] border-[#E7B366]/20 hover:border-[#E7B366]/40 hover:bg-[#E7B366]/[0.04]'
                          : isSelected 
                            ? 'bg-[#E7B366]/[0.03] border-[#E7B366]/30 shadow-[0_0_20px_rgba(231,179,102,0.05)]' 
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E7B366]/5 to-transparent pointer-events-none" />
                      )}

                      <div className="flex items-center gap-4 relative z-10 flex-grow">
                        <div className={`p-2.5 rounded-xl border transition-colors duration-500 flex-shrink-0 ${
                          isSelected ? 'bg-[#E7B366]/10 text-[#E7B366] border-[#E7B366]/30' : 'bg-white/5 text-white/30 border-white/5 group-hover:text-white/60'
                        }`}>
                          <addon.icon size={20} strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm font-medium text-white truncate">{addon.title}</h4>
                            {addon.popular && (
                              <span className="px-1.5 py-0.5 rounded-full bg-[#E7B366] text-black text-[6px] font-black uppercase tracking-wider flex-shrink-0">POP</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#E7B366] font-medium">
                              ₹{dynamicPrice.toLocaleString('en-IN')}{addon.isMonthly ? '/mo' : ''}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalAddon(addon);
                              }}
                              className="p-1 rounded-full text-white/30 hover:text-[#E7B366] hover:bg-white/5 transition-all"
                              title="View features"
                            >
                              <Info size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 relative z-10 flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                          isSelected ? 'bg-[#E7B366] border-[#E7B366] text-black scale-105' : 'bg-white/5 border-white/10 text-white/40 group-hover:bg-white/10 group-hover:text-white'
                        }`}>
                          {isSelected ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 border-t border-white/10 backdrop-blur-xl py-4 md:py-6 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <div className="container-max px-6 md:px-10 flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6 text-center md:text-left">
            <div>
              <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] font-bold mb-1">Active Configuration</p>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">{selectedTier.title}</span>
                <span className="text-white/40 text-xs font-light">({selectedTier.price.toLocaleString('en-IN')})</span>
              </div>
            </div>
            {selectedAddons.length > 0 && (
              <div className="h-px w-8 bg-white/10 hidden md:block self-center" />
            )}
            {selectedAddons.length > 0 && (
              <div>
                <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] font-bold mb-1">Enhancements</p>
                <p className="text-[#E7B366] text-xs font-medium">+{selectedAddons.length} selected</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 w-full md:w-auto">
            <div className="text-left">
              <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] font-bold mb-0.5">Total Investment</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[9px] text-[#E7B366] font-bold tracking-wider">INR</span>
              </div>
            </div>
            
            {isDesktop || isAlacarteVisible ? (
              <button 
                onClick={handleFinalize}
                className="px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-white text-black font-semibold text-[10px] tracking-[0.3em] uppercase hover:bg-[#E7B366] transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_30px_rgba(231,179,102,0.2)] flex items-center gap-2 group/btn animate-fade-in"
              >
                <span>Finalize<span className="hidden sm:inline"> Architecture</span></span>
                <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button 
                onClick={handleScrollToAlacarte}
                className="px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:text-black hover:bg-white font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2"
              >
                <span>Customize Add-ons</span>
                <ArrowRight size={12} className="rotate-90" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tier Details Modal */}
      <AnimatePresence>
        {activeModalTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24 pb-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setActiveModalTier(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden max-h-[85vh] flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E7B366]/5 to-transparent pointer-events-none" />
              
              <button 
                onClick={() => setActiveModalTier(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 p-3 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors z-30"
              >
                <X size={20} />
              </button>

              <div className="relative z-10 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <div className="flex items-center gap-6 mb-8">
                  <div className="p-5 rounded-2xl bg-[#E7B366]/10 text-[#E7B366] border border-[#E7B366]/20">
                    {activeModalTier.icon && (() => {
                      const Icon = activeModalTier.icon;
                      return <Icon size={32} strokeWidth={1.5} />;
                    })()}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.4em] uppercase block mb-2">{activeModalTier.subtitle}</span>
                    <h3 className="text-3xl md:text-4xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>{activeModalTier.title}</h3>
                  </div>
                </div>

                <p className="text-white/60 font-light leading-relaxed mb-10 text-lg">{activeModalTier.description}</p>
                
                <div className="mb-12 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                  <h4 className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold mb-6">Included Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                    {activeModalTier.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <div className="mt-1 p-1 rounded-full bg-[#E7B366]/10 text-[#E7B366]">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-white/80 text-sm font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <p className="text-[9px] text-[#E7B366] uppercase tracking-[0.3em] font-semibold mb-2">Starting Investment</p>
                    <p className="text-3xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>₹{activeModalTier.price.toLocaleString('en-IN')}</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setSelectedTier(activeModalTier);
                      setActiveModalTier(null);
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-[10px] tracking-[0.3em] uppercase hover:bg-[#E7B366] transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_30px_rgba(231,179,102,0.3)]"
                  >
                    Select This Tier
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Addon Details Modal */}
      <AnimatePresence>
        {activeModalAddon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24 pb-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setActiveModalAddon(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden max-h-[80vh] flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E7B366]/5 to-transparent pointer-events-none" />
              
              <button 
                onClick={() => setActiveModalAddon(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors z-30"
              >
                <X size={16} />
              </button>

              <div className="relative z-10 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-[#E7B366]/10 text-[#E7B366] border border-[#E7B366]/20">
                    {activeModalAddon.icon && (() => {
                      const Icon = activeModalAddon.icon;
                      return <Icon size={24} strokeWidth={1.5} />;
                    })()}
                  </div>
                  <div>
                    {activeModalAddon.subtitle && (
                      <span className="text-[8px] font-bold text-[#E7B366] tracking-[0.4em] uppercase block mb-1">
                        {activeModalAddon.subtitle}
                      </span>
                    )}
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                      {activeModalAddon.title}
                    </h3>
                  </div>
                </div>

                <p className="text-white/60 font-light leading-relaxed mb-6 text-sm">{activeModalAddon.description}</p>
                
                {activeModalAddon.features && (
                  <div className="mb-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mb-4">Features Included</h4>
                    <div className="space-y-3">
                      {activeModalAddon.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-2.5">
                          <div className="mt-1 p-0.5 rounded-full bg-[#E7B366]/10 text-[#E7B366]">
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span className="text-white/80 text-xs font-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModalAddon.outcome && (
                  <div className="mb-8 p-4 rounded-xl border border-[#E7B366]/10 bg-[#E7B366]/[0.02] text-xs font-light text-white/80 italic">
                    <span className="text-[#E7B366] font-medium not-italic block mb-1">Expected Outcome:</span>
                    &quot;{activeModalAddon.outcome}&quot;
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[8px] text-[#E7B366] uppercase tracking-[0.3em] font-semibold mb-1">Investment</p>
                    <p className="text-xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                      ₹{getAddonPrice(activeModalAddon, selectedTier.id).toLocaleString('en-IN')}{activeModalAddon.isMonthly ? '/mo' : ''}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      toggleAddon(activeModalAddon);
                      setActiveModalAddon(null);
                    }}
                    className="px-6 py-3 rounded-full bg-white text-black font-semibold text-[9px] tracking-[0.2em] uppercase hover:bg-[#E7B366] transition-all"
                  >
                    {selectedAddons.find(a => a.id === activeModalAddon.id) ? 'Deselect' : 'Select Enhancement'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ConfigurePage() {
  return (
    <main className="bg-black min-h-screen selection:bg-[#E7B366] selection:text-black relative">
      <Navigation />
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[80vh]">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#E7B366" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#E7B36605_0%,_transparent_70%)]" />
      </div>
      
      <section className="pt-24 md:pt-28 relative z-30">
        <div className="container-max px-4 md:px-10 text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[9px] font-bold text-[#E7B366] tracking-[0.6em] uppercase mb-3 block">Configurator</span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white" style={{ fontFamily: "var(--font-serif)" }}>
              Customize your <em className="text-[#E7B366] italic">System</em>
            </h1>
          </motion.div>
        </div>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-[#E7B366] uppercase tracking-[0.5em] text-[10px]">Loading Architecture...</div>}>
          <ConfiguratorContent />
        </Suspense>
      </section>

      <div className="pb-20 md:pb-32 relative z-10">
        <Footer />
      </div>
    </main>
  );
}
