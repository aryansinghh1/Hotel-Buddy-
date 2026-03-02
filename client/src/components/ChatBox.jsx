import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';

const WELCOME = {
  id: 'welcome',
  role: 'bot',
  text: "👋 Hi! I'm **Hotel Buddy**, your AI assistant for hotel bookings. Tell me where you'd like to stay, your budget, or any special requirements — I'll find the best options for you!",
};

function buildFilterString(filters) {
  const parts = [];
  if (filters.pool) parts.push('Pool');
  if (filters.gym) parts.push('Gym');
  if (filters.restaurant) parts.push('Restaurant');
  if (filters.priceLowHigh) parts.push('Sort by Price (Low to High)');
  if (filters.ratingHighLow) parts.push('Sort by Rating (High to Low)');
  return parts.join(', ');
}

export default function ChatBox({ filters }) {
  const [messages, setMessages] = useState([WELCOME]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(text) {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, filter: buildFilterString(filters) }),
      });
      const data = await res.json();
      const botMsg = { id: Date.now() + 1, role: 'bot', text: data.response };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: '⚠️ Could not reach the server. Make sure the backend is running on port 5000.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-navy-800/60 backdrop-blur-xl" style={{ minHeight: '70vh' }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4" style={{ maxHeight: '60vh' }}>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-end gap-2 animate-fadeInUp">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow flex-shrink-0">
              HB
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/90 dark:bg-navy-700/80 border border-gray-200 dark:border-white/10 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-blink dot-1" />
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-blink dot-2" />
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-blink dot-3" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-white/10 bg-white/80 dark:bg-navy-800/80 px-4 py-3">
        <ChatInput onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}
