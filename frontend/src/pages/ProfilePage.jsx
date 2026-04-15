import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, MapPin, Globe, Save, LogOut, ChevronLeft, Volume2, Mic, Settings, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { speakIntroduction } from '../utils/aiLogic';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const isGuest = !!localStorage.getItem('guest_id');

    const [profile, setProfile] = useState({
        name: isGuest ? 'GUEST_OPERATOR' : (localStorage.getItem('user_name') || 'VERIFIED OPERATOR'),
        photo: '',
        description: isGuest ? 'Guest access active. Limited neural telemetry available.' : 'Lead Neural Architect for Sector-7 crowd intelligence operations.',
        address: isGuest ? 'REDACTED' : '101 Cyber Plaza, Neo-London',
        state: isGuest ? 'California' : 'Greater London',
    });

    useEffect(() => {
        const savedProfile = localStorage.getItem('user_profile');
        if (savedProfile) setProfile(JSON.parse(savedProfile));

        // Auto-intro for guests
        const hasSpoken = sessionStorage.getItem('has_spoken');
        if (isGuest && !hasSpoken && isAudioEnabled) {
            setTimeout(() => {
                speakIntroduction('female');
                sessionStorage.setItem('has_spoken', 'true');
            }, 1000);
        }
    }, [isGuest, isAudioEnabled]);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        localStorage.setItem('user_profile', JSON.stringify(profile));
        const toast = document.createElement('div');
        toast.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-[5000] px-6 py-3 bg-neonBlue text-black font-black rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.5)] text-[10px] uppercase tracking-widest border border-white/20';
        toast.innerText = "NEURAL IDENTITY UPDATED";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    };

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('guest_id');
        navigate('/auth');
    };

    return (
        <div className="min-h-screen bg-[#050505] p-6 lg:p-12">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-white/40 hover:text-neonBlue transition-colors mb-12 uppercase font-black text-[10px] tracking-widest"
            >
                <ChevronLeft size={16} /> BACK TO COMMAND CENTER
            </button>

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Col: Avatar */}
                    <div className="lg:col-span-1 flex flex-col items-center">
                        <div className="w-full glassmorphism p-6 rounded-3xl border border-white/10 mb-8 flex flex-col items-center">
                            <div className="flex justify-between w-full mb-6">
                                <h3 className="text-[10px] font-black text-white/30 uppercase tracking-widest">Neural Link Status</h3>
                                <div className={`w-2 h-2 rounded-full animate-pulse ${isAudioEnabled ? 'bg-neonBlue shadow-neon-blue' : 'bg-white/10'}`} />
                            </div>

                            <div className="relative group mb-6">
                                <div className="w-40 h-40 rounded-[2.5rem] border-2 border-white/10 overflow-hidden glassmorphism p-2 relative">
                                    {profile.photo ? (
                                        <img src={profile.photo} alt="Profile" className="w-full h-full object-cover rounded-[2.2rem]" />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center rounded-[2.2rem]">
                                            <User size={48} className="text-white/10" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-neonBlue/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Headphones size={32} className="text-neonBlue animate-bounce" />
                                    </div>
                                </div>
                                <label className="absolute -bottom-2 -right-2 p-3 bg-neonBlue text-black rounded-xl cursor-pointer shadow-neon-blue hover:scale-110 transition-transform z-10">
                                    <Camera size={16} />
                                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                                </label>
                            </div>

                            <button
                                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                                className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 border transition-all text-[10px] font-black uppercase tracking-widest ${isAudioEnabled ? 'bg-neonBlue/10 border-neonBlue/30 text-neonBlue' : 'bg-white/5 border-white/10 text-white/30'}`}
                            >
                                {isAudioEnabled ? <Volume2 size={14} /> : <Volume2 size={14} className="opacity-30" />}
                                {isAudioEnabled ? 'Audio Guide: Enabled' : 'Audio Guide: Silenced'}
                            </button>
                        </div>

                        <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{profile.name}</h2>
                        <p className="text-neonBlue text-[10px] font-black tracking-[0.3em] uppercase opacity-60 mt-2">{isGuest ? 'Temporary Node' : 'Verified Operator'}</p>
                    </div>

                {/* Right Col: Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glassmorphism p-8 rounded-[2.5rem] border border-white/10 space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3 block">Neural Bio</label>
                            <textarea
                                value={profile.description}
                                onChange={(e) => setProfile({...profile, description: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-neonBlue/50 focus:outline-none h-32 resize-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3 block">Primary Node (Address)</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                    <input
                                        type="text"
                                        value={profile.address}
                                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-neonBlue/50 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3 block">Jurisdiction (State)</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                    <select
                                        value={profile.state}
                                        onChange={(e) => setProfile({...profile, state: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-neonBlue/50 focus:outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="London">London</option>
                                        <option value="New York">New York</option>
                                        <option value="Tokyo">Tokyo</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="California">California</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-neonBlue text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-neon-blue active:scale-95"
                        >
                            <Save size={18} /> SYNC NEURAL DATA
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-8 bg-red-600/10 border border-red-500/20 text-red-500 font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                        >
                            <LogOut size={18} /> TERMINATE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
