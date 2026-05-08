"use client";

import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useEffect } from "react";

interface ApprovalBarProps {
  onApprove: () => void;
  onReject: () => void;
}

export default function ApprovalBar({ onApprove, onReject }: ApprovalBarProps) {
  
  // Minimal Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        onApprove();
      }
      if (e.key === "Escape") {
        onReject();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onApprove, onReject]);

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-panel rounded-full p-1.5 pr-4 flex items-center gap-2 shadow-2xl">
        <button 
          onClick={onApprove}
          className="bg-foreground text-background hover:bg-white transition-colors px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
        >
          <Play size={14} className="fill-current" />
          Execute Workflow
        </button>
        
        <div className="w-[1px] h-4 bg-surface-border mx-2" />
        
        <span className="text-xs text-ghost-highlight hidden md:inline-block mr-4">
          Cmd + Enter
        </span>

        <button 
          onClick={onReject}
          className="p-2 text-ghost-highlight hover:text-foreground transition-colors rounded-full hover:bg-surface"
          title="Dismiss (Esc)"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}