"use client";

import React, { createContext, useContext, useState } from "react";

interface FocusContextType {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Toggle class on the body for global CSS targeting
  const toggleFocusMode = () => {
    setIsFocusMode((prev) => {
      const next = !prev;
      if (next) document.body.classList.add("focus-mode-active");
      else document.body.classList.remove("focus-mode-active");
      return next;
    });
  };

  return (
    <FocusContext.Provider value={{ isFocusMode, toggleFocusMode }}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  const context = useContext(FocusContext);
  if (!context) throw new Error("useFocus must be used within FocusProvider");
  return context;
}