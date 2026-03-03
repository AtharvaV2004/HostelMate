import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, MoreVertical, Star, Coffee, Utensils as Fastfood, ShoppingBag, Compass as Explore, ShoppingBasket, MessageCircle as ChatBubble, User as Person, Loader2 } from 'lucide-react';

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [trip, setTrip] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTripDetails();

      const channel = supabase
        .channel(`public:requests:trip_id=${id}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'requests', filter: `trip_id=eq.${id}` }, () => {
          fetchTripDetails(); // Refresh when requests change
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      // API call does not necessarily require auth for GET, but let's pass token if we need it
      const token = await getToken();
      const res = await fetch(`http://localhost:3000/api/trips/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const json = await res.json();
      if (json.success) {
        setTrip(json.data);
        setRequests(json.data.requests || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1A1F1D] min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#116364] animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="bg-[#1A1F1D] min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <p className="text-emerald-100 text-lg mb-4">Trip not found</p>
        <button onClick={() => navigate('/home')} className="bg-[#116364] text-white px-6 py-2 rounded-full font-bold">Go Back</button>
      </div>
    );
  }

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
                      src={trip.users?.avatar_url || "https://i.pravatar.cc/150?u=alex"}
                      alt={trip.users?.name || "User"}
                      className="rounded-full w-full h-full object-cover grayscale-[20%]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="bg-[#116364]/20 text-[#116364] text-[10px] font-bold px-3 py-1 rounded-full border border-[#116364]/30 mb-2">DESTINATION: {trip.destination}</div>
                <h1 className="text-2xl font-black text-white tracking-tight">{trip.users?.name || "Unknown Courier"}</h1>
                <p className="text-[#116364] font-bold text-sm mb-6">HostelMate Runner</p>
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
          <div className="bg-black/40 p-6 rounded-3xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.6)] border border-white/5 flex flex-col items-center justify-center">
            <div className="text-4xl font-black text-[#116364] drop-shadow-[0_0_8px_rgba(17,99,100,0.8)] leading-none">{trip.eta}</div>
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              to={`/cart/${id}`}
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
            <span className="bg-[#116364] text-white text-[10px] px-2 py-0.5 rounded-md">{requests.length} ACTIVE</span>
          </div>
          <div className="space-y-4">
            {requests.length === 0 ? (
              <div className="text-center p-6 text-slate-500 border border-white/5 rounded-2xl bg-[#242A28]">
                No requests yet. Be the first to ask for something!
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="bg-gradient-to-br from-[#2d3532] to-[#1e2422] p-5 rounded-2xl border-l-4 border-[#116364]/60 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-[#161a19] flex items-center justify-center shadow-inner overflow-hidden">
                      {req.users?.avatar_url ? (
                        <img src={req.users.avatar_url} alt="Requester" referrerPolicy='no-referrer' />
                      ) : (
                        <ShoppingBag className="text-[#116364] w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{req.item_name}</h4>
                      <p className="text-xs text-slate-500">Qty: {req.quantity} • By {req.users?.name?.split(' ')[0] || 'Peer'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">${req.max_budget}</p>
                    <p className="text-[10px] text-[#116364] font-bold uppercase">{req.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1F1D] border-t border-white/5 pb-8 pt-4 px-8 flex justify-between items-center z-50">
        <Link to="/home" className="flex flex-col items-center gap-1 text-slate-500 opacity-40">
          <Explore className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Trips</span>
        </Link>
        <Link to="/home" className="flex flex-col items-center gap-1 text-[#116364]">
          <ShoppingBasket className="w-6 h-6 fill-[#116364]/20" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Requests</span>
        </Link>
        <Link to={`/chat/${id}`} className="flex flex-col items-center gap-1 text-slate-500 opacity-40">
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
