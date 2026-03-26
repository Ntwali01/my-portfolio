'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, ChevronDown } from 'lucide-react';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

const starterMessage =
  "Hello! I'm Adore AI Receptionist. I can help you understand Cyubahiro's work, recommend the right service, or guide you to start a project conversation.";

const suggestionChips = [
  'Start a web project',
  'Need an AI receptionist',
  'See portfolio highlights',
  'What services do you offer?',
  'How much does a website cost?',
  'Build me a landing page',
  'I need a mobile app',
  'What tech stack do you use?',
  'Can you build an e-commerce site?',
  'Tell me about your experience',
  'Do you do UI/UX design?',
  'I need an AI chatbot',
  'How long does a project take?',
  'Can you redesign my website?',
  'What is your availability?',
  'Do you work with startups?',
  'I need a dashboard built',
  'Can you integrate an API?',
  'Tell me about your projects',
  'Do you offer maintenance?',
  'I need a portfolio website',
  'Can you build a SaaS product?',
  'What makes you different?',
  'I have a project idea',
  'Do you do freelance work?',
];

const row1 = suggestionChips.slice(0, 13);
const row2 = suggestionChips.slice(12);

export function AIReceptionist() {
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

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
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
      if (!res.ok || !data.text) {
        throw new Error(data.error || 'Assistant request failed.');
      }
      setMessages((cur) => [...cur, { id: `assistant-${messageIdRef.current++}`, role: 'assistant', text: data.text }]);
    } catch (err) {
      setMessages((cur) => [
        ...cur,
        {
          id: `assistant-${messageIdRef.current++}`,
          role: 'assistant',
          text: "I'm currently unavailable. For immediate help, reach Cyubahiro directly:\n\n📧 cyubahirontwaliadore@gmail.com\n📞 +250 798 221 657",
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

  return (
    <>
      <style>{`
        @keyframes ai-fade-up {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes ai-slide-right {
          from { opacity: 0; transform: translateX(60px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes ai-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
        .ai-bar {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: min(580px, calc(100vw - 32px));
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.22,1,.36,1);
        }
        .ai-bar.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateX(-50%) translateY(16px);
        }
        .ai-bar.visible {
          animation: ai-fade-up 0.38s cubic-bezier(.22,1,.36,1) both;
        }
        .ai-chat {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          width: min(400px, calc(100vw - 32px));
          height: min(580px, calc(100vh - 40px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 20px 70px rgba(0,0,0,0.22);
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.22,1,.36,1);
        }
        .ai-chat.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateX(80px) scale(0.93);
        }
        .ai-chat.visible {
          animation: ai-chat-slide-in 0.6s cubic-bezier(.22,1,.36,1) both;
        }
        .ai-dot { animation: ai-dot-bounce 1.3s infinite ease-in-out; }
        .ai-chip:hover { background: rgba(0,214,255,0.18) !important; color: #5df7c1 !important; border-color: rgba(0,214,255,0.4) !important; }
        .ai-send-btn:hover { opacity: 0.82; transform: scale(1.05); }
        .ai-send-btn { transition: opacity 0.2s, transform 0.2s; }
        .ai-close-btn:hover { background: #e5e7eb !important; }
        .ai-msg-scroll::-webkit-scrollbar { width: 4px; }
        .ai-msg-scroll::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
        @keyframes ai-bubble-pop {
          0%   { opacity: 0; transform: scale(0.5); }
          70%  { transform: scale(1.12); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ai-green-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(93,247,193,0.6); }
          50%       { box-shadow: 0 0 0 6px rgba(93,247,193,0); }
        }
        .ai-bubble { animation: ai-bubble-pop 0.4s cubic-bezier(.22,1,.36,1) both; }
        .ai-bubble:hover { transform: scale(1.08); }
        .ai-bubble { transition: transform 0.2s; }
        @keyframes ai-marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ai-marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes ai-chat-slide-in {
          0%   { opacity: 0; transform: translateX(120px) scale(0.92); }
          55%  { opacity: 1; transform: translateX(-6px) scale(1.01); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .ai-marquee-track { display: flex; gap: 8px; width: max-content; }
        .ai-marquee-left  { animation: ai-marquee-left  44s linear infinite; }
        .ai-marquee-right { animation: ai-marquee-right 50s linear infinite; }
        .ai-marquee-wrap:hover .ai-marquee-left  { animation-play-state: paused; }
        .ai-marquee-wrap:hover .ai-marquee-right { animation-play-state: paused; }
        .ai-marquee-wrap  { overflow: hidden; mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent); }
      `}</style>

      {/* ── COLLAPSED BAR — centered, only when not engaged ── */}
      <div className={`ai-bar ${!isVisible || isOpen || hasEngaged ? 'hidden' : 'visible'}`}>
        <div style={{
          background: 'rgba(20,24,28,0.93)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
          padding: '10px 12px 12px',
        }}>
          <form onSubmit={handleCollapsedSubmit} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Avatar */}
            <div style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              background: '#000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 3px rgba(0,214,255,0.18)',
            }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#5df7c1', letterSpacing: '-0.5px' }}>CA</span>
            </div>

            {/* Input */}
            <input
              ref={collapsedInputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask any question"
              style={{
                flex: 1, background: '#fff', border: 'none', borderRadius: 50,
                padding: '11px 18px', fontSize: 15, color: '#111',
                outline: 'none', boxSizing: 'border-box',
              }}
            />

            {/* Send */}
            <button type="submit" className="ai-send-btn" style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#00d6ff,#5df7c1)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Send style={{ width: 17, height: 17, color: '#000' }} />
            </button>
          </form>

          {/* Marquee chips — row 1 scrolls left, row 2 scrolls right */}
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { items: row1, dir: 'ai-marquee-left' },
              { items: row2, dir: 'ai-marquee-right' },
            ].map(({ items, dir }, rowIdx) => (
              <div key={rowIdx} className="ai-marquee-wrap">
                <div className={`ai-marquee-track ${dir}`}>
                  {[...items, ...items].map((chip, i) => (
                    <button
                      key={`${chip}-${i}`}
                      type="button"
                      className="ai-chip"
                      onClick={() => { setInputValue(''); submitMessage(chip); }}
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.13)',
                        borderRadius: 50, padding: '6px 16px',
                        fontSize: 12.5, color: 'rgba(255,255,255,0.68)',
                        cursor: 'pointer', whiteSpace: 'nowrap',
                        transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                        flexShrink: 0,
                      }}
                    >{chip}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPANDED CHAT — slides in from right ── */}
      <div className={`ai-chat ${!isVisible || !isOpen ? 'hidden' : 'visible'}`}>

        {/* Header */}
        <div style={{
          padding: '14px 16px', borderBottom: '1px solid #f0f0f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#fff', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 46, height: 46, borderRadius: '50%',
              background: '#000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#5df7c1', letterSpacing: '-0.5px' }}>CA</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#111' }}>Adore AI Receptionist</p>
              <p style={{ margin: 0, fontSize: 12, color: '#999' }}>AI Sales Rep · Portfolio Concierge</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="ai-close-btn"
            aria-label="Minimize"
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: '#f3f4f6', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >
            <ChevronDown style={{ width: 18, height: 18, color: '#555' }} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={viewportRef}
          className="ai-msg-scroll"
          style={{
            flexGrow: 1, padding: '16px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 12,
            background: '#f9fafb',
          }}
        >
          {messages.map((msg) => (
            <div key={msg.id} style={{
              maxWidth: '82%',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' ? '#e5e7eb' : '#fff',
              color: '#111',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding: '10px 14px', fontSize: 14, lineHeight: 1.65,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div style={{
              alignSelf: 'flex-start', display: 'flex', gap: 5,
              background: '#fff', borderRadius: '18px 18px 18px 4px',
              padding: '12px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
              {[0, 150, 300].map((d) => (
                <span key={d} className="ai-dot" style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#bbb', display: 'inline-block', animationDelay: `${d}ms`,
                }} />
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ padding: '12px 16px 14px', borderTop: '1px solid #f0f0f0', background: '#fff', flexShrink: 0 }}>
          <form onSubmit={handleChatSubmit} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#f3f4f6', borderRadius: 50, padding: '6px 6px 6px 16px',
          }}>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask your question…"
              style={{
                flex: 1, background: 'transparent', border: 'none',
                fontSize: 14, color: '#111', outline: 'none',
              }}
            />
            <button type="submit" className="ai-send-btn" style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#00d6ff,#5df7c1)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Send style={{ width: 15, height: 15, color: '#000' }} />
            </button>
          </form>
          <p style={{ margin: '8px 0 0', fontSize: 11, color: '#bbb', textAlign: 'center' }}>
            Powered by Adore AI · {' '}
            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', color: '#00d6ff', fontSize: 11, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            >Contact directly</button>
          </p>
        </div>
      </div>
      {/* ── MINIMIZED BUBBLE — bottom-right, shown after engagement when chat is closed ── */}
      {isVisible && hasEngaged && !isOpen && (
        <button
          className="ai-bubble"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
            width: 58, height: 58, borderRadius: '50%',
            background: '#000',
            border: '2px solid rgba(93,247,193,0.4)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 800, color: '#5df7c1', letterSpacing: '-0.5px' }}>CA</span>
          {/* Green active dot */}
          <span style={{
            position: 'absolute', bottom: 3, right: 3,
            width: 13, height: 13, borderRadius: '50%',
            background: '#5df7c1',
            border: '2px solid #000',
            animation: 'ai-green-pulse 2s infinite',
          }} />
        </button>
      )}
    </>
  );
}
