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

export default function TabHeaders() {
  const { tabs, setSelectTab, selectedTab, removeTab } = useTab();

  const selectedKey = selectedTab()?.[0];
  const selectedRawKey: string | null = selectedKey
    ? convertTabKey(selectedKey)
    : null;

  function render(tabValue: TabValue) {
    switch (tabValue.kind) {
      case "contract":
        return <ContractHeaderTab contract={tabValue.address} />;
      case "contracts":
        return <ContractsHeaderTab />;
    }
  }

  function click(key: string) {
    setSelectTab(deriveTabKey(key));
  }

  return (
    <div className="flex flex-row gap-2">
      {Object.entries(tabs).map(([key, tab]) => (
        <div
          key={key}
          onKeyDown={() => click(key)}
          onClick={() => click(key)}
          className={cn(
            "p-2 bg-transparent rounded-md hover:cursor-pointer transition-all",
            {
              "bg-red-500": key === selectedRawKey,
            }
          )}
        >
          <div className="flex gap-1">
            {render(tab)}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTab(key);
              }}
              type="button"
            >
              <IconDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
