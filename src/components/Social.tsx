import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Compass as Explore, Users, User, ArrowRight, Trophy } from 'lucide-react';

export default function Social() {
    const location = useLocation();

    return (
        <div className="bg-[#1A1F1D] font-display text-slate-100 min-h-screen flex flex-col relative pb-32">
            {/* Header */}
            <header className="p-6 sticky top-0 z-40 bg-[#1A1F1D]/90 backdrop-blur-md border-b border-[#116364]/10">
                <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Community</h1>
            </header>

            <main className="flex-1 p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100/40">Leaderboard</h3>
                    <div className="h-[1px] flex-1 bg-emerald-100/10"></div>
                </div>

                <div className="bg-[#242A28] rounded-3xl p-8 border border-white/5 shadow-2xl text-center space-y-4">
                    <div className="size-20 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50">
                        <Trophy className="text-yellow-500 w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Feature in Development</h3>
                    <p className="text-sm text-emerald-100/50">Get ready to see who the most helpful hostel mates are. Earn points for delivery trips and level up your community standing!</p>
                    <Link to="/home" className="inline-flex items-center gap-2 text-[#116364] font-bold mt-4 uppercase text-xs tracking-widest hover:text-[#0f595a] transition-colors">
                        Back to Active Trips <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>

            {/* Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1F1D]/90 backdrop-blur-xl border-t border-white/5 pb-8 pt-4 px-8 flex justify-between items-center z-40">
                <Link to="/home" className={`flex flex-col items-center gap-1 ${location.pathname === '/home' ? 'text-[#116364]' : 'text-slate-500 opacity-40'}`}>
                    <Explore className={`w-6 h-6 ${location.pathname === '/home' ? 'fill-[#116364]' : ''}`} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
                </Link>
                <Link to="/trips" className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/trips') ? 'text-[#116364]' : 'text-slate-500 opacity-40'}`}>
                    <MapPin className={`w-6 h-6 ${location.pathname.startsWith('/trips') ? 'fill-[#116364]' : ''}`} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Trips</span>
                </Link>
                <Link to="/social" className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/social') ? 'text-[#116364]' : 'text-slate-500 opacity-40'}`}>
                    <Users className={`w-6 h-6 ${location.pathname.startsWith('/social') ? 'fill-[#116364]' : ''}`} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Social</span>
                </Link>
                <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/profile') ? 'text-[#116364]' : 'text-slate-500 opacity-40'}`}>
                    <User className={`w-6 h-6 ${location.pathname.startsWith('/profile') ? 'fill-[#116364]' : ''}`} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
                </Link>
            </nav>
        </div>
    );
}
