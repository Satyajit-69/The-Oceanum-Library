import { useState } from 'react';
import { Upload, FileText, X, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function UploadBox() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (selectedFiles) => {
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    const invalidFiles = selectedFiles.filter(file => file.type !== 'application/pdf');
    
    if (invalidFiles.length > 0) {
      alert(`${invalidFiles.length} file(s) skipped. Only PDF files are accepted.`);
    }

    const newFiles = pdfFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      status: 'uploading',
      file: file
    }));

    setFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 3;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, progress: 100, status: 'complete' } : f
          ));
        }, 200);
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: Math.min(progress, 100) } : f
        ));
      }
    }, 150);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const completedFiles = files.filter(f => f.status === 'complete').length;
  const uploadingFiles = files.filter(f => f.status === 'uploading').length;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Upload Documents</h3>
            <p className="text-sm text-gray-500">Support for PDF files up to 10MB</p>
          </div>
          {files.length > 0 && (
            <div className="flex items-center gap-4 text-sm">
              {uploadingFiles > 0 && (
                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                  <Loader2 className="animate-spin" size={14} />
                  <span className="font-medium">{uploadingFiles} uploading</span>
                </div>
              )}
              {completedFiles > 0 && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                  <Check size={14} />
                  <span className="font-medium">{completedFiles} complete</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            isDragging 
              ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={`transition-all duration-300 ${isDragging ? 'scale-110' : 'scale-100'}`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Upload className="text-white" size={32} />
            </div>
            <p className="text-lg text-gray-700 mb-2 font-medium">
              <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold transition-colors">
                Click to upload
              </label>
              {' '}or drag and drop
            </p>
            <p className="text-sm text-gray-500 mb-4">PDF files only • Maximum 10MB per file</p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <AlertCircle size={14} />
              <span>Your files are processed securely</span>
            </div>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <div className="mt-8 space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              Uploaded Files ({files.length})
            </h4>
            {files.map(file => (
              <div 
                key={file.id} 
                className={`group border rounded-xl p-5 transition-all duration-300 ${
                  file.status === 'complete' 
                    ? 'bg-green-50 border-green-200 hover:shadow-md' 
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                      file.status === 'complete' ? 'bg-green-100' : 'bg-blue-50'
                    }`}>
                      <FileText 
                        className={file.status === 'complete' ? 'text-green-600' : 'text-blue-600'} 
                        size={24} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate text-base mb-0.5">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg p-2 transition-all ml-2 opacity-0 group-hover:opacity-100"
                    title="Remove file"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                    <div
                      className={`h-full transition-all duration-500 ease-out rounded-full relative overflow-hidden ${
                        file.status === 'complete' 
                          ? 'bg-gradient-to-r from-green-400 to-green-600' 
                          : 'bg-gradient-to-r from-blue-400 to-purple-600'
                      }`}
                      style={{ width: `${file.progress}%` }}
                    >
                      {file.status === 'uploading' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
                      )}
                    </div>
                  </div>
                  {file.status === 'complete' ? (
                    <div className="flex items-center gap-1.5 text-green-600 flex-shrink-0 font-medium">
                      <Check size={18} className="animate-[scale-in_0.3s_ease-out]" />
                      <span className="text-sm">Done</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-600 flex-shrink-0 w-12 text-right font-medium tabular-nums">
                      {Math.round(file.progress)}%
                    </span>
                  )}
                </div>

                {file.status === 'complete' && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-xs text-green-700 font-medium">
                      ✓ Ready to process
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}