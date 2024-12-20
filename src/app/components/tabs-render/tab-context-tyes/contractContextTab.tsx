import type { Address, Coins, ContractInfo } from "@left-curve/react/types";
import TextWithDesc from "../../textDesc";
import { useConfig } from "@left-curve/react";
import { devnet } from "@left-curve/react/chains";
import CoinRender from "../../coin";
import AddrRender from "../../addr";
import { useTab } from "@/app/contexts/tabProvider";

export interface ProposalsTabProps {
  address: Address;
  contractInfo: ContractInfo;
  balances?: Coins;
  queries: string[];
}

export default function ContractsContextTab(props: ProposalsTabProps) {
  const { addTab } = useTab();

  function addQuery(query: string) {
    const id = crypto.randomUUID();

    addTab({
      key: { kind: "query", id },
      value: {
        kind: "query",
        contract: props.address,
        query: `{"${query}":{}}`,
      },
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <TextWithDesc name="Address">
        <AddrRender search={false} addr={props.address} />
      </TextWithDesc>
      <TextWithDesc name="Label" value={props.contractInfo.label} />
      {props.contractInfo.admin && (
        <TextWithDesc name="Admin">
          <AddrRender addr={props.contractInfo.admin} />
        </TextWithDesc>
      )}
      <TextWithDesc name="Code Hash" value={props.contractInfo.codeHash} />
      <div className="flex flex-col gap-2">
        {Object.entries(props.balances ?? {}).length !== 0 && (
          <p className="p-title">Balances</p>
        )}
        {Object.entries(props.balances || {}).map(([key, value]) => {
          return <CoinRender key={key} denom={key} amount={value} />;
        })}
      </div>
      <div className="flex flex-col gap-2">
        <p className="p-title">Queries</p>
        <div className="flex gap-2">
          {props.queries?.map((query) => {
            return (
              <button
                type="button"
                className="border-[2px] border-violet-400 p-2 rounded-xl hover:border-violet-300 transition-all shadow-md"
                key={query}
                onClick={() => addQuery(query)}
              >
                <p className="first-letter:uppercase">{query}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
