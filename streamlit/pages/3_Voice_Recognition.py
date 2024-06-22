# app.py
import streamlit as st
import speech_recognition as sr

def main():
    st.title("Voice Input and Text Display")

    # Instructions
    st.write("Click the button below and speak into your microphone. The app will capture your voice and display the transcribed text.")

    # Button to start voice input
    if st.button("Start Voice Input"):
        # Create a recognizer instance
        recognizer = sr.Recognizer()

        with sr.Microphone() as source:
            st.write("Listening...")
            # Adjust for ambient noise and record the audio
            recognizer.adjust_for_ambient_noise(source, duration=0.5)
            audio = recognizer.listen(source)

            try:
                # Transcribe speech to text
                text = recognizer.recognize_google(audio)
                st.write("You said: ", text)
            except sr.UnknownValueError:
                st.error("Could not understand the audio")
            except sr.RequestError:
                st.error("Could not request results; check your internet connection")

if __name__ == "__main__":
    main()
