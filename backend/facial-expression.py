from dotenv import load_dotenv
import os
import asyncio
import json

# Using the camera

from hume import HumeStreamClient, StreamSocket
from hume.models.config import FaceConfig

# Load the envs
load_dotenv()

HUME_API_KEY = os.getenv("HUME_API_KEY")

async def main():
    client = HumeStreamClient(HUME_API_KEY)
    config = FaceConfig(identify_faces=True)
    async with client.connect([config]) as socket:
        result = await socket.send_file("images/noop_bald.png")
        
    with open("face-reveal.json", 'w') as file:
        json.dump(result, file, indent=4)
        
    print(result)
        
    with open("face-reveal.json", 'r') as file:
        data = json.load(file)
        
    emotions = data["face"]["predictions"][0]["emotions"]
    highest_emotion = max(emotions, key=lambda e: e["score"])
    print("\n")
    print(f"The highest emotion score is {highest_emotion['score']} for the emotion: {highest_emotion['name']}")



asyncio.run(main())



