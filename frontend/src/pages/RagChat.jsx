import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import UploadBox from '../components/UploadBox';
import ChatBox from '../components/ChatBox';
import PdfSelector from '../components/PdfSelector';
import { API_BASE_URL } from '../config/api';

export default function RagChat() {
  const [pdfId, setPdfId] = useState(null);
  const [pdfName, setPdfName] = useState('');
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePdfSelect = (selectedPdfId, selectedPdfName) => {
    setPdfId(selectedPdfId);
    setPdfName(selectedPdfName);
    setMessages([]); // Clear messages when switching PDFs
  };

  const handleSendMessage = async (message) => {
    if (!pdfId) {
      alert('⚠️ Please select a PDF first!');
      return;
    }

    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsProcessing(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdf_id: pdfId,
          question: message
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer || 'Sorry, I could not process your request.'
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌  Could not get a response. Please try again.'
      }]);
    } finally {
      setIsProcessing(false);
    }
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
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">LEXA</h1>
            </div>
          </div>
          <p className="text-sm text-white/90 mt-3 font-medium text-center">
            AI-Powered Document Intelligence
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!pdfId ? (
          // Show Upload & Selector when no PDF selected
          <div className="grid lg:grid-cols-2 gap-8">
            {/* PDF Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <PdfSelector selectedPdfId={pdfId} onSelectPdf={handlePdfSelect} />
            </div>
            
            {/* Upload Section */}
            <UploadBox setPdfId={setPdfId} setPdfName={setPdfName} />
          </div>
        ) : (
          // Show ChatBox when PDF is selected
          <div className="max-w-4xl mx-auto">
            {/* PDF Info & Change Button */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Chatting with</p>
                  <p className="font-semibold text-gray-800 truncate max-w-md" title={pdfName}>
                    {pdfName || 'Selected Document'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setPdfId(null);
                  setPdfName('');
                }}
                className="px-4 py-2 text-sm bg-white hover:bg-gray-200 text-gray-700 rounded-lg transition-all font-medium"
              >
                Change PDF
              </button>
            </div>

            {/* Chat Box */}
            <ChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              isProcessing={isProcessing}
              pdfId={pdfId}
            />
          </div>
        )}
      </div>
    </div>
  );
}