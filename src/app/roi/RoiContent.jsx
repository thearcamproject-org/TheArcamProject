'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import Footer from '../components/ui/Footer';
import { SERVICE_TIERS } from '../lib/services-data';
import { TrendingUp, ArrowRight, DollarSign, Users, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { Spotlight } from '../components/ui/Spotlight';
import { Meteors } from '../components/ui/Meteors';

export default function RoiContent() {
  const [selectedTier, setSelectedTier] = useState('tier-2');
  const [tractionStage, setTractionStage] = useState('early');
  const [visitors, setVisitors] = useState(500);
  const [conversionRate, setConversionRate] = useState(5);
  const [dealValue, setDealValue] = useState(5500);
  const [closeRate, setCloseRate] = useState(20);
  const [showResults, setShowResults] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const resultsRef = useRef(null);

  // Normalize inputs to prevent NaN or crashes
  const numVisitors = Math.max(0, parseInt(visitors) || 0);
  const numConvRate = Math.max(0, Math.min(100, parseFloat(conversionRate) || 0));
  const numDealValue = Math.max(0, parseInt(dealValue) || 0);
  const numCloseRate = Math.max(0, Math.min(100, parseFloat(closeRate) || 0));

  // Find active tier
  const activeTier = SERVICE_TIERS.find(t => t.id === selectedTier) || SERVICE_TIERS[1];
  const investment = activeTier.price;

  // ─── ARCAM-DEFINED CONSTANTS ──────────────────────────────────────────────
  // Traffic uplift % table: tier × traction stage
  const UPLIFT_TABLE = {
    'tier-1': { 'pre-launch': 120, 'early': 90, 'growing': 50, 'established': 30 },
    'tier-2': { 'pre-launch': 200, 'early': 150, 'growing': 80, 'established': 50 },
    'tier-3': { 'pre-launch': 350, 'early': 250, 'growing': 130, 'established': 80 },
  };

  // CVR boost (additive — applied on top of user's CVR)
  const CVR_BOOST = { 'tier-1': 0.25, 'tier-2': 0.55, 'tier-3': 0.90 };

  const trafficUpliftPercent = UPLIFT_TABLE[selectedTier]?.[tractionStage] ?? 0;
  const cvrBoost = CVR_BOOST[selectedTier] ?? 0;

  // ─── BASELINE (before Arcam) ────────────────────────────────────────────
  const leadsBase   = numVisitors * (numConvRate / 100);
  const clientsBase = leadsBase   * (numCloseRate / 100);
  const revBase     = clientsBase * numDealValue;

  // ─── AFTER ARCAM ────────────────────────────────────────────────────────
  const visitorsNew = numVisitors * (1 + trafficUpliftPercent / 100);
  const cvrNew      = (numConvRate / 100) * (1 + cvrBoost);          // as a decimal
  const leadsNew    = visitorsNew * cvrNew;
  const clientsNew  = leadsNew * (numCloseRate / 100);               // close rate unchanged
  const revNew      = clientsNew * numDealValue;

  // ─── DELTAS ─────────────────────────────────────────────────────────────
  const deltaRevPerMonth = revNew - revBase;
  const net12            = (deltaRevPerMonth * 12) - investment;
  const roi12Month       = investment > 0 ? (net12 / investment) * 100 : 0;

  // ─── BREAK-EVEN ─────────────────────────────────────────────────────────
  const breakEvenMonths = deltaRevPerMonth > 0 ? investment / deltaRevPerMonth : 0;

  // ─── ADDITIONAL (display) ───────────────────────────────────────────────
  const extraVisitors = visitorsNew - numVisitors;
  const extraLeads    = leadsNew    - leadsBase;
  const extraClients  = clientsNew  - clientsBase;

  // Aliases kept for JSX compatibility
  const leadsBefore    = leadsBase;
  const clientsBefore  = clientsBase;
  const revenueBefore  = revBase;
  const leadsAfter     = leadsNew;
  const clientsAfter   = clientsNew;
  const revenueAfter   = revNew;
  const visitorsAfter  = visitorsNew;
  const monthlyUplift  = deltaRevPerMonth;
  const net12MonthReturn = net12;
  const additionalVisitors = Math.round(extraVisitors);
  const additionalLeads    = Math.round(extraLeads);
  const additionalClients  = Math.round(extraClients);

  // Custom spinner increment/decrement handlers
  const handleIncrement = (type) => {
    if (type === 'visitors') {
      setVisitors(prev => {
        const val = parseInt(prev) || 0;
        return val + 100;
      });
    } else if (type === 'conversionRate') {
      setConversionRate(prev => {
        const val = parseFloat(prev) || 0;
        return parseFloat(Math.min(100, val + 0.5).toFixed(1));
      });
    } else if (type === 'dealValue') {
      setDealValue(prev => {
        const val = parseInt(prev) || 0;
        return val + 500;
      });
    } else if (type === 'closeRate') {
      setCloseRate(prev => {
        const val = parseFloat(prev) || 0;
        return parseFloat(Math.min(100, val + 1).toFixed(1));
      });
    }
  };

  const handleDecrement = (type) => {
    if (type === 'visitors') {
      setVisitors(prev => {
        const val = parseInt(prev) || 0;
        return Math.max(0, val - 100);
      });
    } else if (type === 'conversionRate') {
      setConversionRate(prev => {
        const val = parseFloat(prev) || 0;
        return Math.max(0, parseFloat((val - 0.5).toFixed(1)));
      });
    } else if (type === 'dealValue') {
      setDealValue(prev => {
        const val = parseInt(prev) || 0;
        return Math.max(0, val - 500);
      });
    } else if (type === 'closeRate') {
      setCloseRate(prev => {
        const val = parseFloat(prev) || 0;
        return Math.max(0, parseFloat((val - 1).toFixed(1)));
      });
    }
  };

  // Indian currency formatting
  const formatCurrencyIndian = (num, hasSign = false) => {
    const sign = num < 0 ? '-' : (hasSign && num > 0 ? '+' : '');
    const absNum = Math.round(Math.abs(num));
    const str = absNum.toString();
    if (str.length <= 3) {
      return `${sign}₹${str}`;
    }
    let lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    return `${sign}₹${res}`;
  };

  // Compact formatting (e.g. ₹28K, ₹1.1L)
  const formatCompact = (num, hasPlus = false) => {
    const prefix = hasPlus && num > 0 ? '+' : '';
    if (num === 0) return '₹0';
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    
    if (absNum >= 100000) {
      const lakhs = absNum / 100000;
      return `${prefix}${sign}₹${lakhs.toFixed(1).replace(/\.0$/, '')}L`;
    } else if (absNum >= 1000) {
      const thousands = Math.round(absNum / 1000);
      return `${prefix}${sign}₹${thousands}K`;
    }
    return `${prefix}${sign}₹${Math.round(absNum)}`;
  };

  // Handle Calculate trigger
  const handleCalculate = (e) => {
    e.preventDefault();
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Set default visitors depending on traction stage to help user
  const handleTractionChange = (stage) => {
    setTractionStage(stage);
    if (stage === 'pre-launch') setVisitors(0);
    else if (stage === 'early') setVisitors(500);
    else if (stage === 'growing') setVisitors(1500);
    else if (stage === 'established') setVisitors(5000);
  };

  // Generate bar chart heights
  const chartData = Array.from({ length: 12 }, (_, i) => {
    const cumulativeGain = monthlyUplift * (i + 1);
    return {
      month: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i],
      gain: Math.max(0, cumulativeGain),
      investment: i === 0 ? investment : 0
    };
  });

  const maxChartValue = Math.max(
    ...chartData.map(d => d.gain),
    investment
  ) || 1;

  return (
    <main className="relative overflow-hidden bg-black selection:bg-[#E7B366] selection:text-black min-h-screen font-sans antialiased text-white">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 overflow-hidden">
        <Spotlight className="-top-60 left-0 md:left-60 md:-top-36" fill="#E7B366" />
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <Meteors number={25} />
      </div>
      <Navigation />

      {/* Header Space */}
      <div className="pt-28 md:pt-36 pb-12 text-center container-max relative z-10 border-b border-white/5">
        <span className="text-[10px] md:text-xs font-bold text-[#E7B366] tracking-[0.6em] uppercase mb-4 block">Return on Investment</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6" style={{ fontFamily: "var(--font-serif)" }}>
          What will your website <em className="text-[#E7B366] italic">earn you?</em>
        </h1>
        <p className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
          Select your service tier, enter your numbers — we&apos;ll calculate your expected return.
        </p>
      </div>

      <div className="container-max py-12 md:py-20 relative z-10">
        <form onSubmit={handleCalculate} className="space-y-12 md:space-y-16 max-w-4xl mx-auto">
          
          {/* 01 — Choose Your Tier */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#E7B366] tracking-widest uppercase">01 — Choose your tier</span>
              <div className="h-px bg-white/10 flex-grow" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICE_TIERS.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[140px] md:min-h-[160px] ${
                      isSelected 
                        ? 'border-[#E7B366] bg-[#E7B366]/[0.06] shadow-[0_0_30px_rgba(231,179,102,0.12)]' 
                        : 'border-white/15 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.05]'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#E7B366] text-black text-[9px] font-bold tracking-widest uppercase">
                        Most Popular
                      </span>
                    )}
                    <div>
                      <span className="text-[9px] font-bold text-white/60 tracking-widest uppercase block mb-1">
                        {tier.subtitle}
                      </span>
                      <h3 className="text-lg md:text-xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
                        {tier.title}
                      </h3>
                    </div>
                    <div className="mt-4">
                      <span className="text-xs text-white/70 block">starting at</span>
                      <span className="text-xl md:text-2xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                        ₹{tier.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 02 — Your Current Traction */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#E7B366] tracking-widest uppercase">02 — Your current traction</span>
              <div className="h-px bg-white/10 flex-grow" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'pre-launch', label: 'Pre-launch', desc: 'No site yet' },
                { id: 'early', label: 'Early', desc: '< 500 / mo' },
                { id: 'growing', label: 'Growing', desc: '500–5K / mo' },
                { id: 'established', label: 'Established', desc: '5K+ / mo' }
              ].map((stage) => {
                const isSelected = tractionStage === stage.id;
                return (
                  <div
                    key={stage.id}
                    onClick={() => handleTractionChange(stage.id)}
                    className={`p-4 md:p-6 rounded-2xl border transition-all duration-500 cursor-pointer text-center flex flex-col justify-center items-center min-h-[90px] md:min-h-[110px] ${
                      isSelected 
                        ? 'border-[#E7B366] bg-[#E7B366]/[0.06] shadow-[0_0_25px_rgba(231,179,102,0.1)]' 
                        : 'border-white/15 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-sm font-medium text-white tracking-tight">{stage.label}</span>
                    <span className="text-[10px] md:text-xs text-white/60 font-light mt-1">{stage.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 03 — Your Numbers */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#E7B366] tracking-widest uppercase">03 — Your numbers</span>
              <div className="h-px bg-white/10 flex-grow" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              
              {/* Monthly Visitors */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#E7B366] tracking-widest uppercase block ml-1">Monthly visitors</label>
                <div className="relative">
                  <input
                    type="number"
                    value={visitors}
                    onChange={(e) => setVisitors(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/15 rounded-2xl pl-6 pr-16 py-4 text-white focus:outline-none focus:border-[#E7B366] focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(231,179,102,0.1)] transition-all text-base"
                    placeholder="500"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center border-l border-white/15 pl-3 pr-1 gap-1">
                    <button
                      type="button"
                      onClick={() => handleIncrement('visitors')}
                      className="text-white/50 hover:text-[#E7B366] transition-colors p-0.5 focus:outline-none"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecrement('visitors')}
                      className="text-white/50 hover:text-[#E7B366] transition-colors p-0.5 focus:outline-none"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                <span className="text-[11px] text-white/60 block ml-1 font-light">Current or expected monthly traffic</span>
              </div>

              {/* Lead Conversion Rate */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#E7B366] tracking-widest uppercase block ml-1">Lead conversion rate</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/15 rounded-2xl pl-6 pr-24 py-4 text-white focus:outline-none focus:border-[#E7B366] focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(231,179,102,0.1)] transition-all text-base"
                    placeholder="5"
                  />
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center border-l border-white/15 pl-3 pr-1 gap-1">
                    <button
                      type="button"
                      onClick={() => handleIncrement('conversionRate')}
                      className="text-white/50 hover:text-[#E7B366] transition-colors p-0.5 focus:outline-none"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecrement('conversionRate')}
                      className="text-white/50 hover:text-[#E7B366] transition-colors p-0.5 focus:outline-none"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 font-medium">%</span>
                </div>
                <span className="text-[11px] text-white/60 block ml-1 font-light">% of visitors who become leads</span>
              </div>

              {/* Average Deal Value */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#E7B366] tracking-widest uppercase block ml-1">Average deal value</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 font-medium">₹</span>
                  <input
                    type="number"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/15 rounded-2xl pl-12 pr-16 py-4 text-white focus:outline-none focus:border-[#E7B366] focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(231,179,102,0.1)] transition-all text-base"
                    placeholder="5500"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center border-l border-white/15 pl-3 pr-1 gap-1">
                    <button
                      type="button"
                      onClick={() => handleIncrement('dealValue')}
                      className="text-white/50 hover:text-[#E7B366] transition-colors p-0.5 focus:outline-none"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecrement('dealValue')}
                      className="text-white/50 hover:text-[#E7B366] transition-colors p-0.5 focus:outline-none"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                <span className="text-[11px] text-white/60 block ml-1 font-light">Revenue per closed deal</span>
              </div>

              {/* Lead-to-Close Rate */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#E7B366] tracking-widest uppercase block ml-1">Lead-to-close rate</label>
                <div className="relative">
                  <input
                    type="number"
                    value={closeRate}
                    onChange={(e) => setCloseRate(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/15 rounded-2xl pl-6 pr-24 py-4 text-white focus:outline-none focus:border-[#E7B366] focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(231,179,102,0.1)] transition-all text-base"
                    placeholder="20"
                  />
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center border-l border-white/15 pl-3 pr-1 gap-1">
                    <button
                      type="button"
                      onClick={() => handleIncrement('closeRate')}
                      className="text-white/50 hover:text-[#E7B366] transition-colors p-0.5 focus:outline-none"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecrement('closeRate')}
                      className="text-white/50 hover:text-[#E7B366] transition-colors p-0.5 focus:outline-none"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 font-medium">%</span>
                </div>
                <span className="text-[11px] text-white/60 block ml-1 font-light">% of leads you convert to clients</span>
              </div>

            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="mx-auto w-full md:w-auto px-12 py-5 rounded-xl border border-white/20 bg-white/5 hover:bg-[#E7B366] hover:text-black font-semibold tracking-wider transition-all duration-500 text-sm hover:shadow-[0_10px_40px_rgba(231,179,102,0.15)] flex items-center justify-center gap-2 group"
            >
              Calculate my ROI
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </form>

        {/* Results Section */}
        <div ref={resultsRef} className="scroll-mt-28 max-w-4xl mx-auto pt-16 md:pt-24">
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12 md:space-y-16"
              >
                
                {/* Visual Separator Line */}
                <div className="h-px bg-white/10 w-full" />

                {/* Arcam Uplift Block */}
                <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/15 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.3em] uppercase block">
                      Arcam-Projected Traffic Uplift
                    </span>
                    <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter" style={{ fontFamily: "var(--font-serif)" }}>
                      +{trafficUpliftPercent}%
                    </h2>
                    <span className="text-xs text-[#E7B366] font-medium tracking-wider uppercase block">
                      {activeTier.title} · {tractionStage.replace('-', ' ')} stage
                    </span>
                  </div>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-md">
                    SEO-optimised architecture, lead funnels, and conversion-first design compound into sustained traffic and lead quality improvements.
                  </p>
                </div>

                {/* 4 Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  
                  {/* Stats Card 1 */}
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 hover:border-white/30 hover:from-white/[0.06] transition-all duration-300 flex flex-col justify-between min-h-[120px] md:min-h-[140px] shadow-[0_8px_25px_rgba(0,0,0,0.4)] group">
                    <span className="text-[10px] font-bold text-white/65 tracking-wider uppercase group-hover:text-white transition-colors">Revenue Before</span>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-2xl md:text-3xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                        {formatCompact(revenueBefore)}
                      </span>
                      <span className="text-[10px] text-white/50 tracking-wider font-bold">/mo</span>
                    </div>
                  </div>

                  {/* Stats Card 2 */}
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 hover:border-[#E7B366]/30 hover:from-white/[0.06] transition-all duration-300 flex flex-col justify-between min-h-[120px] md:min-h-[140px] shadow-[0_8px_25px_rgba(0,0,0,0.4)] group">
                    <span className="text-[10px] font-bold text-white/65 tracking-wider uppercase group-hover:text-[#E7B366] transition-colors">Revenue After</span>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-2xl md:text-3xl font-light text-[#E7B366]" style={{ fontFamily: "var(--font-serif)" }}>
                        {formatCompact(revenueAfter)}
                      </span>
                      <span className="text-[10px] text-white/50 tracking-wider font-bold">/mo</span>
                    </div>
                  </div>

                  {/* Stats Card 3 */}
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 hover:border-[#E7B366]/30 hover:from-white/[0.06] transition-all duration-300 flex flex-col justify-between min-h-[120px] md:min-h-[140px] shadow-[0_8px_25px_rgba(0,0,0,0.4)] group">
                    <span className="text-[10px] font-bold text-white/65 tracking-wider uppercase group-hover:text-[#E7B366] transition-colors">Monthly Uplift</span>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-2xl md:text-3xl font-light text-[#E7B366]" style={{ fontFamily: "var(--font-serif)" }}>
                        {formatCompact(monthlyUplift, true)}
                      </span>
                      <span className="text-[10px] text-white/50 tracking-wider font-bold">/mo</span>
                    </div>
                  </div>

                  {/* Stats Card 4 */}
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 hover:border-white/30 hover:from-white/[0.06] transition-all duration-300 flex flex-col justify-between min-h-[120px] md:min-h-[140px] shadow-[0_8px_25px_rgba(0,0,0,0.4)] group">
                    <span className="text-[10px] font-bold text-white/65 tracking-wider uppercase group-hover:text-white transition-colors">12-Month ROI</span>
                    <div className="mt-4">
                      <span className="text-2xl md:text-3xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                        {roi12Month > 0 ? `${Math.round(roi12Month)}%` : '0%'}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Cumulative Gain Bar Chart */}
                <div className="space-y-6">
                  <span className="text-xs font-semibold text-white/60 tracking-widest uppercase block">
                    Cumulative gain vs. investment over 12 months
                  </span>
                  
                  <div className="p-6 md:p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 space-y-8 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
                    
                    {/* Advanced Chart Container with Y-Axis & Gridlines */}
                    <div className="flex items-stretch gap-4 h-[260px] md:h-[320px]">
                      
                      {/* Y-Axis Labels */}
                      <div className="flex flex-col justify-between text-[10px] font-bold text-white/30 py-6 text-right w-12 select-none">
                        <span>{formatCompact(maxChartValue)}</span>
                        <span>{formatCompact(maxChartValue * 0.66)}</span>
                        <span>{formatCompact(maxChartValue * 0.33)}</span>
                        <span>₹0</span>
                      </div>

                      {/* Chart Grid Area */}
                      <div className="flex-1 relative pt-4 pb-2 border-b border-white/15">
                        
                        {/* Horizontal Gridlines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-6 z-0">
                          <div className="w-full border-t border-dashed border-white/10" />
                          <div className="w-full border-t border-dashed border-white/10" />
                          <div className="w-full border-t border-dashed border-white/10" />
                          <div className="w-full border-t border-dashed border-white/10" />
                        </div>

                        {/* Bars Layer */}
                        <div className="absolute inset-0 flex items-end justify-between gap-1.5 md:gap-4 z-10 px-2">
                          
                          {chartData.map((d, i) => {
                            const gainHeightPercent = (d.gain / maxChartValue) * 100;
                            const investmentHeightPercent = (d.investment / maxChartValue) * 100;
                            const isHovered = hoveredBarIndex === i;
                            const isAnyBarHovered = hoveredBarIndex !== null;

                            return (
                              <div 
                                key={i} 
                                className="flex-1 h-full flex items-end justify-center gap-1.5 relative"
                                onMouseEnter={() => setHoveredBarIndex(i)}
                                onMouseLeave={() => setHoveredBarIndex(null)}
                              >
                                
                                {/* Investment Cost Bar - Only shown in Month 1 (Left Side) */}
                                {d.investment > 0 && (
                                  <div 
                                    style={{ height: `${Math.max(2, investmentHeightPercent)}%` }}
                                    className={`w-4 md:w-6 bg-gradient-to-t from-rose-500/5 via-rose-500/20 to-rose-500/60 border-t-2 border-rose-400 rounded-t transition-all duration-300 relative cursor-help ${
                                      isAnyBarHovered && !isHovered ? 'opacity-30' : 'opacity-100 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                                    }`}
                                  />
                                )}

                                {/* Cumulative Gain Bar (Gold Theme) */}
                                <div 
                                  style={{ height: `${Math.max(2, gainHeightPercent)}%` }}
                                  className={`w-4 md:w-6 bg-gradient-to-t from-[#E7B366]/5 via-[#E7B366]/25 to-[#E7B366]/70 border-t-2 border-[#E7B366] rounded-t transition-all duration-300 relative cursor-pointer ${
                                    isAnyBarHovered && !isHovered ? 'opacity-30' : 'opacity-100 shadow-[0_0_15px_rgba(231,179,102,0.15)]'
                                  } ${isHovered ? 'scale-y-[1.02] shadow-[0_0_25px_rgba(231,179,102,0.35)]' : ''}`}
                                />

                                {/* Glassmorphic Rich Hover Tooltip */}
                                {isHovered && (
                                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-[#0A0A0A]/95 backdrop-blur-md border border-white/15 rounded-xl p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.8)] z-30 pointer-events-none min-w-[155px] text-left transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="text-[10px] font-bold text-white/50 tracking-wider uppercase mb-1.5 border-b border-white/5 pb-1">
                                      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][i]}
                                    </div>
                                    <div className="space-y-1.5">
                                      <div className="flex justify-between items-center gap-4">
                                        <span className="text-[10px] text-white/60">Revenue Gain:</span>
                                        <span className="text-xs font-semibold text-[#E7B366]">{formatCurrencyIndian(d.gain)}</span>
                                      </div>
                                      {d.investment > 0 && (
                                        <div className="flex justify-between items-center gap-4">
                                          <span className="text-[10px] text-white/60">Capital Cost:</span>
                                          <span className="text-xs font-semibold text-rose-400">{formatCurrencyIndian(d.investment)}</span>
                                        </div>
                                      )}
                                      <div className="h-px bg-white/5 my-1" />
                                      <div className="flex justify-between items-center gap-3">
                                        <span className="text-[10px] text-white/60">Status:</span>
                                        <span className={`text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                                          d.gain >= investment 
                                            ? 'text-emerald-400 bg-emerald-500/10' 
                                            : 'text-amber-400 bg-amber-500/10'
                                        }`}>
                                          {d.gain >= investment ? 'Net Positive' : 'Payback'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                              </div>
                            );
                          })}

                        </div>

                      </div>
                    </div>

                    {/* X-Axis labels */}
                    <div className="flex justify-between text-xs font-bold text-white/30 pl-[70px] pr-2 pt-1">
                      {chartData.map((d, i) => (
                        <div key={i} className="flex-1 text-center select-none">
                          {d.month}
                        </div>
                      ))}
                    </div>

                    {/* Chart Legend */}
                    <div className="flex items-center gap-6 justify-center text-xs font-semibold text-white/60 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 bg-gradient-to-t from-[#E7B366]/40 to-[#E7B366] border border-[#E7B366]/30 rounded-sm" />
                        <span>Cumulative revenue gain</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 bg-gradient-to-t from-rose-500/40 to-rose-500 border border-rose-500/30 rounded-sm" />
                        <span>Investment capital cost</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Detailed Table */}
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-white/60 tracking-widest uppercase block">
                    Detailed Metrics Break Down
                  </span>

                  <div className="rounded-2xl border border-white/10 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-gradient-to-b from-white/[0.02] to-transparent">
                    <table className="w-full border-collapse text-left text-sm md:text-base">
                      <tbody>
                        <tr className="border-b border-white/10 hover:bg-white/[0.03] transition-colors">
                          <td className="px-6 py-4.5 font-light text-white/80">Investment (starting price)</td>
                          <td className="px-6 py-4.5 text-right font-semibold text-rose-400">-{formatCurrencyIndian(investment)}</td>
                        </tr>
                        <tr className="border-b border-white/10 hover:bg-white/[0.03] transition-colors">
                          <td className="px-6 py-4.5 font-light text-white/80">Additional visitors / month</td>
                          <td className="px-6 py-4.5 text-right font-semibold text-white">+{additionalVisitors.toLocaleString()}</td>
                        </tr>
                        <tr className="border-b border-white/10 hover:bg-white/[0.03] transition-colors">
                          <td className="px-6 py-4.5 font-light text-white/80">Additional leads / month</td>
                          <td className="px-6 py-4.5 text-right font-semibold text-white">+{additionalLeads.toLocaleString()}</td>
                        </tr>
                        <tr className="border-b border-white/10 hover:bg-white/[0.03] transition-colors">
                          <td className="px-6 py-4.5 font-light text-white/80">Additional clients / month</td>
                          <td className="px-6 py-4.5 text-right font-semibold text-white">+{additionalClients.toLocaleString()}</td>
                        </tr>
                        <tr className="border-b border-white/10 hover:bg-white/[0.03] transition-colors">
                          <td className="px-6 py-4.5 font-light text-white/80">Additional revenue / month</td>
                          <td className="px-6 py-4.5 text-right font-semibold text-[#E7B366]">{formatCurrencyIndian(monthlyUplift, true)}</td>
                        </tr>
                        <tr className="border-b border-white/10 hover:bg-white/[0.03] transition-colors">
                          <td className="px-6 py-4.5 font-light text-white/80">Break-even period</td>
                          <td className="px-6 py-4.5 text-right font-semibold text-white">
                            {breakEvenMonths > 0
                              ? breakEvenMonths < 1
                                ? `${Math.round(breakEvenMonths * 30)} days`
                                : `${breakEvenMonths.toFixed(1).replace(/\.0$/, '')} ${Math.round(breakEvenMonths) === 1 ? 'month' : 'months'}`
                              : 'N/A'}
                          </td>
                        </tr>
                        <tr className="hover:bg-white/[0.03] transition-colors">
                          <td className="px-6 py-4.5 font-light text-white/80">12-month net return</td>
                          <td className="px-6 py-4.5 text-right font-bold text-[#E7B366]">{formatCurrencyIndian(net12MonthReturn)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[11px] text-white/50 font-light pt-2 leading-relaxed">
                    Projections are estimates based on Arcam benchmarks and your inputs. Results compound further with ongoing retainer support.
                  </p>
                </div>

                {/* Final CTA Button */}
                <div className="text-center pt-4">
                  <a
                    href={`/configure?tier=${selectedTier}`}
                    className="inline-flex items-center gap-2.5 px-8 py-4.5 rounded-xl border border-white/10 bg-[#E7B366] text-black font-semibold text-sm transition-all duration-500 hover:shadow-[0_10px_40px_rgba(231,179,102,0.25)] hover:scale-[1.02]"
                  >
                    Start your project
                    <ArrowRight size={15} />
                  </a>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <Footer />
    </main>
  );
}
