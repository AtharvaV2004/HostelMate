import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Video as Videocam, Phone as Call, Smile as SentimentSatisfied, Paperclip as AttachFile, Send, MessageCircle as ChatBubble, DoorOpen as MeetingRoom, Users as Group, UserCircle as AccountCircle } from 'lucide-react';

export default function Chat() {
  return (
    <div className="bg-[#1a1f1d] font-display text-slate-100 min-h-screen flex flex-col max-w-md mx-auto border-x border-[#116364]/10 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center bg-[#1a1f1d] p-4 pt-6 justify-between z-10">
        <div className="flex items-center gap-3">
          <Link to="/trip/1" className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#242b28] to-[#1e2422] shadow-[3px_3px_6px_#121615,-2px_-2px_6px_rgba(255,255,255,0.05)] active:translate-y-px">
            <ArrowLeft className="text-[#116364] w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">HostelMate</h2>
            <p className="text-[#116364] text-xs font-medium">Room 302 Group</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#242b28] to-[#1e2422] shadow-[3px_3px_6px_#121615,-2px_-2px_6px_rgba(255,255,255,0.05)]">
            <Videocam className="text-slate-400 w-5 h-5" />
          </button>
          <button className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#242b28] to-[#1e2422] shadow-[3px_3px_6px_#121615,-2px_-2px_6px_rgba(255,255,255,0.05)]">
            <Call className="text-slate-400 w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-40">
        {/* Message In */}
        <div className="flex items-end gap-3 max-w-[85%]">
          <div className="size-9 rounded-full bg-[#242b28] flex items-center justify-center overflow-hidden border border-white/5 shrink-0 shadow-lg">
            <img className="w-full h-full object-cover" src="https://i.pravatar.cc/100?u=alex" alt="Alex" />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-[#116364] text-[11px] font-bold uppercase tracking-wider ml-2">Alex</p>
            <div className="bg-gradient-to-br from-[#2a3330] to-[#222927] rounded-2xl rounded-bl-none px-4 py-3 shadow-[6px_6px_12px_#151a18,-2px_-2px_8px_rgba(255,255,255,0.05),inset_1px_1px_2px_rgba(255,255,255,0.1)] border border-white/5">
              <p className="text-sm leading-relaxed text-slate-200">Hey guys! Did anyone manage to grab the extra keys for room 302 from the desk?</p>
            </div>
            <span className="text-[10px] text-slate-500 ml-2">10:42 AM</span>
          </div>
        </div>

        {/* Message Out */}
        <div className="flex items-end gap-3 justify-end ml-auto max-w-[85%]">
          <div className="flex flex-col gap-1.5 items-end">
            <div className="bg-gradient-to-br from-[#137576] to-[#0f595a] rounded-2xl rounded-br-none px-4 py-3 shadow-[6px_6px_12px_#151a18,-2px_-2px_8px_rgba(255,255,255,0.1),inset_1px_1px_4px_rgba(255,255,255,0.2)] border border-white/10">
              <p className="text-sm leading-relaxed text-white">Not yet, I'm just heading down to the reception now. I'll ask for two pairs.</p>
            </div>
            <div className="flex items-center gap-1 mr-2">
              <span className="text-[10px] text-slate-500">10:45 AM</span>
              <span className="text-[#116364] text-sm font-bold">✓✓</span>
            </div>
          </div>
          <div className="size-9 rounded-full bg-[#242b28] flex items-center justify-center overflow-hidden border border-white/5 shrink-0 shadow-lg">
            <img className="w-full h-full object-cover" src="https://i.pravatar.cc/100?u=me" alt="Me" />
          </div>
        </div>

        {/* Quick Replies */}
        <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
          <button className="bg-gradient-to-br from-[#242b28] to-[#1e2422] px-4 py-2 rounded-full whitespace-nowrap text-xs font-semibold text-slate-300 shadow-md">Sure thing!</button>
          <button className="bg-gradient-to-br from-[#242b28] to-[#1e2422] px-4 py-2 rounded-full whitespace-nowrap text-xs font-semibold text-slate-300 shadow-md">Will do</button>
          <button className="bg-gradient-to-br from-[#242b28] to-[#1e2422] px-4 py-2 rounded-full whitespace-nowrap text-xs font-semibold text-slate-300 shadow-md">On my way</button>
          <button className="bg-gradient-to-br from-[#242b28] to-[#1e2422] px-4 py-2 rounded-full whitespace-nowrap text-xs font-semibold text-slate-300 shadow-md">Thanks!</button>
        </div>
      </main>

      {/* Input Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1a1f1d]/80 backdrop-blur-md border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[#161a19] rounded-full h-12 flex items-center px-4 shadow-[inset_4px_4px_8px_#0d0f0e,inset_-2px_-2px_6px_rgba(255,255,255,0.05)]">
            <SentimentSatisfied className="text-slate-500 mr-2 w-5 h-5" />
            <input className="bg-transparent border-none focus:ring-0 text-sm text-slate-200 w-full placeholder:text-slate-600" placeholder="Type a message..." type="text" />
            <AttachFile className="text-slate-500 ml-2 w-5 h-5" />
          </div>
          <button className="size-12 flex items-center justify-center rounded-full bg-radial-[at_30%_30%] from-[#1ae5e8] to-[#116364] shadow-[0_0_15px_rgba(17,99,100,0.6),inset_-4px_-4px_10px_rgba(0,0,0,0.4),inset_4px_4px_10px_rgba(255,255,255,0.4)] active:scale-90 transition-transform">
            <Send className="text-white w-5 h-5" />
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex justify-between mt-6 px-4 pb-2">
          <Link to="/chat/1" className="flex flex-col items-center gap-1 group">
            <ChatBubble className="text-[#116364] w-5 h-5 fill-[#116364]" />
            <span className="text-[10px] font-bold text-[#116364]">Chats</span>
          </Link>
          <Link to="/home" className="flex flex-col items-center gap-1 group opacity-50">
            <MeetingRoom className="text-slate-400 w-5 h-5" />
            <span className="text-[10px] font-bold text-slate-400">Rooms</span>
          </Link>
          <Link to="/home" className="flex flex-col items-center gap-1 group opacity-50">
            <Group className="text-slate-400 w-5 h-5" />
            <span className="text-[10px] font-bold text-slate-400">People</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 group opacity-50">
            <AccountCircle className="text-slate-400 w-5 h-5" />
            <span className="text-[10px] font-bold text-slate-400">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
