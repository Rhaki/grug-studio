import {
  convertTabKey,
  deriveTabKey,
  type TabValue,
  useTab,
} from "@/app/contexts/tabProvider";
import ContractsHeaderTab from "./tab-header-types/contractsHeaderTab";
import ContractHeaderTab from "./tab-header-types/contractHeaderTab";

export default function TabHeaders() {
  const { tabs, setSelectTab, selectedTab } = useTab();

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
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          key={key}
          onClick={() => click(key)}
          className="p-2 rounded-md hover:cursor-pointer"
          style={{
            backgroundColor: key === selectedRawKey ? "red" : "transparent",
          }}
        >
          {render(tab)}
        </div>
      ))}
    </div>
  );
}
