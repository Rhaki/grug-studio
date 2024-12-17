export default function TextWithDesc({
  name,
  value,
  children,
}: {
  name: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <p className="p-desc">{name}</p>
      {value && <p>{value}</p>}
      {children}
    </div>
  );
}
