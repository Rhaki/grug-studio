import type { Address, Coins, ContractInfo } from "@left-curve/react/types";

export interface ProposalsTabProps {
  address: Address;
  contractInfo: ContractInfo;
  balances?: Coins;
}

export default function ContractsContextTab(props: ProposalsTabProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <p>Address</p>
        <p>{props.address}</p>
      </div>

      <div className="flex flex-col">
        <p>Label</p>
        <p>{props.contractInfo.label}</p>
      </div>

      <div className="flex flex-col">
        <p>Admin</p>
        <p>{props.contractInfo.admin}</p>
      </div>

      <div className="flex flex-col">
        <p>Code Hash</p>
        <p>{props.contractInfo.codeHash}</p>
      </div>

      <div className="flex flex-col">
        <p>Balances</p>
        {Object.entries(props.balances || {}).map(([key, value]) => (
          <div key={key} className="flex flex-row gap-2">
            <p>{key}</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
