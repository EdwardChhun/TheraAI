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

alt.themes.enable("dark")

st.title('Emotion over time (s)')

df = pd.read_csv('./pages/emotion_over_time.csv')
df.insert(3, "Time", np.arange(0, 60, 60/24), True)

st.line_chart(df, x='Time',y='Score',color='Emotion')

st.button("Re-run")