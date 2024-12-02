"use client";

import {
  http,
  GrunnectProvider,
  createConfig,
  passkey,
} from "@left-curve/react";
import { devnet } from "@left-curve/react/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type React from "react";
import { TabProvider } from "./contexts/tabProvider";
import { ErrorProvider } from "./contexts/errorProvider";

export const config = createConfig({
  ssr: true,
  multiInjectedProviderDiscovery: true,
  chains: [devnet],
  transports: {
    [devnet.id]: http(devnet.rpcUrls.default.http.at(0)),
  },
  coins: {
    [devnet.id]: {
      uusdc: {
        type: "native",
        name: "USD Circle",
        logoURI:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.svg",
        symbol: "USDC",
        denom: "uusdc",
        decimals: 6,
        coingeckoId: "usd-coin",
      },
    },
  },
  connectors: [passkey()],
});

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <GrunnectProvider config={config}>
      <QueryClientProvider client={new QueryClient()}>
        <TabProvider>{children}</TabProvider>
      </QueryClientProvider>
    </GrunnectProvider>
  );
}
