"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface FooterContextType {
  backgroundColor: string | undefined;
  setBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
}

const FooterContext = createContext<FooterContextType | null>(null);

export function FooterProvider({ children }: { children: React.ReactNode }) {
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    undefined
  );

  const value = useMemo(
    () => ({
      backgroundColor,
      setBackgroundColor,
    }),
    [backgroundColor]
  );

  return (
    <FooterContext.Provider value={value}>{children}</FooterContext.Provider>
  );
}

export function useFooter() {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider");
  }

  return context;
}
