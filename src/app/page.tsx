"use client";

import { useClient } from "./contexts/clientProvider";
import SearchContract from "./components/searchContract";
import ContractInfo from "./components/contractInfo";
import SettingMenu from "./components/settings/layout";
import LeftMenu from "./components/left-menu/layout";

export default function Home() {
  const { valid, url } = useClient();
  return (
    <main className="flex min-h-screen">
      {/* <SettingMenu /> */}
      <LeftMenu/>
      {valid ? (
        <div className="flex flex-col flex-1">
          {" "}
          <SearchContract />
          <ContractInfo />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="font-bold">Invalid URL {url}. Is chain running?</p>
        </div>
      )}
    </main>
  );
}
