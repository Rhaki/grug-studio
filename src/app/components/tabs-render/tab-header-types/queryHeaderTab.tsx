import { reduceString } from "@/app/utils";
import type { Address } from "@left-curve/react/types";

interface Props {
  contract: Address;
}

export default function QueryHeaderTab(props: Props) {
  return (
    <div>
      {reduceString(props.contract)}
      {/* <p className="p-desc">{props.contract} </p> */}
    </div>
  );
}
