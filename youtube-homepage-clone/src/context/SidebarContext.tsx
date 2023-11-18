import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
type SidebarPorviderProps = {
  children: ReactNode;
};
type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value === null) throw new Error("sidebar");
  return value;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

const SidebarPorvider = ({ children }: SidebarPorviderProps) => {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }
  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen((p) => !p);
    } else {
      setIsLargeOpen((l) => !l);
    }
  }
  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }
  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);
  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarPorvider;
