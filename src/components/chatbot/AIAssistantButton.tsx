
import React from 'react';

interface AIAssistantButtonProps {
  isOpen: boolean;
  onClick: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  isDragging: boolean;
}

const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({ 
  isOpen, 
  onClick, 
  onMouseDown, 
  isDragging 
}) => {
  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={`
        relative w-20 h-20 rounded-full shadow-2xl transition-all duration-300 group
        ${isDragging ? 'scale-110 cursor-grabbing' : 'cursor-grab hover:scale-105'}
        ${isOpen ? 'ring-4 ring-blue-500/30' : ''}
      `}
      style={{
        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(249, 115, 22, 0.4)',
      }}
    >
      {/* Outer pulse ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pulse-400 to-pulse-600 opacity-75 animate-ping" />
      
      {/* Inner animated core */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 opacity-90"
          style={{
            background: 'conic-gradient(from 0deg, #f97316, #ea580c, #c2410c, #f97316)',
            animation: isOpen ? 'spin 3s linear infinite' : 'spin 8s linear infinite',
          }}
        />
        
        {/* Central core */}
        <div className="absolute inset-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/40 animate-pulse flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white/60 animate-bounce" 
                 style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default AIAssistantButton;
