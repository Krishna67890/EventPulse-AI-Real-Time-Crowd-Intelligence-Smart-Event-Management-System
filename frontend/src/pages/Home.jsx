import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import Chatbot from '../components/Chatbot';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mainRef = useRef(null);

  useEffect(() => {
    // Reveal animations on scroll
    const sections = gsap.utils.toArray('.reveal-section');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <main ref={mainRef} className="bg-background min-h-screen relative selection:bg-neonBlue selection:text-black">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neonBlue via-electricPurple to-softPink z-[110] origin-left"
        style={{ scaleX }}
      />

      <div className="noise-overlay" />

      <Navbar />

      <div className="relative z-10">
        <Hero />

        <div className="reveal-section">
          <FeaturesSection />
        </div>

        {/* Dynamic Workflow Section */}
        <section className="py-32 px-6 relative overflow-hidden reveal-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 italic">
                    AI <span className="text-neonBlue">WORKFLOW.</span>
                </h2>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-white/5 z-0">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        className="h-full bg-gradient-to-r from-neonBlue to-electricPurple origin-left"
                    />
                </div>

                <WorkflowStep
                    number="01"
                    title="Data Acquisition"
                    desc="Ingesting telemetry from stadium IoT nodes."
                    color="neonBlue"
                />
                <WorkflowStep
                    number="02"
                    title="Neural Processing"
                    desc="Pattern recognition via proprietary AI models."
                    color="electricPurple"
                />
                <WorkflowStep
                    number="03"
                    title="Risk Synthesis"
                    desc="Predicting bottlenecks before they form."
                    color="softPink"
                />
                <WorkflowStep
                    number="04"
                    title="Real-time Execution"
                    desc="Autonomous routing & safety protocols."
                    color="white"
                />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-6 text-center reveal-section relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neonBlue/10 rounded-full blur-[120px] -z-10" />

            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12">
                READY TO <span className="text-white/20">SCALE?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-500"
                >
                    Get Enterprise Access
                </motion.button>
                <button className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">
                    Talk to a Neural Specialist
                </button>
            </div>
        </section>
      </div>

      <Chatbot />

      {/* Background Depth Orbs */}
      <div className="fixed bottom-[-10%] left-[10%] w-[30%] h-[30%] bg-softPink/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-[20%] right-[5%] w-[40%] h-[40%] bg-electricPurple/5 rounded-full blur-[150px] pointer-events-none" />
    </main>
  );
};

const WorkflowStep = ({ number, title, desc, color }) => {
    const colorMap = {
        neonBlue: "text-neonBlue",
        electricPurple: "text-electricPurple",
        softPink: "text-softPink",
        white: "text-white"
    };

    return (
        <div className="relative z-10 text-center md:text-left group">
            <div className={`text-5xl font-black mb-6 italic opacity-20 group-hover:opacity-100 transition-opacity duration-500 ${colorMap[color]}`}>
                {number}
            </div>
            <h4 className="text-xl font-black uppercase tracking-tight mb-3">{title}</h4>
            <p className="text-sm text-white/40 font-medium leading-relaxed">{desc}</p>
        </div>
    );
};

export default Home;
