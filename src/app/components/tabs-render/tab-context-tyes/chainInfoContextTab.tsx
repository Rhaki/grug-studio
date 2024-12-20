import type { ChainInfoResponse } from "@left-curve/react/types";
import TextWithDesc from "../../textDesc";
import { usePublicClient } from "@left-curve/react";
import { useEffect } from "react";
import { useTab } from "@/app/contexts/tabProvider";
import AddrRender from "../../addr";

export default function ChainInfoContextTab(props: {
  info: ChainInfoResponse;
}) {
  // const client = usePublicClient();

  // const { addTab } = useTab();

  // useEffect(() => {
  //   (async () => {
  //     await sleep(1000);
  //     const a = await client.getChainInfo();

  //     addTab({
  //       key: { kind: "chainInfo" },
  //       value: { kind: "chainInfo", chainInfo: a },
  //     });
  //   })();
  // }, [client]);

  return (
    <div className="flex-1 flex gap-3">
      <div className="flex flex-col gap-2">
        <TextWithDesc name="Chains-id">{props.info.chainId}</TextWithDesc>
        <TextWithDesc name="Height">
          <p>{props.info.lastFinalizedBlock.height}</p>
        </TextWithDesc>
        <TextWithDesc name="Timestamp">
          {props.info.lastFinalizedBlock.timestamp}
        </TextWithDesc>
        <TextWithDesc name="Hash" value={props.info.lastFinalizedBlock.hash} />
      </div>
      <div className="flex flex-col gap-2">
        <TextWithDesc name="Bank">
          <AddrRender addr={props.info.config.bank} />
        </TextWithDesc>
        <TextWithDesc name="Owner">
          <AddrRender addr={props.info.config.owner} />
        </TextWithDesc>
        <TextWithDesc name="Taxman">
          <AddrRender addr={props.info.config.taxman} />
        </TextWithDesc>
   
      </div>
    </div>
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
