
import React, { useState, useEffect } from 'react';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import ChatInterface from './chatbot/ChatInterface';
import AIAssistantButton from './chatbot/AIAssistantButton';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    position,
    isDragging,
    dragRef,
    handleMouseDown,
    setupEventListeners
  } = useDragAndDrop({ x: window.innerWidth - 100, y: window.innerHeight - 120 });

  useEffect(() => {
    const cleanup = setupEventListeners();
    return cleanup;
  }, [setupEventListeners]);

  const handleClick = () => {
    if (!isDragging) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div
        ref={dragRef}
        className="fixed z-50 select-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <AIAssistantButton
          isOpen={isOpen}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          isDragging={isDragging}
        />
      </div>

      <ChatInterface
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
      />
    </>
  );
};

export default ChatbotButton;
