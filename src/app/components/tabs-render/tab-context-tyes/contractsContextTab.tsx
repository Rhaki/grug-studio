import type { Address, ContractInfo } from "@left-curve/react/types";
import AddrRender from "../../addr";

export interface ProposalsTabProps {
  contracts: Record<Address, ContractInfo>;
}

export default function ContractsContextTab(props: ProposalsTabProps) {

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-left">
          <th className="pr-2">Address</th>
          <th className="px-2">Label</th>
          <th className="px-2">Code Hash</th>
          <th className="w-full">Admin</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(props.contracts).map(([address, contractInfo]) => (
          <tr key={address} className="py-10">
            <td className="pr-2 py-1">
              <AddrRender addr={address} />
            </td>
            <td className="px-2 py-1">{contractInfo.label}</td>
            <td className="px-2 py-1">{contractInfo.codeHash}</td>
            {contractInfo.admin && (
              <td className="pr-2 py-1">
                <AddrRender addr={contractInfo.admin} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
