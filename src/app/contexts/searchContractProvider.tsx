import { usePublicClient } from "@left-curve/react";
import { createContext, useContext, type ReactNode } from "react";
import { useTab } from "./tabProvider";
import { getContractData, toastLoad } from "../utils";
import toast from "react-hot-toast";
import type { Address } from "@left-curve/react/types";

type ContextState = {
  searchContract: (addr: string) => Promise<void>;
};

const SearchContractContext = createContext<ContextState | null>(null);

interface TabProviderProps {
  children: ReactNode;
}

export function SearchContractProvider({ children }: TabProviderProps) {
  const client = usePublicClient();
  const { addTab } = useTab();

  async function searchContract(addr: string): Promise<void> {
    if (!addr.startsWith("0x")) {
      toast.error("Not a contract");
      return;
    }

    const address = addr as Address;

    const { balance, info, queries } = await toastLoad(
      async () => getContractData(client, address),
      {
        message: "Searching...",
        delay: 0,
      }
    );

    addTab({
      key: { kind: "contract", address },
      value: {
        kind: "contract",
        address,
        contractInfo: info,
        balances: balance,
        queries,
      },
    });
  }

  return (
    <SearchContractContext.Provider
      value={{
        searchContract,
      }}
    >
      {children}
    </SearchContractContext.Provider>
  );
}

export function useSearchContract() {
  const context = useContext(SearchContractContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
}
