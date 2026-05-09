"use client";

import { motion } from "framer-motion";
import { Play, X, Keyboard } from "lucide-react";
import { useEffect, useState } from "react";

interface ApprovalBarProps {
  onApprove: () => void;
  onReject: () => void;
}

export default function ApprovalBar({ onApprove, onReject }: ApprovalBarProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);

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
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
    >
      {/* Shortcuts tooltip */}
      <motion.div
        initial={false}
        animate={{ opacity: showShortcuts ? 1 : 0, y: showShortcuts ? 0 : 4 }}
        className="flex items-center gap-3 text-[10px] text-ghost-highlight border border-surface-border bg-surface rounded-full px-3 py-1.5 pointer-events-none"
      >
        <span className="flex items-center gap-1.5">
          <kbd className="border border-surface-border rounded px-1 py-0.5 text-[9px]">⌘</kbd>
          <kbd className="border border-surface-border rounded px-1 py-0.5 text-[9px]">↵</kbd>
          Execute
        </span>
        <span className="w-[1px] h-3 bg-surface-border" />
        <span className="flex items-center gap-1.5">
          <kbd className="border border-surface-border rounded px-1 py-0.5 text-[9px]">Esc</kbd>
          Dismiss
        </span>
      </motion.div>

      {/* Main bar */}
      <div className="glass-panel rounded-full p-1.5 flex items-center gap-1 shadow-2xl shadow-black/40">
        {/* Execute button */}
        <button
          onClick={onApprove}
          className="bg-foreground text-background hover:bg-white active:scale-95 transition-all px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-semibold"
        >
          <Play size={13} className="fill-current" />
          Execute Workflow
        </button>

        <div className="w-[1px] h-5 bg-surface-border mx-1" />

        {/* Shortcut hint toggle */}
        <button
          onMouseEnter={() => setShowShortcuts(true)}
          onMouseLeave={() => setShowShortcuts(false)}
          className="p-2.5 text-ghost-highlight hover:text-foreground transition-colors rounded-full hover:bg-surface"
          title="Keyboard shortcuts"
        >
          <Keyboard size={14} />
        </button>

        {/* Dismiss button */}
        <button
          onClick={onReject}
          className="p-2.5 text-ghost-highlight hover:text-foreground transition-colors rounded-full hover:bg-surface"
          title="Dismiss (Esc)"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}