import type { Address, Coins, ContractInfo } from "@left-curve/react/types";
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

export type TabKey =
  | { kind: "contract"; address: Address }
  | { kind: "contracts" };

export function convertTabKey(key: TabKey): string {
  switch (key.kind) {
    case "contract":
      return `contract:${key.address}`;

    case "contracts":
      return "contracts";
  }
}

export function deriveTabKey(key: string): TabKey {
  const [kind, value] = key.split(":");

  switch (kind) {
    case "contract":
      return { kind: "contract", address: value as Address };

    case "contracts":
      return { kind: "contracts" };
  }

  throw new Error("Invalid tab key");
}

export type TabValue =
  | {
      kind: "contract";
      address: Address;
      contractInfo: ContractInfo;
      balances?: Coins;
    }
  | { kind: "contracts"; contracts: Record<Address, ContractInfo> };

export type TabEntities =
  | {
      key: { kind: "contract"; address: Address };
      value: {
        kind: "contract";
        address: Address;
        contractInfo: ContractInfo;
        balances?: Coins;
      };
    }
  | {
      key: { kind: "contracts" };
      value: { kind: "contracts"; contracts: Record<Address, ContractInfo> };
    };

type ContextState = {
  addTab: (entity: TabEntities) => void;
  tabs: Record<string, TabValue>;
  setSelectTab: (key: TabKey) => void;
  selectedTab: () => [TabKey, TabValue] | null;
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

  return (
    <TabContext.Provider
      value={{
        addTab,
        setSelectTab: trySetSelectTab,
        selectedTab: getSelectedTab,
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
