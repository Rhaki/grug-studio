import { useState } from "react";
import { IconEdit } from "../icons/IconEdit";
import LeftMenuItem from "./item";
import { IconContract } from "../icons/IconContract";
import { useTab } from "@/app/contexts/tabProvider";
import { usePublicClient } from "@left-curve/react";
import { IconInfo } from "../icons/IconInfo";
import { toastLoad } from "@/app/utils";

export default function LeftMenu() {
  const [expanded, setExpanded] = useState(false);
  const { addTab } = useTab();
  const client = usePublicClient();

  async function contracts() {
    const contracts = await toastLoad(async () => {
      return await client.getContractsInfo();
    });

    addTab({
      key: { kind: "contracts" },
      value: { kind: "contracts", contracts },
    });
  }

  async function chainInfo() {
    const chainInfo = await client.getChainInfo();

    addTab({
      key: { kind: "chainInfo" },
      value: { kind: "chainInfo", chainInfo },
    });
  }

  async function appConfig() {
    const result = await client.getAppConfig();

    console.log(result);
  }

  return (
    <div className="flex flex-col p-3 gap-3 bg-gray-600 shadow-md shadow-stone-900">
      <LeftMenuItem tooltip="Contracts" onClick={contracts}>
        <IconContract />
      </LeftMenuItem>
      <LeftMenuItem tooltip="Chain Info" onClick={chainInfo}>
        <IconInfo />
      </LeftMenuItem>
      {/* <LeftMenuItem tooltip="Chain config" onClick={appConfig}>
        <IconInfo />
      </LeftMenuItem> */}
    </div>
  );
}
