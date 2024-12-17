import { reduceString } from "@/app/utils";
import type { Address } from "@left-curve/react/types";

interface Props {
  contract: Address;
  label: string | undefined;
}

export default function ContractsHeaderTab(props: Props) {
  return (
    <div>
      {reduceString(props.contract)}
      <p className="p-desc">{props.label} </p>
    </div>
  );
}
