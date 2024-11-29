import { useState } from "react";
import { IconEdit } from "../icons/IconEdit";
import LeftMenuItem from "./item";
import { IconContract } from "../icons/IconContract";
import { useTab } from "@/app/contexts/tabProvider";
import { usePublicClient } from "@left-curve/react";

export default function LeftMenu() {
  const [expanded, setExpanded] = useState(false);
  const { addTab } = useTab();
  const client = usePublicClient();

  async function contracts() {
    client.getContractsInfo().then((contracts) => {
      addTab({
        key: { kind: "contracts" },
        value: { kind: "contracts", contracts },
      });
    });
  }

  return (
    <div className="flex flex-col p-2 bg-gray-900 gap-2">
      <LeftMenuItem tooltip="Contracts" onClick={contracts}>
        <IconContract />
      </LeftMenuItem>
    </div>
  );
}
