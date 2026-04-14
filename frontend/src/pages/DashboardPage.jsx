import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  Zap,
  ShieldAlert,
  Compass,
  LayoutDashboard,
  Bot,
  RefreshCw,
  Cpu,
  User
} from 'lucide-react';

import MapView from '../components/MapView';
import DigitalTwin from '../components/DigitalTwin';
import FuturePrediction from '../components/FuturePrediction';
import VoiceAssistant from '../components/VoiceAssistant';
import { generateSuggestions } from '../utils/aiLogic';

import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  // ... existing states ...
  const [crowdData, setCrowdData] = useState([]);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lowNetworkMode, setLowNetworkMode] = useState(false);
  const [explorerScore] = useState(7420);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/crowd/status');
        if (!res.ok) throw new Error('Backend Offline');
        const data = await res.json();
        const zones = data.zones || [];
        setCrowdData(zones);
        setIsEmergencyMode(!!data.isEmergencyMode);
        setSuggestions(generateSuggestions(zones));
        if (!selectedZone && zones.length > 0) setSelectedZone(zones[0]);
      } catch (error) {
        console.warn("Using Fallback Data:", error);
        setLowNetworkMode(true);
        // Fallback dummy data if backend fails
        // Advanced Multi-Node Global Network (Expanded)
        const dummyZones = [
          { id: 'gate_a', name: "Alpha Sector (Gate A)", lat: 51.508, lng: -0.085, people: 1450, capacity: 1500, waitTime: 18, comfortScore: 35, ai: { current: { color: '#ff0000' } } },
          { id: 'main_stage', name: "Neural Core (Main Stage)", lat: 51.51, lng: -0.09, people: 4950, capacity: 5000, waitTime: 55, comfortScore: 10, ai: { current: { color: '#ff0000' } } },
          { id: 'airport_link', name: "Aero-Transit Hub", lat: 51.518, lng: -0.1, people: 2800, capacity: 3000, waitTime: 40, comfortScore: 40, ai: { current: { color: '#ff4d00' } } },
          { id: 'hospital_city', name: "Global Medical Center", lat: 51.514, lng: -0.075, people: 300, capacity: 1000, waitTime: 10, comfortScore: 90, ai: { current: { color: '#00f0ff' } } },
          { id: 'food_court_1', name: "Sustenance Hub A", lat: 51.505, lng: -0.08, people: 850, capacity: 1000, waitTime: 25, comfortScore: 45, ai: { current: { color: '#ffcc00' } } },
          { id: 'food_court_2', name: "Sustenance Hub B", lat: 51.503, lng: -0.092, people: 920, capacity: 1000, waitTime: 30, comfortScore: 30, ai: { current: { color: '#ff4d00' } } },
          { id: 'washroom_north', name: "North Sanitation", lat: 51.512, lng: -0.088, people: 180, capacity: 200, waitTime: 12, comfortScore: 40, ai: { current: { color: '#ffcc00' } } },
          { id: 'washroom_south', name: "South Sanitation", lat: 51.5, lng: -0.085, people: 195, capacity: 200, waitTime: 15, comfortScore: 20, ai: { current: { color: '#ff0000' } } },
          { id: 'vip_lounge', name: "Zenith Lounge (VIP)", lat: 51.509, lng: -0.095, people: 120, capacity: 500, waitTime: 2, comfortScore: 98, ai: { current: { color: '#00f0ff' } } },
          { id: 'exit_east', name: "Eastern Gateway", lat: 51.507, lng: -0.075, people: 400, capacity: 2000, waitTime: 1, comfortScore: 95, ai: { current: { color: '#00f0ff' } } },
          { id: 'medical_tent_1', name: "Field Med-Link 01", lat: 51.511, lng: -0.082, people: 85, capacity: 100, waitTime: 25, comfortScore: 40, ai: { current: { color: '#ffcc00' } } },
          { id: 'wifi_zone_1', name: "Data Uplink Alpha", lat: 51.506, lng: -0.089, people: 980, capacity: 1000, waitTime: 0, comfortScore: 15, ai: { current: { color: '#ff0000' } } },
          { id: 'charging_hub', name: "Power Grid Base", lat: 51.513, lng: -0.081, people: 380, capacity: 400, waitTime: 35, comfortScore: 25, ai: { current: { color: '#ff0000' } } },
          { id: 'merch_stand_alpha', name: "Asset Distribution A", lat: 51.504, lng: -0.084, people: 750, capacity: 800, waitTime: 28, comfortScore: 35, ai: { current: { color: '#ff4d00' } } },
          { id: 'merch_stand_beta', name: "Asset Distribution B", lat: 51.516, lng: -0.087, people: 100, capacity: 800, waitTime: 2, comfortScore: 95, ai: { current: { color: '#00f0ff' } } },
          { id: 'entry_beta', name: "Beta Transit Link", lat: 51.515, lng: -0.092, people: 200, capacity: 2000, waitTime: 2, comfortScore: 92, ai: { current: { color: '#00f0ff' } } },
          { id: 'security_post_4', name: "Guardian Post 04", lat: 51.502, lng: -0.086, people: 120, capacity: 300, waitTime: 4, comfortScore: 88, ai: { current: { color: '#00f0ff' } } },
          { id: 'stadium_west', name: "Grand Stadium (West)", lat: 51.52, lng: -0.08, people: 8500, capacity: 10000, waitTime: 20, comfortScore: 60, ai: { current: { color: '#ffcc00' } } }
        ];
        setCrowdData(dummyZones);
        if (!selectedZone) setSelectedZone(dummyZones[0]);
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(fetchData, 3000);
    fetchData();
    return () => clearInterval(interval);
  }, [selectedZone]);

  // Apply emergency class to body and trigger voice
  useEffect(() => {
    if (isEmergencyMode) {
        document.body.classList.add('emergency-mode');
        // Guardian Voice Protocol
        const speech = new SpeechSynthesisUtterance("Critical density detected at Gate A. Redirecting all traffic to Exit B. Please follow the green illuminated paths.");
        speech.rate = 0.9;
        speech.pitch = 0.8;
        window.speechSynthesis.speak(speech);
    } else {
        document.body.classList.remove('emergency-mode');
        window.speechSynthesis.cancel();
    }
  }, [isEmergencyMode]);

  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-24 h-24 border-2 border-neonBlue rounded-full animate-ping flex items-center justify-center">
            <Cpu size={40} className="text-neonBlue animate-pulse" />
        </div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[1em] text-neonBlue animate-pulse">Initializing Neural Link</p>
    </div>
  );

  return (
    <div className={`min-h-screen relative overflow-hidden pb-20 transition-colors duration-1000 ${isOffline ? 'grayscale contrast-125' : ''}`}>
      <div className="glow-cursor" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="scanline" />

      {/* Ghost Mode Alert */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 w-full h-8 bg-amber-500 z-[10000] flex items-center justify-center gap-2"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-black">Offline: AI predicting flow based on 5-min trend</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Alert Bar */}
      <AnimatePresence>
        {isEmergencyMode && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 w-full h-12 bg-red-600 z-[9999] flex items-center justify-center gap-4 border-b border-red-400/50 shadow-[0_0_30px_rgba(255,0,0,0.5)]"
          >
            <ShieldAlert className="animate-pulse text-white" size={20} />
            <span className="text-sm font-black uppercase tracking-[0.2em] text-white">EMERGENCY PROTOCOL ACTIVE: EVACUATE VIA GATE B IMMEDIATELY</span>
            <div className="flex gap-1">
                {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: `${i*0.2}s` }} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar / Navigation - Responsive */}
      <nav className="fixed bottom-0 left-0 w-full h-16 border-t lg:border-t-0 lg:border-r border-white/5 flex lg:flex-col items-center justify-around lg:justify-start lg:py-10 lg:w-24 lg:h-full z-[1000] bg-black/40 backdrop-blur-xl">
        <div className="hidden lg:flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-neonBlue to-electricPurple items-center justify-center mb-16 group cursor-pointer relative">
            <div className="absolute inset-0 bg-neonBlue blur-lg opacity-40 group-hover:opacity-80 transition-opacity" />
            <Activity size={24} className="text-white relative z-10" />
        </div>

        <div className="flex lg:flex-col gap-8 lg:gap-10">
            <Link to="/" className="text-neonBlue transition-colors cursor-pointer group flex flex-col items-center">
                <LayoutDashboard size={22} />
                <span className="text-[7px] font-black uppercase mt-1 tracking-widest lg:opacity-0 group-hover:opacity-100 transition-opacity">Main</span>
            </Link>
            <Link to="/stats" className="text-white/40 hover:text-neonBlue transition-colors cursor-pointer group flex flex-col items-center">
                <TrendingUp size={22} />
                <span className="text-[7px] font-black uppercase mt-1 tracking-widest lg:opacity-0 group-hover:opacity-100 transition-opacity">Stats</span>
            </Link>
            <Link to="/profile" className="text-white/40 hover:text-neonBlue transition-colors cursor-pointer group flex flex-col items-center">
                <User size={22} />
                <span className="text-[7px] font-black uppercase mt-1 tracking-widest lg:opacity-0 group-hover:opacity-100 transition-opacity">Profile</span>
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

        <div className="hidden lg:block mt-auto">
            <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/20 hover:text-white transition-colors cursor-pointer">
                <RefreshCw size={18} />
            </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="lg:ml-24 p-4 md:p-10 max-w-[1600px] mx-auto mb-32 lg:mb-0">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
            <div>
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-wrap items-center gap-4 mb-4 md:mb-2"
                >
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 border ${isEmergencyMode ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-neonBlue/10 border-neonBlue/50 text-neonBlue'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full animate-ping ${isEmergencyMode ? 'bg-red-500' : 'bg-neonBlue'}`} />
                        System Synchronized
                    </div>
                    {lowNetworkMode && (
                        <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/50 text-orange-500 text-[10px] font-black uppercase tracking-widest">
                            Low Connectivity Mode
                        </div>
                    )}
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-gradient">
                    Neural Intelligence<br />
                    <span className="text-white/20">Telemetry Dashboard</span>
                </h1>
            </div>

            <div className="text-left md:text-right w-full md:w-auto flex md:flex-col justify-between items-center md:items-end bg-white/5 md:bg-transparent p-4 md:p-0 rounded-2xl border border-white/5 md:border-0">
                <div className="flex items-center justify-end gap-3 md:mb-2">
                    <div className="text-left md:text-right">
                        <p className="text-[10px] text-white/40 uppercase tracking-widest leading-none mb-1">Explorer Score</p>
                        <p className="text-2xl md:text-3xl font-black text-neonBlue tabular-nums">{explorerScore}</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Zap size={20} className="text-neonBlue" />
                    </div>
                </div>
                <p className="hidden md:block text-[10px] text-white/20 uppercase font-black tracking-tighter">Efficient Navigator Badge Earned</p>
            </div>
        </header>

        {/* Top Grid: Real-Time Stats & Suggestions */}
        <div className="grid grid-cols-12 gap-8 mb-8">
            {/* AI Suggestions Panel */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <Bot size={20} className="text-neonBlue" />
                    <h3 className="text-xl font-black uppercase tracking-tight">AI Insights</h3>
                </div>
                {suggestions.map((s, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`glass-card p-5 rounded-3xl border-l-4 ${s.type === 'AVOID' ? 'border-l-softPink' : 'border-l-neonBlue'} hover:bg-white/[0.05] transition-all cursor-pointer relative group`}
                    >
                        <div className="absolute top-4 right-4 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 opacity-40 group-hover:opacity-100 transition-opacity">
                            {s.impact}
                        </div>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${s.type === 'AVOID' ? 'text-softPink' : 'text-neonBlue'}`}>{s.type}</p>
                        <h4 className="text-sm font-black uppercase tracking-tight mb-1">{s.title}</h4>
                        <p className="text-[11px] text-white/40 font-medium leading-relaxed">{s.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Visual: Map / Digital Twin */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                <div className="h-[500px] rounded-[40px] overflow-hidden border border-white/5 relative shadow-2xl">
                    <MapView zones={crowdData} isEmergency={isEmergencyMode} />
                    <div className="absolute top-6 left-6 z-[400] flex gap-2">
                        <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer">
                            Satellite Link
                        </div>
                        <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer">
                            Density Overlay
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Grid: Prediction & Detailed Analytics */}
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
                <FuturePrediction zone={selectedZone} />
            </div>

            <div className="col-span-12 lg:col-span-7">
                <DigitalTwin crowdData={crowdData} isEmergencyMode={isEmergencyMode} />
            </div>
        </div>

        {/* Zone Selector Strip */}
        <div className="fixed bottom-16 lg:bottom-0 left-0 lg:left-24 right-0 p-4 md:p-6 bg-gradient-to-t from-black to-transparent z-[100]">
            <div className="flex gap-4 overflow-x-auto no-scrollbar max-w-[1200px] mx-auto pb-4 lg:pb-0">
                {crowdData.map(zone => (
                    <motion.div
                        key={zone.id}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedZone(zone)}
                        className={`min-w-[180px] p-4 rounded-2xl flex flex-col gap-1 text-left transition-all cursor-pointer ${selectedZone?.id === zone.id ? 'glass-card border-neonBlue shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'bg-white/[0.02] border border-white/5 opacity-50'}`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">ZONE ID: {zone.id.split('_')[0]}</span>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.ai.current.color }} />
                        </div>
                        <p className="text-xs font-black uppercase tracking-tight truncate">{zone.name}</p>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-[8px] font-bold text-white/40">COMFORT: {Number.isNaN(zone.comfortScore) ? 85 : zone.comfortScore}%</span>
                            <span className="text-[8px] font-bold text-neonBlue">WAIT: {zone.waitTime}m</span>
                        </div>
                        {zone.people > zone.capacity * 0.7 && (
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               console.log("Joining queue for", zone.id);
                             }}
                             className="mt-2 py-1 bg-white/10 hover:bg-neonBlue hover:text-black rounded-lg text-[8px] font-black uppercase tracking-widest transition-all"
                           >
                               Join Virtual Queue
                           </button>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>

        <VoiceAssistant />
      </main>
    </div>
  );
};

export default DashboardPage;
