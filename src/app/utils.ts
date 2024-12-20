import {
  usePublicClient,
  type GetPublicClientReturnType,
} from "@left-curve/react";
import type { Address } from "@left-curve/react/types";
import { wait } from "@left-curve/utils";
import clsx, { type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useTab } from "./contexts/tabProvider";

export function reduceString(address: string, char = 4, prechar = 2): string {
  return `${address.substring(0, char + prechar)}...${address.substring(
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

export async function getContractData(
  client: GetPublicClientReturnType,
  address: Address
) {
  const queries = await client
    .queryWasmSmart({
      contract: address,
      msg: { for_sure_not_a_query_variant: {} },
    })
    .catch((e) => {
      const error = e.message as string;
      const index = error.search("`for_sure_not_a_query_variant`");

      let next = error.substring(
        index + "`for_sure_not_a_query_variant`".length
      );

      const queries = [];

      while (true) {
        const preIndex = next.search("`");
        if (preIndex === -1) {
          break;
        }
        next = next.substring(preIndex + 1);
        const postIndex = next.search("`");
        const queryVariant = next.slice(0, postIndex);
        next = next.substring(postIndex + 1);
        queries.push(queryVariant);
      }

      return queries;
    });

  const [balance, info] = await Promise.all([
    client.getBalances({ address }),
    client.getContractInfo({ address }),
  ]);

  return { balance, info, queries: queries as string[] };
}
