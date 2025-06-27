import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  personality?: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! I'm your cultural co-pilot 🚀 Ask me about any trending topic, meme, or viral content. I can explain, predict, or just chat about what's happening right now!",
      sender: 'bot',
      personality: 'friendly'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [personality, setPersonality] = useState('friendly');

  const personalities = [
    { id: 'friendly', label: '😊 Friendly', color: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
    { id: 'genz', label: '🔥 Gen Z', color: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
    { id: 'analyst', label: '🤓 Analyst', color: 'bg-green-500/10 text-green-300 border-green-500/20' },
    { id: 'hype', label: '⚡ Hype', color: 'bg-orange-500/10 text-orange-300 border-orange-500/20' }
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText, personality);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        personality
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText('');
  };

  const generateBotResponse = (userInput: string, personality: string): string => {
    const responses = {
      friendly: [
        "That's a great question! Based on what I'm seeing across platforms, here's what's happening...",
        "I love that you asked about this! It's actually a fascinating trend because...",
        "Oh this is trending big time! Let me break it down for you..."
      ],
      genz: [
        "Bestie, this is literally everywhere rn! So basically...",
        "No cap, this trend is SENDING me! Here's the tea...",
        "This is so chaotic and I'm here for it! The whole situation is..."
      ],
      analyst: [
        "From a cultural analysis perspective, this trend demonstrates...",
        "The data suggests this phenomenon is significant because...",
        "Examining the metrics and engagement patterns, we can see..."
      ],
      hype: [
        "BRO THIS IS INSANE! 🔥🔥🔥 You picked the PERFECT trend to ask about!",
        "YO this is absolutely BREAKING THE INTERNET right now!!!",
        "THIS IS LITERALLY THE HOTTEST THING ON THE PLANET RN!!!"
      ]
    };

    const personalityResponses = responses[personality as keyof typeof responses];
    const randomResponse = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
    
    return randomResponse + " The engagement levels are through the roof and it's showing all the signs of going mega-viral. Want me to explain the context or predict where this is heading?";
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl h-[600px] flex flex-col shadow-2xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-white text-xl">Cultural Co-Pilot</h3>
          </div>
          <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {personalities.map(p => (
            <button
              key={p.id}
              onClick={() => setPersonality(p.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                personality === p.id ? p.color : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-[85%] ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                {message.sender === 'user' ? 
                  <User className="w-5 h-5 text-white" /> : 
                  <Bot className="w-5 h-5 text-white" />
                }
              </div>
              <div className={`rounded-2xl px-6 py-4 ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white'
              }`}>
                <p className="leading-relaxed">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-white/10">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about trends, memes, viral content..."
            className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 text-white placeholder-gray-400 text-lg"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/25 disabled:hover:shadow-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
