
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import chatService from '@/services/ChatService';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose, position }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load messages from service when component mounts or chat opens
  useEffect(() => {
    if (isOpen) {
      setMessages(chatService.getMessages());
    }
  }, [isOpen]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      await chatService.sendMessage(inputValue);
      setMessages(chatService.getMessages());
      setInputValue('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!isOpen) return null;

  // Smart positioning logic
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const chatWidth = 350; // Slightly wider for better readability
  const chatHeight = 450; // Slightly taller to show more messages
  
  let chatX = position.x - chatWidth + 80;
  let chatY = position.y;
  
  if (chatX < 10) chatX = position.x + 90;
  if (chatY + chatHeight > windowHeight - 20) chatY = windowHeight - chatHeight - 20;
  if (chatY < 20) chatY = 20;

  return (
    <div
      className="fixed z-[60] bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-4 duration-300"
      style={{
        left: `${chatX}px`,
        top: `${chatY}px`,
        width: `${chatWidth}px`,
        height: `${chatHeight}px`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pulse-500 to-pulse-600 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white/30 animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Mosaia Assistant</h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pulse-500 to-pulse-600 flex-shrink-0 flex items-center justify-center shadow-md">
                <span className="text-xs text-white font-bold">M</span>
              </div>
            )}
            <div 
              className={`rounded-2xl p-3 max-w-[80%] ${message.role === 'user' 
                ? 'bg-gradient-to-r from-pulse-500 to-pulse-600 text-white ml-auto shadow-md' 
                : 'bg-gray-100 text-gray-800 shadow-sm border border-gray-200'}`}
            >
              <p className="text-sm whitespace-pre-wrap">
                {message.content}
              </p>
              <div className="text-right mt-1">
                <span className={`text-[10px] ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center shadow-md">
                <span className="text-xs text-white">You</span>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pulse-500 to-pulse-600 flex-shrink-0 flex items-center justify-center shadow-md">
              <span className="text-xs text-white font-bold">M</span>
            </div>
            <div className="bg-gray-100 rounded-2xl p-3 shadow-sm border border-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-pulse-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-pulse-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-pulse-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask Mosaia anything..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pulse-500 disabled:opacity-70 disabled:cursor-not-allowed"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="p-3 bg-gradient-to-r from-pulse-500 to-pulse-600 text-white rounded-full hover:from-pulse-600 hover:to-pulse-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
