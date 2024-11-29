import { useTab } from "@/app/contexts/tabProvider";
import ContractsContextTab from "./tab-context-tyes/contractsContextTab";
import ContractContextTab from "./tab-context-tyes/contractContextTab";

export default function SelectedTab() {
  function render() {
    const selectedTab = useTab().selectedTab();

    if (!selectedTab) {
      return <div />;
    }

    const value = selectedTab[1];

    switch (value.kind) {
      case "contract":
        return (
          <ContractContextTab
            contractInfo={value.contractInfo}
            address={value.address}
            balances={value.balances}
          />
        );
      case "contracts":
        return <ContractsContextTab contracts={value.contracts} />;
    }
  }

  return <div>{render()}</div>;
}
