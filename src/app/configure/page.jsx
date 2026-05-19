'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_TIERS, ADDONS } from '@/app/lib/services-data';
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
  const [totalPrice, setTotalPrice] = useState(selectedTier.price);
  
  // State for the tier details modal
  const [activeModalTier, setActiveModalTier] = useState(null);

  useEffect(() => {
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    setTotalPrice(selectedTier.price + addonsTotal);
  }, [selectedTier, selectedAddons]);

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
      <div className="container-max px-4 md:px-10 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left: Configuration Options */}
          <div className="lg:col-span-2 space-y-20">
            
            {/* Step 1: Base Tier Selection */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.4em] uppercase">Step 01</span>
                <h2 className="text-4xl font-light text-white tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>Select Foundational Tier</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICE_TIERS.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedTier(tier);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className={`relative text-left rounded-[2.5rem] overflow-hidden transition-all duration-700 group h-[22rem] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E7B366]/50 ${
                      isSelected 
                        ? 'border border-[#E7B366]/50 shadow-[0_0_50px_rgba(231,179,102,0.15)] scale-[1.02]' 
                        : 'border border-white/5 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]'
                    }`}
                  >
                    <div className="absolute inset-0 bg-black">
                      <Image 
                        src={tier.image} 
                        alt={tier.title} 
                        fill 
                        className={`object-cover transition-all duration-1000 ${isSelected ? 'scale-110 opacity-60' : 'opacity-30 group-hover:opacity-50 grayscale group-hover:grayscale-0'}`} 
                      />
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-700 ${isSelected ? 'from-black via-black/80 to-transparent' : 'from-black via-black/90 to-black/50'}`} />

                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                      <div className="flex items-center justify-between mb-auto">
                        <div className={`p-4 rounded-2xl border transition-all duration-500 backdrop-blur-md ${
                          isSelected ? 'bg-[#E7B366]/20 text-[#E7B366] border-[#E7B366]/50' : 'bg-white/5 text-white/50 border-white/10 group-hover:text-white group-hover:bg-white/10'
                        }`}>
                          <tier.icon size={24} strokeWidth={1.5} />
                        </div>
                        
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#E7B366] bg-[#E7B366]/10 p-2 rounded-full backdrop-blur-md border border-[#E7B366]/20">
                            <Check size={16} strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className={`text-2xl font-medium mb-1 transition-colors duration-500 ${isSelected ? 'text-[#E7B366]' : 'text-white group-hover:text-[#E7B366]/80'}`}>{tier.title}</h3>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-4">{tier.subtitle}</p>
                          <p className="text-4xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>₹{tier.price.toLocaleString('en-IN')}</p>
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalTier(tier);
                          }}
                          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-[#E7B366] hover:border-[#E7B366]/50 hover:bg-[#E7B366]/10 backdrop-blur-md transition-all z-20 hover:scale-110 mb-1"
                          aria-label="View details"
                        >
                          <Info size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </section>

            {/* Step 2: A La Carte Add-ons */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.4em] uppercase">Step 02</span>
                <h2 className="text-4xl font-light text-white tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>A La Carte Enhancements</h2>
              </div>
              
              <div className="space-y-4">
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddons.find(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full text-left p-6 md:p-8 rounded-[2rem] border transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group ${
                        isSelected 
                          ? 'bg-[#E7B366]/[0.03] border-[#E7B366]/30 shadow-[0_0_30px_rgba(231,179,102,0.05)]' 
                          : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      {isSelected && <div className="absolute inset-0 bg-gradient-to-r from-[#E7B366]/5 to-transparent" />}

                      <div className="flex items-center gap-6 relative z-10">
                        <div className={`p-4 rounded-xl border transition-colors duration-500 ${
                          isSelected ? 'bg-[#E7B366]/10 text-[#E7B366] border-[#E7B366]/30' : 'bg-white/5 text-white/30 border-white/5 group-hover:text-white/60'
                        }`}>
                          <addon.icon size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">{addon.title}</h4>
                          <p className="text-sm text-white/40 font-light max-w-md leading-relaxed">{addon.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-8 relative z-10 border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                        <div className="text-left md:text-right">
                          <p className={`text-xl font-medium transition-colors ${isSelected ? 'text-[#E7B366]' : 'text-white'}`}>+₹{addon.price.toLocaleString('en-IN')}</p>
                          {addon.isMonthly && <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold mt-1">Monthly Recurring</p>}
                        </div>
                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 shadow-lg ${
                          isSelected ? 'bg-[#E7B366] border-[#E7B366] text-black scale-110' : 'bg-white/5 border-white/10 text-white/40 group-hover:bg-white/10 group-hover:text-white'
                        }`}>
                          {isSelected ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right: Summary / Cart */}
          <div className="lg:sticky lg:top-32 relative z-20">
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#0A0A0A]/80 border border-white/10 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E7B366]/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-2 rounded-full bg-[#E7B366]/10 text-[#E7B366]">
                    <ShoppingCart size={18} />
                  </div>
                  <h3 className="text-[11px] text-[#E7B366] font-bold tracking-[0.3em] uppercase">Selection Architecture</h3>
                </div>

                <div className="space-y-6 mb-10 pb-10 border-b border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mb-2">Base Tier</p>
                      <h4 className="text-white font-medium text-lg">{selectedTier.title}</h4>
                    </div>
                    <p className="text-white font-medium">₹{selectedTier.price.toLocaleString('en-IN')}</p>
                  </div>

                  <AnimatePresence>
                    {selectedAddons.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-4 border-t border-white/5"
                      >
                        <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">Enhancements</p>
                        {selectedAddons.map(addon => (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            key={addon.id} 
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-white/60 font-light">{addon.title}</span>
                            <span className="text-white/80">₹{addon.price.toLocaleString('en-IN')}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-10">
                  <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">Total Investment</p>
                  <div className="flex items-baseline gap-2">
                    <motion.span 
                      key={totalPrice}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl font-light text-white" 
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </motion.span>
                    <span className="text-[#E7B366] text-[10px] uppercase tracking-widest font-medium">INR</span>
                  </div>
                </div>

                <button 
                  onClick={handleFinalize}
                  className="w-full group/btn relative py-6 rounded-2xl bg-white text-black font-bold text-[10px] tracking-[0.4em] uppercase transition-all duration-500 hover:bg-[#E7B366] hover:shadow-[0_10px_40px_rgba(231,179,102,0.3)] flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">Finalize Architecture</span>
                  <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
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
      
      <section className="pt-32 relative z-10">
        <div className="container-max px-4 md:px-10 text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase mb-8 block">Configurator</span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              Customize your <em className="text-[#E7B366] italic not-italic">System</em>
            </h1>
          </motion.div>
        </div>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-[#E7B366] uppercase tracking-[0.5em] text-[10px]">Loading Architecture...</div>}>
          <ConfiguratorContent />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
