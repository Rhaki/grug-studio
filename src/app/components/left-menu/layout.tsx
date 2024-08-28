import { useState } from "react";
import { IconEdit } from "../icons/IconEdit";
import LeftMenuItem from "./item";
import { IconContract } from "../icons/IconContract";

export default function LeftMenu() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col p-2 bg-gray-900 gap-2">
      <LeftMenuItem tooltip="Contracts">
        <IconContract />
      </LeftMenuItem>
    </div>
  );
}
