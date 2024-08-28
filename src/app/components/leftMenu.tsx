import { useState } from "react";

export default function LeftMenu() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className="absolute h-full w-full backdrop-blur-[4px] transition-all bg-opacity-40"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Nero con opacità del 50%
          opacity: expanded ? 1 : 0, // Controllo di visibilità
        }}
      ></div>

      <div className="absolute flex flex-row pt-2 h-full">
        <div
          className="bg-slate-500 rounded-e-xl transition-all"
          style={{ width: expanded ? 300 : 0 }}
          onClick={() => setExpanded(false)}
        ></div>
        <div
          className="h-10 bg-slate-500 rounded-e-xl flex-1 transition-all"
          style={{ width: expanded ? 0 : 20 }}
          onClick={() => setExpanded(!expanded)}
        ></div>
      </div>
    </div>
  );
}
