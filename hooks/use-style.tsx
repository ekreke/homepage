"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { StyleName, defaultStyle, supportedStyles } from "@/lib/style-registry";

const validStyles: readonly string[] = supportedStyles;

function isValidStyle(value: string | null): value is StyleName {
  return value !== null && validStyles.includes(value);
}

interface StyleContextType {
  style: StyleName;
  setStyle: (style: StyleName) => void;
}

const StyleContext = createContext<StyleContextType>({
  style: defaultStyle,
  setStyle: () => {},
});

export function StyleProvider({ children }: { children: ReactNode }) {
  const [style, setStyleState] = useState<StyleName>(defaultStyle);

  useEffect(() => {
    const saved = localStorage.getItem("style");
    if (isValidStyle(saved)) {
      setStyleState(saved);
    }
  }, []);

  const setStyle = (s: StyleName) => {
    if (isValidStyle(s)) {
      setStyleState(s);
      localStorage.setItem("style", s);
    }
  };

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyle() {
  return useContext(StyleContext);
}
