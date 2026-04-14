import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, X } from 'lucide-react';

const Alerts = ({ crowdData }) => {
  const [alerts, setAlerts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const highDensityZones = crowdData.filter(zone => zone.people > 300);

    if (highDensityZones.length > 0) {
      const newAlerts = highDensityZones.map(zone => ({
        id: zone.id,
        message: `CRITICAL: ${zone.name} is reaching maximum capacity!`,
        time: new Date().toLocaleTimeString(),
        type: 'danger'
      }));

      setAlerts(newAlerts);
      setShowNotification(true);

      // Play alert sound (optional)
      // const audio = new Audio('/alert.mp3');
      // audio.play().catch(e => console.log("Sound blocked by browser"));
    } else {
      setAlerts([]);
      setShowNotification(false);
    }
  }, [crowdData]);

  return (
    <>
      <AnimatePresence>
        {showNotification && alerts.length > 0 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-24 right-6 z-[3000] w-80 glassmorphism border-l-4 border-red-500 p-4 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <AlertTriangle size={20} />
                <span className="font-black text-xs uppercase tracking-tighter">Emergency Alert</span>
              </div>
              <button onClick={() => setShowNotification(false)}><X size={16} /></button>
            </div>
            <p className="text-sm font-bold text-white mb-2">{alerts[0].message}</p>
            <p className="text-[10px] text-white/40">Triggered at {alerts[0].time}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glassmorphism p-6">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <Bell size={20} className="text-neonPurple" />
                SYSTEM ALERTS
            </h3>
            <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold">{alerts.length} ACTIVE</span>
        </div>

        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {alerts.length === 0 ? (
                <div className="text-center py-10 text-white/20">
                    <p className="text-xs uppercase tracking-widest">System Clear</p>
                    <p className="text-[10px]">No active emergencies detected</p>
                </div>
            ) : (
                alerts.map((alert, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                        <p className="text-xs font-bold text-red-400">{alert.message}</p>
                        <p className="text-[10px] text-white/30 mt-1">{alert.time}</p>
                    </motion.div>
                ))
            )}
        </div>
      </div>
    </>
  );
};

export default Alerts;
