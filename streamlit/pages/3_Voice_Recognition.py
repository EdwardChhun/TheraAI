# Import necessary libraries
import streamlit as st
import asyncio
import threading
from hume import HumeVoiceClient, MicrophoneInterface, VoiceSocket
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get Hume API key and secret key from environment variables
HUME_API_KEY = os.getenv("HUME_API_KEY")
HUME_SECRET_KEY = os.getenv("HUME_SECRET_KEY")

# Global variable to count messages
message_counter = 0

# Function to print ASCII art (replace this with actual function or placeholder)
def print_ascii_art(message):
    st.write(message)  # Streamlit way to display text

# Function to get the top N emotions based on their scores
def get_top_n_emotions(prosody_inferences, number):
    sorted_inferences = sorted(prosody_inferences.items(), key=lambda item: item[1], reverse=True)
    return sorted_inferences[:number]

# Handler for when the connection is opened
def on_open():
    print_ascii_art("Say hello to EVI, Hume AI's Empathic Voice Interface!")

# Handler for incoming messages
def on_message(message):
    global message_counter
    message_counter += 1
    msg_type = message["type"]

    message_box = (
        f"\n{'='*60}\n"
        f"Message {message_counter}\n"
        f"{'-'*60}\n"
    )

    if msg_type in {"user_message", "assistant_message"}:
        role = message["message"]["role"]
        content = message["message"]["content"]
        message_box += (
            f"role: {role}\n"
            f"content: {content}\n"
            f"type: {msg_type}\n"
        )

        if "models" in message and "prosody" in message["models"]:
            scores = message["models"]["prosody"]["scores"]
            num = 3
            top_emotions = get_top_n_emotions(prosody_inferences=scores, number=num)

            message_box += f"{'-'*60}\nTop {num} Emotions:\n"
            for emotion, score in top_emotions:
                message_box += f"{emotion}: {score:.4f}\n"
    elif msg_type != "audio_output":
        for key, value in message.items():
            message_box += f"{key}: {value}\n"
    else:
        message_box += (
            f"type: {msg_type}\n"
        )

    message_box += f"{'='*60}\n"
    st.write(message_box)  # Streamlit way to display messages

# Handler for when an error occurs
def on_error(error):
    st.error(f"Error: {error}")

# Handler for when the connection is closed
def on_close():
    print_ascii_art("Thank you for using EVI, Hume AI's Empathic Voice Interface!")

# Asynchronous handler for user input
async def user_input_handler(socket: VoiceSocket):
    while True:
        user_input = await asyncio.to_thread(input, "Type a message to send or 'Q' to quit: ")
        if user_input.strip().upper() == "Q":
            await socket.close()
            break
        else:
            await socket.send_text_input(user_input)

# Asynchronous main function to set up and run the client
async def main():
    
    config_id = "867d9570-4d01-4d85-aaa3-b81cbe3798ed" # Config for Eldery Therapist
     
    try:
        client = HumeVoiceClient(HUME_API_KEY, HUME_SECRET_KEY)
        async with client.connect_with_handlers(
            config_id=config_id,
            on_open=on_open,
            on_message=on_message,
            on_error=on_error,
            on_close=on_close,
            enable_audio=True,
        ) as socket:
            microphone_task = asyncio.create_task(MicrophoneInterface.start(socket))
            user_input_task = asyncio.create_task(user_input_handler(socket))
            await asyncio.gather(microphone_task, user_input_task)
    except Exception as e:
        st.error(f"Exception occurred: {e}")

# Function to run the async function within Streamlit
def run_asyncio_task():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(main())

# Streamlit App
def streamlit_app():
    st.title("Hume EVI Voice Streaming")

    if st.button("Start Hume EVI Streaming"):
        st.write("Starting Hume EVI streaming...")
        threading.Thread(target=run_asyncio_task).start()
        st.write("Hume EVI streaming started. Speak into your microphone or type messages in the terminal.")
        
if __name__ == "__main__":
    streamlit_app()
