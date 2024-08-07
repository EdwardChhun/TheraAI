import streamlit as st
import asyncio
import os
from dotenv import load_dotenv
from hume import HumeVoiceClient, MicrophoneInterface, VoiceSocket
        
# Global variable to count messages
message_counter = 0

# Streamlit layout settings
st.set_page_config(layout="centered", page_title="Enhanced Voice Interface")

# Handler for when the connection is opened
def on_open():
    #print_ascii_art("Say hello to EVI, Hume AI's Empathic Voice Interface!")
    st.write("Connected to EVI!")

# Handler for incoming messages
def on_message(message):
    global message_counter
    message_counter += 1
    msg_type = message["type"]

    message_box = (
        f"{message_counter}\n"
    )

    if msg_type in {"user_message", "assistant_message"}:
        role = message["message"]["role"]
        content = message["message"]["content"]
        message_box += (
            f"{role}\n"
            f"{content}\n"
            f"{msg_type}\n"
        )

        if "models" in message and "prosody" in message["models"]:
            scores = message["models"]["prosody"]["scores"]
            num = 1
            top_emotions = get_top_n_emotions(prosody_inferences=scores, number=num)

            message_box += f"{'-'*60}\nTop {num} Emotions:\n"
            for emotion, score in top_emotions:
                message_box += f"{emotion}: {score:.4f}\n"

    # elif msg_type != "audio_output":
    #     for key, value in message.items():
    #         message_box += f"{key}: {value}\n"
    # else:
    #     message_box += (
    #         f"type: {msg_type}\n"
    #     
    with st.chat_message("🤖"):
        st.write(message_box)
    
        

# Function to get the top N emotions based on their scores
def get_top_n_emotions(prosody_inferences, number):
    sorted_inferences = sorted(prosody_inferences.items(), key=lambda item: item[1], reverse=True)
    return sorted_inferences[:number]

# Handler for when an error occurs
def on_error(error):
    st.error(f"Error: {error}")

# Handler for when the connection is closed
def on_close():
    st.write("Thank you for using EVI, Hume AI's Empathic Voice Interface!")

# Asynchronous handler for user input
async def user_input_handler(socket: VoiceSocket):
    while True:
        user_input = await asyncio.to_thread(input, "Type a message to send or 'Q' to quit: ")
        if user_input.strip().upper() == "Q":
            st.chat_message("Closing the connection...")
            await socket.close()
            break
        else:
            await socket.send_text_input(user_input)

# Asynchronous main function to set up and run the client
async def chatbot() -> None:
    try:
        load_dotenv()
        HUME_API_KEY = os.getenv("HUME_API_KEY")
        HUME_SECRET_KEY = os.getenv("HUME_SECRET_KEY")
        client = HumeVoiceClient(HUME_API_KEY, HUME_SECRET_KEY)
        config_id = os.getenv("config_id") 
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

# Main execution with Streamlit
st.title("Enhanced Voice Interface with EVI")


# CSS for styling the button to make it larger and circular
# st.markdown("""
#     <style>
#     .stButton>button {
#         width: 170px;
#         height: 80px;
#         border-radius: 20%;
#         background-color: #D3D3D3;
#         color: black;
#         font-size: 24px;
#         font-weight: bold;
#         display: flex;
#     }
#     </style>
# """, unsafe_allow_html=True)

# If the button is clicked, start the chatbot
if st.button("Chat", key="start_button"):
    st.chat_input()
    asyncio.run(chatbot())
