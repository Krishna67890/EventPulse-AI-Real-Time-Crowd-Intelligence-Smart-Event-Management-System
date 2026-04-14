import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Map, Activity, MessageSquare, Target } from 'lucide-react';

const features = [
  {
    icon: <Zap className="text-neonBlue" size={32} />,
    title: "AI Crowd Prediction",
    description: "Neural networks analyze historical and live data to predict congestion 15 minutes before it happens.",
    color: "rgba(0, 240, 255, 0.2)"
  },
  {
    icon: <Map className="text-electricPurple" size={32} />,
    title: "Smart Navigation",
    description: "Dynamic pathfinding algorithms suggest the least crowded routes to minimize transit time.",
    color: "rgba(122, 0, 255, 0.2)"
  },
  {
    icon: <Activity className="text-softPink" size={32} />,
    title: "Wait Time Estimation",
    description: "Real-time queue monitoring provides accurate wait times for all facilities and gates.",
    color: "rgba(255, 0, 200, 0.2)"
  },
  {
    icon: <Shield className="text-white" size={32} />,
    title: "Emergency Alerts",
    description: "Instant safety protocols and automated exit routing during critical density spikes.",
    color: "rgba(255, 255, 255, 0.1)"
  },
  {
    icon: <MessageSquare className="text-neonBlue" size={32} />,
    title: "AI Chatbot Assistant",
    description: "Natural language interface for attendees to query event info, routes, and safety updates.",
    color: "rgba(0, 240, 255, 0.2)"
  },
  {
    icon: <Target className="text-electricPurple" size={32} />,
    title: "Confidence Metrics",
    description: "Transparent AI scoring system showing the probability and reliability of every prediction.",
    color: "rgba(122, 0, 255, 0.2)"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-neonBlue">Platform Capabilities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-6"
          >
            INTELLIGENT <span className="text-white/20">ORCHESTRATION.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-2xl mx-auto font-medium"
          >
            Our core engine processes millions of data points to deliver a seamless event experience
            for both organizers and attendees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      className="group perspective-1000"
    >
      <div className="glass-card p-10 h-full relative overflow-hidden border border-white/5 rounded-[32px] transition-all duration-500 group-hover:border-neonBlue/30 group-hover:bg-white/[0.04]">
        {/* Glow effect */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ backgroundColor: feature.color }}
        />

        <div className="relative z-10">
          <div className="mb-8 p-4 w-fit bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 ring-1 ring-white/10 group-hover:ring-neonBlue/50 shadow-2xl">
            {feature.icon}
          </div>
          <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-neonBlue transition-colors">{feature.title}</h3>
          <p className="text-white/40 text-sm leading-relaxed font-medium">{feature.description}</p>
        </div>

        {/* Animated border bottom */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-neonBlue via-electricPurple to-softPink group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
