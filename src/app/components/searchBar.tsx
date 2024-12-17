import { useTab } from "../contexts/tabProvider";
import { usePublicClient } from "@left-curve/react";
import type { Address } from "@left-curve/react/types";
import { wait } from "@left-curve/utils";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { getContractData, toastLoad } from "../utils";

export default function SearchBar() {
  const { addTab } = useTab();
  const client = usePublicClient();

  async function submit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = formData.get("search") as string;

    if (!inputValue.startsWith("0x")) return toast.error("Not a contract");

    const address = inputValue as Address;

    const { balance, info } = await toastLoad(
      async () => getContractData(client, address),
      {
        message: "Searching...",
        delay: 0,
      }
    );

    addTab({
      key: { kind: "contract", address },
      value: {
        kind: "contract",
        address,
        contractInfo: info,
        balances: balance,
      },
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-row">
      <input
        name="search"
        className="w-full"
        type="text"
        placeholder="Search contract | username"
      />
    </form>
  );
}
