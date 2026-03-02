function ChatMessage({ text, sender }) {
  const isBot = sender === 'bot';

  function formatBotText(text) {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300 font-semibold">$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="text-amber-300/90">$1</em>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
  }

  return (
    <div className={`flex items-start gap-3 py-3 animate-fade-in-up ${isBot ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      {isBot ? (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-indigo-500/20">
          <i className="fas fa-concierge-bell text-white text-xs"></i>
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-sky-500/20">
          <i className="fas fa-user text-white text-xs"></i>
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? 'bg-white/[0.04] text-gray-200 rounded-tl-sm'
            : 'bg-indigo-600/20 text-gray-200 border border-indigo-500/15 rounded-tr-sm'
        }`}
      >
        {isBot ? (
          <div dangerouslySetInnerHTML={{ __html: formatBotText(text) }} />
        ) : (
          <p className="m-0">{text}</p>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
