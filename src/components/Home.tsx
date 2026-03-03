import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Bell, Calendar, Users, User, Compass as Explore, MapPin, X, Loader2 } from 'lucide-react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();

    // Set up Realtime Subscription
    const channel = supabase
      .channel('public:trips')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trips' }, () => {
        // Re-fetch everything to ensure relational UI data (like user avatars) is accurate
        fetchTrips();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch('http://localhost:3000/api/trips', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        setTrips(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-[#1A1F1D] font-display text-slate-100 min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="flex items-center p-4 justify-between bg-[#1A1F1D]/80 sticky top-0 z-40 backdrop-blur-md border-b border-[#116364]/10">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-[#116364] flex items-center justify-center shadow-lg overflow-hidden">
            {user?.imageUrl ? <img src={user.imageUrl} alt="Avatar" /> : <Calendar className="text-white w-5 h-5" />}
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">HostelMate</h2>
        </div>
        <button className="size-10 rounded-full bg-[#242A28] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_6px_-1px_rgba(0,0,0,0.5)]">
          <Bell className="text-[#116364] w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 p-6 space-y-8 pb-32">
        {/* Hero Action */}
        <button
          onClick={() => navigate('/create-trip')}
          className="w-full bg-gradient-to-br from-[#116364] to-[#0f595a] p-8 rounded-3xl flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(17,99,100,0.2)] border border-white/10 group active:scale-95 transition-all"
        >
          <div className="size-14 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
            <Zap className="text-white w-8 h-8 fill-white" />
          </div>
          <span className="text-3xl font-black text-white italic tracking-tight">I'M GOING OUT</span>
        </button>

        {/* Section Label */}
        <div className="flex items-center gap-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100/40">Active Trips</h3>
          <div className="h-[1px] flex-1 bg-emerald-100/10"></div>
        </div>

        {/* Trip Cards */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 text-[#116364] animate-spin" />
            </div>
          ) : trips.length === 0 ? (
            <div className="text-center p-8 text-emerald-100/40 border border-white/5 rounded-3xl bg-[#242A28]">
              No trips happening right now. Be the first to go out!
            </div>
          ) : (
            trips.map((trip: any) => (
              <div key={trip.id} className="bg-[#242A28] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <div className="relative h-48">
                  <img
                    src={`https://picsum.photos/seed/${trip.id}/800/600`}
                    alt="Trip location"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#116364] text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">Happening Now</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-extrabold text-white">{trip.destination}</h4>
                      <p className="text-xs text-emerald-100/40 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" /> ETA: {trip.eta}
                      </p>
                    </div>
                    {trip.users?.avatar_url && (
                      <div className="size-10 rounded-full border-2 border-[#242A28] bg-slate-700 overflow-hidden shadow-lg">
                        <img src={trip.users.avatar_url} alt={trip.users.name || "User"} referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to={`/trip/${trip.id}`} className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-3 rounded-xl text-center transition-colors border border-white/5 uppercase tracking-widest">Order / View</Link>
                    <Link to={`/chat/${trip.id}`} className="bg-[#116364]/20 hover:bg-[#116364]/30 text-[#116364] text-xs font-bold py-3 rounded-xl text-center transition-colors border border-[#116364]/20 uppercase tracking-widest">Join Chat</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>


      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1F1D]/90 backdrop-blur-xl border-t border-white/5 pb-8 pt-4 px-8 flex justify-between items-center z-40">
        <Link to="/home" className="flex flex-col items-center gap-1 text-[#116364]">
          <Explore className="w-6 h-6 fill-[#116364]" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
        </Link>
        <Link to="/trips" className="flex flex-col items-center gap-1 text-slate-500 opacity-40">
          <MapPin className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Trips</span>
        </Link>
        <Link to="/social" className="flex flex-col items-center gap-1 text-slate-500 opacity-40">
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Social</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1 text-slate-500 opacity-40">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
