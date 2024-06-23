import asyncio
from hume import HumeStreamClient
from hume.models.config import LanguageConfig
import os
from dotenv import load_dotenv
import json

load_dotenv()

HUME_API_KEY = os.getenv('HUME_API_KEY')

samples = [
    "I'm miserable that my best friend passed away and everytime I go get drinks with the boys, it does not feel the same"
]

async def main():
    client = HumeStreamClient(HUME_API_KEY)
    config = LanguageConfig()
    async with client.connect([config]) as socket:
        for sample in samples:
            result = await socket.send_text(sample)
            emotions = result["language"]["predictions"][0]["emotions"]
            print(emotions)
    
    with open("lang-reveal-sad.json", 'w') as file:
        json.dump(result, file, indent=4)

asyncio.run(main())
