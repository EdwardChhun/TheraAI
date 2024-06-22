import streamlit as st
import pandas as pd
import altair as alt
import plotly.express as px
import numpy as np
import time
import random
import json

st.set_page_config(
    page_title="Emotion Improvement Stats",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded")

alt.themes.enable("dark")

status_text = st.sidebar.empty()
last_rows = np.arange(0, 1, 0.1)
chart = st.line_chart(last_rows, x_label="Time", y_label="Emotion intensity")



# Streamlit widgets automatically run the script from top to bottom. Since
# this button is not connected to any other logic, it just causes a plain
# rerun.
st.button("Re-run")