import asyncio
from hume import HumeStreamClient
from hume.models.config import LanguageConfig
import os
from dotenv import load_dotenv
import json

load_dotenv()

HUME_API_KEY = os.getenv('HUME_API_KEY')

samples = [
    "My mother just passed away from a fire, i couldn't say good bye to her due to my exam, I am feeling really sad and the sadness is crawling up to me..."
]

async def main():
    client = HumeStreamClient(HUME_API_KEY)
    config = LanguageConfig()
    async with client.connect([config]) as socket:
        for sample in samples:
            result = await socket.send_text(sample)
            emotions = result["language"]["predictions"][0]["emotions"]
            print(emotions)
            
    # emotions = data["face"]["predictions"][0]["emotions"]
    # highest_emotion = max(emotions, key=lambda e: e["score"])
    # print("\n")
    # print(f"The highest emotion score is {highest_emotion['score']} for the emotion: {highest_emotion['name']}")
    
    with open("lang-reveal-sad.json", 'w') as file:
        json.dump(result, file, indent=4)

asyncio.run(main())
