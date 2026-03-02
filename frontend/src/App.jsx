import { useState, useEffect, useRef } from "react";
import ChatMessage from "./components/ChatMessage";
import FilterDropdown from "./components/FilterDropdown";

const INITIAL_MESSAGE = {
  text: 'Welcome! \u{1F3E8} Let me help you find the perfect hotel. Try typing <strong>"Hotels in Mumbai near airport"</strong>.',
  sender: "bot",
};

function App() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [filters, setFilters] = useState([]);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Apply theme to body
  useEffect(() => {
    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(`${theme}-mode`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Generate stars
  useEffect(() => {
    const bg = document.getElementById("starBackground");
    if (!bg) return;
    bg.innerHTML = "";
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      bg.appendChild(star);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleFilterChange = (value) => {
    setFilters((prev) =>
      prev.includes(value)
        ? prev.filter((f) => f !== value)
        : [...prev, value]
    );
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || loading) return;

    const filterStr = filters.join(", ");
    const displayText =
      message + (filterStr ? ` [Filters: ${filterStr}]` : "");

    setMessages((prev) => [...prev, { text: displayText, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, filter: filterStr }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong with the bot.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <div className="background" id="starBackground"></div>

      <div className="chat-wrapper">
        <div className="chat-box">
          <div className="chat-header">
            <h2>
              <i className="fas fa-hotel"></i> Hotel Buddy
            </h2>
            <p>Your AI assistant for hotel bookings</p>
            <button
              className="toggle-btn"
              onClick={toggleTheme}
              title="Toggle Dark/Light Mode"
            >
              <i
                className={`fas fa-${theme === "light" ? "moon" : "sun"}`}
              ></i>
            </button>
          </div>

          <div className="chat-container">
            {messages.map((msg, i) => (
              <ChatMessage key={i} text={msg.text} sender={msg.sender} />
            ))}
            {loading && (
              <ChatMessage text="Typing..." sender="bot" />
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input">
            <FilterDropdown
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a location or hotel..."
            />
            <button onClick={sendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
