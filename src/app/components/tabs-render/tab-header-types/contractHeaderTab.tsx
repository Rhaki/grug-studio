import { reduceAddress } from "@/app/utils";
import type { Address } from "@left-curve/react/types";

interface Props {
  contract: Address;
}

export default function ContractsHeaderTab(props: Props) {
  return <div>{ reduceAddress(props.contract)}</div>;
}
