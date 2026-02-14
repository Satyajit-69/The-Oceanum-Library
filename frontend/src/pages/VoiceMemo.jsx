import { useEffect, useRef, useState } from "react";
import { 
  Mic, Square, Trash2, Play, Pause, Sparkles, 
  Download, Copy, MessageSquare, Settings, 
  Volume2, VolumeX, Zap, History, RefreshCw 
} from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function VoiceMemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [recordTime, setRecordTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [transcription, setTranscription] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Advanced features
  const [conversationHistory, setConversationHistory] = useState([]);
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash-exp");
  const [temperature, setTemperature] = useState(0.7);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [systemPrompt, setSystemPrompt] = useState("You are Lexa, a helpful AI assistant.");

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);

  // Timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // Audio Visualization
  const setupAudioVisualization = (stream) => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;

    visualize();
  };

  const visualize = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Calculate average audio level
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      setAudioLevel(Math.min(100, (average / 255) * 100));

      // Clear canvas
      ctx.fillStyle = "rgb(243, 244, 246)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bars
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#8b5cf6");
        gradient.addColorStop(1, "#6366f1");
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { 
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000
      });
      const chunks = [];

      setupAudioVisualization(stream);

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);

        // Stop visualization
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }

        await sendToAI(blob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;

      setRecordTime(0);
      setIsRecording(true);
      setAiResponse("");
      setTranscription("");
    } catch (error) {
      console.error("Mic error:", error);
      alert("Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setAudioLevel(0);
  };

  // Send Audio to Backend
  const sendToAI = async (audioBlob) => {
    setIsProcessing(true);

    try {
      const base64Audio = await blobToBase64(audioBlob);

      const response = await fetch(`${API_BASE_URL}/api/voice_chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: base64Audio,
          model: selectedModel,
          temperature: temperature,
          system_prompt: systemPrompt,
          conversation_history: conversationHistory.slice(-5), // Last 5 exchanges
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Backend error");
      }

      const userMessage = data.transcription || "[Audio input]";
      const aiMessage = data.response;

      setTranscription(userMessage);
      setAiResponse(aiMessage);

      // Add to conversation history
      const newHistory = [
        ...conversationHistory,
        { role: "user", content: userMessage, timestamp: Date.now() },
        { role: "assistant", content: aiMessage, timestamp: Date.now() }
      ];
      setConversationHistory(newHistory);
      
      // Save to localStorage
      localStorage.setItem("voiceConversations", JSON.stringify(newHistory));

      setIsProcessing(false);

      if (autoSpeak) {
        speakResponse(aiMessage);
      }

    } catch (error) {
      console.error("AI Error:", error);
      setIsProcessing(false);
      setAiResponse("❌ Something went wrong. Please try again.");
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Text To Speech
  const speakResponse = (text) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Get available voices and select a good one
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Female')) 
                          || voices.find(v => v.lang === 'en-US')
                          || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (aiResponse) {
      speakResponse(aiResponse);
    }
  };

  // Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const deleteRecording = () => {
    setAudioURL(null);
    setRecordTime(0);
    setIsPlaying(false);
    setAiResponse("");
    setTranscription("");
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const clearHistory = () => {
    setConversationHistory([]);
    localStorage.removeItem("voiceConversations");
  };

  const downloadAudio = () => {
    if (!audioURL) return;
    const a = document.createElement("a");
    a.href = audioURL;
    a.download = `voice-memo-${Date.now()}.webm`;
    a.click();
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(aiResponse);
    alert("✅ Response copied!");
  };

  const regenerateResponse = async () => {
    if (!audioURL) return;
    const response = await fetch(audioURL);
    const blob = await response.blob();
    await sendToAI(blob);
  };

  // Load conversation history on mount
  useEffect(() => {
    const saved = localStorage.getItem("voiceConversations");
    if (saved) {
      setConversationHistory(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/20">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🎙 AI Voice Assistant
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Conversation History"
            >
              <History size={20} />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">AI Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash (Fast)</option>
                <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                <option value="gemini-pro">Gemini Pro (Best)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Temperature: {temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">System Prompt</label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoSpeak}
                onChange={(e) => setAutoSpeak(e.target.checked)}
                id="autoSpeak"
              />
              <label htmlFor="autoSpeak">Auto-speak responses</label>
            </div>
          </div>
        )}

        {/* History Panel */}
        {showHistory && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl max-h-64 overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Conversation History</h3>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>
            {conversationHistory.length === 0 ? (
              <p className="text-gray-400 text-sm">No conversations yet</p>
            ) : (
              <div className="space-y-2">
                {conversationHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-indigo-100 text-indigo-900"
                        : "bg-purple-100 text-purple-900"
                    }`}
                  >
                    <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Audio Visualizer */}
        {isRecording && (
          <div className="mb-6">
            <canvas
              ref={canvasRef}
              width={600}
              height={100}
              className="w-full rounded-xl bg-gray-100"
            />
            <div className="mt-2 flex items-center gap-2">
              <Volume2 size={16} className="text-purple-600" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all"
                  style={{ width: `${audioLevel}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Timer */}
        <div className="text-4xl font-mono mb-6 text-center text-gray-700">
          {formatTime(recordTime)}
        </div>

        {/* Record Button */}
        <div className="mb-6 text-center">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={isProcessing}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition disabled:opacity-50"
            >
              <Mic size={36} />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-8 rounded-full animate-pulse shadow-xl"
            >
              <Square size={36} />
            </button>
          )}
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="text-center text-indigo-600 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="inline animate-spin" size={18} />
            <span className="font-medium">Processing with {selectedModel}...</span>
          </div>
        )}

        {/* Transcription */}
        {transcription && (
          <div className="mb-4 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
            <div className="flex items-start gap-2">
              <MessageSquare size={18} className="text-indigo-600 mt-1" />
              <div>
                <strong className="text-indigo-900">You said:</strong>
                <p className="text-gray-700 mt-1">{transcription}</p>
              </div>
            </div>
          </div>
        )}

        {/* AI Response */}
        {aiResponse && (
          <div className="mb-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles size={18} className="text-purple-600 mt-1" />
              <strong className="text-purple-900">Lexa:</strong>
            </div>
            <p className="text-gray-700 leading-relaxed">{aiResponse}</p>
            
            <div className="flex gap-2 mt-3">
              <button
                onClick={toggleSpeaking}
                className={`p-2 rounded-lg transition ${
                  isSpeaking ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                title={isSpeaking ? "Stop Speaking" : "Speak Response"}
              >
                {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                onClick={copyResponse}
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                title="Copy Response"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={regenerateResponse}
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                title="Regenerate Response"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Audio Controls */}
        {audioURL && (
          <div className="flex justify-center gap-3">
            <audio
              ref={audioRef}
              src={audioURL}
              onEnded={() => setIsPlaying(false)}
              hidden
            />

            <button
              onClick={togglePlay}
              className="bg-indigo-500 text-white p-4 rounded-full hover:bg-indigo-600 transition shadow-lg"
              title={isPlaying ? "Pause" : "Play Recording"}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <button
              onClick={downloadAudio}
              className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition shadow-lg"
              title="Download Audio"
            >
              <Download size={22} />
            </button>

            <button
              onClick={deleteRecording}
              className="bg-gray-400 text-white p-4 rounded-full hover:bg-gray-500 transition shadow-lg"
              title="Delete Recording"
            >
              <Trash2 size={22} />
            </button>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between text-xs text-gray-500">
          <span>Conversations: {Math.floor(conversationHistory.length / 2)}</span>
          <span>Model: {selectedModel}</span>
          <span>Temp: {temperature}</span>
        </div>
      </div>
    </div>
  );
}