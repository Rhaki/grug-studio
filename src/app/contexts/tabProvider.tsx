import type {
  Address,
  ChainInfoResponse,
  Coins,
  ContractInfo,
  Json,
} from "@left-curve/react/types";
import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";

export type TabKey =
  | { kind: "contract"; address: Address }
  | { kind: "query"; id: string }
  | { kind: "contracts" }
  | { kind: "chainInfo" };

export function convertTabKey(key: TabKey): string {
  switch (key.kind) {
    case "contract":
      return `contract:${key.address}`;

    case "query":
      return `query:${key.id}`;

    case "contracts":
      return "contracts";

    case "chainInfo":
      return "chainInfo";
  }
}

export function deriveTabKey(key: string): TabKey {
  const [kind, value] = key.split(":");

  switch (kind) {
    case "contract":
      return { kind: "contract", address: value as Address };

    case "query":
      return { kind: "query", id: value };

    case "contracts":
      return { kind: "contracts" };

    case "chainInfo":
      return { kind: "chainInfo" };
  }

  throw new Error("Invalid tab key");
}

export type TabValue =
  | {
      kind: "contract";
      address: Address;
      contractInfo: ContractInfo;
      queries: string[];
      balances?: Coins;
    }
  | { kind: "query"; contract: Address; query: string }
  | { kind: "contracts"; contracts: Record<Address, ContractInfo> }
  | { kind: "chainInfo"; chainInfo: ChainInfoResponse };

export type TabEntities =
  | {
      key: { kind: "contract"; address: Address };
      value: {
        kind: "contract";
        address: Address;
        contractInfo: ContractInfo;
        queries: string[];
        balances?: Coins;
      };
    }
  | {
      key: { kind: "query"; id: string };
      value: { kind: "query"; contract: Address; query: string };
    }
  | {
      key: { kind: "contracts" };
      value: { kind: "contracts"; contracts: Record<Address, ContractInfo> };
    }
  | {
      key: { kind: "chainInfo" };
      value: { kind: "chainInfo"; chainInfo: ChainInfoResponse };
    };

type ContextState = {
  addTab: (entity: TabEntities) => void;
  tabs: Record<string, TabValue>;
  setSelectTab: (key: TabKey) => void;
  selectedTab: () => [TabKey, TabValue] | null;
  removeTab(key: TabKey | string): void;
  swapTabs: (key1: string, key2: string) => void;
};

interface TabProviderProps {
  children: ReactNode;
}

const TabContext = createContext<ContextState | null>(null);

export function TabProvider({ children }: TabProviderProps) {
  const [tabs, setTab] = useState<Record<string, TabValue>>({});

  const [selectedTab, setSelectTab] = useState<TabKey | null>(null);

  const addTab = useCallback(
    (entity: TabEntities) => {
      const key = convertTabKey(entity.key);
      const value = entity.value;

      if (Object.hasOwn(tabs, key)) {
        console.log("tab already exists");
        setTab({ ...tabs, [key]: value });
      } else {
        console.log("tab added");
        setTab({ ...tabs, [key]: value });
      }
      setSelectTab(entity.key);
    },
    [tabs]
  );

  const trySetSelectTab = useCallback(
    (key: TabKey) => {
      const keyStr = convertTabKey(key);

      if (Object.hasOwn(tabs, keyStr)) {
        setSelectTab(key);
      } else {
        console.log("tab does not exist");
      }
    },
    [tabs]
  );

  const getSelectedTab = useCallback((): [TabKey, TabValue] | null => {
    if (selectedTab === null) {
      return null;
    }

    const key = convertTabKey(selectedTab);

    if (Object.hasOwn(tabs, key)) {
      return [selectedTab, tabs[key]];
    }

    return null;
  }, [tabs, selectedTab]);

  const removeTab = useCallback(
    (key: TabKey | string) => {
      const keyStr = typeof key === "string" ? key : convertTabKey(key);

      if (Object.hasOwn(tabs, keyStr)) {
        const newTabs = { ...tabs };
        delete newTabs[keyStr];
        setTab(newTabs);

        if (selectedTab !== null && convertTabKey(selectedTab) === keyStr) {
          const firstkey = Object.keys(newTabs)[0];
          if (firstkey === undefined) {
            setSelectTab(null);
          } else {
            setSelectTab(deriveTabKey(firstkey));
          }
        }
      }
    },
    [tabs, selectedTab]
  );

  const swapTabs = useCallback(
    (key1: string, key2: string) => {
      const newTabs = { ...tabs };
      const temp = newTabs[key1];
      newTabs[key1] = newTabs[key2];
      newTabs[key2] = temp;
      setTab(newTabs);
    },
    [tabs]
  );

  return (
    <TabContext.Provider
      value={{
        addTab,
        setSelectTab: trySetSelectTab,
        selectedTab: getSelectedTab,
        removeTab,
        swapTabs,
        tabs,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
}
