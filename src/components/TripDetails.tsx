import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Star, Coffee, Utensils as Fastfood, ShoppingBag, User, Compass as Explore, ShoppingBasket, MessageCircle as ChatBubble, User as Person } from 'lucide-react';

export default function TripDetails() {
  const { id } = useParams();

  return (
    <div className="bg-[#1A1F1D] font-display text-slate-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center p-4 justify-between bg-[#1A1F1D]/80 sticky top-0 z-50 backdrop-blur-md border-b border-[#116364]/10">
        <Link to="/home" className="flex items-center justify-center size-10 rounded-full bg-[#242A28] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_6px_-1px_rgba(0,0,0,0.5)] active:translate-y-px">
          <ArrowLeft className="text-[#116364] w-5 h-5" />
        </Link>
        <h2 className="text-lg font-extrabold tracking-tight uppercase text-slate-100">Trip Details</h2>
        <button className="flex items-center justify-center size-10 rounded-full bg-[#242A28] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_6px_-1px_rgba(0,0,0,0.5)] active:translate-y-px">
          <MoreVertical className="text-[#116364] w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="p-6">
          {/* Profile Card */}
          <div className="relative bg-[#242A28] rounded-3xl p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_6px_-1px_rgba(0,0,0,0.5),0_10px_15px_-3px_rgba(0,0,0,0.7)] overflow-hidden border border-white/5">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/5 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Explore className="w-24 h-24" />
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative size-24 mb-4">
                  <div className="absolute inset-0 rounded-full bg-[#116364]/20 animate-pulse"></div>
                  <div className="relative rounded-full border-4 border-[#116364]/40 p-1 bg-[#242A28] shadow-inner">
                    <img
                      src="https://i.pravatar.cc/150?u=alex"
                      alt="Alex Johnson"
                      className="rounded-full w-full h-full object-cover grayscale-[20%]"
                    />
                  </div>
                </div>
                <div className="bg-[#116364]/20 text-[#116364] text-[10px] font-bold px-3 py-1 rounded-full border border-[#116364]/30 mb-2">ID: 8829-PRO</div>
                <h1 className="text-2xl font-black text-white tracking-tight">Alex Johnson</h1>
                <p className="text-[#116364] font-bold text-sm mb-6">Elite Hostel Shopper</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-[#1A1F1D]/50 px-3 py-2 rounded-full shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.6)]">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    4.9 (124)
                  </div>
                  <button className="bg-[#116364] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-lg active:translate-y-px">
                    VIEW PROFILE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ETA Section */}
        <div className="px-6 mb-8">
          <p className="text-center text-[10px] uppercase font-black tracking-[0.2em] text-[#116364]/60 mb-3">Estimated Time of Arrival</p>
          <div className="grid grid-cols-3 gap-4 bg-black/40 p-6 rounded-3xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.6)] border border-white/5">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-black text-[#116364] drop-shadow-[0_0_8px_rgba(17,99,100,0.8)] leading-none">02</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase mt-2">Hours</div>
            </div>
            <div className="flex flex-col items-center border-x border-white/5">
              <div className="text-4xl font-black text-[#116364] drop-shadow-[0_0_8px_rgba(17,99,100,0.8)] leading-none">45</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase mt-2">Minutes</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-black text-[#116364] drop-shadow-[0_0_8px_rgba(17,99,100,0.8)] leading-none">12</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase mt-2">Seconds</div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              to={`/cart/${id || '1'}`}
              className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30 text-sm font-bold w-full text-center py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              REQUEST ITEMS
            </Link>
          </div>
        </div>

        {/* Requests List */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Current Requests</h3>
            <span className="bg-[#116364] text-white text-[10px] px-2 py-0.5 rounded-md">3 ACTIVE</span>
          </div>
          <div className="space-y-4">
            {/* Request 1 */}
            <div className="bg-gradient-to-br from-[#2d3532] to-[#1e2422] p-5 rounded-2xl border-l-4 border-[#116364]/60 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-[#161a19] flex items-center justify-center shadow-inner">
                  <Coffee className="text-[#116364] w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Cold Brew Coffee</h4>
                  <p className="text-xs text-slate-500">2x Grande, No Sugar</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">$12.50</p>
                <p className="text-[10px] text-[#116364] font-bold">PICKING UP</p>
              </div>
            </div>

            {/* Request 2 */}
            <div className="bg-gradient-to-br from-[#2d3532] to-[#1e2422] p-5 rounded-2xl border-l-4 border-yellow-500/60 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-[#161a19] flex items-center justify-center shadow-inner">
                  <Fastfood className="text-yellow-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Vegan Burger Set</h4>
                  <p className="text-xs text-slate-500">Extra fries, spicy mayo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">$18.00</p>
                <p className="text-[10px] text-yellow-500 font-bold">IN QUEUE</p>
              </div>
            </div>

            {/* Request 3 */}
            <div className="bg-gradient-to-br from-[#2d3532] to-[#1e2422] p-5 rounded-2xl border-l-4 border-slate-600/60 flex items-center justify-between opacity-80 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-[#161a19] flex items-center justify-center shadow-inner">
                  <ShoppingBag className="text-slate-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Essentials Kit</h4>
                  <p className="text-xs text-slate-500">Toothbrush, Soap, Towel</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">$24.00</p>
                <p className="text-[10px] text-slate-500 font-bold">PENDING</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1F1D] border-t border-white/5 pb-8 pt-4 px-8 flex justify-between items-center z-50">
        <Link to="/home" className="flex flex-col items-center gap-1 text-[#116364]">
          <Explore className="w-6 h-6 fill-[#116364]" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Trips</span>
        </Link>
        <Link to="/home" className="flex flex-col items-center gap-1 text-slate-500 opacity-40">
          <ShoppingBasket className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Requests</span>
        </Link>
        <Link to="/chat/1" className="flex flex-col items-center gap-1 text-slate-500 opacity-40">
          <ChatBubble className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Inbox</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1 text-slate-500 opacity-40">
          <Person className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
