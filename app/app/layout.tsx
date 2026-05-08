import { FocusProvider } from "@/components/shared/focus-toggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <FocusProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Minimal Top Nav */}
        <header className="h-14 border-b border-surface-border flex items-center justify-between px-6 shrink-0 z-10 glass-panel focus-dampen">
          <div className="text-sm font-medium tracking-wide">CLEAN</div>
          <div className="text-xs text-ghost-highlight">Cmd + K to command</div>
        </header>
        
        <main className="flex-1 flex overflow-hidden">
          {children}
        </main>
      </div>
    </FocusProvider>
  );
}