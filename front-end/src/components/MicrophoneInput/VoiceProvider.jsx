import { VoiceProvider } from '@humeai/voice-react';
import React, { useState } from 'react';
import { EmbeddedVoice } from '@humeai/voice-react';

function App() {
  const apiKey = process.env.HUME_API_KEY || '';
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  return (
    <>
      <VoiceProvider
        auth={{ type: 'apiKey', value: apiKey }}
        hostname={process.env.HUME_VOICE_HOSTNAME || 'api.hume.ai'}
      >
        <ExampleComponent />
      </VoiceProvider>
    </>
  );
}