import { useState, useRef } from "react";

export default function VoiceMemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Microphone access denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">🎙️ Voice Memo AI</h2>

      <div className="border rounded-lg p-6 text-center">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-6 py-3 bg-black text-white rounded-lg"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-6 py-3 bg-red-600 text-white rounded-lg"
          >
            Stop Recording
          </button>
        )}

        {audioURL && (
          <div className="mt-6">
            <audio controls src={audioURL} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">
              Voice memo recorded successfully
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
