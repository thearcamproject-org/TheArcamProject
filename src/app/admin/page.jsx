'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Navigation from '@/app/components/common/Navigation';
import {
  ShieldAlert, Users, Send, CheckCircle2, X, Search, PlayCircle,
  CheckSquare, Mail, Key, Calendar, Tag, FileText, DollarSign, Package,
  Lock, Eye, EyeOff, Pencil, Trash2, Save, ChevronRight
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // New update
  const [newUpdateMessage, setNewUpdateMessage] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  // Password
  const [portalPasswordInput, setPortalPasswordInput] = useState('');
  const [showPortalPassword, setShowPortalPassword] = useState(false);
  const [setPasswordSuccess, setSetPasswordSuccess] = useState(false);

  // Edit/Delete messages
  const [editingUpdateId, setEditingUpdateId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const editInputRef = useRef(null);

  // Edit project details
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [detailsDraft, setDetailsDraft] = useState({});
  const [savingDetails, setSavingDetails] = useState(false);
  const [saveDetailsSuccess, setSaveDetailsSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'adminpassword') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin credentials.');
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (e) {
      console.error('Failed to fetch users', e);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchUsers();
  }, [isAuthenticated, updateTrigger]);

  useEffect(() => {
    if (editingUpdateId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingUpdateId]);

  const callUpdatesAPI = async (payload) => {
    await fetch('/api/admin/updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setUpdateTrigger(prev => prev + 1);
  };

  const handlePostUpdate = async (e) => {
    e.preventDefault();
    if (!selectedUserId || !newUpdateMessage.trim()) return;
    await callUpdatesAPI({ userId: selectedUserId, type: 'ADD_UPDATE', payload: { message: newUpdateMessage } });
    setNewUpdateMessage('');
    setPostSuccess(true);
    setTimeout(() => setPostSuccess(false), 3000);
  };

  const handleStartWork = async () => {
    if (!selectedUserId) return;
    await callUpdatesAPI({ userId: selectedUserId, type: 'UPDATE_STATUS', payload: { status: 'In Development' } });
    await callUpdatesAPI({ userId: selectedUserId, type: 'ADD_UPDATE', payload: { message: 'Project has officially commenced. We are now in the active development phase.' } });
    setActiveTab('active');
    setSelectedUserId(null);
  };

  const handleMarkCompleted = async () => {
    if (!selectedUserId) return;
    await callUpdatesAPI({ userId: selectedUserId, type: 'UPDATE_STATUS', payload: { status: 'Completed' } });
    await callUpdatesAPI({ userId: selectedUserId, type: 'ADD_UPDATE', payload: { message: 'Project has been marked as completed. All deliverables have been finalized.' } });
    setActiveTab('completed');
    setSelectedUserId(null);
  };

  const handleChangeStatus = async (newStatus) => {
    if (!selectedUserId || newStatus === selectedUser?.projectDetails?.status) return;
    await callUpdatesAPI({ userId: selectedUserId, type: 'UPDATE_STATUS', payload: { status: newStatus } });
    await callUpdatesAPI({ userId: selectedUserId, type: 'ADD_UPDATE', payload: { message: `Project status updated to: ${newStatus}.` } });
  };

  const handleEditUpdate = async (updateId) => {
    if (!editingText.trim()) return;
    await callUpdatesAPI({ userId: selectedUserId, type: 'EDIT_UPDATE', payload: { id: updateId, message: editingText } });
    setEditingUpdateId(null);
    setEditingText('');
  };

  const handleDeleteUpdate = async (updateId) => {
    if (!confirm('Delete this update? This cannot be undone.')) return;
    await callUpdatesAPI({ userId: selectedUserId, type: 'DELETE_UPDATE', payload: { id: updateId } });
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (!selectedUserId || !portalPasswordInput.trim()) return;
    const res = await fetch('/api/admin/set-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedUserId, password: portalPasswordInput })
    });
    if (res.ok) {
      setSetPasswordSuccess(true);
      setUpdateTrigger(prev => prev + 1);
      setTimeout(() => setSetPasswordSuccess(false), 3000);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUserId(id);
    setPortalPasswordInput('');
    setShowPortalPassword(false);
    setEditingUpdateId(null);
    setIsEditingDetails(false);
  };

  const handleStartEditDetails = () => {
    const u = users.find(x => x.id === selectedUserId);
    if (!u) return;
    setDetailsDraft({
      clientName: u.clientName || '',
      email: u.email || '',
      projectKey: u.projectKey || '',
      name: u.projectDetails?.name || '',
      tier: u.projectDetails?.tier || '',
      investment: u.projectDetails?.investment || '',
      startDate: u.projectDetails?.startDate || '',
      addons: Array.isArray(u.projectDetails?.addons) ? u.projectDetails.addons.join(', ') : (u.projectDetails?.addons || ''),
      brief: u.projectDetails?.brief || '',
    });
    setIsEditingDetails(true);
  };

  const handleSaveDetails = async () => {
    if (!selectedUserId) return;
    setSavingDetails(true);
    try {
      const res = await fetch('/api/admin/update-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUserId,
          fields: {
            ...detailsDraft,
            addons: detailsDraft.addons
              ? detailsDraft.addons.split(',').map(s => s.trim()).filter(Boolean)
              : [],
          }
        })
      });
      if (res.ok) {
        setIsEditingDetails(false);
        setSaveDetailsSuccess(true);
        setUpdateTrigger(prev => prev + 1);
        setTimeout(() => setSaveDetailsSuccess(false), 3000);
      }
    } catch (e) {
      console.error('Failed to save details', e);
    } finally {
      setSavingDetails(false);
    }
  };

  const filteredUsers = useMemo(() => {
    let list = users;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(u => u.clientName?.toLowerCase().includes(q) || u.projectKey?.toLowerCase().includes(q));
    }
    return {
      new: list.filter(u => u.projectDetails?.status === 'Pending Kick-off'),
      active: list.filter(u => !['Pending Kick-off', 'Completed'].includes(u.projectDetails?.status)),
      completed: list.filter(u => u.projectDetails?.status === 'Completed'),
    };
  }, [searchQuery, users]);

  const selectedUser = users.find(u => u.id === selectedUserId);

  // ─── Login Screen ──────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <main className="bg-[#050505] min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#E7B36608_0%,_transparent_60%)]" />
        <div className="relative z-10 w-full max-w-sm p-8 rounded-3xl bg-[#0A0A0A] border border-white/8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <ShieldAlert size={18} className="text-red-400" />
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm">Arcam Admin</h1>
              <p className="text-white/40 text-xs">Command Center · Restricted</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-3">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/40 transition-colors" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/40 transition-colors" required />
            {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
            <button type="submit" className="w-full py-3 rounded-xl bg-[#E7B366] text-black font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors mt-2">
              Authenticate
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ─── Tab counts ────────────────────────────────────────────────
  const TAB_LABELS = [
    { key: 'new', label: 'New' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Done' },
  ];

  const statusColor = (status) => {
    if (status === 'Completed') return 'text-emerald-400 bg-emerald-400/10';
    if (status === 'Pending Kick-off') return 'text-amber-400 bg-amber-400/10';
    return 'text-[#E7B366] bg-[#E7B366]/10';
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-72 shrink-0 flex flex-col border-r border-white/8 bg-[#080808]">
        {/* Sidebar Header */}
        <div className="p-5 border-b border-white/8">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Arcam</p>
          <h1 className="text-lg font-light text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Command <em className="text-[#E7B366]">Center</em>
          </h1>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-white/8">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" placeholder="Search clients..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/8 rounded-lg pl-8 pr-3 py-2 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/30 transition-colors" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/8">
          {TAB_LABELS.map(t => (
            <button key={t.key}
              onClick={() => { setActiveTab(t.key); setSelectedUserId(null); }}
              className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === t.key ? 'text-[#E7B366] border-b-2 border-[#E7B366]' : 'text-white/30 hover:text-white'}`}
            >
              {t.label} {filteredUsers[t.key]?.length > 0 && <span className="ml-1 opacity-60">({filteredUsers[t.key].length})</span>}
            </button>
          ))}
        </div>

        {/* Client List */}
        <div className="flex-1 overflow-y-auto py-2">
          {loadingUsers ? (
            <div className="px-4 py-8 text-center text-white/20 text-xs">Loading...</div>
          ) : filteredUsers[activeTab]?.length === 0 ? (
            <div className="px-4 py-8 text-center text-white/20 text-xs">No clients here.</div>
          ) : (
            filteredUsers[activeTab].map(u => (
              <button key={u.id} onClick={() => handleSelectUser(u.id)}
                className={`w-full text-left px-4 py-3.5 transition-colors border-b border-white/5 flex items-center justify-between group ${
                  selectedUserId === u.id ? 'bg-[#E7B366]/8 border-l-2 border-l-[#E7B366]' : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${selectedUserId === u.id ? 'text-white' : 'text-white/70'}`}>{u.clientName}</p>
                  <p className="text-[10px] font-mono text-[#E7B366]/70 mt-0.5">{u.projectKey}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColor(u.projectDetails?.status)}`}>
                    {u.projectDetails?.status?.split(' ')[0]}
                  </span>
                  <ChevronRight size={12} className={`transition-colors ${selectedUserId === u.id ? 'text-[#E7B366]' : 'text-white/20 group-hover:text-white/40'}`} />
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {selectedUser ? (
          <>
            {/* Top Bar */}
            <div className="shrink-0 px-8 py-5 border-b border-white/8 flex items-center justify-between bg-[#080808]">
              <div>
                <h2 className="text-2xl font-light text-white">{selectedUser.clientName}</h2>
                <p className="text-xs text-white/40 mt-0.5">{selectedUser.projectDetails?.name} · {selectedUser.projectDetails?.tier}</p>
              </div>
              <div className="flex items-center gap-3">
                {selectedUser.projectDetails?.status === 'Pending Kick-off' && (
                  <button onClick={handleStartWork}
                    className="px-5 py-2.5 rounded-xl bg-[#E7B366] text-black font-bold text-[10px] tracking-widest uppercase hover:bg-white transition-colors flex items-center gap-2">
                    <PlayCircle size={13} /> Start Work
                  </button>
                )}
                {['Design Phase', 'In Development', 'Quality Assurance', 'On Hold'].includes(selectedUser.projectDetails?.status) && (
                  <button onClick={handleMarkCompleted}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-[10px] tracking-widest uppercase hover:bg-emerald-400 transition-colors flex items-center gap-2">
                    <CheckSquare size={13} /> Mark Done
                  </button>
                )}

                {/* Status override dropdown */}
                <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    selectedUser.projectDetails?.status === 'Completed' ? 'bg-emerald-400' :
                    selectedUser.projectDetails?.status === 'Pending Kick-off' ? 'bg-amber-400' : 'bg-[#E7B366]'
                  }`} />
                  <select
                    value={selectedUser.projectDetails?.status || ''}
                    onChange={e => handleChangeStatus(e.target.value)}
                    className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer appearance-none pr-1"
                    title="Change status"
                  >
                    <option value="Pending Kick-off" className="bg-[#0A0A0A]">Pending Kick-off</option>
                    <option value="Design Phase" className="bg-[#0A0A0A]">Design Phase</option>
                    <option value="In Development" className="bg-[#0A0A0A]">In Development</option>
                    <option value="Quality Assurance" className="bg-[#0A0A0A]">Quality Assurance</option>
                    <option value="On Hold" className="bg-[#0A0A0A]">On Hold</option>
                    <option value="Completed" className="bg-[#0A0A0A]">Completed</option>
                  </select>
                </div>

                <button onClick={() => setSelectedUserId(null)} className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-colors">
                  <X size={14} />
                </button>
              </div>

            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">

                {/* ── Project Details ─────────────────────────── */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Project Details</h3>
                    {!isEditingDetails ? (
                      <button onClick={handleStartEditDetails}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-white/40 hover:text-white hover:border-white/20 text-[10px] font-bold uppercase tracking-wider transition-colors">
                        <Pencil size={11}/> Edit Details
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        {saveDetailsSuccess && <span className="text-emerald-400 text-xs flex items-center gap-1"><CheckCircle2 size={11}/> Saved</span>}
                        <button onClick={() => setIsEditingDetails(false)}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors">
                          Cancel
                        </button>
                        <button onClick={handleSaveDetails} disabled={savingDetails}
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E7B366] text-black text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50">
                          <Save size={11}/> {savingDetails ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditingDetails ? (
                    <div className="p-6 rounded-2xl bg-white/[0.025] border border-[#E7B366]/20 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { key: 'clientName', label: 'Client Name', icon: Users },
                          { key: 'email', label: 'Email', icon: Mail },
                          { key: 'projectKey', label: 'Project Key', icon: Key, mono: true },
                          { key: 'name', label: 'Project Name', icon: Package },
                          { key: 'tier', label: 'Tier / Package', icon: Package },
                          { key: 'investment', label: 'Investment (e.g. ₹1,00,000)', icon: DollarSign },
                          { key: 'startDate', label: 'Start Date', icon: Calendar },
                          { key: 'addons', label: 'Add-ons (comma separated)', icon: Tag },
                        ].map(({ key, label, icon: Icon, mono }) => (
                          <div key={key}>
                            <label className="flex items-center gap-1.5 text-[9px] text-[#E7B366] uppercase tracking-widest font-bold mb-1.5">
                              <Icon size={10}/> {label}
                            </label>
                            <input
                              type="text"
                              value={detailsDraft[key] || ''}
                              onChange={e => setDetailsDraft(d => ({ ...d, [key]: e.target.value }))}
                              className={`w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#E7B366]/40 transition-colors placeholder:text-white/15 ${mono ? 'font-mono' : ''}`}
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-[9px] text-[#E7B366] uppercase tracking-widest font-bold mb-1.5">
                          <FileText size={10}/> Project Brief
                        </label>
                        <textarea
                          rows={3}
                          value={detailsDraft.brief || ''}
                          onChange={e => setDetailsDraft(d => ({ ...d, brief: e.target.value }))}
                          className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E7B366]/40 transition-colors resize-none placeholder:text-white/15"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { icon: Package, label: 'Tier', value: selectedUser.projectDetails?.tier },
                        { icon: DollarSign, label: 'Investment', value: selectedUser.projectDetails?.investment || 'TBD' },
                        { icon: Calendar, label: 'Start Date', value: selectedUser.projectDetails?.startDate || '—' },
                        { icon: Key, label: 'Project Key', value: selectedUser.projectKey, mono: true, gold: true },
                        ...(selectedUser.email ? [{ icon: Mail, label: 'Email', value: selectedUser.email }] : []),
                        ...(selectedUser.projectDetails?.addons?.length > 0 ? [{ icon: Tag, label: 'Add-ons', value: Array.isArray(selectedUser.projectDetails.addons) ? selectedUser.projectDetails.addons.join(', ') : selectedUser.projectDetails.addons }] : []),
                      ].map(({ icon: Icon, label, value, mono, gold }) => (
                        <div key={label} className="p-4 rounded-2xl bg-white/[0.025] border border-white/8">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon size={11} className="text-[#E7B366]" />
                            <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">{label}</p>
                          </div>
                          <p className={`text-sm font-medium leading-snug ${gold ? 'text-[#E7B366]' : 'text-white/90'} ${mono ? 'font-mono' : ''}`}>{value}</p>
                        </div>
                      ))}
                    </div>
                    {selectedUser.projectDetails?.brief && (
                      <div className="mt-4 p-4 rounded-2xl bg-white/[0.025] border border-white/8 flex items-start gap-3">
                        <FileText size={13} className="text-[#E7B366] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-1.5">Project Brief</p>
                          <p className="text-white/70 text-sm font-light leading-relaxed">{selectedUser.projectDetails.brief}</p>
                        </div>
                      </div>
                    )}
                    </>
                  )}
                </section>

                {/* ── Portal Password ──────────────────────────── */}
                <section>
                  <h3 className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Lock size={10} className="text-[#E7B366]" /> Portal Access Password
                  </h3>
                  <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/8">
                    {selectedUser.portalPassword ? (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-emerald-400 text-xs flex items-center gap-1.5"><CheckCircle2 size={12}/> Password is set</span>
                        <span className="text-white/20 text-xs font-mono">{selectedUser.portalPassword.replace(/./g, '•')}</span>
                      </div>
                    ) : (
                      <p className="text-white/25 text-xs mb-4">No password set — client logs in with key only.</p>
                    )}
                    <form onSubmit={handleSetPassword} className="flex gap-3">
                      <div className="relative flex-1">
                        <input type={showPortalPassword ? 'text' : 'password'}
                          placeholder="Set or update password..."
                          value={portalPasswordInput}
                          onChange={e => setPortalPasswordInput(e.target.value)}
                          className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/40 transition-colors pr-10"
                          minLength={4} />
                        <button type="button" onClick={() => setShowPortalPassword(v => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white transition-colors">
                          {showPortalPassword ? <EyeOff size={13}/> : <Eye size={13}/>}
                        </button>
                      </div>
                      <button type="submit" disabled={!portalPasswordInput.trim()}
                        className="px-6 py-2.5 rounded-xl bg-[#E7B366] text-black font-bold text-[10px] tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-40">
                        {setPasswordSuccess ? 'Saved ✓' : 'Set'}
                      </button>
                    </form>
                  </div>
                </section>

                {/* ── Dispatch Update ──────────────────────────── */}
                {selectedUser.projectDetails?.status !== 'Completed' && (
                  <section>
                    <h3 className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Send size={10} className="text-[#E7B366]" /> Dispatch Update
                    </h3>
                    <form onSubmit={handlePostUpdate} className="p-5 rounded-2xl bg-white/[0.025] border border-white/8">
                      <textarea rows={3}
                        placeholder="Type a timeline update for the client portal..."
                        value={newUpdateMessage}
                        onChange={e => setNewUpdateMessage(e.target.value)}
                        className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#E7B366]/40 transition-colors resize-none mb-3"
                        required />
                      <div className="flex items-center justify-between">
                        {postSuccess
                          ? <span className="text-emerald-400 text-xs flex items-center gap-1.5"><CheckCircle2 size={12}/> Dispatched</span>
                          : <span className="text-white/25 text-xs">Appears in client portal immediately.</span>
                        }
                        <button type="submit" disabled={!newUpdateMessage.trim()}
                          className="px-6 py-2.5 rounded-xl bg-white/8 text-white font-bold text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-40">
                          Send
                        </button>
                      </div>
                    </form>
                  </section>
                )}

                {/* ── Message History ──────────────────────────── */}
                <section>
                  <h3 className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-4">
                    Dispatched History ({selectedUser.updates?.length || 0})
                  </h3>
                  {!selectedUser.updates?.length ? (
                    <p className="text-white/20 text-sm italic px-1">No updates dispatched yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {[...selectedUser.updates].reverse().map(update => (
                        <div key={update.id} className="group p-5 rounded-2xl bg-white/[0.025] border border-white/8 hover:border-white/15 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-[9px] uppercase tracking-widest text-[#E7B366] font-bold">{update.sender || 'Admin'}</span>
                                <span className="text-[9px] text-white/30 font-mono">{update.date}</span>
                                {update.editedAt && <span className="text-[9px] text-white/20 italic">edited</span>}
                              </div>

                              {editingUpdateId === update.id ? (
                                <div className="space-y-2">
                                  <textarea
                                    ref={editInputRef}
                                    value={editingText}
                                    onChange={e => setEditingText(e.target.value)}
                                    rows={3}
                                    className="w-full bg-[#050505] border border-[#E7B366]/30 rounded-xl p-3 text-white text-sm focus:outline-none resize-none"
                                  />
                                  <div className="flex gap-2">
                                    <button onClick={() => handleEditUpdate(update.id)}
                                      className="px-4 py-1.5 rounded-lg bg-[#E7B366] text-black font-bold text-[10px] tracking-wider uppercase hover:bg-white transition-colors flex items-center gap-1.5">
                                      <Save size={11}/> Save
                                    </button>
                                    <button onClick={() => setEditingUpdateId(null)}
                                      className="px-4 py-1.5 rounded-lg bg-white/5 text-white/50 font-bold text-[10px] tracking-wider uppercase hover:bg-white/10 transition-colors">
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-white/75 text-sm font-light leading-relaxed">{update.message}</p>
                              )}
                            </div>

                            {editingUpdateId !== update.id && (
                              <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => { setEditingUpdateId(update.id); setEditingText(update.message); }}
                                  className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-[#E7B366] hover:bg-[#E7B366]/10 transition-colors"
                                  title="Edit"
                                >
                                  <Pencil size={13} />
                                </button>
                                <button
                                  onClick={() => handleDeleteUpdate(update.id)}
                                  className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-10">
            <div className="max-w-xs">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.03] border border-white/8 flex items-center justify-center mb-5 text-white/15">
                <Users size={28} />
              </div>
              <h3 className="text-white/60 font-light text-lg mb-2">Select a Client</h3>
              <p className="text-white/25 text-sm font-light leading-relaxed">
                Choose a client from the sidebar to view their full project details and manage their portal.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
