// app/chat/page.tsx
"use client"; // This ensures that it's a client component in Next.js

import React, { useState } from 'react';

// Interface for message objects
interface Message {
    id: string;
    content: string;
    role: 'user' | 'bot';
}

const ChatPage: React.FC = () => {
    // State to store messages and the input value
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    // Handle the user sending a message
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();

        if (!input) return; // Prevent sending empty messages

        // Create the user message
        const userMessage: Message = {
            id: crypto.randomUUID(),
            content: input,
            role: 'user'
        };

        // Add the user message to the state
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput(''); // Clear the input field

        // Simulate bot response after a delay
        setTimeout(() => {
            const botResponse: Message = {
                id: crypto.randomUUID(),
                content: generateBotResponse(input), // Generate a bot response
                role: 'bot'
            };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 1000); // 1-second delay for more natural conversation
    };

    // Function to generate the bot's response based on the user's message
    const generateBotResponse = (input: string): string => {
        // Simple example bot response logic
        if (input.toLowerCase().includes('hello')) {
            return "Hi! How can I help you today?";
        }
        return `Echo: ${input}`;
    };

    return (
        <div className="flex flex-col h-screen p-4">
            <h1 className="text-3xl font-bold">Chat</h1>

            {/* Chat box container */}
            <div className="flex-grow overflow-auto mt-4 border rounded p-2">
                {messages.map((msg) => (
                    <div key={msg.id} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span
                className={`inline-block rounded px-2 py-1 ${
                    msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
            >
              {msg.content}
            </span>
                    </div>
                ))}
            </div>

            {/* Input and send button */}
            <form onSubmit={handleSend} className="flex mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 flex-grow"
                    placeholder="Type a message..."
                    required
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatPage;