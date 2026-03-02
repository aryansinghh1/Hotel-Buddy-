function parseMarkdown(text) {
  // Bold: **text**
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end animate-fadeInUp">
        <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br-sm bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md text-sm leading-relaxed">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 animate-fadeInUp">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow flex-shrink-0">
        HB
      </div>
      <div
        className="max-w-[75%] px-4 py-3 rounded-2xl rounded-bl-sm bg-white/90 dark:bg-navy-700/80 border border-gray-200 dark:border-white/10 shadow-sm text-sm leading-relaxed text-gray-800 dark:text-gray-100"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
      />
    </div>
  );
}
