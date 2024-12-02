import type { GetPublicClientReturnType } from "@left-curve/react";
import type { Address } from "@left-curve/react/types";
import { wait } from "@left-curve/utils";
import clsx, { type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function reduceAddress(address: Address, char = 4): string {
  return `${address.substring(0, char + 2)}...${address.substring(
    address.length - char
  )}`;
}

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export async function toastLoad<T>(
  callback: () => Promise<T> | T,
  options: { message?: string; delay?: number } = {}
) {
  const { message = "Loading...", delay = 0 } = options;

  const currentTimestamp = +new Date();

  const toastId = toast.loading(message);

  const ret = await callback();

  const diff = +new Date() - currentTimestamp;
  if (diff < delay) await wait(delay - diff);

  toast.remove(toastId);
  return ret;
}

export async function getContractData(client: GetPublicClientReturnType, address: Address) {

  client
    .queryWasmSmart({
      contract: address,
      msg: { for_sure_not_a_query_variant: {} },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

  const [balance, info] = await Promise.all([
    client.getBalances({ address }),
    client.getContractInfo({ address }),
  ]);

  return { balance, info };
}
