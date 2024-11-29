"use client";

import SearchBar from "./components/searchBar";
import LeftMenu from "./components/left-menu/layout";
import { usePublicClient } from "@left-curve/react";
import TabRender from "./components/tabs-render/tabRender";

export default function Home() {
  const client = usePublicClient();
  return (
    <main className="flex min-h-screen">
      <LeftMenu />
      {client.chain ? (
        <div className="flex flex-col flex-1 m-3">
          {" "}
          <SearchBar />
          <TabRender />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center" />
      )}
    </main>
  );
}
