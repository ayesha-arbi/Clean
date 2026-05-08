"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Easing } from "framer-motion";

const EASE: Easing = [0.16, 1, 0.3, 1];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <main className="z-10 text-center max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-xs font-medium tracking-widest text-ghost-highlight uppercase">
              CLEAN OS
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6"
        >
          Software should understand intent.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="text-ghost-highlight text-lg md:text-xl mb-12 font-light"
        >
          CLEAN connects workflows across apps before coordination becomes friction.
          Quietly intelligent, totally invisible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium transition-all hover:bg-white hover:scale-105 active:scale-95"
          >
            Enter Workspace
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}