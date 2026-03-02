import { useState, useRef } from 'react';
import { SendHorizontal } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
    textareaRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask about hotels, locations, amenities…"
        className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-navy-900/60 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 leading-relaxed"
        style={{ maxHeight: '120px', overflowY: 'auto' }}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md hover:opacity-90 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Send message"
      >
        <SendHorizontal size={18} />
      </button>
    </form>
  );
}
