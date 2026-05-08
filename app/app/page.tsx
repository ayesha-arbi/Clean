"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFocus } from "@/components/shared/focus-toggle";
import { Eye, EyeOff } from "lucide-react";

// We will build these detailed components in the next step
import InboxList from "@/components/workflow/inbox-list";
import IntentWeaver from "@/components/workflow/intent-weaver";
import ApprovalBar from "@/components/workflow/approval-bar";

export default function AppScreen() {
  const { isFocusMode, toggleFocusMode } = useFocus();
  const [activeTaskId, setActiveTaskId] = useState<string | null>("task-1");

  return (
    <div className="flex w-full h-full">
      {/* LEFT: Inbox / Triggers (Dampens in Focus Mode) */}
      <aside className="w-80 border-r border-surface-border bg-surface/30 flex flex-col focus-dampen">
        <div className="p-4 border-b border-surface-border flex items-center justify-between">
          <span className="text-xs font-semibold text-ghost-highlight uppercase tracking-wider">Intercepted Intent</span>
          
          <button 
            onClick={toggleFocusMode}
            className="text-ghost-highlight hover:text-foreground transition-colors"
            title="Toggle Focus Mode"
          >
            {isFocusMode ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {/* Mock passing state down - to be built next */}
          <InboxList activeId={activeTaskId} onSelect={setActiveTaskId} />
        </div>
      </aside>

      {/* CENTER: The Weaver & Ghost Simulation */}
      <section className="flex-1 flex flex-col relative is-active">
        {/* Main interactive canvas */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-24 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {activeTaskId ? (
              <IntentWeaver key={activeTaskId} taskId={activeTaskId} />
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-ghost-highlight text-sm"
              >
                Waiting for intent...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM: Floating Approval Bar */}
        <AnimatePresence>
          {activeTaskId && (
            <ApprovalBar 
              onApprove={() => setActiveTaskId(null)} 
              onReject={() => setActiveTaskId(null)} 
            />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}