import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const DigitalTwin = ({ crowdData, isEmergencyMode }) => {
  const [particles, setParticles] = useState([]);
  const [isSimulatingClosure, setIsSimulatingClosure] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate particles for each zone based on crowd density
    const newParticles = [];
    crowdData.forEach((zone, idx) => {
      // Scale count for visualization
      const count = Math.min(50, Math.ceil(zone.people / 10));

      // Simulation Logic: If Gate B is closed, move its particles to Gate C
      let targetZoneIdx = idx;
      if (isSimulatingClosure && zone.id === 'gate_b') {
          targetZoneIdx = crowdData.findIndex(z => z.id === 'gate_c');
          if (targetZoneIdx === -1) targetZoneIdx = idx;
      }

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: `${zone.id}-${i}`,
          zoneId: zone.id,
          x: (targetZoneIdx * 20) + 5 + Math.random() * 15,
          y: 20 + Math.random() * 60,
          color: isEmergencyMode ? '#ff0000' : isSimulatingClosure && zone.id === 'gate_b' ? '#a855f7' : '#00f0ff'
        });
      }
    });
    setParticles(newParticles);
  }, [crowdData, isEmergencyMode, isSimulatingClosure]);

  return (
    <div className="glass-card p-6 rounded-[32px] border border-white/10 h-[450px] relative overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h3 className="text-lg font-black uppercase tracking-tight">Digital Twin Simulation</h3>
            <p className="text-[10px] text-white/30 uppercase tracking-widest">Multi-Agent Flow Dynamics</p>
        </div>
        <div className="flex items-center gap-4">
            <button
                onClick={() => setIsSimulatingClosure(!isSimulatingClosure)}
                className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all ${isSimulatingClosure ? 'bg-purple-500 border-purple-400 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
            >
                {isSimulatingClosure ? 'Simulation: Gate B Closed' : 'Run What-If: Close Gate B'}
            </button>
            <div className="flex gap-2">
                <span className="live-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">SIM ACTIVE</span>
            </div>
        </div>
      </div>

      <div ref={containerRef} className="relative w-full h-[280px] bg-white/[0.02] rounded-2xl border border-white/5 perspective-1000">
        {/* Simple Venue Map Layout */}
        <div className="absolute inset-0 flex justify-around items-center opacity-10 pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1/6 h-3/4 border border-white rounded-xl" />
            ))}
        </div>

        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: `${p.x}%`,
              y: `${p.y}%`,
              scale: isEmergencyMode ? [1, 1.5, 1] : 1
            }}
            transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
            className="crowd-particle"
            style={{ backgroundColor: p.color }}
          />
        ))}

        {isEmergencyMode && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-[120px] font-black text-red-500 opacity-10 select-none">EVACUATE</div>
            </div>
        )}
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {crowdData.map(zone => (
            <div key={zone.id} className="flex items-center gap-2 whitespace-nowrap">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isEmergencyMode ? '#ff0000' : '#00f0ff' }} />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{zone.name}</span>
            </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalTwin;
