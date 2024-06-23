import os
from hume import HumeVoiceClient, MicrophoneInterface
from dotenv import load_dotenv
import asyncio

# Refer to https://beta.hume.ai/evi/playground?configId=867d9570-4d01-4d85-aaa3-b81cbe3798ed
# for configuration

async def main() -> None:
    
    load_dotenv()

    HUME_API_KEY = os.getenv("HUME_API_KEY")
    client = HumeVoiceClient(HUME_API_KEY)
    
    
    
    config_id = "867d9570-4d01-4d85-aaa3-b81cbe3798ed"
    async with client.connect_with_handlers(config_id = config_id) as socket:
        await MicrophoneInterface.start(socket)
        
asyncio.run(main())        