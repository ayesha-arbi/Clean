"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, Layers } from "lucide-react";

interface GhostProps {
  simulation: {
    timeSavedMinutes: number;
    contextSwitchesAvoided: number;
    insight: string;
  };
}

export default function GhostSimulation({ simulation }: GhostProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-12 p-6 rounded-xl border border-surface-border bg-surface/30 relative overflow-hidden group"
    >
      {/* Subtle sweeping gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-widest text-ghost-highlight">
        <Sparkles size={12} className="text-foreground" />
        Ghost Simulation
      </div>

      <p className="text-sm text-foreground/90 leading-relaxed mb-6">
        {simulation.insight}
      </p>

      <div className="flex items-center gap-6 border-t border-surface-border pt-4">
        <div className="flex items-center gap-2 text-xs text-ghost-highlight">
          <Clock size={14} />
          <span>Saves ~{simulation.timeSavedMinutes} mins</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-ghost-highlight">
          <Layers size={14} />
          <span>Avoids {simulation.contextSwitchesAvoided} context switches</span>
        </div>
      </div>
    </motion.div>
  );
}