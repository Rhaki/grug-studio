import { type ReactNode, useState } from "react";

import "../../css/animation.css";

interface Props {
  className?: string;
  children: ReactNode;
  tooltip?: ReactNode;
  onClick?: () => void;
}
export default function LeftMenuItem(props: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
      className="relative hover:cursor-pointer"
      onMouseEnter={() => !isHover && setIsHover(true)}
      onMouseLeave={() => isHover && setIsHover(false)}
      onClick={props.onClick}
    >
      {props.children}
      {isHover && (
        <div
          className={`absolute top-[50%] right-0 translate-x-[100%] translate-y-[-50%] ${props.className}`}
        >
          <div className="slide-in-right-20 bg-stone-900 pl-2 pr-2 p-1 ml-1 rounded-md whitespace-nowrap">
            {props.tooltip}
          </div>
        </div>
      )}
    </div>
  );
}
