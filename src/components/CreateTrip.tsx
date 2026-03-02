import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { ArrowLeft, Users, Clock, Check, Plus, Minus, Handshake } from 'lucide-react';

export default function CreateTrip() {
    const navigate = useNavigate();
    const { getToken } = useAuth();

    const [eta, setEta] = useState(45); // minutes
    const [capacity, setCapacity] = useState(5);
    const [acceptRequests, setAcceptRequests] = useState(true);
    const [destination, setDestination] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock pending requests to show in UI
    const pendingRequests = [
        { id: 1, room: "Room 402 - Rahul", need: "Need 1L Milk and Eggs" },
        { id: 2, room: "Room 215 - Sarah", need: "Crocin (Fever) 1 strip" }
    ];

    const categories = [
        { id: 'grocery', icon: '🛒', name: 'Grocery', going: 4 },
        { id: 'medical', icon: '💊', name: 'Medical', going: 2 },
        { id: 'food', icon: '🍔', name: 'Food', going: 6 },
        { id: 'stationery', icon: '🏫', name: 'Stationery', going: 1 },
    ];

    const handleCreateTrip = async () => {
        try {
            setIsSubmitting(true);
            const token = await getToken();

            const payload = {
                destination: destination || 'Hostel Run',
                eta: `In ${eta} mins`
            };

            const response = await fetch('http://localhost:3000/api/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to create trip');

            navigate('/home');
        } catch (error) {
            console.error('Error creating trip:', error);
            alert('Failed to start trip.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#2C3531] font-display text-[#D1E8E2] min-h-screen pb-12 relative overflow-y-auto">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#D1E8E2]/5 backdrop-blur-md border border-[#D1E8E2]/15 px-4 py-4 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2C3531]/50 border border-[#D9B08C]/20 text-[#D9B08C] shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] active:translate-y-0.5 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold tracking-tight text-[#D1E8E2]">Start Community Trip</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 mr-2">
                        <div className="w-8 h-8 rounded-full border-2 border-[#2C3531] bg-[#D9B08C]/20 flex items-center justify-center text-[10px] font-bold">JD</div>
                        <div className="w-8 h-8 rounded-full border-2 border-[#2C3531] bg-[#116466]/20 flex items-center justify-center text-[10px] font-bold">AS</div>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2C3531]/50 border border-[#D9B08C]/20 text-[#D9B08C] shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)]">
                        <Users className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="p-6 space-y-8 max-w-md mx-auto">
                <section>
                    <div className="mb-4">
                        <label className="text-sm font-semibold uppercase tracking-widest text-[#D9B08C]/80 px-1 mb-2 block">Destination</label>
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-[#D1E8E2]/5 backdrop-blur-md border border-[#D1E8E2]/15 p-4 rounded-2xl text-[#D1E8E2] placeholder:text-[#D1E8E2]/40 focus:outline-none focus:border-[#116466] transition-all"
                        />
                    </div>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-[#D9B08C]/80 mb-4 px-1 mt-6">Open Requests</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((cat, i) => (
                            <button
                                key={cat.id}
                                onClick={() => setDestination(cat.name)}
                                className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-[#D1E8E2]/5 backdrop-blur-md relative overflow-hidden group transition-all
                  ${destination === cat.name
                                        ? 'shadow-[inset_0_0_15px_rgba(17,100,102,0.6),0_0_20px_rgba(17,100,102,0.3)] border-[#116466]/50'
                                        : 'shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] border-white/5 hover:bg-white/5'
                                    }`}
                            >
                                <span className="absolute top-2 right-2 bg-white/10 text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-[#D1E8E2]/60">
                                    {cat.going} going
                                </span>
                                <span className="text-3xl mb-2">{cat.icon}</span>
                                <span className="text-sm font-bold opacity-80">{cat.name}</span>
                            </button>
                        ))}
                        <button className="col-span-2 flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#D1E8E2]/5 backdrop-blur-md border border-white/5 shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                            <span className="text-2xl">🛠️</span>
                            <span className="text-sm font-medium opacity-80">Check Other Communal Needs</span>
                        </button>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#D9B08C]/80">Hostel Mates' Needs</h2>
                        <span className="text-[10px] font-bold text-[#116466] bg-[#116466]/10 px-2 py-0.5 rounded-full">12 PENDING</span>
                    </div>
                    <div className="space-y-3">
                        {pendingRequests.map((req, idx) => (
                            <div key={req.id} className={`bg-[#D1E8E2]/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4 shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] ${idx === 1 ? 'opacity-80' : ''}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${idx % 2 === 0 ? 'bg-[#D9B08C]/20' : 'bg-[#116466]/20'}`}>
                                    <Users className={`w-5 h-5 ${idx % 2 === 0 ? 'text-[#D9B08C]' : 'text-[#116466]'}`} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-[#D9B08C]">{req.room}</p>
                                    <p className="text-sm">{req.need}</p>
                                </div>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#116466]/20 text-[#116466] shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] active:translate-y-px">
                                    <Check className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-end mb-4 px-1">
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#D9B08C]/80">Community Promise Time</h2>
                        <span className="text-2xl font-bold text-[#D9B08C] drop-shadow-[0_0_8px_rgba(217,176,140,0.5)]">{eta} mins</span>
                    </div>
                    <div className="bg-[#D1E8E2]/5 backdrop-blur-md p-8 rounded-2xl shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-2px_-2px_6px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden">
                        <div className="flex gap-4 items-center">
                            <button onClick={() => setEta(Math.max(5, eta - 5))} className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#2C3531] shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] border border-white/5 active:translate-y-0.5">
                                <Minus className="text-[#D9B08C]" />
                            </button>

                            <div className="relative w-40 h-40 rounded-full shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] border-4 border-[#2C3531] flex flex-col items-center justify-center" style={{ background: 'conic-gradient(from 180deg at 50% 50%, #2C3531 0deg, #3a4742 180deg, #2C3531 360deg)' }}>
                                <Clock className="w-10 h-10 text-[#D9B08C]/60 mb-2" />
                                <span className="text-2xl font-bold text-[#D9B08C]">{eta}</span>
                                <span className="text-[10px] text-[#D1E8E2]/60 uppercase">Mins</span>
                            </div>

                            <button onClick={() => setEta(eta + 5)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#2C3531] shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] border border-white/5 active:translate-y-0.5">
                                <Plus className="text-[#D9B08C]" />
                            </button>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-[#D9B08C]/80 mb-4 px-1">How can I help others?</h2>
                    <div className="bg-[#D1E8E2]/5 backdrop-blur-md p-4 rounded-xl flex items-center justify-between border border-white/5">
                        <div className="flex flex-col">
                            <span className="font-medium">Accept community requests</span>
                            <span className="text-[10px] text-[#D1E8E2]/50">Others will see you're helping out</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={acceptRequests} onChange={() => setAcceptRequests(!acceptRequests)} />
                            <div className="w-14 h-7 bg-[#2C3531] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-2px_-2px_6px_rgba(255,255,255,0.05)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#116466] after:border-[#116466] after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#116466]/20 after:shadow-lg"></div>
                        </label>
                    </div>

                    <div className="bg-[#D1E8E2]/5 backdrop-blur-md p-4 rounded-xl border border-white/5 flex flex-col gap-3">
                        <label className="text-xs text-[#D1E8E2]/60 uppercase font-bold tracking-tighter">Shared capacity (Max items)</label>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setCapacity(Math.max(1, capacity - 1))} className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#2C3531] shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] border border-white/5 text-[#D9B08C] text-xl font-bold active:translate-y-0.5">
                                <Minus className="w-5 h-5" />
                            </button>
                            <div className="flex-1 bg-[#2C3531] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-2px_-2px_6px_rgba(255,255,255,0.05)] rounded-lg h-12 flex items-center justify-center">
                                <span className="text-xl font-mono font-bold text-[#116466]">{capacity < 10 ? `0${capacity}` : capacity}</span>
                            </div>
                            <button onClick={() => setCapacity(capacity + 1)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#2C3531] shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] border border-white/5 text-[#D9B08C] text-xl font-bold active:translate-y-0.5">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>

                <div className="pt-6 pb-10">
                    <button
                        disabled={isSubmitting || !destination}
                        onClick={handleCreateTrip}
                        className="w-full h-20 bg-[#116466] rounded-2xl border-t-4 border-white/20 shadow-[6px_6px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute inset-0 bg-[#116466] blur-xl opacity-20 animate-pulse"></div>
                        <div className="flex items-center gap-3 relative z-10 text-white">
                            <Handshake className="w-8 h-8 font-bold" />
                            <span className="text-2xl font-black tracking-tighter">
                                {isSubmitting ? 'STARTING...' : 'START COMMUNITY TRIP'}
                            </span>
                        </div>
                        <span className="text-[10px] text-white uppercase tracking-widest font-bold opacity-60 relative z-10">Helping {pendingRequests.length} neighbors so far</span>
                    </button>
                </div>
            </main>
        </div>
    );
}
