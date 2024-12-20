import { useConfig } from "@left-curve/react";
import { devnet } from "@left-curve/react/chains";
import type { AnyCoin } from "@left-curve/react/types";

interface CoinRenderProps {
  denom: string;
  amount: string;
}

export default function CoinRender({ denom, amount }: CoinRenderProps) {
  const config = useConfig();

  const coinInfo = config.coins[devnet.id][denom];

  const amountParsed = Number.parseInt(amount) / 10 ** coinInfo.decimals;

  return (
    <div className="flex flex-row gap-2 items-center">
      <img alt="logo" className="w-8 h-8" src={coinInfo.logoURI} />
      <p>{amountParsed}</p>
    </div>
  );
}
