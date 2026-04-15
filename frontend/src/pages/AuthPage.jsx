import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowRight, Zap } from 'lucide-react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate auth
        localStorage.setItem('user_token', 'neural_session_' + Math.random().toString(36).substr(2, 9));

        // Save user name if provided during signup or use default for login
        const userName = formData.name || (isLogin ? 'VERIFIED OPERATOR' : 'NEW OPERATOR');
        localStorage.setItem('user_name', userName);
        localStorage.removeItem('guest_id'); // Clear guest status on login

        // Initialize profile
        const initialProfile = {
            name: userName,
            photo: '',
            description: 'Lead Neural Architect for Sector-7 crowd intelligence operations.',
            address: '101 Cyber Plaza, Neo-London',
            state: 'Greater London',
        };
        localStorage.setItem('user_profile', JSON.stringify(initialProfile));

        navigate('/');
    };

    const handleGuestLogin = () => {
        localStorage.setItem('guest_id', 'guest_proto_' + Math.random().toString(36).substr(2, 9));
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_name');

        const guestProfile = {
            name: 'GUEST_OPERATOR',
            photo: '',
            description: 'Guest access active. Limited neural telemetry available.',
            address: 'REDACTED',
            state: 'California',
        };
        localStorage.setItem('user_profile', JSON.stringify(guestProfile));

        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Particles (CSS only) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonBlue/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 bg-neonBlue/20 rounded-2xl flex items-center justify-center mb-4 border border-neonBlue/30 shadow-neon-blue">
                            <Shield className="text-neonBlue" size={32} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-white mb-2">
                            {isLogin ? 'SYSTEM ACCESS' : 'CREATE PROTOCOL'}
                        </h1>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
                            Neural Intelligence Interface
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neonBlue transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="OPERATOR NAME"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neonBlue/50 transition-all uppercase font-bold tracking-wider"
                                />
                            </div>
                        )}
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neonBlue transition-colors" size={18} />
                            <input
                                type="email"
                                placeholder="ACCESS EMAIL"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neonBlue/50 transition-all uppercase font-bold tracking-wider"
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neonBlue transition-colors" size={18} />
                            <input
                                type="password"
                                placeholder="SECURITY CIPHER"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neonBlue/50 transition-all uppercase font-bold tracking-wider"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-neonBlue text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-neon-blue active:scale-95 group mt-8"
                        >
                            {isLogin ? 'AUTHORIZE ACCESS' : 'INITIALIZE PROTOCOL'}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            type="button"
                            onClick={() => window.close()}
                            className="w-full bg-red-600/20 border border-red-500/30 text-red-500 font-black py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all text-[10px] uppercase tracking-widest mt-2"
                        >
                            TERMINATE SESSION
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col gap-4">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center hover:text-white transition-colors"
                        >
                            {isLogin ? 'Request New Deployment (Sign Up)' : 'Return to Access Portal (Login)'}
                        </button>

                        <div className="h-px bg-white/5 w-full relative">
                            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0c] px-2 text-[8px] font-bold text-white/20">OR</span>
                        </div>

                        <button
                            onClick={handleGuestLogin}
                            className="w-full bg-white/5 border border-white/10 text-white/60 font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-xs uppercase tracking-widest"
                        >
                            <Zap size={14} className="text-amber-400" />
                            Continue as Guest
                        </button>
                    </div>
                </div>

                <p className="text-center mt-8 text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
                    SECURED BY EVENTPULSE AI SHIELD v2.4.0 <br />
                    ENGINEERED BY <span className="text-neonBlue">KRISHNA PATIL RAJPUT</span>
                </p>
            </motion.div>
        </div>
    );
};

export default AuthPage;
