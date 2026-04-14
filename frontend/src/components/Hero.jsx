import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Play, Shield, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".floating-card", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electricPurple/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neonBlue/15 rounded-full blur-[150px] animate-float" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-softPink/10 rounded-full blur-[100px]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Floating UI Cards Decorations */}
      <motion.div style={{ y: y1, rotate }} className="absolute top-[20%] left-[5%] z-10 hidden xl:block floating-card">
        <div className="glass-card p-4 w-64 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-neonBlue/20 flex items-center justify-center text-neonBlue">
              <Zap size={14} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Real-time Feed</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-neonBlue w-[70%]" />
            </div>
            <div className="h-2 w-[40%] bg-white/5 rounded-full" />
          </div>
        </div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute bottom-[20%] right-[5%] z-10 hidden xl:block floating-card">
        <div className="glass-card p-6 w-72 rounded-3xl border border-white/10 shadow-2xl bg-gradient-to-br from-white/5 to-transparent">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-softPink mb-4">Risk Analysis</p>
          <h4 className="text-3xl font-black mb-1">98.2<span className="text-xs opacity-50 ml-1">%</span></h4>
          <p className="text-[10px] text-white/40">AI Prediction Confidence</p>
          <div className="mt-6 flex gap-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`h-8 w-1.5 rounded-full ${i < 9 ? 'bg-softPink' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonBlue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neonBlue"></span>
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/70">Autonomous Intelligence System v2.6</span>
          </div>

          <h1 className="text-4xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.9] mb-8">
            REVOLUTIONIZING <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neonBlue glow-text-blue">EVENT EXPERIENCE</span>
          </h1>

          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Predict crowd patterns, optimize navigation, and manage large-scale
            events with unprecedented AI-driven precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/dashboard"
              className="group relative px-10 py-5 bg-neonBlue text-black font-black uppercase tracking-widest text-sm rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="relative flex items-center gap-3">
                Launch Live Dashboard <Zap size={18} fill="currentColor" />
              </span>
            </Link>

            <button className="group px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
              <span className="flex items-center gap-3">
                Try AI Assistant <Play size={16} fill="currentColor" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* Bottom Metrics Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-12"
        >
          <HeroMetric label="Processed Events" value="1.2k+" />
          <HeroMetric label="Average Safety" value="99.9%" />
          <HeroMetric label="User Growth" value="240%" />
          <HeroMetric label="AI Nodes" value="48k" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

const HeroMetric = ({ label, value }) => (
  <div className="text-center">
    <h4 className="text-2xl font-black mb-1">{value}</h4>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">{label}</p>
  </div>
);

export default Hero;
