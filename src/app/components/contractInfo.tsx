import { useSelectedContract } from "../contexts/selectedContract";

export default function ContractInfo() {
  const { selectedContract } = useSelectedContract();

  return (
    <div>
      {selectedContract ? (
        <p>{selectedContract}</p>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>Search a contract {}</p>
        </div>
      )}
    </div>
  );
}
