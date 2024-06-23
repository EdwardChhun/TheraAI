import streamlit as st
import pandas as pd
import numpy as np

st.title('Emotion over time')

DATE_COLUMN = 'date/time'
DATA_URL = ('https://s3-us-west-2.amazonaws.com/'
            'streamlit-demo-data/uber-raw-data-sep14.csv.gz')   

data = pd.read_csv('./pages/emotion_over_time.csv')

data_load_state = st.text('Loading data...')
data_load_state.text("Done! (using st.cache_data)")

st.subheader('Number of pickups by hour')
hist_values = np.histogram(data['Score'], bins=59, range=(0,60))[0]
st.bar_chart(hist_values)
