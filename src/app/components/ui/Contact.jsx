'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Phone, ArrowRight, MessageSquare, Send, X, Paperclip, ChevronDown, CheckCircle, Loader2, RotateCcw } from 'lucide-react';
import { useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SERVICE_TIERS, ADDONS, getAddonPrice } from '@/app/lib/services-data';
import { useUploadThing } from '@/app/lib/uploadthing';

// Exported component wraps the inner component in Suspense — required by Next.js
export default function Contact() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-[#E7B366] text-xs uppercase tracking-widest">Loading Contact...</div>}>
      <ContactInner />
    </Suspense>
  );
}

function ContactInner() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tierId = searchParams.get('tier');
  const addonIds = searchParams.get('addons')?.split(',') || [];

  const handleRemoveAddon = (addonIdToRemove) => {
    const newAddonIds = addonIds.filter(id => id !== addonIdToRemove);
    const params = new URLSearchParams(searchParams.toString());
    if (newAddonIds.length > 0) {
      params.set('addons', newAddonIds.join(','));
    } else {
      params.delete('addons');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const configuredTier = tierId ? SERVICE_TIERS.find(t => t.id === tierId) : null;
  const configuredAddons = configuredTier ? addonIds.map(id => ADDONS.find(a => a.id === id)).filter(Boolean) : [];
  const totalPrice = configuredTier ? configuredTier.price + configuredAddons.reduce((sum, a) => sum + getAddonPrice(a, configuredTier.id), 0) : 0;

  const [formState, setFormState] = useState('idle'); // idle, sending, success
  const [submittedKey, setSubmittedKey] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [attachmentError, setAttachmentError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState('Select an option...');
  const fileInputRef = useRef(null);

  const { startUpload } = useUploadThing("pdfUploader");

  const inquiryOptions = [
    "LaunchPad Site (Tier I)",
    "Growth Engine (Tier II)",
    "Authority Builder (Tier III)",
    "General Inquiry / Other",
    "Partnership / Collaboration"
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachmentError('');
    
    if (!file) {
      setAttachment(null);
      return;
    }

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setAttachmentError('Please upload a PDF or Word document.');
      setAttachment(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > 4 * 1048576) { // UploadThing supports up to 4MB now
      setAttachmentError('File must be under 4MB.');
      setAttachment(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setAttachment(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');

    let finalAttachmentUrl = null;
    let finalAttachmentName = null;

    // 1. Upload to UploadThing if file exists
    if (attachment) {
      try {
        const uploadRes = await startUpload([attachment]);
        if (uploadRes && uploadRes[0]) {
          finalAttachmentUrl = uploadRes[0].url;
          finalAttachmentName = attachment.name;
        }
      } catch (error) {
        console.error("UploadThing Error:", error);
        setFormState('idle');
        alert("Failed to upload attachment. Please try again.");
        return;
      }
    }

    // 2. Prepare data for Enquiry API
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      service_tier: formData.get('package_tier') || formData.get('service_tier') || '',
      price: configuredTier ? totalPrice : null,
      addons: configuredAddons.map(a => a.title),
      attachmentUrl: finalAttachmentUrl,
      attachmentName: finalAttachmentName,
    };

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const res = await response.json();
        setSubmittedKey(res.projectKey || '');
        setFormState('success');
      } else {
        setFormState('idle');
        alert('There was an error submitting your inquiry.');
      }
    } catch (error) {
      console.error(error);
      setFormState('idle');
      alert('There was an error connecting to the server.');
    }
  };

  const handleReset = () => {
    setFormState('idle');
    setSubmittedKey('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <>
      <section ref={ref} id="contact" className={`relative py-12 md:py-32 bg-black overflow-hidden antialiased ${configuredTier ? 'pb-28 lg:pb-32' : ''}`}>
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#E7B366]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#E7B366]/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="container-max relative z-10 px-4 md:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView='visible' viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start"
        >
          {/* Left Column: Info or Configured Package */}
          <div className={configuredTier ? "hidden lg:flex flex-col w-full" : "flex flex-col w-full"}>
            <AnimatePresence mode="wait">
              {configuredTier ? (
                <motion.div 
                  key="configured"
                  initial="hidden"
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase">Architecture</span>
                  <div className="w-16 md:w-24 h-px bg-gradient-to-r from-[#E7B366]/40 to-transparent" />
                </div>
                <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-white mb-6 md:mb-10" style={{ fontFamily: "var(--font-serif)" }}>
                  {configuredTier.title}
                </h2>
                
                <div className="p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-[#0A0A0A]/80 border border-white/10 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E7B366]/5 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="space-y-6 mb-10 pb-10 border-b border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mb-2">Base Tier</p>
                          <h4 className="text-white font-medium text-lg">{configuredTier.title}</h4>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="text-white font-medium">₹{configuredTier.price.toLocaleString('en-IN')}</p>
                          <button 
                            onClick={() => router.push(`/configure?${searchParams.toString()}`)}
                            className="inline-flex items-center gap-1 text-[9px] font-bold text-[#E7B366] hover:text-[#C89B55] uppercase tracking-widest transition-colors"
                            type="button"
                          >
                            <ArrowRight size={12} className="rotate-180" /> Change Plan
                          </button>
                        </div>
                      </div>

                      {configuredAddons.length > 0 && (
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">Enhancements</p>
                          {configuredAddons.map(addon => (
                            <div key={addon.id} className="flex justify-between items-center text-sm">
                              <span className="text-white/60 font-light">{addon.title}</span>
                              <span className="text-white/80">₹{addon.price.toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mb-3">Total Investment</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                          ₹{totalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[#E7B366] text-[10px] uppercase tracking-widest font-medium">INR</span>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
              ) : (
                <motion.div 
                  key="inquiries"
                  initial="hidden"
                  whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  variants={containerVariants}
                  className="flex flex-col"
                >
                  <motion.div variants={itemVariants} className="mb-8 md:mb-12">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                      <span className="text-[10px] font-bold text-[#E7B366] tracking-[0.6em] uppercase">Connect</span>
                      <div className="w-16 md:w-24 h-px bg-gradient-to-r from-[#E7B366]/40 to-transparent" />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white mb-4 md:mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                      Start your <br />
                      <em className="text-[#E7B366] italic not-italic">Transformation</em>
                    </h2>
                    <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-md">
                      Ready to redefine your digital presence? Reach out to discuss your next high-impact project.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:block md:space-y-10">
                    <div className="flex items-start gap-4 md:gap-6 group">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-colors duration-500 group-hover:border-[#E7B366]/30 flex-shrink-0">
                        <Mail size={18} className="text-[#E7B366]/70 group-hover:text-[#E7B366] transition-colors" />
                      </div>
                      <div>
                        <p className="text-[9px] text-[#E7B366] uppercase tracking-widest font-bold mb-0.5 md:mb-1">Email</p>
                        <a href="mailto:hello@arcam.project" className="text-lg md:text-xl text-white/80 hover:text-white transition-colors tracking-tight">hello@arcam.project</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 md:gap-6 group">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-colors duration-500 group-hover:border-[#E7B366]/30 flex-shrink-0">
                        <MapPin size={18} className="text-[#E7B366]/70 group-hover:text-[#E7B366] transition-colors" />
                      </div>
                      <div>
                        <p className="text-[9px] text-[#E7B366] uppercase tracking-widest font-bold mb-0.5 md:mb-1">HQ</p>
                        <p className="text-lg md:text-xl text-white/80 tracking-tight">Remote Global</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 md:gap-6 group sm:col-span-2 md:col-span-1">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-colors duration-500 group-hover:border-[#E7B366]/30 flex-shrink-0">
                        <MessageSquare size={18} className="text-[#E7B366]/70 group-hover:text-[#E7B366] transition-colors" />
                      </div>
                      <div>
                        <p className="text-[9px] text-[#E7B366] uppercase tracking-widest font-bold mb-0.5 md:mb-1">Connect</p>
                        <a href="#" className="text-lg md:text-xl text-white/80 hover:text-white transition-colors tracking-tight">Schedule Discovery</a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Form */}
          <motion.div variants={itemVariants} className="relative w-full">
            {configuredTier && (
              <div className="lg:hidden mb-6 px-1">
                <span className="text-[9px] font-bold text-[#E7B366] tracking-[0.4em] uppercase block mb-1">Configured Package</span>
                <h2 className="text-3xl font-light text-white tracking-tighter" style={{ fontFamily: "var(--font-serif)" }}>
                  {configuredTier.title}
                </h2>
              </div>
            )}
            <div className="p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group min-h-[400px] flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div key="success"
                    initial="hidden" animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex flex-col items-center text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 16 }}
                      className="w-20 h-20 rounded-full bg-[#E7B366]/10 border border-[#E7B366]/30 flex items-center justify-center mb-6">
                      <CheckCircle size={36} className="text-[#E7B366]" />
                    </motion.div>
                    <h3 className="text-3xl font-light text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Receipt Confirmed</h3>
                    <p className="text-white/60 text-sm font-light mb-8 max-w-sm leading-relaxed">
                      Thank you for contacting Arcam. Your advisory request has been successfully queued for review by our engagement team.
                      <br /><br />
                      A representative will review your brief and reach out to you within 24 to 48 business hours. Your secure client portal access key and credentials will be manually dispatched to you once your project configuration is approved.
                    </p>
                    <button onClick={handleReset}
                      className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 text-[10px] font-bold tracking-[0.3em] uppercase">
                      <RotateCcw size={13} /> Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form"
                    initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit} className="relative z-10 space-y-8">
                    {configuredTier && (
                      <>
                        <input type="hidden" name="package_tier" value={configuredTier.title} />
                        <input type="hidden" name="package_price" value={totalPrice} />
                        {configuredAddons.length > 0 && <input type="hidden" name="package_addons" value={configuredAddons.map(a => a.title).join(', ')} />}
                      </>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] md:text-[10px] text-[#E7B366] uppercase tracking-widest font-bold ml-1">Full Name</label>
                        <input type="text" name="name" required placeholder="John Doe"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/40 transition-all duration-300 text-sm md:text-base" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] md:text-[10px] text-[#E7B366] uppercase tracking-widest font-bold ml-1">Email</label>
                        <input type="email" name="email" required placeholder="john@example.com"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/40 transition-all duration-300 text-sm md:text-base" />
                      </div>
                    </div>
                    {configuredTier ? (
                      <div className="space-y-2">
                        <label className="text-[10px] text-[#E7B366] uppercase tracking-widest font-bold ml-1">Selected Architecture</label>
                        <div className="w-full bg-[#E7B366]/5 border border-[#E7B366]/20 rounded-2xl px-6 py-4 text-white flex items-center justify-between">
                          <div>
                            <p className="font-medium mb-1">{configuredTier.title}</p>
                            {configuredAddons.length > 0 && <p className="text-xs text-white/60 font-light">+ {configuredAddons.length} Enhancement{configuredAddons.length > 1 ? 's' : ''}</p>}
                          </div>
                          <p className="text-xs text-[#E7B366] uppercase tracking-widest font-bold">Attached</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 relative">
                        <label className="text-[10px] text-[#E7B366] uppercase tracking-widest font-bold ml-1">Inquiry Type</label>
                        <input type="hidden" name="service_tier" value={selectedInquiry} />
                        <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white flex items-center justify-between focus:outline-none focus:border-[#E7B366]/40 transition-all duration-300">
                          <span className={selectedInquiry === 'Select an option...' ? 'text-white/20 font-light' : 'text-white font-light'}>{selectedInquiry}</span>
                          <ChevronDown size={16} className={`text-[#E7B366] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                              <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }}
                                className="absolute z-50 left-0 right-0 mt-2 bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                  {inquiryOptions.map(option => (
                                    <button key={option} type="button" onClick={() => { setSelectedInquiry(option); setIsDropdownOpen(false); }}
                                      className={`w-full text-left px-6 py-4 text-sm transition-colors hover:bg-white/5 ${selectedInquiry === option ? 'text-[#E7B366] bg-white/[0.02]' : 'text-white/60'}`}>
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] text-[#E7B366] uppercase tracking-widest font-bold ml-1">Project Brief</label>
                      <textarea name="message" required rows={3} placeholder="Tell us about your vision..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/40 transition-all duration-300 resize-none text-sm md:text-base md:min-h-[120px]" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between ml-1">
                        <label className="text-[10px] text-[#E7B366] uppercase tracking-widest font-bold">Project Details (Optional)</label>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest font-medium">PDF/DOCX, &lt; 4MB</span>
                      </div>
                      <div className="relative">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden" id="file-upload" name="project_file" />
                        <label htmlFor="file-upload"
                          className={`w-full flex items-center justify-between border rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 cursor-pointer transition-all duration-300 ${attachment ? 'bg-[#E7B366]/5 border-[#E7B366]/40 text-white' : 'bg-white/[0.03] border-white/10 text-white/60 hover:border-[#E7B366]/40 hover:text-white'}`}>
                          <div className="flex items-center gap-3 overflow-hidden">
                            <Paperclip size={16} className={attachment ? 'text-[#E7B366]' : 'text-white/40'} />
                            <span className="truncate text-xs md:text-sm font-light">{attachment ? attachment.name : 'Attach details...'}</span>
                          </div>
                          {attachment && (
                            <button type="button" onClick={e => { e.preventDefault(); setAttachment(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                              className="text-white/40 hover:text-red-500 transition-colors ml-4"><X size={14} /></button>
                          )}
                        </label>
                      </div>
                      {attachmentError && <p className="text-red-500 text-xs mt-2 ml-1">{attachmentError}</p>}
                    </div>
                    <button disabled={formState === 'sending'}
                      className="w-full group/btn relative py-6 rounded-2xl border border-[#E7B366]/20 bg-white/5 overflow-hidden transition-all duration-500 hover:border-[#E7B366]/40 flex items-center justify-center gap-3 disabled:cursor-not-allowed">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#E7B366] to-[#C89B55] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      {formState === 'sending' ? (
                        <>
                          <Loader2 size={16} className="relative z-10 text-[#E7B366] animate-spin" />
                          <span className="relative z-10 text-[#E7B366] font-semibold text-[10px] tracking-[0.4em] uppercase">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10 text-white/80 group-hover/btn:text-black font-semibold text-[10px] tracking-[0.4em] uppercase transition-all duration-500">Dispatch Inquiry</span>
                          <Send size={14} className="relative z-10 text-[#E7B366] group-hover/btn:text-black transition-all duration-500" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    
    {/* Mobile Fixed Bottom Bar */}
    {configuredTier && (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 border-t border-white/10 backdrop-blur-xl py-3.5 px-6 shadow-[0_-15px_40px_rgba(0,0,0,0.8)] lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] font-bold mb-0.5">Selected Plan</p>
            <h4 className="text-white text-xs font-semibold">{configuredTier.title}</h4>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] font-bold mb-0.5">Total Investment</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-light text-white" style={{ fontFamily: "var(--font-serif)" }}>
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[8px] text-[#E7B366] font-bold tracking-wider">INR</span>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
