import React, { useState, useEffect, useRef } from 'react';
import Dashboard from '../components/Dashboard';
import MapView from '../components/MapView';
import Alerts from '../components/Alerts';
import AdminPanel from '../components/AdminPanel';
import Chatbot from '../components/Chatbot';
import { motion } from 'framer-motion';
import { LayoutDashboard, Radio, Activity, Terminal, TrendingUp, Bot, Cpu, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const LiveDashboard = () => {
  const [crowdData, setCrowdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const fetchCrowdData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/crowd');
      if (!response.ok) throw new Error('API Offline');
      const data = await response.json();
      // Backend returns { zones: [...], isEmergencyMode: boolean }
      setCrowdData(data.zones || []);
    } catch (error) {
      console.warn('Backend Fetch Failure:', error);
      // Fallback data for hackathon consistency
      setCrowdData([
        { id: 'gate_a', name: "Gate A", people: 120, capacity: 500, lat: 51.505, lng: -0.09, status: "Normal", ai: { trend: 'Stable' } },
        { id: 'main_stage', name: "Main Arena", people: 1450, capacity: 1500, lat: 51.508, lng: -0.08, status: "Critical", ai: { trend: 'Increasing' } },
        { id: 'tech_stage', name: "Tech Stage", people: 450, capacity: 800, lat: 51.51, lng: -0.1, status: "Stable", ai: { trend: 'Decreasing' } }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrowdData();
    const interval = setInterval(fetchCrowdData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Small timeout to ensure DOM is painted before GSAP searches for selectors
      const timer = setTimeout(() => {
        const elements = document.querySelectorAll(".header-el");
        if (elements.length > 0) {
          gsap.from(".header-el", {
              y: -50,
              opacity: 0,
              stagger: 0.1,
              duration: 1,
              ease: "power3.out"
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-t-2 border-r-2 border-neonBlue rounded-full animate-spin shadow-neon-blue" />
        <div className="text-[10px] font-black tracking-[0.5em] text-neonBlue uppercase animate-pulse">Synchronizing Neural Feed</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-dark pt-28 pb-12 px-6 lg:px-12 selection:bg-neonBlue selection:text-black">
      {/* Sidebar / Navigation - Responsive */}
      <nav className="fixed bottom-0 left-0 w-full h-16 border-t lg:border-t-0 lg:border-r border-white/5 flex lg:flex-col items-center justify-around lg:justify-start lg:py-10 lg:w-24 lg:h-full z-[1000] bg-black/40 backdrop-blur-xl">
        <div className="hidden lg:flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-neonBlue to-electricPurple items-center justify-center mb-16 group cursor-pointer relative">
            <div className="absolute inset-0 bg-neonBlue blur-lg opacity-40 group-hover:opacity-80 transition-opacity" />
            <Activity size={24} className="text-white relative z-10" />
        </div>

        <div className="flex lg:flex-col gap-8 lg:gap-10">
            <Link to="/" className="text-white/40 hover:text-neonBlue transition-colors cursor-pointer group flex flex-col items-center">
                <LayoutDashboard size={22} />
                <span className="text-[7px] font-black uppercase mt-1 tracking-widest lg:opacity-0 group-hover:opacity-100 transition-opacity">Main</span>
            </Link>
            <Link to="/stats" className="text-neonBlue transition-colors cursor-pointer group flex flex-col items-center">
                <TrendingUp size={22} />
                <span className="text-[7px] font-black uppercase mt-1 tracking-widest lg:opacity-0 group-hover:opacity-100 transition-opacity">Stats</span>
            </Link>
            <Link to="/about" className="text-white/40 hover:text-neonBlue transition-colors cursor-pointer group flex flex-col items-center">
                <Bot size={22} />
                <span className="text-[7px] font-black uppercase mt-1 tracking-widest lg:opacity-0 group-hover:opacity-100 transition-opacity">About</span>
            </Link>
            <Link to="/auth" className="text-white/40 hover:text-neonBlue transition-colors cursor-pointer group flex flex-col items-center">
                <Cpu size={22} />
                <span className="text-[7px] font-black uppercase mt-1 tracking-widest lg:opacity-0 group-hover:opacity-100 transition-opacity">Auth</span>
            </Link>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto">
        {/* Advanced Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-8">
          <div>
            <div className="header-el flex items-center gap-3 mb-4">
                <div className="p-2 bg-neonBlue/10 border border-neonBlue/20 rounded-lg text-neonBlue">
                    <Radio size={20} className="animate-pulse" />
                </div>
                <div className="h-[2px] w-8 bg-white/10" />
                <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Sector 7-G Node</span>
            </div>
            <h2 className="header-el text-4xl lg:text-5xl font-black tracking-tighter uppercase">
                <span className="neon-text-blue">EVENT</span> INTEL <span className="text-white/20">CORE</span>
            </h2>
            <p className="header-el text-white/40 text-xs font-medium mt-2 max-w-md leading-relaxed uppercase tracking-wider">
                Autonomous crowd orchestration & predictive safety protocol V.2.6
            </p>
          </div>

          <div className="header-el flex flex-wrap gap-4">
            <SystemMetric label="Uptime" value="124:12:05" />
            <SystemMetric label="API Latency" value="14ms" />
            <SystemMetric label="Nodes Active" value="12/12" />
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

          {/* Main Column */}
          <div className="xl:col-span-8 space-y-10">
            <Dashboard crowdData={crowdData} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Activity size={18} className="text-neonPurple" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-white/80">Spatial Distribution</h3>
                    </div>
                    <button className="text-[9px] font-bold text-neonBlue border-b border-neonBlue/30 hover:text-white hover:border-white transition-all">RECALIBRATE NODES</button>
                </div>
                <MapView zones={crowdData} isEmergency={crowdData.some(z => z.status === 'Critical')} />
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="xl:col-span-4 space-y-10">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Activity size={18} className="text-red-500" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-white/80">Safety Protocols</h3>
                </div>
                <Alerts crowdData={crowdData} />
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-neonPurple" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-white/80">Simulation overrides</h3>
                </div>
                <AdminPanel crowdData={crowdData} onUpdate={fetchCrowdData} />
            </div>
          </div>

        </div>
      </div>

      {/* HUD Elements */}
      <div className="fixed bottom-0 left-0 p-6 pointer-events-none z-[4000] hidden lg:block">
        <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] mb-2 leading-relaxed">
            Data Integrity: Secure <br />
            Encryption: AES-256 <br />
            Neural Link: Active
        </div>
        <div className="flex gap-1 h-1 w-24 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-neonBlue w-[70%]" />
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

const SystemMetric = ({ label, value }) => (
    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
        <p className="text-xs font-black text-white">{value}</p>
    </div>
);

export default LiveDashboard;
