"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, ArrowRight, Clock, Layers, Inbox } from "lucide-react";
import type { Easing } from "framer-motion";

const EASE: Easing = [0.16, 1, 0.3, 1];

interface PostExecutionProps {
  completedCount: number;
  lastActions: string[];        // e.g. ["Linear · Issue created", "Calendar · Deadline set"]
  timeSaved: number;            // minutes
  contextSwitches: number;
  onViewInbox: () => void;      // go back to inbox
  onUndo: () => void;           // undo last workflow
}

export default function PostExecution({
  completedCount,
  lastActions,
  timeSaved,
  contextSwitches,
  onViewInbox,
  onUndo,
}: PostExecutionProps) {
  return (
    <motion.div
      key="post-execution"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center gap-8 text-center max-w-md mx-auto w-full"
    >
      {/* Success mark */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.05 }}
        className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center"
      >
        <CheckCircle2 size={28} className="text-background" strokeWidth={2} />
      </motion.div>

      {/* Headline */}
      <div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-foreground mb-2 tracking-tight"
        >
          Workflow executed
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-ghost-highlight"
        >
          All selected actions were dispatched successfully.
        </motion.p>
      </div>

      {/* What was done */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full rounded-xl border border-surface-border bg-surface/20 overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-surface-border">
          <p className="text-[10px] font-semibold text-ghost-highlight uppercase tracking-widest">
            What happened
          </p>
        </div>
        <div className="divide-y divide-surface-border/50">
          {lastActions.map((action, i) => (
            <motion.div
              key={action}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-center gap-3 px-4 py-3"
            >
              <div className="w-4 h-4 rounded-full border border-surface-border flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              </div>
              <span className="text-xs text-foreground/80 text-left">{action}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Time saved stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-6 w-full justify-center"
      >
        <div className="flex items-center gap-2 text-xs text-ghost-highlight">
          <Clock size={13} />
          <span>~{timeSaved} min saved</span>
        </div>
        <div className="w-[1px] h-4 bg-surface-border" />
        <div className="flex items-center gap-2 text-xs text-ghost-highlight">
          <Layers size={13} />
          <span>{contextSwitches} context switches avoided</span>
        </div>
        <div className="w-[1px] h-4 bg-surface-border" />
        <div className="flex items-center gap-2 text-xs text-ghost-highlight">
          <CheckCircle2 size={13} />
          <span>{completedCount} total today</span>
        </div>
      </motion.div>

      {/* What next — actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full"
      >
        <p className="text-[10px] font-semibold text-ghost-highlight uppercase tracking-widest mb-3">
          What's next
        </p>
        <div className="flex flex-col gap-2">
          {/* Primary — back to inbox */}
          <button
            onClick={onViewInbox}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-surface-border bg-surface/20 hover:bg-surface/40 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Inbox size={15} className="text-ghost-highlight" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Back to inbox</p>
                <p className="text-xs text-ghost-highlight">Review remaining intents</p>
              </div>
            </div>
            <ArrowRight size={14} className="text-ghost-highlight group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary — undo */}
          <button
            onClick={onUndo}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-surface-border/50 hover:bg-surface/20 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <RotateCcw size={14} className="text-ghost-highlight" />
              <p className="text-xs text-ghost-highlight">Undo last workflow</p>
            </div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}