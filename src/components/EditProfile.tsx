import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Camera } from 'lucide-react';

export default function EditProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState("Alex Rivers");
    const [bio, setBio] = useState("Pro Traveler");
    const [phone, setPhone] = useState("+1 234 567 8900");
    const [roomNo, setRoomNo] = useState("A-102");
    const [imagePreview, setImagePreview] = useState("https://i.pravatar.cc/300?u=alex");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the data to your backend
        navigate('/profile');
    };

    return (
        <div className="bg-[#1A1F1D] font-display text-emerald-100 min-h-screen pb-24">
            {/* Header */}
            <div className="bg-gradient-to-b from-[#116364] via-[#0d4d4e] to-[#083637] flex items-center p-4 pb-6 justify-between rounded-b-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_10px_rgba(0,0,0,0.4)] relative z-10">
                <Link to="/profile" className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#222a27] to-[#181d1b] shadow-[6px_6px_12px_#0a0c0b,-4px_-4px_10px_#2a3431] border border-white/5">
                    <ArrowLeft className="text-emerald-100 w-6 h-6" />
                </Link>
                <h2 className="text-emerald-100 text-xl font-extrabold tracking-tight drop-shadow-md">EDIT PROFILE</h2>
                <div className="size-12" /> {/* Spacer for alignment */}
            </div>

            <div className="px-6 -mt-8 flex flex-col items-center relative z-20">
                <div className="relative group cursor-pointer" onClick={triggerFileInput}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-[#1A1F1D] shadow-2xl overflow-hidden relative">
                        <img src={imagePreview} alt="Alex Rivers" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white w-8 h-8" />
                        </div>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-[#116364] p-2 rounded-full border-2 border-[#1A1F1D] shadow-lg">
                        <Camera className="text-white w-4 h-4" />
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave} className="px-6 mt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-2">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#222a27] border border-white/5 rounded-2xl px-5 py-4 text-emerald-100 font-medium placeholder:text-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#116364] transition-all"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-2">Bio / Tagline</label>
                    <input
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full bg-[#222a27] border border-white/5 rounded-2xl px-5 py-4 text-emerald-100 font-medium placeholder:text-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#116364] transition-all"
                        placeholder="e.g. Pro Traveler"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-2">Room Number</label>
                    <input
                        type="text"
                        value={roomNo}
                        onChange={(e) => setRoomNo(e.target.value)}
                        className="w-full bg-[#222a27] border border-white/5 rounded-2xl px-5 py-4 text-emerald-100 font-medium placeholder:text-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#116364] transition-all"
                        placeholder="e.g. A-102"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-2">Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#222a27] border border-white/5 rounded-2xl px-5 py-4 text-emerald-100 font-medium placeholder:text-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#116364] transition-all"
                        placeholder="+1 234 567 8900"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-8 flex w-full items-center justify-center rounded-full h-14 bg-gradient-to-r from-[#116364] to-[#083637] shadow-[0_8px_16px_rgba(17,99,100,0.3)] text-white text-sm font-black tracking-widest uppercase active:scale-[0.98] transition-all"
                >
                    <Save className="mr-2 w-5 h-5" />
                    Save Changes
                </button>
            </form>
        </div>
    );
}
