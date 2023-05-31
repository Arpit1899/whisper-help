import React, { useState, useEffect, useRef } from "react";
import { useWhisper } from "@chengsokdara/use-whisper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faTrash,
  faBarsStaggered,
  faCircleStop,
  faVolumeXmark,
  faKeyboard,
  faUser,
  faFaceLaughWink,
  faLaptopCode,

} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const textContainerRef = useRef(null);
  const [inputMode, setInputMode] = useState("voice");

  const {
    transcript,

    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.REACT_APP_apiKey,
    removeSilence: true,
  });

  useEffect(() => {
    
    if (transcript.text) {
      setMessages([...messages, { type: "transcript", text: transcript.text }]);
      sendTranscriptToServer(transcript.text);
    }
  }, [transcript.text]);

  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop =
        textContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (responseMessage) {
      setMessages([...messages, { type: "response", text: responseMessage }]);
      speakText(responseMessage);
    }
  }, [responseMessage]);

  const clearMessages = () => {
    console.log("Button is being clicked");
    setMessages([]);
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;

    // Set isSpeaking to true when starting to speak
    setIsSpeaking(true);

    utterance.onend = () => {
      // Set isSpeaking to false when the speech has ended
      setIsSpeaking(false);
    };

    synth.speak(utterance);
  };

  const handleTextInput = (inputValue) => {
    setMessages([...messages, { type: "transcript", text: inputValue }]);
    sendTranscriptToServer(inputValue);
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
    const synth = window.speechSynthesis;
    synth.cancel();
  };

  const messagesWithRole = messages.map((message) => {
    return {
      role: message.type === "transcript" ? "user" : "assistant",
      content: message.text,
    };
  });

  const sendTranscriptToServer = (text) => {
    const modifiedText = "You are a voice assistant and your name is Ram, Answer in 50 words: " + text;

    fetch("http://localhost:5008/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transcription: modifiedText,
        messages: messagesWithRole,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponseMessage(data.message);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="main-container">
        

        <div className="box-container">
          {/* <h1 className="whisper-help-title">Whisper Help</h1> */}
          <div className="button-action">
            <div className="delete-button" onClick={clearMessages}>
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <div className="mute-container" onClick={stopSpeaking}>
              <FontAwesomeIcon icon={faVolumeXmark} />
            </div>
          </div>
          <div ref={textContainerRef} className="text-container">
            {messages.map((message, index) => (
              <div key={index} className={`bubble ${message.type}`}>
                <div className="message-content">
                  {message.type === "transcript" ? (
                    <FontAwesomeIcon icon={faFaceLaughWink} size="6x" className="message-icon" />
                  ) : (
                    <FontAwesomeIcon icon={faLaptopCode} size="30px" className="message-icon" />
                  )}
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mic-container">
            {inputMode === "voice" ? (
              isRecording ? (
                <div
                  className="button-container recording"
                  onClick={() => {
                    stopRecording();
                    setIsRecording(false);
                  }}
                >
                  <div className="siri-container">
                    <div className="siri-wave"></div>
                    <div className="siri-wave"></div>
                    <FontAwesomeIcon
                      icon={faCircleStop}
                      size="2x"
                      color="red"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="button-container"
                  onClick={() => {
                    startRecording();
                    setIsRecording(true);
                  }}
                >
                  <div className="siri-container">
                    <div className="siri-wave"></div>
                    <div className="siri-wave"></div>
                    <FontAwesomeIcon
                      icon={isSpeaking ? faCircleNotch : faBarsStaggered}
                      size="2x"
                      color={isSpeaking ? "#c78dfc" : "#690099"}
                      spin={isSpeaking}
                    />
                  </div>
                </div>
              )
            ) : (
              <input
                type="text"
                className="text-input"
                placeholder="Type your message..."
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleTextInput(event.target.value);
                    event.target.value = "";
                  }
                }}
              />
            )}
            <div
              className="keyboard-icon-container"
              onClick={() =>
                setInputMode(inputMode === "voice" ? "text" : "voice")
              }
            >
              <FontAwesomeIcon icon={faKeyboard} size={50} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
