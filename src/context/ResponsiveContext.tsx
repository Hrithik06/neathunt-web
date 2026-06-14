import { useIsMobile } from "@/hooks/useIsMobile";
import { createContext, useContext } from "react";
type ResponsiveContextType = {
  isMobile: boolean;
};

const ResponsiveContext = createContext<ResponsiveContextType | null>(null);
export function ResponsiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile(768);

  return (
    <ResponsiveContext.Provider value={{ isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
}
export function useResponsive() {
  const ctx = useContext(ResponsiveContext);

  if (!ctx)
    throw new Error("useResponsive must be used inside ResponsiveProvider");

  return ctx;
}
