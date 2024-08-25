
### AI Hackathon @ UC Berkeley 2024

# TheraAI

Therapist AI built using HUME API and other multiple features.

(Mobile rework coming soon...)



## Getting Started

Set-up
```
git clone https://github.com/EdwardChhun/TheraAI.git
python -m venv venv
```

Activate Virtual Environment
```
MacOS:
source venv/bin/activate

Windows:
venv/Scripts/activate
```


Install Packages
```
pip install -r requirements.txt
```


## Running App Functions

We created the core functionalities on Python and streaming it on Streamlit (Make sure you have requirements installed)

Check your .env file and make sure you have your own HUME API key and replace it in HUME_API_KEY. Refer to HUME's documentation (https://dev.hume.ai/intro)

```
HUME_API_KEY = "YOUR_OWN_API_KEY"
HUME_SECRET_KEY = "YOUR_OWN_SECRET_KEY"
config_id = "YOUR_OWN_CONFIG"
```
```
cd streamlit
streamlit run Home.py 
```

Efforts are made to improve this app

To run the configs for the voice ai check streamlit\pages\3_Voice_Recognition.py

This code snipped will be the configs, please refer to the HUME API docs

```python
async def chatbot() -> None:
    try:
        load_dotenv()
        HUME_API_KEY = os.getenv("HUME_API_KEY")
        HUME_SECRET_KEY = os.getenv("HUME_SECRET_KEY")
        # config_id = "867d9570-4d01-4d85-aaa3-b81cbe3798ed"  # Elderly Therapist

        client = HumeVoiceClient(HUME_API_KEY, HUME_SECRET_KEY)

        async with client.connect_with_handlers(
            # config_id=config_id,
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
```
