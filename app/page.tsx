"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Zap, CheckCircle, Clock, Layers, ChevronRight } from "lucide-react";
import type { Easing } from "framer-motion";

const EASE: Easing = [0.16, 1, 0.3, 1];

const steps = [
  {
    icon: Mail,
    label: "1. A message arrives",
    desc: "An email or Slack message lands in your inbox requesting something.",
    example: '"Hey, can you prepare the launch assets by Friday and let Sarah know?"',
  },
  {
    icon: Zap,
    label: "2. CLEAN reads the intent",
    desc: "It understands what needs to happen — no setup, no tagging, no rules.",
    example: "Detected: Create task · Set deadline · Notify teammate",
  },
  {
    icon: CheckCircle,
    label: "3. You approve in one click",
    desc: "Review the suggested workflow, deselect anything you don't want, then execute.",
    example: "⌘ + Enter to execute all 3 actions",
  },
];

const stats = [
  { value: "~14 min", label: "saved per workflow" },
  { value: "3×", label: "fewer context switches" },
  { value: "0", label: "manual copy-pastes" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-surface-border/50 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-foreground" />
          <span className="text-sm font-semibold tracking-wider uppercase">Clean OS</span>
        </div>
        <Link
          href="/app"
          className="text-xs text-ghost-highlight hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          Open Workspace <ChevronRight size={12} />
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 relative">
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-white/4 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-widest text-ghost-highlight uppercase border border-surface-border rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Now in beta
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-4xl md:text-6xl font-medium tracking-tight text-foreground max-w-3xl leading-[1.1] mb-6"
        >
          Stop copy-pasting between apps.<br />
          <span className="text-ghost-highlight">Let CLEAN do it.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="text-ghost-highlight text-base md:text-lg max-w-xl mb-10 font-light leading-relaxed"
        >
          CLEAN reads your incoming messages, figures out what needs to happen,
          and lines up the actions for you to approve — across Linear, Slack, Calendar, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="flex items-center gap-4"
        >
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-white hover:scale-105 active:scale-95"
          >
            Try it now — it's free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-xs text-ghost-highlight">No signup required</span>
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 pb-20 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
        >
          <p className="text-[11px] font-semibold text-ghost-highlight uppercase tracking-widest text-center mb-10">
            How it works
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.1, duration: 0.55, ease: EASE }}
                className="relative p-5 rounded-xl border border-surface-border bg-surface/20 flex flex-col gap-3"
              >
                {/* connector line between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-2 z-10">
                    <ChevronRight size={14} className="text-surface-border" />
                  </div>
                )}

                <div className="w-9 h-9 rounded-lg border border-surface-border bg-surface flex items-center justify-center shrink-0">
                  <step.icon size={16} className="text-ghost-highlight" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{step.label}</p>
                  <p className="text-xs text-ghost-highlight leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-auto pt-3 border-t border-surface-border/50">
                  <p className="text-[11px] text-ghost-highlight/70 italic leading-relaxed">
                    {step.example}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="border-t border-surface-border/50 py-14 px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
          className="max-w-2xl mx-auto grid grid-cols-3 gap-8 text-center"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs text-ghost-highlight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── What connects ── */}
      <section className="py-14 px-6 border-t border-surface-border/50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-[11px] font-semibold text-ghost-highlight uppercase tracking-widest mb-8">
            Works with your stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Gmail", "Slack", "Linear", "Notion", "Calendar", "GitHub", "Jira", "Zapier"].map((app) => (
              <span
                key={app}
                className="text-xs text-ghost-highlight border border-surface-border rounded-full px-4 py-1.5 bg-surface/20"
              >
                {app}
              </span>
            ))}
            <span className="text-xs text-ghost-highlight border border-dashed border-surface-border rounded-full px-4 py-1.5">
              + more coming
            </span>
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center border-t border-surface-border/50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
          className="max-w-lg mx-auto"
        >
          <h2 className="text-2xl font-medium text-foreground mb-3 tracking-tight">
            Ready to stop context-switching?
          </h2>
          <p className="text-ghost-highlight text-sm mb-8 font-light">
            Open the workspace and try it with the demo intents — no account needed.
          </p>
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:bg-white hover:scale-105 active:scale-95"
          >
            Enter Workspace
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-surface-border/50 py-6 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span className="text-xs text-ghost-highlight">CLEAN OS · 2026</span>
        </div>
        <span className="text-[10px] text-ghost-highlight/50">
          Quietly intelligent, totally invisible.
        </span>
      </footer>
    </div>
  );
}