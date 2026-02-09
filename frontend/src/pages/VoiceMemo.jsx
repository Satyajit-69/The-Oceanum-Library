import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";

const EXIT_KEYWORDS = ["exit", "quit", "stop", "bye"];

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [history, setHistory] = useState([]);
  const [isSupported, setIsSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [callActive, setCallActive] = useState(false);

  const recognitionRef = useRef(null);

  // Inject wave animation styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes wave {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(2.5); opacity: 0; }
      }
      .wave-animation {
        animation: wave 2s ease-out infinite;
      }
      .wave-animation:nth-child(2) { animation-delay: 0.3s; }
      .wave-animation:nth-child(3) { animation-delay: 0.6s; }
      .wave-animation:nth-child(4) { animation-delay: 0.9s; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const API_URL = "http://localhost:8000/voice/chat";

  // Setup Speech Recognition
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

    recognition.onresult = async (event) => {
      const result = event.results[0][0].transcript.toLowerCase();
      setTranscript(result);

      // 🔴 Voice exit
      if (EXIT_KEYWORDS.some(word => result.includes(word))) {
        stopListening();
        speak("Goodbye 👋");
        return;
      }

      setHistory(prev => [
        {
          type: "user",
          text: result,
          timestamp: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

      await sendToBackend(result);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  const sendToBackend = async (userInput) => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await res.json();

      if (data.success && data.response) {
        setHistory(prev => [
          {
            type: "assistant",
            text: data.response,
            timestamp: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);

        speakAndContinue(data.response);
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!recognitionRef.current || listening) return;
    try {
      setCallActive(true);
      setListening(true);
      recognitionRef.current.start();
    } catch {}
  };

  const stopListening = () => {
    setCallActive(false);
    setListening(false);
    setIsLoading(false);
    recognitionRef.current?.stop();
    speechSynthesis.cancel();
  };

  const speak = (message) => {
    const u = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(u);
  };

  // 🔁 Infinite loop controller
  const speakAndContinue = (message) => {
    const u = new SpeechSynthesisUtterance(message);
    u.rate = 0.9;

    u.onend = () => {
      setIsLoading(false);
      if (callActive) {
        setTimeout(startListening, 500);
      }
    };

    speechSynthesis.speak(u);
  };

  const clearHistory = () => {
    setHistory([]);
    setTranscript("");
  };

  if (!isSupported) {
    return <p>Speech Recognition not supported</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6 py-12 text-center">

        <h1 className="text-4xl font-bold mb-2">🎙️ Voice Assistant</h1>
        <p className="text-gray-600 mb-8">Continuous voice conversation</p>

        <div className="relative inline-block mb-6">
          {isLoading && (
            <>
              <div className="absolute inset-0 w-32 h-32 rounded-full bg-indigo-400 wave-animation"></div>
              <div className="absolute inset-0 w-32 h-32 rounded-full bg-indigo-300 wave-animation"></div>
              <div className="absolute inset-0 w-32 h-32 rounded-full bg-indigo-200 wave-animation"></div>
            </>
          )}

          <button
            onClick={callActive ? stopListening : startListening}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-lg ${
              callActive ? "bg-red-500" : "bg-green-600"
            }`}
          >
            {callActive ? (
              <MicOff className="w-12 h-12 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </button>
        </div>

        <p className="text-lg font-medium">
          {!callActive
            ? "Ready"
            : listening
            ? "🎤 Listening..."
            : "🔊 Speaking..."}
        </p>

        {history.length > 0 && (
          <div className="mt-10 bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Conversation</h2>
              <button onClick={clearHistory} className="text-red-500 text-sm">
                Clear
              </button>
            </div>

            {history.map((h, i) => (
              <div key={i} className="mb-3 text-left">
                <p className="text-xs text-gray-500">{h.type}</p>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
