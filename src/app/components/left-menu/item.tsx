import { ReactNode, useState } from "react";

import "../../css/animation.css";

interface Props {
  className?: string;
  children: ReactNode;
  tooltip?: ReactNode;
}
export default function LeftMenuItem(props: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => !isHover && setIsHover(true)}
      onMouseLeave={() => isHover && setIsHover(false)}
    >
      {props.children}
      {isHover && (
        <div
          className={`absolute top-[50%] right-0 translate-x-[100%] translate-y-[-50%] ${props.className}`}
        >
          <div className="slide-in-right-20 bg-stone-900 pl-2 pr-2 p-1 ml-1 rounded-md">
            {props.tooltip}
          </div>
        </div>
      )}
    </div>
  );
}
