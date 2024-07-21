import React, { useEffect, useState, useRef } from 'react';

const WebSocketComponent = ({ accessToken, apiKey }) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('Disconnected');
    const ws = useRef(null);

    console.log(messages);

    const Record = () => {
        if(ws.current) {
            const sendObj = 
            {
                "type": "user_input",
                "data": "",
                "text": "Hello, how are you?"
            }
            // convert a json object with params specified in Hume Docs into a string. Send string.
            ws.current.send(JSON.stringify(sendObj))
        }
    };

    useEffect(() => {
        // Establish WebSocket connection
        //const ws = new WebSocket(`wss://api.hume.ai/v0/evi/chat?access_token=${accessToken}`);
        ws.current = new WebSocket(`wss://api.hume.ai/v0/evi/chat?api_key=${apiKey}`);

        ws.current.onopen = () => {
            setStatus('Connected');
            console.log('WebSocket connection opened');
        };

        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // copy prevMessages array, add message, and store the state
            setMessages(prevMessages => [...prevMessages, message]);
            console.log(messages);
        };

        ws.current.onclose = () => {
            setStatus('Disconnected');
            console.log('WebSocket connection closed');
        };

        ws.current.onerror = (error) => {
            setStatus('Error');
            console.error('WebSocket error:', error);
        };

        // Clean up the WebSocket connection when the component unmounts.
        // this function is specific to useEffect. It runs only when access token changes or component unmounts.
        return () => {
            ws.current.close();
        };
    }, [accessToken]);

    return (
        <div>
            <h1>WebSocket Status: {status}</h1>
            <ul>
                {messages.map((msg, index) => (
                        msg.type === "assistant_message" ? 
                        (<li key={index}>{msg.message.content}</li>) : null
                ))}
            </ul>
            <button onClick={Record}> Record </button>
        </div>
    );
};

export default WebSocketComponent;