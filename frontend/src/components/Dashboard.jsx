import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, Clock, AlertTriangle, TrendingUp, Zap, Target } from 'lucide-react';
import { getAIStatus, calculateWaitTime } from '../utils/aiLogic';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Dashboard = ({ crowdData = [] }) => {
  const [history, setHistory] = useState([]);
  const dashboardRef = useRef(null);

  useEffect(() => {
    if (crowdData && crowdData.length > 0) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const totalPeople = (crowdData || []).reduce((sum, zone) => sum + (zone.people || 0), 0);
      setHistory(prev => [...prev.slice(-19), { time: timestamp, people: totalPeople }]);
    }
  }, [crowdData]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".stat-card", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out"
        });
    }, dashboardRef);
    return () => ctx.revert();
  }, []);

  const COLORS = ['#00f3ff', '#bc13fe', '#f59e0b', '#ef4444', '#ffffff'];

  const safeData = Array.isArray(crowdData) ? crowdData : [];

  const pieData = safeData.map(zone => ({
    name: zone.name || 'Unknown',
    value: zone.people || 0
  }));

  const waitTimesData = safeData.map(zone => ({
    name: zone.name || 'Unknown',
    wait: calculateWaitTime(zone.people || 0, zone.servicePoints || 1, zone.avgServiceTime || 5)
  }));

  const totalPeople = safeData.reduce((sum, zone) => sum + (zone.people || 0), 0);
  const avgWait = waitTimesData.length > 0
    ? Math.round(waitTimesData.reduce((sum, z) => sum + (z.wait || 0), 0) / waitTimesData.length)
    : 0;
  const highRiskCount = safeData.filter(z => (z.people || 0) / (z.capacity || 1) > 0.7).length;

  return (
    <div ref={dashboardRef} className="space-y-8">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="text-neonBlue" size={20} />}
          title="ACTIVE ATTENDEES"
          value={totalPeople.toLocaleString()}
          sub="+12% from last hour"
          color="blue"
        />
        <StatCard
          icon={<Clock className="text-neonPurple" size={20} />}
          title="AVG. WAIT TIME"
          value={`${avgWait} MIN`}
          sub="Optimal flow detected"
          color="purple"
        />
        <StatCard
          icon={<Target className="text-amber-500" size={20} />}
          title="AI CONFIDENCE"
          value="96.4%"
          sub="Real-time calibration"
          color="amber"
        />
        <StatCard
          icon={<AlertTriangle className={highRiskCount > 0 ? "text-red-500 animate-pulse" : "text-emerald-500"} size={20} />}
          title="RISK ZONES"
          value={highRiskCount}
          sub={highRiskCount > 0 ? "Action Required" : "System Clear"}
          color={highRiskCount > 0 ? "red" : "emerald"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 glassmorphism p-8 min-h-[450px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={120} />
          </div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
                <h3 className="text-xl font-bold tracking-tight">CROWD VOLUME TREND</h3>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Real-time telemetry feed</p>
            </div>
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-neonBlue/10 border border-neonBlue/20 rounded text-[10px] text-neonBlue font-bold">LIVE</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="75%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorPeople" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="time" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid #333', borderRadius: '12px' }}
                itemStyle={{ color: '#00f3ff', fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="people" stroke="#00f3ff" strokeWidth={3} fillOpacity={1} fill="url(#colorPeople)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Prediction Breakdown */}
        <div className="glassmorphism p-8 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold tracking-tight mb-6">AI PREDICTIONS</h3>
                <div className="space-y-6">
                    {(crowdData || []).slice(0, 4).map((zone, idx) => {
                        const status = getAIStatus(zone.people || 0, zone.capacity || 1);
                        return (
                            <div key={zone.id} className="relative">
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <p className="text-xs font-bold text-white/80">{zone.name}</p>
                                        <p className="text-[10px] text-white/40 uppercase">Confidence: {status.score}%</p>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-tighter" style={{ color: status.color }}>{status.level}</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((zone.people || 0) / (zone.capacity || 1)) * 100}%` }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: status.color }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mt-8 p-4 bg-neonPurple/5 border border-neonPurple/10 rounded-2xl flex items-center gap-4">
                <div className="p-2 bg-neonPurple/10 rounded-xl text-neonPurple"><Zap size={20} /></div>
                <div>
                    <p className="text-xs font-bold text-neonPurple uppercase tracking-widest">AI SUGGESTION</p>
                    <p className="text-[10px] text-white/60 leading-tight">Congestion expected at Gate A in 12 mins. Redirecting staff now.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, sub, color }) => {
  const colors = {
    blue: "border-neonBlue text-neonBlue",
    purple: "border-neonPurple text-neonPurple",
    amber: "border-amber-500 text-amber-500",
    red: "border-red-500 text-red-500",
    emerald: "border-emerald-500 text-emerald-500"
  };

  return (
    <div className={`stat-card glassmorphism p-6 border-l-2 ${colors[color]} group hover:bg-white/[0.03] transition-colors cursor-default`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">{icon}</div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
      </div>
      <p className="text-[10px] text-white/40 font-black tracking-[0.2em] mb-1">{title}</p>
      <h4 className="text-3xl font-black mb-2 tracking-tighter">{value}</h4>
      <p className="text-[10px] font-medium text-white/20">{sub}</p>
    </div>
  );
};

export default Dashboard;
