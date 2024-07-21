import React, { useEffect, useState } from 'react';

const WebSocketComponent = ({ accessToken }) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('Disconnected');

    useEffect(() => {
        // Establish WebSocket connection
        const ws = new WebSocket(`wss://api.hume.ai/v0/evi/chat?access_token=${accessToken}`);

        ws.onopen = () => {
            setStatus('Connected');
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // copy prevMessages array, add message, and store the state
            setMessages(prevMessages => [...prevMessages, message]);
        };

        ws.onclose = () => {
            setStatus('Disconnected');
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            setStatus('Error');
            console.error('WebSocket error:', error);
        };

        // Clean up the WebSocket connection when the component unmounts.
        // this function is specific to useEffect. It runs only when access token changes or component unmounts.
        return () => {
            ws.close();
        };
    }, [accessToken]);

    return (
        <div>
            <h1>WebSocket Status: {status}</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{JSON.stringify(msg)}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;