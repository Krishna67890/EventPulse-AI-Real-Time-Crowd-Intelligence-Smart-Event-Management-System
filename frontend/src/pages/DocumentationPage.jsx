import React from 'react';
import { motion } from 'framer-motion';
import { Binary, ChevronLeft, BookOpen, Shield, Code2, Cpu, Globe, Zap, Database, Activity, Map, Radio, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentationPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 relative overflow-hidden selection:bg-neonBlue selection:text-black">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonBlue/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[150px] rounded-full" />

            <nav className="max-w-5xl mx-auto mb-16 flex items-center justify-between relative z-10">
                <button
                    onClick={() => navigate('/about')}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-neonBlue transition-colors group px-4 py-2 bg-white/5 rounded-full border border-white/5 hover:border-neonBlue/30"
                >
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to About
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neonBlue/10 rounded-xl flex items-center justify-center border border-neonBlue/20">
                        <Binary className="text-neonBlue" size={20} />
                    </div>
                    <div>
                        <span className="text-xl font-black tracking-tighter uppercase block leading-none">Protocol <span className="text-neonBlue">v1.0.4</span></span>
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Neural Documentation</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-16"
                >
                    {/* Header Section */}
                    <header className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-neonBlue/10 border border-neonBlue/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-neonBlue animate-pulse" />
                            <span className="text-[8px] font-black text-neonBlue uppercase tracking-widest">System Architecture</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                            Smart City <br />
                            <span className="text-white/20">Intelligence Core</span>
                        </h1>
                        <p className="text-white/40 leading-relaxed text-lg max-w-2xl">
                            EventPulse AI is a high-performance neural infrastructure designed for multi-agent flow telemetry.
                            The system utilizes advanced spatial indexing and non-linear dynamics to predict urban density in real-time.
                        </p>
                    </header>

                    {/* Core Systems Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <DocCard
                            icon={<Map className="text-neonBlue" />}
                            title="Spatial Mesh"
                            desc="Real-time 1:1 mapping of urban environments using geospatial vector tiles and neural overlays."
                        />
                        <DocCard
                            icon={<Radio className="text-amber-400" />}
                            title="Telemetry Ingress"
                            desc="Processes 1.2TB of multi-source data per second with sub-14ms end-to-end latency."
                        />
                        <DocCard
                            icon={<ShieldAlert className="text-red-500" />}
                            title="Guardian Protocol"
                            desc="Automated emergency routing and bottleneck mitigation triggered at 85% density thresholds."
                        />
                    </div>

                    {/* Technical Implementation */}
                    <section className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                                    <Cpu className="text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-tight">Neural Engine</h2>
                            </div>
                            <p className="text-white/40 text-sm leading-relaxed">
                                Our core uses Kalman Filtering and Agent-Based Modeling (ABM) to simulate crowd intent.
                                The engine predicts bottleneck formations 10 minutes before they manifest physically.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-[10px] font-black text-white/60 uppercase tracking-widest">
                                    <div className="w-1 h-1 rounded-full bg-neonBlue" /> Dynamic Load Balancing
                                </li>
                                <li className="flex items-center gap-3 text-[10px] font-black text-white/60 uppercase tracking-widest">
                                    <div className="w-1 h-1 rounded-full bg-neonBlue" /> Zero-Knowledge Privacy
                                </li>
                                <li className="flex items-center gap-3 text-[10px] font-black text-white/60 uppercase tracking-widest">
                                    <div className="w-1 h-1 rounded-full bg-neonBlue" /> Multi-Source Fusion
                                </li>
                            </ul>
                        </div>

                        <div className="glassmorphism border border-white/10 rounded-[2.5rem] overflow-hidden">
                            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                                </div>
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] ml-auto">integration.js</span>
                            </div>
                            <div className="p-8 font-mono text-xs text-emerald-500/80 leading-relaxed">
                                <code className="block mb-2">
                                    <span className="text-purple-400">const</span> <span className="text-neonBlue">engine</span> = <span className="text-purple-400">new</span> <span className="text-amber-400">NeuralCore</span>({`{`}
                                </code>
                                <code className="block ml-4">
                                    paxLimit: <span className="text-orange-400">8500</span>,
                                </code>
                                <code className="block ml-4">
                                    mode: <span className="text-emerald-400">'PREDICTIVE'</span>,
                                </code>
                                <code className="block ml-4">
                                    autoEvac: <span className="text-orange-400">true</span>
                                </code>
                                <code className="block">
                                    {`}`});
                                </code>
                                <code className="block mt-4 text-white/20">
                                    // System initialized with 99.9% accuracy
                                </code>
                            </div>
                        </div>
                    </section>

                    {/* Infrastructure Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatBox label="API Latency" value="14ms" sub="Global Avg" />
                        <StatBox label="Concurrent" value="10k+" sub="Active Agents" />
                        <StatBox label="Security" value="AES-512" sub="Encrypted" />
                        <StatBox label="Sync" value="Real-time" sub="Neural Link" />
                    </div>
                </motion.div>
            </main>

            <footer className="max-w-5xl mx-auto mt-24 py-12 border-t border-white/5 text-center relative z-10">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">
                    End of Document // EventPulse AI Protocol v1.0.4
                </p>
            </footer>
        </div>
    );
};

const DocCard = ({ icon, title, desc }) => (
    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:border-neonBlue/30 transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-neonBlue/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-neonBlue/10 transition-all" />
        <div className="mb-6 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-neonBlue/30 transition-all">
            {icon}
        </div>
        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-3 group-hover:text-neonBlue transition-colors">{title}</h4>
        <p className="text-white/30 text-[11px] leading-relaxed font-bold uppercase tracking-tight">{desc}</p>
    </div>
);

const StatBox = ({ label, value, sub }) => (
    <div className="p-6 bg-white/[0.01] border border-white/5 rounded-3xl text-center">
        <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-2">{label}</p>
        <p className="text-xl font-black text-white mb-1">{value}</p>
        <p className="text-[7px] font-black text-neonBlue uppercase tracking-[0.2em]">{sub}</p>
    </div>
);

export default DocumentationPage;

export default DocumentationPage;
