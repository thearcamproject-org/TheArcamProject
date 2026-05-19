'use client';

import { motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navigation from '@/app/components/common/Navigation';
import { Spotlight } from '@/app/components/ui/Spotlight';
import { Clock, CheckCircle2, Circle, ArrowLeft, Package, Calendar, Activity, Zap } from 'lucide-react';

function PortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = searchParams.get('id');
      if (!userId) {
        router.push('/work');
        return;
      }

      try {
        const res = await fetch(`/api/portal/user?id=${userId}`);
        if (!res.ok) {
          router.push('/work');
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (e) {
        console.error("Failed to fetch user");
        router.push('/work');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [searchParams, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#E7B366] text-[10px] uppercase tracking-widest">Loading Portal...</div>;
  }

  if (!user) return null;

  return (
    <div className="container-max px-4 md:px-10 py-32 md:py-40 relative z-10 min-h-screen">
      <div className="mb-12">
        <button 
          onClick={() => router.push('/work')}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 group text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Work
        </button>
        <h1 className="text-4xl md:text-6xl font-light text-white tracking-tighter" style={{ fontFamily: "var(--font-serif)" }}>
          Welcome back, <em className="text-[#E7B366] italic not-italic">{user.clientName}</em>.
        </h1>
        <p className="text-white/50 mt-4 text-lg font-light tracking-wide">Client Portal & Project Tracker</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Side: Project Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-5 lg:sticky lg:top-32 space-y-6"
        >
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#0A0A0A]/80 border border-white/10 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E7B366]/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                <div>
                  <p className="text-[10px] text-[#E7B366] uppercase tracking-[0.3em] font-bold mb-2">Project Architecture</p>
                  <h3 className="text-2xl text-white font-light">{user.projectDetails.name}</h3>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 text-white/50">
                  <Package size={24} strokeWidth={1.5} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Zap size={16} className="text-white/40" />
                    <span className="text-sm text-white/60 font-light">Service Tier</span>
                  </div>
                  <span className="text-sm text-white font-medium">{user.projectDetails.tier}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-white/40" />
                    <span className="text-sm text-white/60 font-light">Start Date</span>
                  </div>
                  <span className="text-sm text-white font-medium">{new Date(user.projectDetails.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Activity size={16} className="text-white/40" />
                    <span className="text-sm text-white/60 font-light">Status</span>
                  </div>
                  <span className="text-sm text-[#E7B366] font-medium bg-[#E7B366]/10 px-3 py-1 rounded-full">{user.projectDetails.status}</span>
                </div>
              </div>

              {user.projectDetails.addons?.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold mb-4">Included Add-ons</p>
                  <ul className="space-y-3">
                    {user.projectDetails.addons.map((addon, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70 font-light">
                        <CheckCircle2 size={14} className="text-[#E7B366]" />
                        {addon}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold mb-2">Total Investment</p>
                <p className="text-3xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>{user.projectDetails.investment}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Updates Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-md relative overflow-hidden h-full">
            <h3 className="text-xl text-white font-light mb-10 flex items-center gap-3">
              <Clock className="text-[#E7B366]" size={20} />
              Project Timeline
            </h3>

            <div className="relative border-l border-white/10 ml-3 space-y-10 pb-4">
              {user.updates.slice().reverse().map((update, i) => (
                <div key={update.id} className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-black border-2 border-[#E7B366] rounded-full shadow-[0_0_10px_rgba(231,179,102,0.5)]" />
                  
                  <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-[#E7B366] font-bold tracking-widest uppercase">{update.sender}</span>
                      <span className="text-xs text-white/40 font-mono">
                        {new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-white/80 font-light leading-relaxed text-sm">
                      {update.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {user.updates.length === 0 && (
              <div className="text-center py-20 text-white/30 font-light italic">
                No updates yet. Project kickoff is pending.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PortalPage() {
  return (
    <main className="bg-black min-h-screen selection:bg-[#E7B366] selection:text-black relative">
      <Navigation />
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[60vh]">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#E7B366" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#E7B36605_0%,_transparent_70%)]" />
      </div>

      <Suspense fallback={<div className="h-screen flex items-center justify-center text-[#E7B366] uppercase tracking-[0.5em] text-[10px]">Loading Identity...</div>}>
        <PortalContent />
      </Suspense>
    </main>
  );
}
