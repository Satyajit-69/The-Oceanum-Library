import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";

export default function VoiceMemo() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [history, setHistory] = useState([]);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setHistory((prev) => [
        { text: result, timestamp: new Date().toLocaleTimeString() },
        ...prev,
      ]);
      speak(`You said: ${result}`);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    try {
      setListening(true);
      recognitionRef.current.start();
    } catch (error) {
      console.error("Error starting recognition:", error);
      setListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const clearHistory = () => {
    setHistory([]);
    setTranscript("");
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <MicOff className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Speech Recognition Not Supported
          </h2>
          <p className="text-gray-600">
            Please use a modern browser like Chrome, Edge, or Safari to access
            this feature.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Voice Memo
          </h1>
          <p className="text-gray-600">
            Click the button below to record your voice message
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={listening ? stopListening : startListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                listening
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {listening ? (
                <MicOff className="w-10 h-10 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </button>

            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                {listening ? "Listening..." : "Ready to record"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {listening
                  ? "Speak now, I'm listening"
                  : "Click the microphone to start"}
              </p>
            </div>
          </div>

          {transcript && (
            <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
              <p className="text-sm font-semibold text-indigo-800 mb-2">
                Latest Transcript
              </p>
              <p className="text-gray-800 text-lg">{transcript}</p>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">History</h2>
              <button
                onClick={clearHistory}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-gray-800 flex-1">{entry.text}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {entry.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}