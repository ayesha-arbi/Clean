"use client";

import { MOCK_INTENTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Mail, Hash } from "lucide-react";

interface InboxListProps {
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function InboxList({ activeId, onSelect }: InboxListProps) {
  return (
    <div className="flex flex-col gap-1">
      {MOCK_INTENTS.map((intent) => {
        const isActive = activeId === intent.id;
        const Icon = intent.sourceApp === "Gmail" ? Mail : Hash;

        return (
          <button
            key={intent.id}
            onClick={() => onSelect(intent.id)}
            className={cn(
              "text-left p-3 rounded-lg transition-all duration-200 group border",
              isActive 
                ? "bg-surface border-surface-border shadow-sm" 
                : "bg-transparent border-transparent hover:bg-surface/50"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-xs font-medium text-ghost-highlight">
                <Icon size={12} />
                <span>{intent.sourceApp}</span>
              </div>
              {intent.urgency === "High" && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
              )}
            </div>
            <div className="text-sm font-medium text-foreground mb-1 truncate">
              {intent.sender}
            </div>
            <div className="text-xs text-ghost-highlight line-clamp-2 leading-relaxed">
              {intent.snippet}
            </div>
          </button>
        );
      })}
    </div>
  );
}