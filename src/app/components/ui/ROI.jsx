'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Calculator, TrendingUp } from 'lucide-react';

const PARTICLES = [
  { x1: "10%", y1: "20%", x2: "25%", y2: "40%", duration: 25, delay: 0 },
  { x1: "80%", y1: "15%", x2: "65%", y2: "35%", duration: 32, delay: -5 },
  { x1: "30%", y1: "75%", x2: "45%", y2: "55%", duration: 28, delay: -12 },
  { x1: "85%", y1: "85%", x2: "70%", y2: "65%", duration: 35, delay: -18 },
  { x1: "50%", y1: "35%", x2: "35%", y2: "55%", duration: 26, delay: -3 },
  { x1: "90%", y1: "45%", x2: "75%", y2: "25%", duration: 30, delay: -8 },
];

export default function ROI() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Interactive State for Mini Calculator
  const [visitors, setVisitors] = useState(1500);
  const [dealValue, setDealValue] = useState(7500);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  // Constants based on Arcam Tier II (Signature)
  const investment = 110000; // Tier 2 starting price
  const trafficUpliftPercent = 80; // 80% uplift
  const cvrBaseline = 0.02; // 2% conversion rate
  const cvrBoost = 0.55; // 55% increase in conversion rate
  const cvrNew = cvrBaseline * (1 + cvrBoost); // 3.1% conversion rate
  const closeRate = 0.20; // 20% lead close rate

  // Math Calculations
  const leadsBase = visitors * cvrBaseline;
  const clientsBase = leadsBase * closeRate;
  const revBase = clientsBase * dealValue;

  const visitorsNew = visitors * (1 + trafficUpliftPercent / 100);
  const leadsNew = visitorsNew * cvrNew;
  const clientsNew = leadsNew * closeRate;
  const revNew = clientsNew * dealValue;

  const monthlyUplift = Math.round(revNew - revBase);
  const yearlyUplift = monthlyUplift * 12;

  // Indian Currency Formatting
  const formatCurrencyIndian = (num) => {
    const absNum = Math.round(Math.abs(num));
    const str = absNum.toString();
    if (str.length <= 3) {
      return `₹${str}`;
    }
    let lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    return `₹${res}`;
  };

  // Compact currency formatting for chart axes
  const formatCompact = (num) => {
    if (num === 0) return '₹0';
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    
    if (absNum >= 100000) {
      const lakhs = absNum / 100000;
      return `${sign}₹${lakhs.toFixed(1).replace(/\.0$/, '')}L`;
    } else if (absNum >= 1000) {
      const thousands = Math.round(absNum / 1000);
      return `${sign}₹${thousands}K`;
    }
    return `${sign}₹${Math.round(absNum)}`;
  };

  // 12-Month Cumulative Gain vs. Capital Cost Data
  const chartData = Array.from({ length: 12 }, (_, i) => {
    const cumulativeGain = monthlyUplift * (i + 1);
    return {
      month: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'][i],
      gain: Math.max(0, cumulativeGain),
      investment: i === 0 ? investment : 0
    };
  });

  const maxChartValue = Math.max(
    ...chartData.map(d => d.gain),
    investment
  ) || 1;

  const breakEvenHeightPercent = (investment / maxChartValue) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={ref} id="roi" className="relative py-16 md:py-32 bg-black overflow-hidden antialiased flex flex-col justify-center border-b border-white/5">
      {/* Custom styled range slider rules */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #E7B366;
          cursor: pointer;
          border: 2px solid #000;
          box-shadow: 0 0 10px rgba(231,179,102,0.8);
          transition: transform 0.2s;
        }
        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .custom-slider::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #E7B366;
          cursor: pointer;
          border: 2px solid #000;
          box-shadow: 0 0 10px rgba(231,179,102,0.8);
          transition: transform 0.2s;
        }
        .custom-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      ` }} />

      {/* Animated Background Cinematic Glows */}
      <motion.div 
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#E7B366]/8 rounded-full blur-[130px] pointer-events-none opacity-25 z-0" 
      />
      <motion.div 
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-1/4 translate-x-1/2 w-[40vw] h-[40vh] bg-[#E7B366]/8 rounded-full blur-[140px] pointer-events-none opacity-15 z-0" 
      />

      {/* Floating Technical Particle Nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-[#E7B366]"
            initial={{ left: p.x1, top: p.y1 }}
            animate={{
              left: [p.x1, p.x2, p.x1],
              top: [p.y1, p.y2, p.y1],
              opacity: [0.1, 0.45, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle Technical Dot-Matrix Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none select-none opacity-50 z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(231, 179, 102, 0.1) 1.5px, transparent 1.5px)', 
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' 
        }}
      />

      {/* Dynamic Blurred Circular Orbs — faded from top & bottom */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {/* Orb 1 — Large, left-center */}
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[35%] left-[15%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full blur-[80px] opacity-20"
          style={{ background: 'radial-gradient(circle, #E7B366 0%, transparent 70%)' }}
        />

        {/* Orb 2 — Medium, right-upper */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.08, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: -7 }}
          className="absolute top-[20%] right-[10%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full blur-[80px] opacity-15"
          style={{ background: 'radial-gradient(circle, #E7B366 0%, transparent 70%)' }}
        />

        {/* Orb 3 — Small accent, bottom-center */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: -3 }}
          className="absolute bottom-[15%] left-[50%] -translate-x-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full blur-[80px] opacity-15"
          style={{ background: 'radial-gradient(circle, #E7B366 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-max relative z-10 px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-16 md:mb-20 text-center"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase">Value Engineering</span>
            <div className="w-12 h-px bg-[#E7B366]/30" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tighter text-white leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            Return on <em className="text-[#E7B366] italic">Investment</em>
          </h2>
        </motion.div>

        {/* Interactive ROI Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto"
        >
          {/* Left Panel: Simulator Inputs & Outcomes + CTA Buttons */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Calculator size={18} className="text-[#E7B366]" />
                <h3 className="text-lg font-semibold text-white tracking-wide uppercase text-xs">Mini Simulator</h3>
              </div>

              {/* Slider 1: Monthly Visitors */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60 uppercase tracking-wider font-semibold">Monthly Visitors</span>
                  <span className="text-[#E7B366] font-mono text-sm font-semibold">{visitors.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={visitors}
                  onChange={(e) => setVisitors(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer custom-slider"
                />
              </div>

              {/* Slider 2: Average Deal Value */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60 uppercase tracking-wider font-semibold">Average Deal Value</span>
                  <span className="text-[#E7B366] font-mono text-sm font-semibold">{formatCurrencyIndian(dealValue)}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={dealValue}
                  onChange={(e) => setDealValue(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer custom-slider"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-[#E7B366] tracking-wider uppercase block">Est. Monthly Uplift</span>
                <span className="text-4xl font-light text-[#E7B366] mt-2 block font-serif tracking-tight">
                  {formatCurrencyIndian(monthlyUplift)}
                </span>
                <span className="text-[11px] text-white/40 mt-1 block">
                  Projected at {formatCurrencyIndian(yearlyUplift)} incremental annual revenue.
                </span>
              </div>
            </div>

          </motion.div>

          {/* Right Panel: Interactive 12-Month Compounding Chart */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 pl-4 pr-6 py-6 md:pl-6 md:pr-8 md:py-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 flex flex-col justify-between"
          >
            <div className="flex flex-col flex-1 justify-between h-full space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp size={18} className="text-[#E7B366]" />
                  <h3 className="text-lg font-semibold text-white tracking-wide uppercase text-xs">12-Month Compounding</h3>
                </div>
                <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Hover bars for details</span>
              </div>

              {/* Chart Graphic container */}
              <div className="flex-1 flex items-stretch gap-4 min-h-[280px] md:min-h-[320px] my-2">
                {/* Y-Axis Label Indicators */}
                <div className="flex flex-col justify-between text-[9px] font-semibold text-white/30 py-4 text-right w-11 select-none font-mono pr-2">
                  <span>{formatCompact(maxChartValue)}</span>
                  <span>{formatCompact(maxChartValue * 0.5)}</span>
                  <span>₹0</span>
                </div>

                {/* Grid + Bars */}
                <div className="flex-1 relative pt-2 pb-1 border-b border-white/10">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-4 z-0">
                    <div className="w-full border-t border-dashed border-white/5" />
                    <div className="w-full border-t border-dashed border-white/5" />
                    <div className="w-full border-t border-dashed border-white/5" />
                  </div>

                  {/* Break-even line overlay - Label moved to right side to prevent overlap */}
                  {breakEvenHeightPercent < 100 && (
                    <div 
                      style={{ bottom: `${breakEvenHeightPercent}%` }}
                      className="absolute left-0 right-0 border-t border-dashed border-rose-500/40 z-20 pointer-events-none"
                    >
                      <span className="absolute right-2 -top-2.5 bg-black/90 px-1.5 py-0.5 rounded text-[8px] font-bold text-rose-400 uppercase tracking-widest border border-white/5">
                        Break-even
                      </span>
                    </div>
                  )}

                  {/* Dynamic Render Layer */}
                  <div className="absolute inset-0 flex items-end justify-between gap-1 z-10 px-1">
                    {chartData.map((d, i) => {
                      const gainHeightPercent = (d.gain / maxChartValue) * 100;
                      const investmentHeightPercent = (d.investment / maxChartValue) * 100;
                      const isHovered = hoveredBarIndex === i;
                      const isAnyBarHovered = hoveredBarIndex !== null;

                      return (
                        <div 
                          key={i} 
                          className="flex-1 h-full flex items-end justify-center gap-0.5 relative"
                          onMouseEnter={() => setHoveredBarIndex(i)}
                          onMouseLeave={() => setHoveredBarIndex(null)}
                        >
                          {/* Investment Cost Bar (First Month Capital Outlay) */}
                          {d.investment > 0 && (
                            <div 
                              style={{ height: `${Math.max(4, investmentHeightPercent)}%` }}
                              className={`w-3 md:w-4 bg-gradient-to-t from-rose-500/10 via-rose-500/30 to-rose-500/70 border-t-2 border-rose-400 rounded-t transition-all duration-300 relative cursor-help ${
                                isAnyBarHovered && !isHovered ? 'opacity-30' : 'opacity-100 shadow-[0_0_10px_rgba(244,63,94,0.1)]'
                              }`}
                            />
                          )}

                          {/* Dynamic Compounding Gain Bars (Gold Theme) */}
                          <div 
                            style={{ height: `${Math.max(4, gainHeightPercent)}%` }}
                            className={`w-3 md:w-4 bg-gradient-to-t from-[#E7B366]/10 via-[#E7B366]/30 to-[#E7B366]/80 border-t-2 border-[#E7B366] rounded-t transition-all duration-300 relative cursor-pointer ${
                              isAnyBarHovered && !isHovered ? 'opacity-30' : 'opacity-100 shadow-[0_0_10px_rgba(231,179,102,0.15)]'
                            } ${isHovered ? 'scale-y-[1.03] shadow-[0_0_20px_rgba(231,179,102,0.4)]' : ''}`}
                          />

                          {/* Tooltip Overlay */}
                          {isHovered && (
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg p-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.8)] z-30 pointer-events-none min-w-[130px] text-left transition-all duration-300 font-sans">
                              <span className="text-[9px] font-bold text-white/40 block border-b border-white/5 pb-0.5 mb-1 uppercase tracking-wider">
                                Month {i + 1} Status
                              </span>
                              <div className="space-y-1">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-white/60">Revenue:</span>
                                  <span className="font-semibold text-[#E7B366]">{formatCompact(d.gain)}</span>
                                </div>
                                {d.investment > 0 && (
                                  <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-white/60">Outlay:</span>
                                    <span className="font-semibold text-rose-400">{formatCompact(d.investment)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between items-center text-[9px] pt-1">
                                  <span className="text-white/60">Break-even:</span>
                                  <span className={`font-bold px-1 rounded ${
                                    d.gain >= investment ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                                  }`}>
                                    {d.gain >= investment ? 'Yes' : 'No'}
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

              {/* Month label X-Axis */}
              <div className="flex justify-between text-[9px] font-bold text-white/30 pl-11 pr-2 font-mono">
                {chartData.map((d, i) => (
                  <div key={i} className="flex-1 text-center select-none">{d.month}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Global CTA Buttons */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 max-w-xl mx-auto z-20 relative"
        >
          <a
            href="/roi"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#E7B366] transition-all duration-500 hover:shadow-[0_10px_30px_rgba(231,179,102,0.25)] flex items-center justify-center gap-2 group"
          >
            Launch ROI Calculator
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="/configure"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] border border-white/25 text-white/80 font-semibold text-xs tracking-wider uppercase hover:bg-[#E7B366]/5 hover:border-[#E7B366] hover:text-[#E7B366] hover:shadow-[0_0_30px_rgba(231,179,102,0.2)] transition-all duration-700 flex items-center justify-center"
          >
            Configure Project
          </a>
        </motion.div>

        {/* Footer Design Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 text-center"
        >
          <div className="w-1 h-12 bg-gradient-to-b from-[#E7B366]/40 to-transparent mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
