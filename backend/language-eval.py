import asyncio
from hume import HumeStreamClient
from hume.models.config import LanguageConfig
import os
from dotenv import load_dotenv
import json

load_dotenv()

HUME_API_KEY = os.getenv('HUME_API_KEY')

samples = [
    "I haven't heard back from my son for a few weeks, I also want to let him call me first, what should I do?"
]

async def main():
    client = HumeStreamClient(HUME_API_KEY)
    config = LanguageConfig()
    async with client.connect([config]) as socket:
        for sample in samples:
            result = await socket.send_text(sample)
            emotions = result["language"]["predictions"][0]["emotions"]
            print(emotions)
            
    with open("lang-reveal.json", 'w') as file:
        json.dump(result, file, indent=4)

asyncio.run(main())
