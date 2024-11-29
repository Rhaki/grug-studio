import type { Address } from "@left-curve/react/types";

export function reduceAddress(address: Address, char = 4): string {
  return `${address.substring(0, char + 2)}...${address.substring(
    address.length - char
  )}`;
}
