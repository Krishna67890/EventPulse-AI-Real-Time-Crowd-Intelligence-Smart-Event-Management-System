import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, User, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('pulse_chat_history');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "PulseAI Neural Link Established. Lead Architect Krishna Patil Rajput's Urban Flow Engine is online. System status: OPTIMAL. Accessing 200+ Neural Mitigation Protocols...", sender: 'bot' }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const botBtnRef = useRef(null);

  // Listen for Map Events
  useEffect(() => {
    const handleMapAnalysis = (event) => {
        const { message, raw } = event.detail;
        setIsOpen(true);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const botMsg = {
                id: Date.now(),
                text: message,
                sender: 'bot',
                isSystem: true
            };
            setMessages(prev => [...prev, botMsg]);
            speak(message);
        }, 800);
    };

    window.addEventListener('pulse-map-analysis', handleMapAnalysis);
    return () => window.removeEventListener('pulse-map-analysis', handleMapAnalysis);
  }, []);

  // AI Voice Synthesis Engine
  const speak = (text) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/\[.*?\]/g, ''));
    const voices = window.speechSynthesis.getVoices();
    const techVoice = voices.find(v => v.name.includes('Google UK English Male') || v.name.includes('Microsoft David'));
    if (techVoice) utterance.voice = techVoice;
    utterance.pitch = 0.85;
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const neuralDatabase = {
    // CROWD & FLOW
    "gate": {
      analysis: "Sensor fusion indicates a 15% ripple effect in Gate B throughput due to a bottleneck at Sector 4.",
      mitigation: "Triggering automated LED floor guidance to redistribute 220 PAX/min to the western auxiliary corridor.",
      outcome: "Projecting Gate B density reduction to 42% within 120 seconds. Comfort Score: 88/100."
    },
    "crowd": {
      analysis: "Overall event telemetry shows a high-frequency oscillation in crowd movement towards the Main Stage.",
      mitigation: "Implementing 'Staged Entry' algorithms and activating localized acoustic deterrents to slow incoming velocity.",
      outcome: "Main Stage saturation capped at 85%. Risk of crowd-crush event neutralized."
    },
    "bottleneck": {
      analysis: "Physical constriction at Tunnel 7 detected. Flow velocity has dropped below 0.4 m/s.",
      mitigation: "Deploying 'Dynamic Human Barriers' to create a one-way laminar flow pattern.",
      outcome: "Throughput expected to increase by 35% in T+4 minutes."
    },

    // FACILITIES
    "food": {
      analysis: "Dwell time at Food Court A has surged by 40%. Current PAX accumulation is blocking the primary artery.",
      mitigation: "Activating 'Dynamic Virtual Queuing' via the user mesh network. Synchronizing 12-minute time-buffer notifications.",
      outcome: "Expected 18% reduction in standing density by T+5 minutes."
    },
    "washroom": {
      analysis: "Telemetry shows critical saturation at Central Restrooms. Wait-time telemetry: 14 minutes.",
      mitigation: "Re-routing users to North-Plaza facilities via low-density 'Ghost Paths'.",
      outcome: "Equilibrium restored across all sanitation nodes within 6 minutes."
    },
    "water": {
      analysis: "Hydration Station 4 reporting 15% remaining capacity. High demand spike detected (Temp: 32°C).",
      mitigation: "Autonomous resupply drones dispatched to refill reservoirs. Opening secondary valves at Station 5.",
      outcome: "Supply stability maintained. Dehydration risk remains <2%."
    },

    // EMERGENCY & SAFETY
    "emergency": {
      analysis: "Local surge detected in Zone C. Density exceeding 0.92 pax/sqm. Guardian Protocol threshold reached.",
      mitigation: "Initiating proactive automated AI-guided diversion. Opening emergency bypass valves 1 through 4.",
      outcome: "Density levels will regress to safe 'Stable' levels (0.6 pax/sqm) within 180 seconds."
    },
    "fire": {
      analysis: "Thermal sensors in Sector 9 detecting anomalous heat signature (75°C+). Smoke density rising.",
      mitigation: "Isolating HVAC Sector 9. Triggering localized nitrogen suppression. Automating evacuation via Exit Red.",
      outcome: "Containment achieved in <45 seconds. No PAX exposure predicted."
    },
    "medical": {
      analysis: "Biometric monitoring detects 3 concurrent heart-rate spikes in Zone B. Heat exhaustion probability: 85%.",
      mitigation: "Deploying Rapid Response Unit 2 with mobile cooling tech. Redirecting airflow to Zone B.",
      outcome: "Triage arrival in 90 seconds. Stabilization predicted at T+5."
    },

    // TRANSPORT
    "parking": {
      analysis: "Parking Lot C is at 98% saturation. Incoming vehicle flow causing a 2km tailback.",
      mitigation: "Activating 'Smart Divert' for autonomous vehicles to Overflow Lot E. Synchronizing shuttle pickup.",
      outcome: "Tailback reduction of 400m per minute expected."
    },
    "shuttle": {
      analysis: "Shuttle latency has exceeded 12 minutes. Wait zones reaching critical density.",
      mitigation: "Allocating 4 reserve autonomous pods to the high-demand circuit.",
      outcome: "Wait times dropped to 3 minutes by T+10."
    },

    // TECH & INFRASTRUCTURE
    "wifi": {
      analysis: "Network congestion at 94% in VIP zone. Packet loss reaching critical 8%.",
      mitigation: "Dynamic bandwidth reallocation from staff-only subnets. Activating secondary 5G millimeter-wave node.",
      outcome: "Latency reduced to 15ms. Connection stability 99.9%."
    },
    "power": {
      analysis: "Voltage fluctuation detected in the Main Stage sub-grid. Thermal load at Transformer 3 is 92%.",
      mitigation: "Diverting 30kW from non-essential lighting zones. Activating liquid cooling for the primary busbar.",
      outcome: "Grid stability reached 99.9% within 45 seconds."
    },
    "lighting": {
      analysis: "Luminance levels in Exit Zone B dropped by 60%. Potential trip hazard detected.",
      mitigation: "Switching to emergency battery-backed LED arrays. Overclocking neighboring light nodes.",
      outcome: "Visibility restored to 100%. Safety rating normalized."
    },

    // LOGISTICS
    "merch": {
      analysis: "Stock depletion at Souvenir Stand A. Customer dwell time increasing by 200%.",
      mitigation: "Synchronizing 'Just-In-Time' inventory replenishment from the underground hub.",
      outcome: "Transaction speed normalized by T+15."
    },
    "vip": {
      analysis: "Unauthorized access attempt detected at Backstage Perimeter 2.",
      mitigation: "Locking down biometric gate. Alerting Tactical Unit 1. Projecting deterrent holograms.",
      outcome: "Security breach neutralized. Backstage integrity maintained."
    },

    // ENVIRONMENT
    "rain": {
      analysis: "Weather telemetry predicts precipitation in 6 minutes. Slippage risk index: High.",
      mitigation: "Deploying non-slip floor textures at transitions. Activating canopy mesh over Open Plaza B.",
      outcome: "PAX comfort score maintained above 70 during weather event."
    },
    "heat": {
      analysis: "Ambient temperature in the Central Dome is 34°C. Relative humidity: 82%.",
      mitigation: "Engaging cryogenic air-washers and misting fans at all high-density nodes.",
      outcome: "Perceived temperature reduced by 6°C within 12 minutes."
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const lowercaseInput = input.toLowerCase();
    let botResponse = "";
    let found = false;

    // Advanced Multi-Keyword Matching
    for (const key in neuralDatabase) {
      if (lowercaseInput.includes(key)) {
        const data = neuralDatabase[key];
        botResponse = `[NEURAL ANALYSIS] ${data.analysis}\n\n[ADVANCED MITIGATION] ${data.mitigation}\n\n[PREDICTIVE OUTCOME] ${data.outcome}`;
        found = true;
        break;
      }
    }

    if (!found) {
        botResponse = "[SYSTEM ERROR] Query outside current predictive horizon. Please specify tactical sector (e.g., GATE, POWER, MEDICAL, FIRE, WIFI, or SHUTTLE) for a 3-part Neural Mitigation analysis.";
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      speak(botResponse);
    }, 1200);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
        gsap.from(".chat-window", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" });
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 right-8 z-[5000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window glassmorphism w-[380px] h-[550px] mb-6 flex flex-col overflow-hidden border border-neonBlue/30 shadow-[0_0_40px_rgba(0,243,255,0.2)]"
          >
            {/* Header */}
            <div className="bg-neonBlue/10 p-5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neonBlue rounded-lg text-black">
                    <Bot size={18} />
                </div>
                <div>
                    <h4 className="font-black text-[10px] tracking-[0.2em] uppercase text-white">PulseAI Neural Link</h4>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[8px] text-white/40 font-bold uppercase">Database: 200+ Nodes Syncing</span>
                    </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                    className={`p-2 rounded-full transition-all ${isVoiceEnabled ? 'text-neonBlue bg-neonBlue/10' : 'text-white/20 hover:bg-white/5'}`}
                >
                    <Sparkles size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X size={18} className="text-white/40" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-hide">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[90%] ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${m.sender === 'user' ? 'bg-white/10' : 'bg-neonBlue/20 text-neonBlue border border-neonBlue/20'}`}>
                        {m.sender === 'user' ? <User size={14} /> : <Terminal size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-[11px] leading-relaxed whitespace-pre-line ${
                        m.sender === 'user'
                        ? 'bg-white text-black font-medium rounded-tr-none'
                        : 'bg-white/5 text-white/80 rounded-tl-none border border-white/10'
                    }`}>
                        {m.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                    <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-lg bg-neonBlue/20 flex items-center justify-center border border-neonBlue/20">
                            <Bot size={14} className="text-neonBlue" />
                        </div>
                        <div className="flex gap-1">
                            <span className="w-1 h-1 bg-neonBlue rounded-full animate-bounce" />
                            <span className="w-1 h-1 bg-neonBlue rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1 h-1 bg-neonBlue rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                </div>
              )}
            </div>

            {/* Tactical Chips */}
            <div className="px-5 py-2 flex gap-2 overflow-x-auto no-scrollbar">
                {['Emergency Protocol', 'Fire Containment', 'Medical Alert', 'VIP Breach', 'WiFi Latency', 'Power Grid'].map(tag => (
                    <button key={tag} onClick={() => setInput(tag)} className="whitespace-nowrap px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-white/40 hover:text-neonBlue hover:border-neonBlue/30 transition-all">
                        {tag}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div className="p-5 border-t border-white/10 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Synchronize tactical query..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] text-white focus:outline-none focus:border-neonBlue transition-colors placeholder:text-white/10"
              />
              <button onClick={handleSend} className="p-3 bg-neonBlue text-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-neon-blue">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={botBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl relative group ${isOpen ? 'bg-red-500 rotate-[360deg]' : 'bg-neonBlue shadow-neon-blue'}`}
      >
        {isOpen ? <X size={28} color="white" /> : (
            <>
                <div className="absolute inset-0 bg-neonBlue blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <MessageSquare size={28} color="black" className="relative z-10" />
                {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-dark animate-pulse" />}
            </>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
