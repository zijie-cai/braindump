import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react";
import { LayoutGrid, Compass, Plus, Minus } from "lucide-react";
import IdeaInput from "./components/IdeaInput";
import StickyNote from "./components/StickyNote";
import { Idea, PLAYFUL_COLORS } from "./types";

const STORAGE_KEY = "braindump-ideas";

function loadIdeas(): Idea[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load ideas from localStorage", error);
    return [];
  }
}

function nextIdeaId(ideas: Idea[]) {
  return ideas.reduce((maxId, idea) => Math.max(maxId, idea.id), 0) + 1;
}

export default function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(0.5); // Default home view at 50%
  
  // Motion values for board position to allow programmatic recentering
  const boardX = useMotionValue(0);
  const boardY = useMotionValue(80); // Balanced gap

  useEffect(() => {
    setIdeas(loadIdeas());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }, [ideas]);

  const handleAddIdea = (content: string, tags: string[]) => {
    const randomColor = PLAYFUL_COLORS[Math.floor(Math.random() * PLAYFUL_COLORS.length)];
    const centerX = 5000;
    const centerY = 5000;
    const x = centerX - 130 + (Math.random() - 0.5) * 200;
    const y = centerY - 130 + (Math.random() - 0.5) * 200;
    const rotation = (Math.random() - 0.5) * 24;

    try {
      setIdeas((prev) => [
        {
          id: nextIdeaId(prev),
          content,
          tags,
          created_at: new Date().toISOString(),
          color: randomColor,
          x,
          y,
          rotation,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Failed to add idea", error);
    }
  };

  const handleDeleteIdea = (id: number) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id));
  };

  const handleUpdateColor = (id: number, color: string) => {
    try {
      setIdeas((prev) => prev.map((idea) => (idea.id === id ? { ...idea, color } : idea)));
    } catch (error) {
      console.error("Failed to update color", error);
    }
  };

  const handleUpdateTransform = (id: number, x: number, y: number, rotation: number) => {
    try {
      setIdeas((prev) => prev.map((idea) => (idea.id === id ? { ...idea, x, y, rotation } : idea)));
    } catch (error) {
      console.error("Failed to update transform", error);
    }
  };

  const organizeNotes = async () => {
    if (ideas.length === 0) return;

    const centerX = 5000;
    const centerY = 5000;
    const cols = Math.ceil(Math.sqrt(ideas.length));
    const spacing = 350;
    
    const updatedIdeas = ideas.map((idea, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = centerX - (cols * spacing) / 2 + col * spacing;
      const y = centerY - (Math.ceil(ideas.length / cols) * spacing) / 2 + row * spacing;
      return { ...idea, x, y, rotation: 0 }; // Reset rotation for clean layout
    });

    setIdeas(updatedIdeas);
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 1));
  };

  const resetView = () => {
    setZoom(0.5); // Reset to 50% view
    animate(boardX, 0, { type: "spring", stiffness: 300, damping: 30 });
    animate(boardY, 80, { type: "spring", stiffness: 300, damping: 30 }); // Reset to balanced position
  };

  // Helper to generate stable random positions based on ID (fallback)
  const getStablePos = (id: number) => {
    const hash = (n: number) => {
      let v = n * 12345.6789;
      return v - Math.floor(v);
    };

    const centerX = 5000;
    const centerY = 5000;
    const spread = 4000;
    
    const x = centerX - 130 + (hash(id * 1) - 0.5) * spread;
    const y = centerY - 130 + (hash(id * 2) - 0.5) * spread;
    const rotate = (hash(id * 3) - 0.5) * 20;
    
    return { x, y, rotate };
  };

  return (
    <div className="bulletin-board-container">
      {/* UI Overlay - Top Left: Title */}
      <div className="ui-overlay top-8 left-12">
        <div className="flex flex-col">
          <h1 className="font-hand text-7xl text-gray-900 select-none tracking-tight -rotate-2">
            braindump
          </h1>
          <div className="h-1.5 w-32 bg-yellow-400/50 -mt-2 ml-3" />
        </div>
      </div>

      {/* UI Overlay Controls */}
      <div className="percentage-paper">
        {Math.round(zoom * 100)}%
      </div>

      <div className="paper-control-group">
        <button 
          onClick={() => handleZoom(0.1)}
          className="paper-tab"
          title="Zoom In"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button 
          onClick={() => handleZoom(-0.1)}
          className="paper-tab"
          title="Zoom Out"
        >
          <Minus className="w-5 h-5" />
        </button>

        <div className="control-divider" />

        <button 
          onClick={organizeNotes}
          className="paper-tab sort-btn"
          title="Magic Sort"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>

        <button 
          onClick={resetView}
          className="paper-tab home-btn"
          title="Home (Recenter)"
        >
          <Compass className="w-5 h-5" />
        </button>
      </div>

      {/* Input */}
      <IdeaInput onAdd={handleAddIdea} />

      {/* Zoomable & Draggable Wrapper */}
      <motion.div 
        drag
        dragMomentum={false}
        className="zoom-wrapper"
        style={{ 
          x: boardX,
          y: boardY,
          scale: zoom,
          cursor: "grab"
        }}
        whileDrag={{ cursor: "grabbing" }}
      >
        <AnimatePresence>
          {ideas.map((idea) => {
            const pos = getStablePos(idea.id);
            return (
              <StickyNote
                key={idea.id}
                idea={idea}
                onDelete={handleDeleteIdea}
                onUpdateColor={handleUpdateColor}
                onUpdateTransform={handleUpdateTransform}
                initialX={pos.x}
                initialY={pos.y}
                rotation={pos.rotate}
              />
            );
          })}
        </AnimatePresence>

        {!isLoading && ideas.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center rotate-1">
              <p className="font-hand text-5xl text-gray-300 mb-4">
                Your infinite board is empty.
              </p>
              <p className="font-hand text-3xl text-gray-200">
                Pin your first thought to begin.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] bg-white/50 backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
