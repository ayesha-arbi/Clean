"use client";

import { MOCK_INTENTS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import GhostSimulation from "./ghost-simulation";
import type { Easing } from "framer-motion";

const EASE: Easing = [0.16, 1, 0.3, 1];

export default function IntentWeaver({ taskId }: { taskId: string }) {
  const data = MOCK_INTENTS.find((i) => i.id === taskId);
  if (!data) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE,
      },
    },
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col"
      >
        {/* Origin Intent Box */}
        <motion.div variants={item} className="mb-8">
          <span className="text-xs font-medium text-ghost-highlight uppercase tracking-wider mb-2 block">
            Origin: {data.sourceApp}
          </span>

          <h2 className="text-xl md:text-2xl font-medium text-foreground leading-snug">
            "{data.fullText}"
          </h2>
        </motion.div>

        {/* AI Processing Connector */}
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center my-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-surface-border to-transparent" />

          <div className="bg-surface border border-surface-border text-xs text-ghost-highlight px-3 py-1 rounded-full flex items-center gap-2 -my-3 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
            Intent Extracted
          </div>

          <div className="w-[1px] h-12 bg-gradient-to-t from-surface-border to-transparent" />
        </motion.div>

        {/* Suggested Actions */}
        <motion.div variants={item} className="mt-8">
          <span className="text-xs font-medium text-ghost-highlight uppercase tracking-wider mb-4 block">
            Suggested Workflow
          </span>

          <div className="grid gap-3">
            {data.actions.map((action) => (
              <div
                key={action.id}
                className="flex items-center justify-between p-4 rounded-lg border border-surface-border bg-surface/10 hover:bg-surface/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-md bg-surface border border-surface-border flex items-center justify-center text-xs font-medium">
                    {action.app.charAt(0)}
                  </div>

                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {action.action}
                    </div>
                    <div className="text-xs text-ghost-highlight">
                      {action.details}
                    </div>
                  </div>
                </div>

                <CheckCircle2 size={16} className="text-ghost-highlight opacity-50" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ghost Simulation (WOW FEATURE) */}
        <motion.div variants={item}>
          <GhostSimulation simulation={data.simulation} />
        </motion.div>
      </motion.div>
    </div>
  );
}