import type { Address, Coins, ContractInfo } from "@left-curve/react/types";
import TextWithDesc from "../../TextWithDesc";

export interface ProposalsTabProps {
  address: Address;
  contractInfo: ContractInfo;
  balances?: Coins;
}

export default function ContractsContextTab(props: ProposalsTabProps) {
  return (
    <div className="flex flex-col gap-2">
      <TextWithDesc name="Address" value={props.address} />
      <TextWithDesc name="Label" value={props.contractInfo.label} />
      <TextWithDesc name="Admin" value={props.contractInfo.admin} />
      <TextWithDesc name="Code Hash" value={props.contractInfo.codeHash} />
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
