import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, BadgeCheck as Verified, Edit3 as Edit, Compass as Explore, Calendar as CalendarMonth, Users as Group, UserCircle as AccountCircle, Star } from 'lucide-react';

export default function Profile() {
  return (
    <div className="bg-[#1A1F1D] font-display text-emerald-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        {/* Metallic Header */}
        <div className="bg-gradient-to-b from-[#116364] via-[#0d4d4e] to-[#083637] flex items-center p-4 pb-6 justify-between rounded-b-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_10px_rgba(0,0,0,0.4)]">
          <Link to="/home" className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#222a27] to-[#181d1b] shadow-[6px_6px_12px_#0a0c0b,-4px_-4px_10px_#2a3431] border border-white/5">
            <ArrowLeft className="text-emerald-100 w-6 h-6" />
          </Link>
          <h2 className="text-emerald-100 text-xl font-extrabold tracking-tight drop-shadow-md">HOSTELMATE</h2>
          <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#222a27] to-[#181d1b] shadow-[6px_6px_12px_#0a0c0b,-4px_-4px_10px_#2a3431] border border-white/5">
            <Settings className="text-emerald-100 w-6 h-6" />
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex p-6 -mt-8 flex-col items-center">
          <div className="relative">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-[#1A1F1D] shadow-2xl overflow-hidden">
              <img src="https://i.pravatar.cc/300?u=alex" alt="Alex Rivers" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 bg-[#116364] p-1.5 rounded-full border-2 border-[#1A1F1D] shadow-lg">
              <Verified className="text-white w-3 h-3" />
            </div>
          </div>
          <div className="flex flex-col items-center mt-4">
            <p className="text-emerald-100 text-2xl font-bold tracking-tight">Alex Rivers</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-[#116364]/20 text-[#116364] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#116364]/30 uppercase">Pro Traveler</span>
              <span className="text-slate-400 text-sm">•</span>
              <span className="text-slate-400 text-sm font-medium">42 Stays</span>
            </div>
          </div>
          <Link to="/edit-profile" className="mt-6 flex min-w-[160px] items-center justify-center rounded-full h-11 px-6 bg-gradient-to-br from-[#222a27] to-[#181d1b] shadow-[6px_6px_12px_#0a0c0b,-4px_-4px_10px_#2a3431] border border-white/5 text-emerald-100 text-sm font-bold tracking-wide active:shadow-inner transition-all">
            <Edit className="mr-2 w-4 h-4" />
            EDIT PROFILE
          </Link>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 gap-4 px-6 py-4">
          <div className="bg-gradient-to-br from-[#222a27] to-[#181d1b] flex flex-col gap-1 rounded-2xl p-5 border border-white/5 shadow-lg">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Stays</p>
            <div className="flex items-baseline gap-2">
              <p className="text-emerald-100 text-3xl font-black">42</p>
              <p className="text-emerald-400 text-xs font-bold">+5%</p>
            </div>
            <div className="w-full h-1.5 bg-[#1A1F1D] rounded-full mt-2 shadow-inner overflow-hidden">
              <div className="h-full bg-[#116364] rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#222a27] to-[#181d1b] flex flex-col gap-1 rounded-2xl p-5 border border-white/5 shadow-lg">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Communities</p>
            <div className="flex items-baseline gap-2">
              <p className="text-emerald-100 text-3xl font-black">12</p>
              <p className="text-emerald-400 text-xs font-bold">+2%</p>
            </div>
            <div className="w-full h-1.5 bg-[#1A1F1D] rounded-full mt-2 shadow-inner overflow-hidden">
              <div className="h-full bg-[#116364] rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        {/* Trophy Showcase */}
        <div className="px-6 py-4">
          <div className="bg-gradient-to-br from-[#222a27] to-[#181d1b] rounded-3xl p-6 flex items-center justify-between border border-white/5 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="size-16 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 via-yellow-600 to-yellow-800 shadow-xl border border-yellow-200/20">
                <Star className="text-white w-8 h-8 fill-white" />
              </div>
              <div>
                <p className="text-emerald-100 font-bold text-lg">Top Explorer</p>
                <p className="text-slate-400 text-xs font-medium">Earned in Lisbon • 2023</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-emerald-100 text-2xl font-black">8</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase">Total</p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest px-8 pt-6 pb-2">Preferences</h3>
        <div className="px-6 flex flex-col gap-3 pb-32">
          {[
            { label: 'Smart Notifications', icon: 'Bell', active: true },
            { label: 'Public Itinerary', icon: 'Globe', active: false },
            { label: 'Instant Booking', icon: 'Zap', active: true },
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#222a27] to-[#181d1b] flex items-center justify-between p-4 rounded-2xl border border-white/5 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-[#116364]"><Explore className="w-5 h-5" /></span>
                <span className="text-emerald-100 font-medium">{item.label}</span>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 flex items-center shadow-inner transition-colors ${item.active ? 'bg-[#116364]/40' : 'bg-black/40'}`}>
                <div className={`size-4 rounded-full shadow-md transition-transform ${item.active ? 'bg-emerald-400 translate-x-6' : 'bg-slate-600'}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 w-full bg-[#1A1F1D]/90 backdrop-blur-lg border-t border-[#116364]/20 px-4 pb-8 pt-4 flex justify-between items-center z-50">
          <Link to="/home" className="flex flex-col items-center gap-1 text-slate-500">
            <Explore className="w-6 h-6" />
            <p className="text-[10px] font-bold uppercase tracking-tighter">Explore</p>
          </Link>
          <Link to="/home" className="flex flex-col items-center gap-1 text-slate-500">
            <CalendarMonth className="w-6 h-6" />
            <p className="text-[10px] font-bold uppercase tracking-tighter">Bookings</p>
          </Link>
          <Link to="/home" className="flex flex-col items-center gap-1 text-slate-500">
            <Group className="w-6 h-6" />
            <p className="text-[10px] font-bold uppercase tracking-tighter">Social</p>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 text-emerald-100">
            <AccountCircle className="w-6 h-6 fill-emerald-100" />
            <p className="text-[10px] font-bold uppercase tracking-tighter">Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
