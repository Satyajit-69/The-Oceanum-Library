import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, FileText } from 'lucide-react';

export default function ChatBox({ messages, onSendMessage, isProcessing, pdfId }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [userScrolled, setUserScrolled] = useState(false);

  const scrollToBottom = (behavior = 'smooth') => {
    if (!userScrolled) {
      messagesEndRef.current?.scrollIntoView({ behavior });
    }
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 50;
    
    setUserScrolled(!isAtBottom);
  };

  useEffect(() => {
    // Only auto-scroll on new user messages or when user hasn't scrolled
    if (messages.length < 0 && !userScrolled) {
      scrollToBottom();
    }
  }, [messages, userScrolled]);

  const handleSend = () => {
    if (!input.trim() || !pdfId) return;
    setUserScrolled(false); // Reset on send to enable auto-scroll
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="border border-gray-200 rounded-2xl bg-white shadow-lg flex flex-col h-[650px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="text-white" size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Assistant</h3>
            <p className="text-sm text-white/80">Ask questions about your documents</p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Sparkles size={14} />
            <span className="font-medium">{pdfId ? 'Online' : 'Waiting'}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white"
      >
        {!pdfId ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-amber-100 flex items-center justify-center">
                <FileText className="text-amber-600" size={36} />
              </div>
              <p className="text-gray-700 font-semibold text-lg mb-2">Upload a document first</p>
              <p className="text-sm text-gray-500">Please upload a PDF to start asking questions.</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-purple-100 flex items-center justify-center">
                <Bot className="text-purple-600" size={36} />
              </div>
              <p className="text-gray-700 font-semibold text-lg mb-2">Ready to assist!</p>
              <p className="text-sm text-gray-500">Your document is ready. Ask me anything!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                }`}>
                  {msg.role === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
                </div>
                <div className={`flex-1 max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="bg-white border px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50 flex-shrink-0">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={!pdfId}
            placeholder={pdfId ? "Ask something..." : "Upload a PDF first..."}
            className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || !pdfId}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            <Send size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}