import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Target, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const FuturePrediction = ({ zone }) => {
  const [timeOffset, setTimeOffset] = useState(5); // Default 5 mins prediction

  if (!zone || !zone.ai) return null;

  const { current = {}, trend = 'Stable', futureProjections = [], alertMessage = null } = zone.ai || {};

  const chartData = [
    { minute: 0, count: zone.people || 0 },
    ...(futureProjections || []).map(p => ({ minute: p.minute, count: p.predictedCount }))
  ];

  return (
    <div className="glass-card p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="live-pulse" />
            <h3 className="text-lg font-black uppercase tracking-tight text-neonBlue">Predictive Horizon</h3>
          </div>
          <div className="flex items-center gap-4">
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Neural Forecast for {zone.name}</p>
              <div className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-[8px] font-black uppercase tracking-tighter">
                  Comfort: {Number.isNaN(zone.comfortScore) ? 82 : zone.comfortScore}%
              </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center gap-1 font-black text-xs uppercase ${trend === 'Increasing' ? 'text-softPink' : trend === 'Decreasing' ? 'text-emerald-400' : 'text-white/40'}`}>
            {trend === 'Increasing' ? <TrendingUp size={14} /> : trend === 'Decreasing' ? <TrendingDown size={14} /> : <Minus size={14} />}
            {trend}
          </div>
          <p className="text-[9px] text-white/20 uppercase tracking-tighter">Current Trend</p>
        </div>
      </div>

      {/* AI Confidence Meter */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="48" cy="48" r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-white/5"
                />
                <motion.circle
                    cx="48" cy="48" r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * current.confidence) / 100 }}
                    className="text-neonBlue"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-black tracking-tighter">{current.confidence}%</span>
                <span className="text-[6px] font-black uppercase tracking-widest opacity-30 text-center px-2 leading-tight">AI Confidence</span>
            </div>
        </div>

        <div className="flex-1 space-y-4">
            {alertMessage && (
                <div className="p-3 bg-softPink/10 border border-softPink/30 rounded-xl animate-pulse">
                    <p className="text-[10px] font-black text-softPink uppercase tracking-tighter">AI Critical Alert</p>
                    <p className="text-[11px] font-medium leading-tight">{alertMessage}</p>
                </div>
            )}
            {!alertMessage && (
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">Stability Projection</p>
                    <p className="text-[11px] font-medium leading-tight">Zone expected to remain within safety thresholds.</p>
                </div>
            )}
        </div>
      </div>

      {/* Prediction Chart */}
      <div className="h-32 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorFuture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="count" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorFuture)" />
            <XAxis dataKey="minute" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip
                contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                labelFormatter={(label) => `Minute ${label}`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/30">
            <span>Projection Offset</span>
            <span className="text-neonBlue">{timeOffset} Minutes</span>
        </div>
        <input
            type="range"
            min="1" max="10"
            value={timeOffset}
            onChange={(e) => setTimeOffset(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neonBlue"
        />
        <div className="flex justify-between text-[8px] font-black text-white/20">
            <span>NOW</span>
            <span>+10M</span>
        </div>
      </div>

      {/* Forecast Data */}
      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
        <div>
            <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Forecasted Count</p>
            <p className="text-xl font-black">{futureProjections[timeOffset - 1]?.predictedCount} <span className="text-xs opacity-20">PAX</span></p>
        </div>
        <div>
            <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Density Shift</p>
            <p className="text-xl font-black text-neonBlue">
                {((futureProjections[timeOffset-1]?.predictedCount - zone.people) / zone.people * 100).toFixed(1)}%
            </p>
        </div>
      </div>
    </div>
  );
};

export default FuturePrediction;
