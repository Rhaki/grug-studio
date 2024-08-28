import { useState } from "react";
import { useSelectedContract } from "../contexts/selectedContract";

export default function SearchContract() {
  const { searchContract } = useSelectedContract();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  async function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      // Qui esegui l'azione desiderata quando viene premuto "Invio"
      await searchContract(inputValue);
    }
  }

  return (
    <div className="mt-3 ml-10 mr-10">
      <input
        className="w-full"
        type="text"
        placeholder="Search contract"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
