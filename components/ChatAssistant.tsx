import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToAI, startChat } from '../services/geminiService';

interface ChatAssistantHandle {
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatAssistant = forwardRef<ChatAssistantHandle, {}>((props, ref) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        setMessages,
    }));
  
    useEffect(() => {
      startChat();
    }, []);
    
    useEffect(() => {
      if (chatHistoryRef.current) {
          chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
      }
    }, [messages]);
  
    const handleSend = async () => {
      if (input.trim() === '') return;
  
      const userMessage: ChatMessage = { role: 'user', text: input };
      setMessages(prev => [...prev, userMessage, { role: 'loading', text: '...' }]);
      const currentInput = input;
      setInput('');
      
      const aiResponse = await sendMessageToAI(currentInput);
      
      setMessages(prev => {
          const newMessages = prev.filter(msg => msg.role !== 'loading');
          return [...newMessages, { role: 'model', text: aiResponse }];
      });
    };
  
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          handleSend();
      }
    };
  
    return (
        <div 
            className="relative h-full bg-blue-300/10 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-blue-200/50"
        >
            <div 
                ref={chatHistoryRef} 
                className="p-6 space-y-4 overflow-y-auto h-[calc(100%-80px)]"
            >
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 text-sm ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md p-3 px-4 rounded-xl shadow ${
                            msg.role === 'user' ? 'bg-chat-user-bg text-white rounded-br-none' : 
                            msg.role === 'model' ? 'bg-chat-model-bg text-text-dark rounded-bl-none' :
                            'bg-gray-200 text-muted-dark rounded-bl-none animate-pulse'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-transparent">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full bg-white text-text-dark text-base p-4 pl-5 pr-16 rounded-lg border-none outline-none shadow-lg focus:ring-2 focus:ring-accent"
                        placeholder="Ask SnakeEngine.AI anything..."
                        aria-label="AI Assistant Chat"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2.5 bottom-2.5 bg-gradient-to-tr from-send-btn-start to-send-btn-end text-white border-none w-11 h-11 rounded-lg cursor-pointer text-lg transition-transform duration-200 hover:scale-110 flex items-center justify-center shadow-md"
                        aria-label="Send message"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ChatAssistant;