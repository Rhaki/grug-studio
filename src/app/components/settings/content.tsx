import { useClient } from "@/app/contexts/clientProvider";
import { useEffect, useState } from "react";
import InputField from "../inputField";

interface Props {
  expanded: boolean;
}

export default function SettingContent({ expanded }: Props) {
  const { url, updateUrl } = useClient();

  const [inputValue, setInputValue] = useState(url); // Stato locale per l'input

  useEffect(() => {
    setInputValue(url); // Aggiorna lo stato locale quando l'url cambia
  }, [expanded]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value); // Aggiorna lo stato locale quando l'utente digita
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      await updateUrl(inputValue); // Aggiorna l'url quando l'utente preme 'Invio'
    }
  };

  return (
    <div className="flex flex-col p-2">
      {/* <input
        type="text"
        placeholder="URL rpc"
        value={inputValue} // Utilizza lo stato locale come valore dell'input
        onChange={handleInputChange} // Gestore per il cambiamento di input
        onKeyDown={handleKeyDown} // Gestore per il rilevamento del tasto 'Invio'
      /> */}

      <InputField value={inputValue} placeholder="url Rpc"></InputField>
    </div>
  );
}
