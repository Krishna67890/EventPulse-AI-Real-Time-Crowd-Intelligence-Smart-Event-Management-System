import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, Users, Settings, Plus, RotateCcw, AlertOctagon, Terminal, Database } from 'lucide-react';

const AdminPanel = () => {
  const [zones, setZones] = useState([]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commandLog, setCommandLog] = useState(['Initializing Kernel...', 'Neural Link Established.']);

  const addLog = (msg) => {
    setCommandLog(prev => [msg, ...prev].slice(0, 10));
  };

  useEffect(() => {
    const fetchStatus = async () => {
        const res = await fetch('http://localhost:5000/api/crowd/status');
        const data = await res.json();
        setZones(data.zones);
        setIsEmergency(data.isEmergencyMode);
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateZone = async (id, payload) => {
    setLoading(true);
    await fetch('http://localhost:5000/api/crowd/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...payload })
    });
    setLoading(false);
    addLog(`Zone ${id} updated: ${JSON.stringify(payload)}`);
  };

  const toggleEmergency = async () => {
    const newState = !isEmergency;
    setIsEmergency(newState);
    await fetch('http://localhost:5000/api/crowd/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emergency: newState })
    });
    addLog(`EMERGENCY PROTOCOL ${newState ? 'ACTIVATED' : 'DEACTIVATED'}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-12 font-mono">
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
        <div>
            <div className="flex items-center gap-3 text-neonBlue mb-2">
                <Terminal size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Overlord Console v2.0</span>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Command & Control Center</h1>
        </div>

        <div className="flex gap-4">
            <button
                onClick={toggleEmergency}
                className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl ${isEmergency ? 'bg-red-600 animate-pulse text-white shadow-[0_0_30px_rgba(255,0,0,0.5)]' : 'bg-white/5 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white'}`}
            >
                <AlertOctagon size={18} />
                {isEmergency ? 'ABORT PROTOCOL' : 'INITIATE EMERGENCY'}
            </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
                <Database size={18} className="text-neonBlue" />
                <h2 className="text-xl font-black uppercase tracking-tight">Zone Telemetry Management</h2>
            </div>

            <div className="grid gap-4">
                {zones.map(zone => (
                    <div key={zone.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between group hover:border-white/20 transition-all">
                        <div className="flex-1">
                            <p className="text-[10px] text-white/30 uppercase tracking-widest font-black mb-1">DATA_POINT_{zone.id.toUpperCase()}</p>
                            <h3 className="text-lg font-black uppercase tracking-tight">{zone.name}</h3>
                        </div>

                        <div className="flex gap-8 items-center">
                            <div className="text-center">
                                <p className="text-[8px] text-white/30 uppercase font-black mb-1">Density</p>
                                <p className="text-xl font-black tabular-nums">{zone.people}</p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateZone(zone.id, { people: zone.people + 50 })}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neonBlue hover:text-black transition-all"
                                >
                                    <Plus size={16} />
                                </button>
                                <button
                                    onClick={() => updateZone(zone.id, { people: Math.max(0, zone.people - 50) })}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-softPink hover:text-black transition-all"
                                >
                                    <RotateCcw size={16} className="rotate-180" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="p-8 bg-neonBlue/10 border border-neonBlue/30 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                    <Zap size={120} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-40">System Diagnostics</h4>
                <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                        <span className="text-xs uppercase font-black opacity-30">Uptime</span>
                        <span className="text-sm font-black tabular-nums">99.98%</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                        <span className="text-xs uppercase font-black opacity-30">Nodes Connected</span>
                        <span className="text-sm font-black tabular-nums">14 / 14</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                        <span className="text-xs uppercase font-black opacity-30">AI Latency</span>
                        <span className="text-sm font-black tabular-nums">12ms</span>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl h-[400px] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <Terminal size={14} className="text-white/40" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Live Command Stream</h4>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
                    {commandLog.map((log, i) => (
                        <div key={i} className="text-[11px] font-mono border-l border-white/10 pl-3 leading-relaxed">
                            <span className="text-white/20">[{new Date().toLocaleTimeString()}]</span> <span className="text-neonBlue">SYST_LOG:</span> {log}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
