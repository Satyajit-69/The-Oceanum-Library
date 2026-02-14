import { useEffect, useRef, useState } from "react";
import { Mic, Square, Trash2, Play, Pause, Sparkles } from "lucide-react";
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

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  //  Timer
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

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  // 🎙 Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);

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
  };

  // 🤖 Send Audio to Backend
  const sendToAI = async (audioBlob) => {
    setIsProcessing(true);

    try {
      const base64Audio = await blobToBase64(audioBlob);

      console.log("Sending audio to backend...");

      const response = await fetch(`${API_BASE_URL}/api/voice_chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: base64Audio,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

      if (!data.success) {
        throw new Error(data.error || "Backend error");
      }

      setTranscription(data.transcription);
      setAiResponse(data.response);
      setIsProcessing(false);

      speakResponse(data.response);

    } catch (error) {
      console.error("AI Error:", error);
      setIsProcessing(false);
      setAiResponse("Something went wrong.");
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

  // 🔊 Text To Speech
  const speakResponse = (text) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  // ▶ Play / Pause
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">🎙 AI Voice Memo</h2>
        </div>

        <div className="text-3xl font-mono mb-6 text-center">
          {formatTime(recordTime)}
        </div>

        <div className="mb-6 text-center">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="bg-green-600 text-white p-6 rounded-full shadow-lg"
            >
              <Mic size={30} />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-600 text-white p-6 rounded-full animate-pulse"
            >
              <Square size={30} />
            </button>
          )}
        </div>

        {isProcessing && (
          <div className="text-center text-indigo-600 mb-4">
            <Sparkles className="inline animate-spin" size={18} /> Processing...
          </div>
        )}

        {transcription && (
          <div className="mb-4 text-sm text-gray-500">
            <strong>You said:</strong> {transcription}
          </div>
        )}

        {aiResponse && (
          <div className="mb-4 bg-gray-50 p-3 rounded-lg">
            <strong>AI:</strong> {aiResponse}
          </div>
        )}

        {audioURL && (
          <div className="flex justify-center gap-4">
            <audio
              ref={audioRef}
              src={audioURL}
              onEnded={() => setIsPlaying(false)}
              hidden
            />

            <button
              onClick={togglePlay}
              className="bg-indigo-500 text-white p-3 rounded-full"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={deleteRecording}
              className="bg-gray-400 text-white p-3 rounded-full"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
