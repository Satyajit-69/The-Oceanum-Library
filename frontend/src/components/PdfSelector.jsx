import { useState, useEffect } from 'react';
import { FileText, ChevronDown, Check, Loader2, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function PdfSelector({ selectedPdfId, onSelectPdf }) {
  const [pdfs, setPdfs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/list-pdfs`);
      const data = await response.json();
      setPdfs(data.pdfs || []);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      alert('Failed to load PDFs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const selectedPdf = pdfs.find(pdf => pdf.pdf_id === selectedPdfId);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Select Document
      </label>
      
      {/* Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between hover:border-purple-400 transition-all"
      >
        <div className="flex items-center gap-3">
          <FileText className={selectedPdf ? "text-purple-600" : "text-gray-400"} size={20} />
          <span className={selectedPdf ? "text-gray-800 font-medium" : "text-gray-400"}>
            {selectedPdf ? selectedPdf.filename : "Choose a PDF to query"}
          </span>
        </div>
        <ChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
          {/* Refresh Button */}
          <div className="p-2 border-b border-gray-200">
            <button
              onClick={fetchPdfs}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-sm text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg transition-all disabled:opacity-50"
            >
              <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
              Refresh List
            </button>
          </div>

          {loading ? (
            <div className="p-8 flex items-center justify-center">
              <Loader2 className="animate-spin text-purple-600" size={24} />
            </div>
          ) : pdfs.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="mx-auto text-gray-300 mb-2" size={48} />
              <p className="text-gray-500 text-sm">No PDFs uploaded yet</p>
              <p className="text-gray-400 text-xs mt-1">Upload a PDF to get started</p>
            </div>
          ) : (
            <div className="p-2">
              {pdfs.map((pdf) => (
                <button
                  key={pdf.pdf_id}
                  onClick={() => {
                    onSelectPdf(pdf.pdf_id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 transition-all flex items-center justify-between group ${
                    selectedPdfId === pdf.pdf_id ? 'bg-purple-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText 
                      className={selectedPdfId === pdf.pdf_id ? "text-purple-600" : "text-gray-400"} 
                      size={20} 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{pdf.filename}</p>
                      <p className="text-xs text-gray-500">{formatDate(pdf.upload_date)}</p>
                    </div>
                  </div>
                  {selectedPdfId === pdf.pdf_id && (
                    <Check className="text-purple-600 flex-shrink-0" size={20} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}