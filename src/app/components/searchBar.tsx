import { useState } from "react";
import { useSelectedContract } from "../contexts/selectedContract";
import { useTab } from "../contexts/tabProvider";
import { usePublicClient } from "@left-curve/react";
import type { Address } from "@left-curve/react/types";

export default function SearchBar() {
  const { addTab } = useTab();
  const client = usePublicClient();

  const [inputValue, setInputValue] = useState("");

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async function handleKeyDown(event: any) {
    if (event.key !== "Enter") {
      return;
    }

    setInputValue("");

    const input = event.target.value as string;

    if (input.startsWith("0x")) {
      const address = input as Address;
      const p1 = client.getBalances({ address });
      const p2 = client.getContractInfo({ address });
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

      Promise.all([p1, p2]).then(([balances, contractInfo]) => {
        addTab({
          key: { kind: "contract", address },
          value: { kind: "contract", address, contractInfo, balances },
        });
      });
    } else {
    }
  }

  return (
    <div className="">
      <input
        className="w-full"
        type="text"
        placeholder="Search contract | username"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
