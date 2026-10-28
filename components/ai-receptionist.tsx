'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, X, Minimize2, Sparkles, Bot, User } from 'lucide-react';
import { contactInfo } from '@/lib/portfolio-data';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

const starterMessage =
  "Hi! I'm Adore's AI assistant. Ask me anything about Cyubahiro's robotics work at Neotix, QA workflows, web projects like SIMS or EduConnect, or how to get in touch.";

const uniqueChipsRow1 = [
  'Neotix robotics experience',
  'What hardware have you used?',
  'SOP-based video QA role',
  'Tell me about EduConnect',
  'What is SIMS?',
];

const uniqueChipsRow2 = [
  'DEVCORE-AI project',
  'Frontend technologies',
  'What services do you offer?',
  'How can I contact you?',
  'What is your background?',
];

export function AIReceptionist() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasEngaged, setHasEngaged] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', text: starterMessage },
  ]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const collapsedInputRef = useRef<HTMLInputElement>(null);
  const messageIdRef = useRef(1);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setIsVisible(window.scrollY > 150);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  useEffect(() => {
    if (!isOpen) return;
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const pushAssistantReply = async (nextMessages: Message[]) => {
    setIsTyping(true);
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.map((m) => ({ role: m.role, text: m.text })) }),
      });
      const data = await res.json();
      if (!res.ok && !data.text) throw new Error(data.error || 'Unavailable.');
      setMessages((cur) => [
        ...cur,
        { id: `assistant-${messageIdRef.current++}`, role: 'assistant', text: data.text || 'You can reach Cyubahiro directly at cyubahirontwaliadore@gmail.com.' },
      ]);
    } catch {
      setMessages((cur) => [
        ...cur,
        {
          id: `assistant-${messageIdRef.current++}`,
          role: 'assistant',
          text: `I'm currently in offline mode. You can reach Cyubahiro directly at ${contactInfo.email}${contactInfo.phone ? ` or call ${contactInfo.phone}` : ''}.`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const submitMessage = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setIsOpen(true);
    setHasEngaged(true);
    const userMsg: Message = { id: `user-${messageIdRef.current++}`, role: 'user', text };
    const next = [...messages, userMsg];
    setMessages(next);
    void pushAssistantReply(next);
  };

  const handleCollapsedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputValue;
    setInputValue('');
    submitMessage(val);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputValue;
    setInputValue('');
    submitMessage(val);
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes ai-rise {
          from { opacity: 0; transform: translateX(-50%) translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);    }
        }
        @keyframes ai-drop {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes ai-dot-pulse {
          0%, 80%, 100% { transform: translateY(0);   opacity: 0.3; }
          40%           { transform: translateY(-5px); opacity: 1;   }
        }
        @keyframes ai-marquee-left  { 0% { transform: translateX(0);    } 100% { transform: translateX(-50%); } }
        @keyframes ai-marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0);    } }
        @keyframes ai-bubble-pop {
          0%   { transform: scale(0.8); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1);   opacity: 1; }
        }

        /* ── Collapsed bar ── */
        .aib-bar {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 40;
          width: min(580px, calc(100vw - 24px));
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(.22,1,.36,1);
        }
        .aib-bar.aib-hidden { opacity: 0; pointer-events: none; transform: translateX(-50%) translateY(20px) scale(0.97); }
        .aib-bar.aib-visible { animation: ai-rise 0.42s cubic-bezier(.22,1,.36,1) both; }

        /* ── Chat panel ── */
        .aib-chat {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 50;
          width: min(400px, calc(100vw - 28px));
          height: min(580px, calc(100vh - 36px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: 0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(93,247,193,0.06);
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(.22,1,.36,1);
          background: #0c1118;
        }
        .aib-chat.aib-hidden  { opacity: 0; pointer-events: none; transform: translateY(22px) scale(0.95); }
        .aib-chat.aib-visible { animation: ai-drop 0.36s cubic-bezier(.22,1,.36,1) both; }

        /* ── Floating bubble ── */
        .aib-bubble {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 40;
          animation: ai-bubble-pop 0.4s cubic-bezier(.22,1,.36,1) both;
        }

        /* ── Dots ── */
        .aib-dot { animation: ai-dot-pulse 1.4s infinite ease-in-out; }

        /* ── Marquee ── */
        .aib-marquee-track { display: flex; gap: 8px; width: max-content; }
        .aib-marquee-left  { animation: ai-marquee-left  38s linear infinite; }
        .aib-marquee-right { animation: ai-marquee-right 44s linear infinite; }
        .aib-marquee-wrap {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .aib-marquee-wrap:hover .aib-marquee-left,
        .aib-marquee-wrap:hover .aib-marquee-right { animation-play-state: paused; }

        /* ── Chip hover ── */
        .aib-chip:hover {
          background: rgba(93,247,193,0.1) !important;
          color: #5df7c1 !important;
          border-color: rgba(93,247,193,0.35) !important;
        }

        /* ── Scrollbar ── */
        .aib-scroll::-webkit-scrollbar { width: 3px; }
        .aib-scroll::-webkit-scrollbar-track { background: transparent; }
        .aib-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }

        /* ── Gradient border ring on bar ── */
        .aib-ring {
          background: linear-gradient(135deg, rgba(93,247,193,0.25), rgba(0,214,255,0.15), rgba(82,39,255,0.2));
          border-radius: 20px;
          padding: 1px;
        }
        .aib-ring-inner {
          background: rgba(12,17,24,0.96);
          border-radius: 19px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>

      {/* ── COLLAPSED BAR ── */}
      <div className={`aib-bar ${!isVisible || isOpen || hasEngaged ? 'aib-hidden' : 'aib-visible'}`}>
        <div className="aib-ring">
          <div className="aib-ring-inner p-2.5 sm:p-3">
            {/* Avatar + label row */}
            <div className="flex items-center gap-2 mb-2.5 px-1">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5df7c1]/20 to-[#5227FF]/20 border border-[#5df7c1]/30 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#5df7c1]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#5df7c1] border-2 border-[#0c1118] animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white/90 leading-none">Adore AI Assistant</p>
                <p className="text-[10px] text-[#5df7c1]/70 mt-0.5">Ask about projects, skills or experience</p>
              </div>
            </div>

            {/* Input row */}
            <form onSubmit={handleCollapsedSubmit} className="flex items-center gap-2">
              <input
                ref={collapsedInputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about Cyubahiro..."
                suppressHydrationWarning
                className="flex-1 bg-white/[0.06] border border-white/[0.08] focus:border-[#5df7c1]/40 rounded-full px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] text-white placeholder:text-white/35 outline-none transition-colors"
              />
              <button
                type="submit"
                aria-label="Send"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5df7c1] to-[#00d6ff] text-black shrink-0 flex items-center justify-center hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-[#5df7c1]/20"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Marquee chips */}
            <div className="mt-2.5 flex flex-col gap-1.5">
              {[
                { items: uniqueChipsRow1, dir: 'aib-marquee-left' },
                { items: uniqueChipsRow2, dir: 'aib-marquee-right' },
              ].map(({ items, dir }, idx) => (
                <div key={idx} className="aib-marquee-wrap">
                  <div className={`aib-marquee-track ${dir}`}>
                    {[...items, ...items].map((chip, i) => (
                      <button
                        key={`${chip}-${i}`}
                        type="button"
                        className="aib-chip px-3 py-1 rounded-full text-[11px] text-white/55 bg-white/[0.05] border border-white/[0.08] whitespace-nowrap cursor-pointer transition-all"
                        onClick={() => { setInputValue(''); submitMessage(chip); }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── EXPANDED CHAT WINDOW ── */}
      <div className={`aib-chat ${!isVisible || !isOpen ? 'aib-hidden' : 'aib-visible'}`}>

        {/* Header */}
        <div className="shrink-0 px-4 py-3 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #0f1823 0%, #111b2a 100%)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5df7c1]/20 to-[#5227FF]/30 border border-[#5df7c1]/25 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#5df7c1]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#5df7c1] border-2 border-[#0f1823] animate-pulse" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white leading-none">Adore Assistant</p>
              <p className="text-[11px] text-white/40 mt-0.5">Portfolio Guide · Robotics & Web</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Minimise"
              className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setIsOpen(false); setHasEngaged(false); setMessages([{ id: 'welcome', role: 'assistant', text: starterMessage }]); }}
              aria-label="Close"
              className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-red-500/20 text-white/50 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={viewportRef} className="aib-scroll flex-grow overflow-y-auto p-4 flex flex-col gap-3"
          style={{ background: '#0a0f17' }}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`w-6 h-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center ${
                msg.role === 'user'
                  ? 'bg-[#5227FF]/30 border border-[#5227FF]/40'
                  : 'bg-[#5df7c1]/10 border border-[#5df7c1]/25'
              }`}>
                {msg.role === 'user'
                  ? <User className="w-3 h-3 text-[#a78bfa]" />
                  : <Bot className="w-3 h-3 text-[#5df7c1]" />}
              </div>
              {/* Bubble */}
              <div className={`max-w-[80%] text-[12.5px] leading-relaxed px-3.5 py-2.5 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-[#5227FF] to-[#7c3aed] text-white rounded-tr-sm'
                  : 'bg-[#131d2b] text-white/85 border border-white/[0.07] rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2.5 flex-row">
              <div className="w-6 h-6 rounded-full shrink-0 bg-[#5df7c1]/10 border border-[#5df7c1]/25 flex items-center justify-center">
                <Bot className="w-3 h-3 text-[#5df7c1]" />
              </div>
              <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-[#131d2b] border border-white/[0.07]">
                {[0, 160, 320].map((delay) => (
                  <span key={delay} className="aib-dot w-1.5 h-1.5 rounded-full bg-[#5df7c1]/70"
                    style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick chips in chat */}
        <div className="shrink-0 px-3 py-2 overflow-x-auto flex gap-2 no-scrollbar"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0c1118' }}>
          {uniqueChipsRow1.slice(0, 4).map((chip) => (
            <button key={chip} type="button" onClick={() => submitMessage(chip)}
              className="aib-chip text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/50 whitespace-nowrap cursor-pointer transition-all shrink-0">
              {chip}
            </button>
          ))}
        </div>

        {/* Footer input */}
        <div className="shrink-0 p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0f1823' }}>
          <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a question..."
              suppressHydrationWarning
              className="flex-1 bg-white/[0.06] border border-white/[0.08] focus:border-[#5df7c1]/40 rounded-full px-4 py-2 text-[12.5px] text-white placeholder:text-white/30 outline-none transition-colors"
            />
            <button type="submit" aria-label="Send"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5df7c1] to-[#00d6ff] text-black flex items-center justify-center hover:opacity-90 transition-all shrink-0 cursor-pointer shadow-md shadow-[#5df7c1]/20">
              <Send className="w-3 h-3" />
            </button>
          </form>
          <p className="mt-1.5 text-center text-[10px] text-white/25">
            Grounded in verified portfolio data ·{' '}
            <a href="#contact" onClick={() => setIsOpen(false)} className="text-[#5df7c1]/60 hover:text-[#5df7c1] underline transition-colors">
              Contact directly
            </a>
          </p>
        </div>
      </div>

      {/* ── FLOATING BUBBLE (after first engagement, while minimised) ── */}
      {isVisible && (hasEngaged || isOpen) && !isOpen && (
        <div className="aib-bubble">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open assistant"
            className="relative w-13 h-13 rounded-full cursor-pointer group"
            style={{ width: 52, height: 52 }}
          >
            {/* Gradient ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5df7c1] to-[#5227FF] opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-[2px] rounded-full bg-[#0c1118] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#5df7c1]" />
            </span>
            {/* Unread pulse dot */}
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#5df7c1] border-2 border-[#0c1118] animate-pulse" />
          </button>
        </div>
      )}
    </>
  );
}
