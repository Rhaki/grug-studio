import {
  convertTabKey,
  deriveTabKey,
  type TabValue,
  useTab,
} from "@/app/contexts/tabProvider";
import ContractsHeaderTab from "./tab-header-types/contractsHeaderTab";
import ContractHeaderTab from "./tab-header-types/contractHeaderTab";
import { cn } from "@/app/utils";
import { IconDelete } from "../icons/IconDelete";
import ChainInfoHeaderTab from "./tab-header-types/chainInfoHeaderTab";
import { useMemo, useState } from "react";
import QueryHeaderTab from "./tab-header-types/queryHeaderTab";

export default function TabHeaders() {
  const { tabs, setSelectTab, selectedTab, removeTab, swapTabs } = useTab();
  const [draggingIndex, setDraggingIndex] = useState<string | null>(null);

  const selectedKey = selectedTab()?.[0];
  const selectedRawKey: string | null = selectedKey
    ? convertTabKey(selectedKey)
    : null;

  function render(tabValue: TabValue) {
    switch (tabValue.kind) {
      case "contract":
        return (
          <ContractHeaderTab
            contract={tabValue.address}
            label={tabValue.contractInfo.label}
          />
        );
      case "contracts":
        return <ContractsHeaderTab />;
      case "chainInfo":
        return <ChainInfoHeaderTab />;
      case "query":
        return <QueryHeaderTab contract={tabValue.contract} />;
    }
  }

  function click(key: string) {
    setSelectTab(deriveTabKey(key));
  }

  const handleDragStart = (key: string) => {
    setDraggingIndex(key);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, key: string) => {
    console.log("handleDrop", key, draggingIndex);
    if (draggingIndex === key) {
      return;
    }
    if (!draggingIndex) {
      return;
    }
    swapTabs(draggingIndex, key);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-row gap-2">
      {Object.entries(tabs).map(([key, tab]) => (
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(key)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, key)}
          onDragEnd={(e) => {}}
          // key={crypto.randomUUID()}
          key={key}
          onKeyDown={() => click(key)}
          onClick={() => click(key)}
          className={cn(
            "p-2 bg-slate-800 rounded-md hover:cursor-pointer transition-all font-semibold shadow-md select-none",
            {
              "bg-slate-500 ": key === selectedRawKey,
            }
          )}
        >
          <div className="flex gap-1 h-[44px] items-center">
            {render(tab)}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTab(key);
              }}
              type="button"
            >
              <IconDelete className="hover:text-red-400 transition-all" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
