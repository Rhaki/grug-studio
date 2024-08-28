import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export enum TabType {
  contracts,
}

interface Env {
  addTab: (url: TabType) => void;
}

interface TabProviderProps {
  children: ReactNode;
}

const Context = createContext<Env>({
  addTab: (url: TabType) => {},
});

export function TabProvider({ children }: TabProviderProps) {
  const [tab, setTab] = useState<Record<TabType, any>>();

  const value = useMemo(
    () => ({ client, updateUrl, url, valid }),
    [client, updateUrl]
  );
}

export function useTab() {
  return useContext(Context);
}
