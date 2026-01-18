import { useState } from "react";
import {
  Upload,
  FileText,
  X,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function UploadBox({ setPdfId }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (selectedFiles) => {
    const pdfFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );
    const invalidFiles = selectedFiles.filter(
      (file) => file.type !== "application/pdf"
    );

    if (invalidFiles.length > 0) {
      alert(`${invalidFiles.length} file(s) skipped. Only PDF files are accepted.`);
    }

    const newFiles = pdfFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: formatFileSize(file.size),
      progress: 30,
      status: "uploading",
      file: file,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      uploadToBackend(file.file, file.id);
    });
  };

  const uploadToBackend = async (file, fileId) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${API_BASE_URL}/api/upload-pdf`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Upload failed");
    }

    // ✅ mark upload complete
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? { ...f, progress: 100, status: "complete" }
          : f
      )
    );

    // ✅ store pdf_id globally (only if setPdfId exists)
    if (setPdfId && typeof setPdfId === 'function') {
      setPdfId(data.pdf_id);
    }

    // ✅ Show success alert
    alert(`✅ ${file.name} uploaded successfully! PDF ID: ${data.pdf_id}`);
    
  } catch (err) {
    console.error("Upload error:", err);
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: "error" } : f
      )
    );
    alert(`❌ PDF upload failed: ${err.message}`);
  }
};

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
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

  const completedFiles = files.filter((f) => f.status === "complete").length;
  const uploadingFiles = files.filter((f) => f.status === "uploading").length;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              Upload Documents
            </h3>
            <p className="text-sm text-gray-500">
              Support for PDF files up to 10MB
            </p>
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
              ? "border-blue-500 bg-blue-50 scale-[1.02]"
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Upload className="text-white" size={32} />
            </div>
            <p className="text-lg text-gray-700 mb-2 font-medium">
              <label
                htmlFor="file-upload"
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Click to upload
              </label>{" "}
              or drag and drop
            </p>
            <p className="text-sm text-gray-500 mb-4">
              PDF files only • Maximum 10MB
            </p>
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
            {files.map((file) => (
              <div
                key={file.id}
                className={`border rounded-xl p-5 ${
                  file.status === "complete"
                    ? "bg-green-50 border-green-200"
                    : file.status === "error"
                    ? "bg-red-50 border-red-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText
                      className={
                        file.status === "complete"
                          ? "text-green-600"
                          : "text-blue-600"
                      }
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <button onClick={() => removeFile(file.id)}>
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-3 h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-full rounded-full ${
                      file.status === "complete"
                        ? "bg-green-500"
                        : file.status === "error"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${file.progress}%` }}
                  />
                </div>

                {file.status === "error" && (
                  <p className="text-xs text-red-600 mt-2">
                    Upload failed. Try again.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}