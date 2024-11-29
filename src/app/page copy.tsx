// "use client";

// import SearchContract from "./components/searchContract";
// import ContractInfo from "./components/contractInfo";
// import SettingMenu from "./components/settings/layout";
// import LeftMenu from "./components/left-menu/layout";
// import { usePublicClient } from "@left-curve/react";

// export default function Home() {
//   const client = usePublicClient();
//   return (
//     <main className="flex min-h-screen">
//       {/* <SettingMenu /> */}
//       <LeftMenu/>
//       {client.chain ? (
//         <div className="flex flex-col flex-1">
//           {" "}
//           <SearchContract />
//           <ContractInfo />
//         </div>
//       ) : (
//         <div className="flex flex-1 items-center justify-center">
//           {/* <p className="font-bold">Invalid URL {url}. Is chain running?</p> */}
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import {
  useAccount,
  useBalances,
  useBlock,
  useChainId,
  useConfig,
  useConnect,
  usePublicClient,
} from "@left-curve/react";
import { devnet } from "@left-curve/react/chains";
import { ConnectionStatus } from "@left-curve/react/types";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const { status } = useAccount();
  const config = useConfig();
  const chain_id = useChainId();

  return (
    <main className="flex flex-col justify-center items-center min-h-screen min-w-screen bg-gray-100 ">
      <div className="w-full max-w-2xl space-y-6">
        {status !== ConnectionStatus.Connected ? <Connect /> : null}
        <Account />
        <BlockInfo />
        <Balances />
        <QueryContract />
      </div>
    </main>
  );
}

function Account() {
  const { chainId, status, account, connector } = useAccount();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Account</h2>
      <div className="text-gray-700 mb-4 overflow-hidden">
        <p className="truncate">Account: {account?.address}</p>
        <p>ChainId: {chainId}</p>
        <p>Status: {status}</p>
      </div>
      {status !== "disconnected" && (
        <button
          type="button"
          onClick={() => connector?.disconnect()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Disconnect
        </button>
      )}
    </div>
  );
}

function Connect() {
  const chainId = useChainId();
  const { connectors, error } = useConnect();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Connect</h2>
      <div className="flex flex-wrap gap-2">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connector.connect({ chainId, username: "owner" })}
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {connector.name}
          </button>
        ))}
      </div>
      {error && <div className="mt-2 text-red-500">{error.message}</div>}
    </div>
  );
}

function Balances() {
  const { account } = useAccount();
  const { data: balances } = useBalances({ address: account?.address });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Balances</h2>
      <div className="text-gray-700">
        <pre>{JSON.stringify(balances, null, 2)}</pre>
      </div>
    </div>
  );
}

function BlockInfo() {
  const { data: block } = useBlock();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4">BlockInfo</h2>
      <div className="text-gray-700 truncate">
        <pre>{JSON.stringify(block, null, 2)}</pre>
      </div>
    </div>
  );
}

function QueryContract() {
  const client = usePublicClient();
  const { data: response, isLoading } = useQuery({
    queryKey: ["queryContract", "0x..."],
    queryFn: () => client.queryWasmSmart({ contract: "0x...", msg: {} }),
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Query Contract</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="text-gray-700">
          Response: <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default HomePage;
