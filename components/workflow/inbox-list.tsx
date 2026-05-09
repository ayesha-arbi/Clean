"use client";

import { MOCK_INTENTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Mail, Hash, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface InboxListProps {
  activeId: string | null;
  onSelect: (id: string) => void;
  completedTasks?: string[];
}

export default function InboxList({ activeId, onSelect, completedTasks = [] }: InboxListProps) {
  return (
    <div className="flex flex-col gap-1">
      {MOCK_INTENTS.map((intent, index) => {
        const isActive = activeId === intent.id;
        const isCompleted = completedTasks.includes(intent.id);
        const Icon = intent.sourceApp === "Gmail" ? Mail : Hash;

        return (
          <motion.button
            key={intent.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => !isCompleted && onSelect(intent.id)}
            disabled={isCompleted}
            className={cn(
              "text-left p-3 rounded-lg transition-all duration-200 border w-full",
              isCompleted
                ? "bg-transparent border-transparent opacity-40 cursor-default"
                : isActive
                ? "bg-surface border-surface-border shadow-sm"
                : "bg-transparent border-transparent hover:bg-surface/50 cursor-pointer"
            )}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-ghost-highlight uppercase tracking-wider">
                <Icon size={11} />
                <span>{intent.sourceApp}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {intent.urgency === "High" && !isCompleted && (
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                )}
                {isCompleted && (
                  <CheckCircle2 size={13} className="text-ghost-highlight" />
                )}
              </div>
            </div>

            <div className={cn("text-sm font-medium mb-1 truncate", isCompleted ? "text-ghost-highlight" : "text-foreground")}>
              {intent.sender}
            </div>

            <div className="text-xs text-ghost-highlight line-clamp-2 leading-relaxed">
              {intent.snippet}
            </div>

            {isActive && !isCompleted && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="mt-2 h-[1px] bg-gradient-to-r from-foreground/30 to-transparent rounded"
              />
            )}
          </motion.button>
        );
      })}

      {/* Add more hint */}
      <div className="mt-3 p-3 rounded-lg border border-dashed border-surface-border/50 flex items-center justify-center gap-2 text-[10px] text-ghost-highlight/50">
        <span>+ More intents loading...</span>
      </div>
    </div>
  );
}