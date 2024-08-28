"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { useClient } from "./clientProvider";
import { Address } from "../../../../interface/packages/types/build";

interface Env {
  selectedContract: string | undefined;
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
  const { client } = useClient();

  const [selectedContract, setSelectedContract] = useState<string | undefined>(
    undefined
  );

  async function searchContract(contract: string) {
    let address = contract as Address;

    client.queryAccount({ address }).then((account) => {
      console.log(account);
    });

    setSelectedContract(contract);
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
