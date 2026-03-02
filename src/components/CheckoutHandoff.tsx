import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Share2, Star, Home, Bed, Calendar, User as Person } from 'lucide-react';

export default function CheckoutHandoff() {
  return (
    <div className="bg-[#0a0f0f] font-display text-slate-100 min-h-screen flex flex-col items-center max-w-md mx-auto border-x border-[#116364]/10 shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex items-center p-4 pb-2 justify-between">
        <Link to="/trip/1" className="text-[#116364] flex size-10 shrink-0 items-center justify-center rounded-full bg-[#116364]/10 cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Checkout Handoff</h2>
      </div>

      {/* Success Section */}
      <div className="flex flex-col items-center pt-8 pb-4">
        <div className="relative flex items-center justify-center size-24 mb-4">
          <div className="absolute inset-0 rounded-full bg-[#116364]/20 animate-pulse"></div>
          <div className="size-16 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#116364] flex items-center justify-center shadow-inner">
            <Check className="text-white w-8 h-8 font-bold" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Success!</h1>
        <p className="text-[#116364]/60 text-sm font-medium mt-1">Room 302 Handoff Complete</p>
      </div>

      {/* QR Code Card */}
      <div className="w-full px-6 py-4">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col items-center shadow-2xl">
          <div className="bg-white p-4 rounded-2xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]">
            <div className="size-48 bg-white flex items-center justify-center">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=HostelMate-Handoff-302" 
                alt="QR Code" 
                className="size-full opacity-90"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-white/90 text-sm font-bold tracking-widest uppercase">Digital Key Active</p>
            <p className="text-white/50 text-xs mt-1">Valid until 11:00 AM tomorrow</p>
          </div>
          <button className="mt-6 flex gap-2 items-center justify-center px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all border border-white/20">
            <Share2 className="w-4 h-4" />
            Share QR Code
          </button>
        </div>
      </div>

      {/* Rating Section */}
      <div className="mt-auto w-full px-6 pb-28">
        <div className="bg-[#116364]/10 rounded-3xl p-6 border border-[#116364]/20">
          <h3 className="text-center text-white font-bold mb-6">How was your stay?</h3>
          <div className="flex justify-between gap-2 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <button key={i} className="size-12 rounded-xl bg-gradient-to-br from-[#1a2a2a] to-[#121d1d] flex items-center justify-center shadow-lg text-yellow-500">
                <Star className="w-6 h-6 fill-yellow-500" />
              </button>
            ))}
            <button className="size-12 rounded-xl bg-gradient-to-br from-[#1a2a2a] to-[#121d1d] flex items-center justify-center shadow-lg text-slate-600">
              <Star className="w-6 h-6" />
            </button>
          </div>
          <button className="w-full bg-gradient-to-b from-[#167e80] to-[#0d4d4e] py-4 rounded-2xl text-white font-bold text-lg tracking-wide uppercase shadow-[0_4px_0_#083334,0_8px_15px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-0.5 transition-all">
            Submit Rating
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full max-w-md bg-[#0f1818] border-t border-[#116364]/20 px-4 pb-8 pt-4 flex justify-between items-center z-50">
        <Link to="/home" className="flex flex-col items-center gap-1 text-slate-500">
          <Home className="w-6 h-6" />
          <p className="text-[10px] font-bold uppercase tracking-tighter">Home</p>
        </Link>
        <Link to="/trip/1" className="flex flex-col items-center gap-1 text-[#116364]">
          <Bed className="w-6 h-6 fill-[#116364]" />
          <p className="text-[10px] font-bold uppercase tracking-tighter">Rooms</p>
        </Link>
        <Link to="/home" className="flex flex-col items-center gap-1 text-slate-500">
          <Calendar className="w-6 h-6" />
          <p className="text-[10px] font-bold uppercase tracking-tighter">Bookings</p>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1 text-slate-500">
          <Person className="w-6 h-6" />
          <p className="text-[10px] font-bold uppercase tracking-tighter">Profile</p>
        </Link>
      </div>
    </div>
  );
}
