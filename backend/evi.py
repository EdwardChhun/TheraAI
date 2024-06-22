import os
from hume import HumeVoiceClient, MicrophoneInterface
from dotenv import load_dotenv
import asyncio

async def main() -> None:
    
    load_dotenv()

    HUME_API_KEY = os.getenv("HUME_API_KEY")

    client = HumeVoiceClient(HUME_API_KEY)
    
    async with client.connect() as socket:
        await MicrophoneInterface.start(socket)
asyncio.run(main())        