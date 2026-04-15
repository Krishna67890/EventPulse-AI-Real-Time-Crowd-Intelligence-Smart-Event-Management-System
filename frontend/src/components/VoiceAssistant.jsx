import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Search, X, Bot, Play, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState('');

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      processCommand(speechToText);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      setTranscript('');
      setResponse('');
      setIsListening(true);
      recognition.start();
    }
  };

  const processCommand = (command) => {
    setIsProcessing(true);
    const cmd = command.toLowerCase();
    let res = "Analyzing data stream... ";

    if (cmd.includes('crowd') || cmd.includes('busy')) {
        res += "The Main Stage is currently high density. Gate B is the least crowded entry point.";
    } else if (cmd.includes('washroom') || cmd.includes('bathroom')) {
        res += "Nearest washrooms are located near Zone C. Estimated wait is under 2 minutes.";
    } else if (cmd.includes('route') || cmd.includes('way')) {
        res += "Recommended route updated on your live map. Use the North corridor to save 12 minutes.";
    } else if (cmd.includes('gate')) {
        res += "Gate A is busy. Use Gate D for immediate entry (2 min wait).";
    } else if (cmd.includes('feature') || cmd.includes('what can you do') || cmd.includes('help')) {
        res += "I can monitor real-time crowd density, predict future congestion, provide smart navigation to avoid queues, and trigger emergency protocols. You can also view the Digital Twin simulation for advanced urban planning.";
    } else if (cmd.includes('prediction') || cmd.includes('future')) {
        res += "Our AI uses Kalman filters to predict crowd flow 10 to 30 minutes in advance. Check the Prediction panel for details.";
    } else if (cmd.includes('emergency') || cmd.includes('safety')) {
        res += "In case of emergency, the Guardian Protocol activates, providing automated evacuation paths to the nearest safe exit.";
    } else {
        res += "Query synthesized. You can ask about features, crowd levels, routes, or safety protocols.";
    }

    const speakRes = new SpeechSynthesisUtterance(res);
    window.speechSynthesis.speak(speakRes);

    setTimeout(() => {
        setResponse(res);
        setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-32 right-8 z-[5000]">
      <AnimatePresence>
        {(isListening || transcript || response) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card mb-4 w-72 p-6 border border-neonBlue/30 shadow-[0_0_40px_rgba(0,240,255,0.2)]"
          >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-neonBlue rounded-lg text-black">
                    <Bot size={14} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Neural Voice Link</span>
            </div>

            {isListening && (
                <div className="space-y-4">
                    <div className="voice-wave">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="voice-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                    <p className="text-[10px] font-black uppercase text-white/40 animate-pulse">Synchronizing Listening...</p>
                </div>
            )}

            {transcript && (
                <div className="mb-4">
                    <p className="text-[9px] text-white/20 uppercase font-black mb-1">Synthesized Query</p>
                    <p className="text-xs font-bold text-neonBlue italic">"{transcript}"</p>
                </div>
            )}

            {isProcessing && (
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neonBlue animate-ping" />
                    <p className="text-[10px] font-black uppercase text-white/40">Analyzing Telemetry...</p>
                </div>
            )}

            {response && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl"
                >
                    <p className="text-[11px] leading-relaxed font-medium">{response}</p>
                </motion.div>
            )}

            <button
                onClick={() => { setTranscript(''); setResponse(''); }}
                className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/40 transition-all"
            >
                Clear Cache
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleListening}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl relative group ${isListening ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'bg-white text-black hover:scale-110 shadow-lg'}`}
      >
        {isListening ? <MicOff size={24} /> : (
            <>
                <div className="absolute inset-0 bg-white blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <Mic size={24} className="relative z-10" />
            </>
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;
