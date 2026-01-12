import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "Based on your documents, I can help you with that! This is a sample response demonstrating the chat functionality.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4">
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
            <span className="font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 bg-gradient-to-b from-gray-50 to-white p-6 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center shadow-md">
                <Bot className="text-purple-600" size={36} />
              </div>
              <p className="text-gray-700 font-semibold text-lg mb-2">Start a conversation</p>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Ask me anything about your uploaded documents and I'll help you find answers.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-purple-500 to-purple-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="text-white" size={18} />
                  ) : (
                    <Bot className="text-white" size={18} />
                  )}
                </div>
                <div className={`flex-1 ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col max-w-[75%]`}>
                  <div className={`rounded-2xl px-5 py-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-md'
                      : 'bg-white text-gray-800 rounded-tl-md border border-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1.5 px-2 font-medium">{message.timestamp}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Bot className="text-white" size={18} />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-white border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all"
            placeholder="Ask something about your documents..."
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md flex items-center gap-2"
          >
            <Send size={18} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}