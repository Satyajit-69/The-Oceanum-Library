import UploadBox from "../components/UploadBox";
import ChatBox from "../components/ChatBox";

export default function RagChat() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">🧠 RAG Chat</h2>

      {/* Upload section */}
      <UploadBox />

      {/* Chat section */}
      <ChatBox />
    </div>
  );
}
