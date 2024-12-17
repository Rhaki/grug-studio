"use client";

import SearchBar from "./components/searchBar";
import LeftMenu from "./components/left-menu/layout";
import { usePublicClient } from "@left-curve/react";
import TabRender from "./components/tabs-render/tabRender";

export default function Home() {
  const client = usePublicClient();
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex justify-center bg-slate-800 p-3 shadow-md shadow-stone-900 z-10">
        <img src="/images/dango.svg" alt="dango logo" className="h-8" />
      </div>

      <div className="flex flex-1 gap-3">
        <LeftMenu />
        <div className="flex flex-col flex-1 mt-3 mr-3">
          <SearchBar />
          <TabRender />
        </div>
      </div>
    </main>
  );
}
