import type { ChainInfoResponse } from "@left-curve/react/types";
import TextWithDesc from "../../TextWithDesc";

export default function ChainInfoContextTab(props: {
  info: ChainInfoResponse;
}) {
  return (
    <div className="flex-1 flex justify-center items-center gap-3">
      <div className="flex flex-col gap-2">
        <TextWithDesc name="Chains-id">{props.info.chainId}</TextWithDesc>
        <TextWithDesc name="Height">
          <p>{props.info.lastFinalizedBlock.height}</p>
        </TextWithDesc>
        <TextWithDesc name="Timestamp">
          {props.info.lastFinalizedBlock.timestamp}
        </TextWithDesc>
        {/* <TextWithDesc name="Hash" value={props.info.lastFinalizedBlock.hash} /> */}
      </div>
      <div className="flex flex-col gap-2">
        {/* <TextWithDesc name="Bank" value={props.info.config.bank} />
        <TextWithDesc name="Owner" value={props.info.config.owner} />
        <TextWithDesc name="Taxman" value={props.info.config.taxman} /> */}
      </div>
    </div>
  );
}
