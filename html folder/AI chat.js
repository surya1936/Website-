import React, { useState } from "react";

const chatbotData = {
    "printing": ["What type of printing service do you need?", "Do you want color or black & white?", "What is the quantity of prints?"],
    "design": ["What type of design are you looking for?", "Do you need custom branding?", "What is your preferred color scheme?"],
    "pricing": ["What service are you interested in pricing for?", "Do you need bulk pricing?", "Would you like a custom quote?"]
};

function getChatbotResponse(input) {
    input = input.toLowerCase();
    for (const key in chatbotData) {
        if (input.includes(key)) {
            return chatbotData[key].join("\n");
        }
    }
    return "Sorry, I don't understand. Can you ask something related to printing, design, or pricing?";
}

const Chatbot = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    
    const handleSend = () => {
        setResponse(getChatbotResponse(input));
    };
    
    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 h-screen">
            <div className="bg-white shadow-md p-6 rounded-xl w-96">
                <h2 className="text-xl font-semibold mb-4">AI Chatbot</h2>
                <div className="mb-4 h-40 overflow-y-auto border p-3 bg-gray-50 rounded">
                    {response.split("\n").map((line, index) => (
                        <p key={index} className="mb-1">{line}</p>
                    ))}
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border p-2 w-full rounded"
                    placeholder="Ask me something..."
                />
                <button
                    onClick={handleSend}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
