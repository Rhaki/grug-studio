"use client";
import { usePublicClient } from "@left-curve/react";
import type { Address, ContractInfo } from "@left-curve/react/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface Env {
  selectedContract: ContractInfo | undefined;
  searchContract: (contract: string) => Promise<void>;
}

const Context = createContext<Env>({
  selectedContract: undefined,
  searchContract: async () => {},
});

export function SelectedContractProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = usePublicClient();

  const [selectedContract, setSelectedContract] = useState<
    ContractInfo | undefined
  >(undefined);

  async function searchContract(contract: string) {
    const address = contract as Address;

    client.getContractInfo({ address }).then((contract) => {
      setSelectedContract(contract);
    });
  }

  return (
    <Context.Provider value={{ selectedContract, searchContract }}>
      {children}
    </Context.Provider>
  );
}

export function useSelectedContract() {
  return useContext(Context);
}
