import streamlit as st
import cv2
import pathlib
import numpy as np

from dotenv import load_dotenv
import os
import asyncio
import json

from hume import HumeStreamClient, StreamSocket
from hume.models.config import FaceConfig

load_dotenv()

HUME_API_KEY = os.getenv("HUME_API_KEY")



async def face_eval():
    client = HumeStreamClient(HUME_API_KEY)
    config = FaceConfig(identify_faces=True)


    async with client.connect([config]) as socket:
        result = await socket.send_file("img.jpg")
        
    with open("face-reveal.json", 'w') as file:
        json.dump(result, file, indent=4)
        
    with open("face-reveal.json", 'r') as file:
        data = json.load(file)
        
    emotions = data["face"]["predictions"][0]["emotions"]
    highest_emotion = max(emotions, key=lambda e: e["score"])
    # print("\n")
    # print(f"The highest emotion score is {highest_emotion['score']} for the emotion: {highest_emotion['name']}")

    with open("largest-face.json", 'w') as file:
        json.dump(highest_emotion, file)

def start_webcam():
    cascade_path = pathlib.Path(cv2.__file__).parent.absolute() / "data/haarcascade_frontalface_default.xml"
    clf = cv2.CascadeClassifier(str(cascade_path))

    
    # Create a VideoCapture object to access the webcam (device 0)
    cap = cv2.VideoCapture(0)

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    save_interval = fps * 2.5

    frame_count = 0
    time = 0
    
    # Check if the webcam is opened correctly
    if not cap.isOpened():
        st.error("Could not open webcam.")
        return
    
    # Placeholder for the video frame in Streamlit
    frame_placeholder = st.empty()
    
    # Main loop to read and display frames from the webcam
    while not st.session_state['stop_camera']:
        ret, frame = cap.read()
        if not ret:
            st.error("Failed to capture frame")
            break

        frame_count += 1

        faces = clf.detectMultiScale(
            frame,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30,30),
            flags=cv2.CASCADE_SCALE_IMAGE
        )
        
        if len(faces) > 0:
            largest_face = max(faces, key=lambda rect: rect[2] * rect[3])

            with open('largest-face.json') as data:
                d = json.load(data)
                emotion = d['name']

            # Draw rectangle around the largest face
            (x, y, w, h) = largest_face
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            cv2.putText(frame, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)\
            
            

        # This just flips the frame
        # frame = cv2.flip(frame, 1)

        # Convert the frame from BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Display the frame in Streamlit
        frame_placeholder.image(frame_rgb, channels="RGB")

        if frame_count == save_interval:
            img = f'img.jpg'
            cv2.imwrite(img, frame)
            asyncio.run(face_eval())
            # send to flask

            frame_count = 0
            time += 5

    # Release the webcam
    cap.release()

# Set up the Streamlit app
st.title("Live Webcam + Microphone Feed")
st.write("Talk to our AI Therapist that evaluates your facial and vocal expression")

# Initialize session state for the stop button
if 'stop_camera' not in st.session_state:
    st.session_state['stop_camera'] = False

# Button to start the webcam feed
if st.button("Start Chatting", key="start_button"):
    st.session_state['stop_camera'] = False  # Reset the stop state
    asyncio.run(face_eval())
    start_webcam()

# INCLUDE HEREEE!!!!
# ------------------