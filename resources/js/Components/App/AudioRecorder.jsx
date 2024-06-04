import { MicrophoneIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const AudioRecorder = ({ fileReady }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);

  const onMicrophoneClick = async () => {
    if (recording) {
      setRecording(false);
      if (mediaRecorder) {
        mediaRecorder.stop();
        setMediaRecorder(null);
      }
      return;
    }
    setRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        let audioBlob = new Blob(audioChunks, {
          type: "audio/ogg; codecs=opus",
        });
        let audioFile = new File([audioBlob], "recorded_audio.ogg", {
          type: "audio/ogg; codecs=opus",
        });
        const url = URL.createObjectURL(audioFile);
        fileReady(audioFile, url);
      });

      mediaRecorder.start();
      setMediaRecorder(mediaRecorder);
    } catch (error) {
      setRecording(false);
      console.error("Error accessing to microphone: ", error);
    }
  };

  return (
    <button
      onClick={onMicrophoneClick}
      className="p-1 text-gray-400 hover:text-gray-200"
    >
      {recording ? (
        <StopCircleIcon className="w-6 text-red-600" />
      ) : (
        <MicrophoneIcon className="w-6" />
      )}
    </button>
  );
};
