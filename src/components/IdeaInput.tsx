import React, { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

interface IdeaInputProps {
  onAdd: (content: string, tags: string[]) => void;
}

export default function IdeaInput({ onAdd }: IdeaInputProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim()) return;
    onAdd(content, []);
    setContent("");
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-6">
      <div className="tape-effect" />
      <div className="input-container rounded-sm p-3 flex items-center gap-3">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's the next big thing?"
          className="flex-grow bg-transparent border-none outline-none px-4 py-3 text-gray-800 font-hand text-2xl placeholder:text-gray-300"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSubmit()}
          disabled={!content.trim()}
          className="bg-[#FFEB3B] text-black px-6 py-3 rounded-sm font-hand text-xl font-bold shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:grayscale"
        >
          Pin it!
        </motion.button>
      </div>
    </div>
  );
}
