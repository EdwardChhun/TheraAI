import streamlit as st
import cv2
import pathlib
import numpy as np

import pandas as pd
import altair as alt
import numpy as np
import json
import matplotlib.pyplot as plt

# st.set_page_config(
#     page_title="Emotion Trend",
#     page_icon="📊",
#     layout="wide",
#     initial_sidebar_state="expanded")
# Function to start the webcam and display the feed in Streamlit
def start_webcam():
    cascade_path = pathlib.Path(cv2.__file__).parent.absolute() / "data/haarcascade_frontalface_default.xml"
    clf = cv2.CascadeClassifier(str(cascade_path))
    
    # Create a VideoCapture object to access the webcam (device 0)
    cap = cv2.VideoCapture(0)
    
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

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        faces = clf.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30,30),
            flags=cv2.CASCADE_SCALE_IMAGE
        )
        
        for (x,y,width,height) in faces:
            cv2.rectangle(frame, (x,y), (x+width,y+height), (255, 255, 0), 2)    
            
        # This just flips the frame
        frame = cv2.flip(frame, 1)

        # Convert the frame from BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Display the frame in Streamlit
        frame_placeholder.image(frame_rgb, channels="RGB")

    # Release the webcam
    cap.release()

# Set up the Streamlit app
st.title("Live Webcam Feed")
st.write("This app captures and displays the live feed from your webcam.")

# Initialize session state for the stop button
if 'stop_camera' not in st.session_state:
    st.session_state['stop_camera'] = False

""" 
NOTE: Include col for start and end
"""
col1, col2 = st.columns(2)
    
# Button to start the webcam feed
if st.button("Start Webcam", key="start_button"):
    st.session_state['stop_camera'] = False  # Reset the stop state
    start_webcam()
    
if st.button("End Webcame", key="end_button"):
    st.session_state['stop_camera'] = True  # Reset the stop state
    start_webcam()
    


""" 
NOTE: Below is the voice recognition with animation, with responses
"""

# INCLUDE HEREEE!!!!
# ------------------

""" 
NOTE: Below is the dash board
"""


alt.themes.enable("dark")

st.title('Emotion over time (s)')

df = pd.read_csv('./data/emotion_over_time.csv')
df.insert(3, "Time", np.arange(0, 60, 60/24), True)

st.line_chart(df, x='Time',y='Score',color='Emotion')

st.button("Re-run")