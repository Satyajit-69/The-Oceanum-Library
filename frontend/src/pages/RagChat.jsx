import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import UploadBox from '../components/UploadBox';
import ChatBox from '../components/ChatBox';

export default function RagChat() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (file) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSendMessage = (message) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'This is a simulated response. In a real implementation, this would query your uploaded documents and provide AI-powered insights based on their content.'
      }]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-purple-600 to-black shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-xl">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                LEXA
              </h1>
            </div>
          </div>
          <p className="text-sm text-white/90 mt-3 font-medium text-center">AI-Powered Document Intelligence</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 ">
          {/* Upload Section */}
          <UploadBox
            onFileUpload={handleFileUpload}
            uploadedFiles={uploadedFiles}
            onRemoveFile={handleRemoveFile}
          />

          {/* Chat Section */}
          <ChatBox
            messages={messages}
            onSendMessage={handleSendMessage}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}