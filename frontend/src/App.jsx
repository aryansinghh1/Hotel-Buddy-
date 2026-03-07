import { useState, useEffect, useRef } from "react";
import ChatMessage from "./components/ChatMessage";
import FilterDropdown from "./components/FilterDropdown";

const SUGGESTIONS = [
  "Hotels in Mumbai near airport",
  "Budget stays in Goa with pool",
  "Luxury hotels in Delhi under 5000",
  "5-star hotels in Jaipur",
];

function App() {
  const [messages, setMessages] = useState([
    {
      text: 'Welcome! I\'m your AI hotel concierge. Tell me where you\'re heading and I\'ll find the perfect stay for you.\n\nTry something like **"Hotels in Mumbai near airport"** or **"Budget stays in Goa with pool"**.',
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function sendMessage(overrideMessage) {
    const message = (overrideMessage || input).trim();
    if (!message || isLoading) return;

    const filterStr = filters.join(", ");
    const displayText = message + (filterStr ? ` [${filterStr}]` : "");

    setMessages((prev) => [...prev, { text: displayText, sender: "user" }]);
    setInput("");
    setIsLoading(true);

    // Build conversation history (skip the initial welcome message at index 0)
    const history = messages.slice(1).map((msg) => ({
      role: msg.sender,
      text: msg.text,
    }));

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, filter: filterStr, history }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Connection error. Please check if the server is running and try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([
      {
        text: "Chat cleared! How can I help you find a hotel today?",
        sender: "bot",
      },
    ]);
    setSidebarOpen(false);
  }

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 h-full w-72 flex flex-col border-r border-white/[0.06] bg-gray-950/80 backdrop-blur-xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Main Logo */}
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
                {/* Hotel Icon */}
                <i className="fas fa-hotel text-lg"></i>
              </div>
            </div>

            <div>
              <h1 className="text-base font-semibold text-white tracking-tight">
                Hotel Buddy
              </h1>
            </div>
          </div>
        </div>

        {/* New chat button */}
        <div className="p-4">
          <button
            onClick={clearChat}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.08] text-sm text-gray-300 hover:bg-white/[0.04] hover:text-white transition-all duration-200 cursor-pointer"
          >
            <i className="fas fa-plus text-xs text-indigo-400"></i>
            New conversation
          </button>
        </div>

        {/* Quick prompts */}
        <div className="flex-1 overflow-y-auto px-4">
          <p className="text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-3 px-1">
            Try asking
          </p>
          <div className="space-y-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  sendMessage(s);
                  setSidebarOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
              >
                <i className="fas fa-arrow-right text-[10px] text-indigo-500/60 mr-2.5"></i>
                {s}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col relative z-10 min-w-0">
        {/* Top bar */}
        <header className="h-14 flex items-center gap-3 px-4 md:px-6 border-b border-white/[0.06] bg-gray-950/50 backdrop-blur-md flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/[0.06] text-gray-400 cursor-pointer"
          >
            <i className="fas fa-bars text-sm"></i>
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-medium text-gray-200 truncate">
              Hotel Booking Assistant
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Online
            </span>
          </div>
        </header>

        {/* Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto chat-scroll px-4 md:px-0"
        >
          <div className="max-w-2xl mx-auto py-6 space-y-1">
            {messages.map((msg, i) => (
              <ChatMessage key={i} text={msg.text} sender={msg.sender} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 py-4 animate-fade-in-up">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fas fa-concierge-bell text-white text-xs"></i>
                </div>
                <div className="flex items-center gap-1.5 py-3 px-4 rounded-2xl bg-white/[0.04]">
                  <span className="typing-dot w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="typing-dot w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="typing-dot w-2 h-2 rounded-full bg-indigo-400"></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 border-t border-white/[0.06] bg-gray-950/50 backdrop-blur-md px-4 md:px-0">
          <div className="max-w-2xl mx-auto py-3">
            {/* Active filters */}
            {filters.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2.5 px-1">
                {filters.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                  >
                    {f}
                    <button
                      onClick={() =>
                        setFilters((prev) => prev.filter((v) => v !== f))
                      }
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      <i className="fas fa-times text-[9px]"></i>
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="flex items-center gap-2">
              <FilterDropdown selected={filters} onChange={setFilters} />
              <div className="flex-1 flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 focus-within:border-indigo-500/40 focus-within:bg-white/[0.05] transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about hotels, destinations, or deals..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600 disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all duration-200 flex-shrink-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  <i className="fas fa-arrow-up text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
