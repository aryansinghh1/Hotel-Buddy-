function formatBotText(text) {
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  formatted = formatted.replace(/\n/g, "<br>");
  return formatted;
}

function ChatMessage({ text, sender }) {
  const className = `chat-message ${sender === "user" ? "user-message" : "bot-message"}`;

  if (sender === "bot") {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: `<p>${formatBotText(text)}</p>` }}
      />
    );
  }

  return (
    <div className={className}>
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;
