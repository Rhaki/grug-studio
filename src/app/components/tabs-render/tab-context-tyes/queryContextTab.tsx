import { usePublicClient } from "@left-curve/react";
import type { Address, Json, JsonValue } from "@left-curve/react/types";
import AceCustom from "../../jsonEditor";
import { useState } from "react";
import TextWithDesc from "../../textDesc";
import { toastLoad } from "@/app/utils";

export interface ProposalsTabProps {
  contract: Address;
  query: string;
}

export default function ContractsContextTab(props: ProposalsTabProps) {
  const client = usePublicClient();

  const [result, setResult] = useState<JsonValue>(undefined);

  async function performQuery() {
    const res = await toastLoad(async () =>
      client.queryWasmSmart({
        contract: props.contract,
        msg: JSON.parse(props.query),
      })
    );

    // const res = await client.queryWasmSmart({
    //   contract: props.contract,
    //   msg: JSON.parse(props.query),
    // });

    setResult(res);
  }

  return (
    <div className="flex flex-col h-full gap-2">
      <TextWithDesc name="Contract" value={props.contract} />
      <div className="flex  gap-2 flex-1 items-center">
        <div className="flex flex-col gap-2 flex-1 h-full">
          <p className="p-title">Request</p>
          <AceCustom
            className="flex-1 w-full"
            value={JSON.stringify(JSON.parse(props.query), undefined, 2)}
            onChange={() => {}}
          />
        </div>
        <button className="button" onClick={performQuery} type="button">
          Run
        </button>
        <div className="flex flex-col gap-2 flex-1 h-full shadow-md">
          <p className="p-title">Response</p>
          <AceCustom
            className="flex-1 w-full"
            readonly={true}
            value={JSON.stringify(result, undefined, 2)}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
