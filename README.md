# Whisper Help

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Preview

![img](https://i.postimg.cc/0y2v2sPN/Screenshot-2023-05-31-at-7-50-50-PM.png) ![img](https://i.postimg.cc/76B7dDHT/Screenshot-2023-05-31-at-7-58-53-PM.png)


Whisper Help is a voice-powered assistant application developed using React and powered by OpenAI's Whisper ASR API and GPT-3.5 model. Whisper ASR is an Automatic Speech Recognition system trained on a large amount of multilingual and multitask supervised data collected from the web. With Whisper Help, users can interact with an assistant that understands and responds in 99+ languages.

## Features

- Voice-powered assistant that listens and responds to user commands.
- Supports 99+ languages.
- Text-to-speech conversion for reading out responses to user.
- Clear and mute options for user convenience.
- Option to switch between voice and text input.



## Installation & Setup
This project was bootstrapped with Create React App. To get the application up and running, follow the steps below:


```bash
Copy code
git clone https://github.com/YourUsername/whisper-help.git

Install the project dependencies.
Copy code
npm install

Create a .env file in the project root directory and add your Whisper ASR API key.
makefile
Copy code
REACT_APP_apiKey=your_whisper_api_key_here

Start the application.  

Copy code
npm start

This runs the app in the development mode. Open http://localhost:3000 to view it in the browser.
```

## Using the Application 

The application interface includes a chat window and a microphone button. Click the microphone to start recording, and again to stop. The transcribed text will appear in the chat window and an assistant response will be generated.

To clear the chat window, click on the trash icon. The volume icon can be used to stop the assistant from speaking.

Switch between text and voice input modes by clicking the keyboard icon. When in text mode, type your input into the text field and press 'Enter' to generate a response.

