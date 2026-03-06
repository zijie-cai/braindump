import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, Palette } from "lucide-react";
import { Idea, PLAYFUL_COLORS } from "../types";

interface StickyNoteProps {
  idea: Idea;
  onDelete: (id: number) => void;
  onUpdateColor: (id: number, color: string) => void;
  onUpdateTransform: (id: number, x: number, y: number, rotation: number) => void;
  initialX: number;
  initialY: number;
  rotation: number;
}

const StickyNote: React.FC<StickyNoteProps> = ({ idea, onDelete, onUpdateColor, onUpdateTransform, initialX, initialY, rotation }) => {
  const [showColors, setShowColors] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = () => {
    // Generate a new random rotation as soon as it's clicked/touched
    const newRotation = (Math.random() - 0.5) * 24;
    onUpdateTransform(idea.id, idea.x ?? initialX, idea.y ?? initialY, newRotation);
  };

  const handleDragEnd = () => {
    if (noteRef.current) {
      const transform = window.getComputedStyle(noteRef.current).transform;
      const matrix = new DOMMatrix(transform);
      
      // Keep the rotation that was generated at the start of the interaction
      onUpdateTransform(idea.id, matrix.e, matrix.f, idea.rotation ?? rotation);
    }
  };

  return (
    <motion.div
      ref={noteRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ 
        x: idea.x ?? initialX, 
        y: idea.y ?? initialY, 
        rotate: idea.rotation ?? rotation, 
        opacity: 0, 
        scale: 0.8 
      }}
      animate={{ 
        x: idea.x ?? initialX, 
        y: idea.y ?? initialY, 
        rotate: idea.rotation ?? rotation,
        opacity: 1, 
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      }}
      onPointerDown={handlePointerDown}
      onDragEnd={handleDragEnd}
      whileDrag={{ 
        scale: 1.1, 
        zIndex: 1000,
        boxShadow: "0 40px 80px rgba(0,0,0,0.25)"
      }}
      whileTap={{ 
        scale: 1.1, 
        zIndex: 1000,
        boxShadow: "0 40px 80px rgba(0,0,0,0.25)"
      }}
      className="sticky-note"
      style={{ backgroundColor: idea.color }}
    >
      {/* Realistic Pin */}
      <div className="pin-container">
        <div className="pin-head" />
        <div className="pin-needle" />
        <div className="pin-shadow" />
      </div>

      <div className="handwritten select-none overflow-hidden pointer-events-none">
        {idea.content}
      </div>
      
      <div className="flex justify-between items-center mt-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest select-none opacity-40">
            {new Date(idea.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
          <div className="relative">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setShowColors(!showColors);
              }}
              className="text-gray-900/40 hover:text-gray-900 transition-colors p-1"
            >
              <Palette className="w-3.5 h-3.5" />
            </button>
            <AnimatePresence>
              {showColors && (
                <motion.div
                  key="color-picker-dropdown"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute bottom-full left-0 mb-2 p-2 bg-white shadow-xl rounded-lg flex gap-1 z-[1100] border border-black/5"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {PLAYFUL_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateColor(idea.id, color);
                        setShowColors(false);
                      }}
                      className="w-4 h-4 rounded-full border border-black/10 hover:scale-125 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(idea.id);
          }}
          className="text-red-900/40 hover:text-red-600 transition-colors p-2 -m-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default StickyNote;
