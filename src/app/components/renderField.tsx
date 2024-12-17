import { reduceString } from "../utils";

export default function RenderField({
  copy = false,
  value,
  short = 0,
  isAddress = false,
}: {
  copy: boolean;
  value: string;
  short: number;
  isAddress: boolean;
}) {
  return (
    <div>
      <p>
        {short === 0
          ? value
          : reduceString(value, short, isAddress === true ? 2 : 0)}
      </p>
      {copy && (
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(value);
          }}
        >
          Copy
        </button>
      )}
    </div>
  );
}
