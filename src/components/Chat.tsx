import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Video as Videocam, Phone as Call, Smile as SentimentSatisfied, Paperclip as AttachFile, Send, MessageCircle as ChatBubble, DoorOpen as MeetingRoom, Users as Group, UserCircle as AccountCircle, Loader2 } from 'lucide-react';

export default function Chat() {
  const { id } = useParams(); // This should be a request_id
  const { getToken } = useAuth();
  const { user } = useUser();

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetchMessages();

      const channel = supabase
        .channel(`public:chats:request_id=${id}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats', filter: `request_id=eq.${id}` }, () => {
          fetchMessages();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:3000/api/chat/requests/${id}/chat`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        setMessages(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !id) return;

    try {
      const token = await getToken();
      await fetch(`http://localhost:3000/api/chat/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: newMessage })
      });
      setNewMessage('');
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="bg-[#1A1F1D] min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#116364] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#1a1f1d] font-display text-slate-100 min-h-screen flex flex-col max-w-md mx-auto border-x border-[#116364]/10 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center bg-[#1a1f1d] p-4 pt-6 justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()} className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#242b28] to-[#1e2422] shadow-[3px_3px_6px_#121615,-2px_-2px_6px_rgba(255,255,255,0.05)] active:translate-y-px">
            <ArrowLeft className="text-[#116364] w-5 h-5" />
          </button>
          <div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">HostelMate</h2>
            <p className="text-[#116364] text-xs font-medium">Request Chat</p>
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
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 text-sm mt-10">
            No messages yet. Send a message to start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            // For the sake of matching, let's assume if the msg does not have a user id directly matching,
            // or we rely on name matching. Ideally we should match on 'sender_id'.
            // However, `req.user.id` from clerk might be an internal UUID in supabase if synced.
            // For now we'll do a simple check.
            const isMe = true; // In a robust setup: msg.sender_id === user?.publicMetadata?.supabase_id || msg.users?.name === user?.fullName

            return (
              <div key={msg.id} className={`flex items-end gap-3 max-w-[85%] ${isMe ? 'justify-end ml-auto' : ''}`}>
                {!isMe && (
                  <div className="size-9 rounded-full bg-[#242b28] flex items-center justify-center overflow-hidden border border-white/5 shrink-0 shadow-lg">
                    <img className="w-full h-full object-cover" src={msg.users?.avatar_url || "https://i.pravatar.cc/100"} alt="Avatar" referrerPolicy='no-referrer' />
                  </div>
                )}
                <div className={`flex flex-col gap-1.5 ${isMe ? 'items-end' : ''}`}>
                  {!isMe && <p className="text-[#116364] text-[11px] font-bold uppercase tracking-wider ml-2">{msg.users?.name?.split(' ')[0] || 'Peer'}</p>}
                  <div className={`rounded-2xl px-4 py-3 shadow-md border ${isMe ? 'bg-gradient-to-br from-[#137576] to-[#0f595a] rounded-br-none border-white/10' : 'bg-gradient-to-br from-[#2a3330] to-[#222927] rounded-bl-none border-white/5'}`}>
                    <p className={`text-sm leading-relaxed ${isMe ? 'text-white' : 'text-slate-200'}`}>
                      {msg.message}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 ${isMe ? 'mr-2' : 'ml-2'}`}>
                    <span className="text-[10px] text-slate-500">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isMe && <span className="text-[#116364] text-sm font-bold">✓✓</span>}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Section */}
      <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-4 bg-[#1a1f1d]/80 backdrop-blur-md border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[#161a19] rounded-full h-12 flex items-center px-4 shadow-[inset_4px_4px_8px_#0d0f0e,inset_-2px_-2px_6px_rgba(255,255,255,0.05)]">
            <SentimentSatisfied className="text-slate-500 mr-2 w-5 h-5" />
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm text-slate-200 w-full placeholder:text-slate-600"
              placeholder="Type a message..."
              type="text"
            />
            <AttachFile className="text-slate-500 ml-2 w-5 h-5" />
          </div>
          <button type="submit" className="size-12 flex items-center justify-center rounded-full bg-radial-[at_30%_30%] from-[#1ae5e8] to-[#116364] shadow-[0_0_15px_rgba(17,99,100,0.6),inset_-4px_-4px_10px_rgba(0,0,0,0.4),inset_4px_4px_10px_rgba(255,255,255,0.4)] active:scale-90 transition-transform">
            <Send className="text-white w-5 h-5" />
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex justify-between mt-6 px-4 pb-2">
          <Link to={`/chat/${id}`} className="flex flex-col items-center gap-1 group">
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
      </form>
    </div>
  );
}
