
import { useState, useRef, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  dragOffset: Position;
}

export const useDragAndDrop = (initialPosition: Position) => {
  const [position, setPosition] = useState(initialPosition);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 }
  });
  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!dragRef.current) return;

    const rect = dragRef.current.getBoundingClientRect();
    const offset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    setDragState({ isDragging: true, dragOffset: offset });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging) return;

    const newX = e.clientX - dragState.dragOffset.x;
    const newY = e.clientY - dragState.dragOffset.y;

    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 80;

    setPosition({
      x: Math.max(0, Math.min(maxX, newX)),
      y: Math.max(0, Math.min(maxY, newY))
    });
  }, [dragState.isDragging, dragState.dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDragState({ isDragging: false, dragOffset: { x: 0, y: 0 } });
  }, []);

  // Effect to handle mouse events
  const setupEventListeners = useCallback(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    isDragging: dragState.isDragging,
    dragRef,
    handleMouseDown,
    setupEventListeners
  };
};
