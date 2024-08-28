"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  createPublicClient,
  PublicClient,
} from "../../../../interface/packages/sdk/build/clients/publicClient";
import { http } from "interface";

// URL di default
const defaultUrl = "http://localhost:26657";

interface Env {
  client: PublicClient;
  url: string;
  updateUrl: (url: string) => void;
  valid: boolean;
}

interface ClientProviderProps {
  children: ReactNode;
  initialUrl?: string; // URL opzionale per inizializzare il client
}

// Inizializza il contesto con un client predefinito e una funzione placeholder per updateClient
const Context = createContext<Env>({
  client: createPublicClient({ transport: http(defaultUrl) }),
  url: defaultUrl,
  updateUrl: () => {},
  valid: true,
});

export function ClientProvider({ children, initialUrl }: ClientProviderProps) {
  // Inizializza lo stato del client con l'URL iniziale o quello di default
  const [client, setClient] = useState(() =>
    createPublicClient({ transport: http(initialUrl || defaultUrl) })
  );

  const [url, setUrl] = useState(initialUrl || defaultUrl);

  const [valid, setValid] = useState(true);

  // Funzione per aggiornare il client dato un nuovo URL
  async function updateUrl(url: string) {
    const client = createPublicClient({ transport: http(url) });
    await client
      .getChainInfo()
      .then(() => {
        setValid(true);
      })
      .catch(() => {
        setValid(false);
      });

    setUrl(url);
  }

  updateUrl(url);

  // Utilizza useMemo per memorizzare in cache l'oggetto valore del provider
  const value = useMemo(
    () => ({ client, updateUrl, url, valid }),
    [client, updateUrl]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useClient() {
  return useContext(Context);
}
