import type { FormEvent } from "react";

import { useSearchContract } from "../contexts/searchContractProvider";

export default function SearchBar() {
  const { searchContract } = useSearchContract();

  async function submit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = formData.get("search") as string;

    await searchContract(inputValue);
  }

  return (
    <form onSubmit={submit} className="flex flex-row">
      <input
        name="search"
        className="w-full"
        type="text"
        placeholder="Search contract | username"
      />
    </form>
  );
}
