import { useTab } from "@/app/contexts/tabProvider";
import ContractsContextTab from "./tab-context-tyes/contractsContextTab";
import ContractContextTab from "./tab-context-tyes/contractContextTab";
import ChainInfoContextTab from "./tab-context-tyes/chainInfoContextTab";
import QueryContextTab from "./tab-context-tyes/queryContextTab";

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
            queries={value.queries}
          />
        );
      case "contracts":
        return <ContractsContextTab contracts={value.contracts} />;

      case "chainInfo":
        return <ChainInfoContextTab info={value.chainInfo} />;
      case "query":
        return (
          <QueryContextTab contract={value.contract} query={value.query} />
        );
    }
  }

  return render();
}
