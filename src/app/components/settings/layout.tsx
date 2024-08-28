import { useState } from "react";
import SettingContent from "./content";

export default function SettingMenu() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {/* Blurred background */}
      <div
        className="absolute h-full w-full backdrop-blur-[4px] transition-all bg-opacity-40"
        onClick={() => setExpanded(false)}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? "auto" : "none",
        }}
      />
      <div className="absolute flex flex-row pt-2 h-full ">
        <div
          className="bg-slate-500 rounded-e-xl transition-all overflow-hidden"
          style={{ width: expanded ? 300 : 0 }}
        >
          <SettingContent expanded={expanded} />
        </div>
        <div
          className="h-10 bg-slate-500 rounded-e-xl flex-1 transition-all"
          style={{ width: expanded ? 0 : 20 }}
          onClick={() => setExpanded(!expanded)}
        ></div>
      </div>
    </div>
  );
}
