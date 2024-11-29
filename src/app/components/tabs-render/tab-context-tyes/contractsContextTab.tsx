import type { Address, ContractInfo } from "@left-curve/react/types";

export interface ProposalsTabProps {
  contracts: Record<Address, ContractInfo>;
}

export default function ContractsContextTab(props: ProposalsTabProps) {
  console.log(props.contracts);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-left">
          <th className="px-4 py-2">Address</th>
          <th className="px-4 py-2">Label</th>
          <th className="px-4 py-2">Code Hash</th>
          <th className="px-4 py-2 w-full">Admin</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(props.contracts).map(([address, contractInfo]) => (
          <tr key={address}>
            <td className="px-4 py-2">{address}</td>
            <td className="px-4 py-2">{contractInfo.label}</td>
            <td className="px-4 py-2">{contractInfo.codeHash}</td>
            <td className="px-4 py-2">{contractInfo.admin}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
