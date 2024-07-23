import React, { useEffect, useRef, useState } from 'react';

const LiveStreamRecorder = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [status, setStatus] = useState('idle');
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // I used this variable to bypass some .jsx file issues
  const video = useRef(null);

  const ws = useRef(null);
  const [socketStatus, setSocketStatus] = useState('Disconnected')
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    if (mediaStream) {
      video.current.srcObject = mediaStream;
    }
    // useEffect is a react hook that runs when the page updates, return runs when the page unmounts or dependencies change
    return () => {
      // Cleanup mediaStream object everytime page unmounts or it updates.
      if (mediaStream) {
        // this just clears the stored video
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
    //mediaStream dependency
  }, [mediaStream]);

  const startRecording = async () => {
    // asyncrounus function allows for use of await
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      // set media stream on local. Allow the user to see the video
      setMediaStream(stream);

      // Extract audio and video tracks
      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];

      // Create separate MediaStream objects
      const audioStream = new MediaStream([audioTrack]);
      const videoStream = new MediaStream([videoTrack]);

      // record part of the stream in order to send via the websocket
      videoRef.current = new MediaRecorder(videoStream, { mimeType: 'video/webm' });
      audioRef.current = new MediaRecorder(audioStream, { mimeType: 'audio/webm' });

      // Handle audio data
      audioRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const blob = event.data;
          // Example: Send the blob to the server using WebSocket
          if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            console.log("sending audio...");
            
            const reader = new FileReader();

            reader.onloadend = function() {
              // split the url and only retain the audio data. Discard header.
              const data = reader.result.split(',')[1];

              const sendObj =
              {
                "type": "audio_input",
                "data": data,
              }
              // convert a json object with params specified in Hume Docs into a string. Send string.
              ws.current.send(JSON.stringify(sendObj))
            }
            
            // call prev function with blob as URL
            const data = reader.readAsDataURL(blob);
          }
        }
      };

      // Handle video data
      videoRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const blob = event.data;
          // Example: Send the blob to the server using WebSocket
          if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            // ws.current.send(blob);
            console.log("sending video...");
          }
        }
      };

      // Start recording audio and video
      audioRef.current.start(2000); // Send audio data every second
      videoRef.current.start(2000); // Send video data every second
      setStatus('recording');

      // Place holder
      const token = "ozI6ytVrmfgVr1r4G8evmtveAPyAMVTRxLuJW1MnoACKAwUq"

      // Open WebSocket connection
      ws.current = new WebSocket(`wss://api.hume.ai/v0/evi/chat?api_key=${token}`);
      ws.current.onopen = () => {
        console.log('WebSocket connection opened');
        setSocketStatus('Connected');
      };
      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // copy prevMessages array, add message, and store the state
        setMessages(prevMessages => [...prevMessages, message]);
        console.log(messages);
      };
      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setSocketStatus('Error Connecting to Hume AI');
      };
      ws.current.onclose = () => {
        console.log('WebSocket connection closed');
        setSocketStatus('Disconnected');
      };

    } catch (error) {
      console.error('Error accessing media devices.', error);
      setStatus('error');
    }
  };

  const stopRecording = () => {
    if (audioRef.current && audioRef.current.state !== 'inactive') {
      audioRef.current.stop();
    }
    if (videoRef.current && videoRef.current.state !== 'inactive') {
      videoRef.current.stop();
    }
    setStatus('stopped');

    // Close WebSocket connection
    if (ws.current) {
      ws.current.close();
    }
  };

  return (
    <div>
      <p>{status}</p>
      <p> {socketStatus} </p>
      <button onClick={startRecording} disabled={status === 'recording'}>Start Livestream</button>
      <button onClick={stopRecording} disabled={status !== 'recording'}>Stop Livestream</button>
      {mediaStream && status == "recording" && <video ref={video} controls autoPlay muted />}

      <ul>
        {messages.map((msg, index) => (
          msg.type === "assistant_message" ?
            (<li key={index}>{msg.message.content}</li>) : null
        ))}
      </ul>
    </div>
  );
};

export default LiveStreamRecorder;