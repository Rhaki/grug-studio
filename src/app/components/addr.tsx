import { IconCopy, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useSearchContract } from "../contexts/searchContractProvider";
import type { Address } from "@left-curve/react/types";
import toast from "react-hot-toast";

interface Props {
  addr: string | Address;
  search?: boolean;
}

export default function AddrRender({ addr, search = true }: Props) {
  const [isHover, setIsHover] = useState(false);
  const { searchContract } = useSearchContract();

  async function copyToClipboard() {
    await navigator.clipboard.writeText(addr);
    toast.success("Copied to clipboard");
  }

  return (
    <div
      className="relative max-w-fit"
      onMouseEnter={() => !isHover && setIsHover(true)}
      onMouseLeave={() => isHover && setIsHover(false)}
    >
      <p className="font-mono addr">{addr}</p>
      {isHover && (
        <div className="absolute top-[50%] right-0 translate-x-[100%] translate-y-[-50%]">
          <div className="ml-1 pl-2 slide-in-right-20 flex flex-row gap-2 bg-stone-900 p-1 shadow-md rounded-r-md arrow">
            {search && (
              <IconSearch
                className="hover:cursor-pointer transition-all hover:text-green-300"
                onClick={() => searchContract(addr)}
              />
            )}
            <IconCopy
              className="hover:cursor-pointer transition-all hover:text-green-300"
              onClick={copyToClipboard}
            />
          </div>
        </div>
      )}
    </div>
  );
}
