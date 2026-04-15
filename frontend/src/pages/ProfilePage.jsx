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
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-neonBlue/50 focus:outline-none transition-all appearance-none cursor-pointer overflow-y-auto"
                                    >
                                        <optgroup label="AMERICAS" className="bg-black text-white/40">
                                            <option value="Alabama">Alabama</option>
                                            <option value="Alaska">Alaska</option>
                                            <option value="Arizona">Arizona</option>
                                            <option value="Arkansas">Arkansas</option>
                                            <option value="California">California</option>
                                            <option value="Colorado">Colorado</option>
                                            <option value="Connecticut">Connecticut</option>
                                            <option value="Delaware">Delaware</option>
                                            <option value="Florida">Florida</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Hawaii">Hawaii</option>
                                            <option value="Idaho">Idaho</option>
                                            <option value="Illinois">Illinois</option>
                                            <option value="Indiana">Indiana</option>
                                            <option value="Iowa">Iowa</option>
                                            <option value="Kansas">Kansas</option>
                                            <option value="Kentucky">Kentucky</option>
                                            <option value="Louisiana">Louisiana</option>
                                            <option value="Maine">Maine</option>
                                            <option value="Maryland">Maryland</option>
                                            <option value="Massachusetts">Massachusetts</option>
                                            <option value="Michigan">Michigan</option>
                                            <option value="Minnesota">Minnesota</option>
                                            <option value="Mississippi">Mississippi</option>
                                            <option value="Missouri">Missouri</option>
                                            <option value="Montana">Montana</option>
                                            <option value="Nebraska">Nebraska</option>
                                            <option value="Nevada">Nevada</option>
                                            <option value="New Hampshire">New Hampshire</option>
                                            <option value="New Jersey">New Jersey</option>
                                            <option value="New Mexico">New Mexico</option>
                                            <option value="New York">New York</option>
                                            <option value="North Carolina">North Carolina</option>
                                            <option value="North Dakota">North Dakota</option>
                                            <option value="Ohio">Ohio</option>
                                            <option value="Oklahoma">Oklahoma</option>
                                            <option value="Oregon">Oregon</option>
                                            <option value="Pennsylvania">Pennsylvania</option>
                                            <option value="Rhode Island">Rhode Island</option>
                                            <option value="South Carolina">South Carolina</option>
                                            <option value="South Dakota">South Dakota</option>
                                            <option value="Tennessee">Tennessee</option>
                                            <option value="Texas">Texas</option>
                                            <option value="Utah">Utah</option>
                                            <option value="Vermont">Vermont</option>
                                            <option value="Virginia">Virginia</option>
                                            <option value="Washington">Washington</option>
                                            <option value="West Virginia">West Virginia</option>
                                            <option value="Wisconsin">Wisconsin</option>
                                            <option value="Wyoming">Wyoming</option>
                                            <option value="Ontario">Ontario (Canada)</option>
                                            <option value="Quebec">Quebec (Canada)</option>
                                            <option value="Sao Paulo">Sao Paulo (Brazil)</option>
                                        </optgroup>
                                        <optgroup label="EUROPE" className="bg-black text-white/40">
                                            <option value="Greater London">Greater London (UK)</option>
                                            <option value="Manchester">Manchester (UK)</option>
                                            <option value="Berlin">Berlin (Germany)</option>
                                            <option value="Paris">Paris (France)</option>
                                            <option value="Madrid">Madrid (Spain)</option>
                                            <option value="Rome">Rome (Italy)</option>
                                            <option value="Zurich">Zurich (Switzerland)</option>
                                            <option value="Amsterdam">Amsterdam (Netherlands)</option>
                                        </optgroup>
                                        <optgroup label="ASIA PACIFIC" className="bg-black text-white/40">
                                            <option value="Andhra Pradesh">Andhra Pradesh (India)</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh (India)</option>
                                            <option value="Assam">Assam (India)</option>
                                            <option value="Bihar">Bihar (India)</option>
                                            <option value="Chhattisgarh">Chhattisgarh (India)</option>
                                            <option value="Goa">Goa (India)</option>
                                            <option value="Gujarat">Gujarat (India)</option>
                                            <option value="Haryana">Haryana (India)</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh (India)</option>
                                            <option value="Jharkhand">Jharkhand (India)</option>
                                            <option value="Karnataka">Karnataka (India)</option>
                                            <option value="Kerala">Kerala (India)</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh (India)</option>
                                            <option value="Maharashtra">Maharashtra (India)</option>
                                            <option value="Manipur">Manipur (India)</option>
                                            <option value="Meghalaya">Meghalaya (India)</option>
                                            <option value="Mizoram">Mizoram (India)</option>
                                            <option value="Nagaland">Nagaland (India)</option>
                                            <option value="Odisha">Odisha (India)</option>
                                            <option value="Punjab">Punjab (India)</option>
                                            <option value="Rajasthan">Rajasthan (India)</option>
                                            <option value="Sikkim">Sikkim (India)</option>
                                            <option value="Tamil Nadu">Tamil Nadu (India)</option>
                                            <option value="Telangana">Telangana (India)</option>
                                            <option value="Tripura">Tripura (India)</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh (India)</option>
                                            <option value="Uttarakhand">Uttarakhand (India)</option>
                                            <option value="West Bengal">West Bengal (India)</option>
                                            <option value="Tokyo">Tokyo (Japan)</option>
                                            <option value="Osaka">Osaka (Japan)</option>
                                            <option value="Seoul">Seoul (S. Korea)</option>
                                            <option value="Singapore">Singapore</option>
                                            <option value="New South Wales">NSW (Australia)</option>
                                            <option value="Victoria">Victoria (Australia)</option>
                                        </optgroup>
                                        <optgroup label="MIDDLE EAST / AFRICA" className="bg-black text-white/40">
                                            <option value="Dubai">Dubai (UAE)</option>
                                            <option value="Abu Dhabi">Abu Dhabi (UAE)</option>
                                            <option value="Riyadh">Riyadh (Saudi Arabia)</option>
                                            <option value="Cape Town">Cape Town (S. Africa)</option>
                                            <option value="Cairo">Cairo (Egypt)</option>
                                        </optgroup>
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
