import React from 'react';
import { motion } from 'framer-motion';
import { Binary, ChevronLeft, BookOpen, Shield, Code2, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentationPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonBlue/5 blur-[150px] rounded-full" />

            <nav className="max-w-4xl mx-auto mb-16 flex items-center justify-between">
                <button
                    onClick={() => navigate('/about')}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-neonBlue transition-colors group"
                >
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to About
                </button>
                <div className="flex items-center gap-3">
                    <Binary className="text-neonBlue" size={20} />
                    <span className="text-xl font-black tracking-tighter uppercase">Docs <span className="text-neonBlue">v1.0</span></span>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <BookOpen className="text-neonBlue" />
                            <h2 className="text-2xl font-black uppercase tracking-tight">Executive Summary</h2>
                        </div>
                        <p className="text-white/40 leading-relaxed text-lg">
                            EventPulse AI is a high-performance neural infrastructure designed for smart city crowd intelligence.
                            It utilizes multi-agent flow telemetry to predict and manage urban density in real-time,
                            ensuring safety and efficiency for massive events.
                        </p>
                    </section>

                    <div className="grid md:grid-cols-2 gap-8">
                        <DocCard
                            icon={<Shield className="text-emerald-400" />}
                            title="Safety Protocol"
                            desc="Automated evacuation logic (Guardian Protocol) triggers when density exceeds 85% capacity in any node."
                        />
                        <DocCard
                            icon={<Cpu className="text-purple-400" />}
                            title="Neural Engine"
                            desc="Uses Kalman Filtering to smooth telemetry data and predict crowd intent 10 minutes into the future."
                        />
                    </div>

                    <section className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Code2 className="text-neonBlue" />
                            <h3 className="font-black uppercase text-sm tracking-widest text-white/60">Developer Integration</h3>
                        </div>
                        <div className="bg-black p-4 rounded-xl font-mono text-xs text-emerald-500 overflow-x-auto">
                            <code>{`// Initialize Neural Link\nconst pulse = new EventPulseCore({\n  paxLimit: 5000,\n  autoEvac: true,\n  predictionWindow: '10m'\n});`}</code>
                        </div>
                    </section>
                </motion.div>
            </main>
        </div>
    );
};

const DocCard = ({ icon, title, desc }) => (
    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-neonBlue/30 transition-all group">
        <div className="mb-4">{icon}</div>
        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-2">{title}</h4>
        <p className="text-white/30 text-xs leading-relaxed">{desc}</p>
    </div>
);

export default DocumentationPage;
