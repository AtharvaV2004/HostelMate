import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, Globe, User as Hub } from 'lucide-react';
import { SignInButton, useAuth } from '@clerk/clerk-react';

export default function Login() {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="bg-background-dark font-display text-emerald-100 min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-[440px] bg-gradient-to-br from-[#1c2220] to-[#171c1a] rounded-3xl overflow-hidden p-8 border border-[#232a28] shadow-[20px_20px_60px_#161a19,-20px_-20px_60px_#1e2421]">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-[#126b6c] to-[#0f595a] rounded-full flex items-center justify-center mb-6 relative shadow-[8px_8px_16px_#101312,-8px_-8px_16px_#242b28,inset_2px_2px_4px_rgba(255,255,255,0.2)]">
            <span className="text-white text-5xl font-bold italic tracking-tighter drop-shadow-lg">H</span>
            <div className="absolute inset-0 rounded-full border-t border-white/20"></div>
          </div>
          <h1 className="text-emerald-100 text-4xl font-bold tracking-tight mb-2">HostelMate</h1>
          <p className="text-emerald-100/60 text-center text-sm font-medium px-4">Get what you need, when you're not out</p>
        </div>

        <div className="space-y-6 flex flex-col items-center justify-center">
          <SignInButton mode="modal">
            <button
              className="w-full bg-gradient-to-br from-[#116364] to-[#0f595a] py-4 rounded-2xl text-white font-bold text-lg transition-all active:scale-95 mb-4 flex items-center justify-center shadow-[0_10px_15px_-3px_rgba(17,99,100,0.4),0_4px_6px_-2px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-white/10"
            >
              Sign In to Continue
            </button>
          </SignInButton>
        </div>

        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#116364]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#116364]/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
