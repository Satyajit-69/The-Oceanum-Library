export default function ChatBox() {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-3">Chat</h3>

      {/* Messages */}
      <div className="h-64 border rounded mb-3 p-2 overflow-y-auto">
        {/* messages will go here */}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask something..."
        />
        <button className="px-4 py-2 bg-black text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}
