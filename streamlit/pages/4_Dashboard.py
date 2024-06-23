import streamlit as st
import pandas as pd
import altair as alt
import numpy as np
import json
import matplotlib.pyplot as plt

st.set_page_config(
    page_title="Emotion Trend",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded")

st.title('Emotion over time (minutes)')
    
# Insert containers separated into tabs:
tab1, tab2, tab3, tab4= st.tabs(["Monday", "Tuesday", "Wednesday", "..."])
tab1.write("Response: I wonder if there is ice cream around the area, that would be nice.")
tab2.write("Response: I'm miserable that my best friend passed away and everytime I go get drinks with the boys, it does not feel the same.")
tab3.write("Response: My son just Graduated from Berkeley, I am so excited to see him, what should I buy for his graduation gift?")
tab4.write("...")

with tab1:
    alt.themes.enable("dark")


    df1 = pd.read_csv('./data/emotion_over_time_neutral.csv')
    df1.insert(3, "Time", np.arange(0, 60, 60/df1.shape[0]), True)

    st.line_chart(df1, x='Time',y='Score',color='Emotion')
    
with tab2:
    alt.themes.enable("dark")


    df2 = pd.read_csv('./data/emotion_over_time_sad.csv')
    df2.insert(3, "Time", np.arange(0, 60, 60/df2.shape[0]), True)

    st.line_chart(df2, x='Time',y='Score',color='Emotion')


with tab3:
    alt.themes.enable("dark")


    df3 = pd.read_csv('./data/emotion_over_time_happy.csv')
    df3.insert(3, "Time", np.arange(0, 60, 60/df3.shape[0]), True)

    st.line_chart(df3, x='Time',y='Score',color='Emotion')


st.button("Re-run")
    