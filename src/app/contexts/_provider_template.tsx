import { createContext, useContext, type ReactNode } from "react";

type ContextState = {
  addError: (error: string) => void;
};

const ErrorContext = createContext<ContextState | null>(null);

interface TabProviderProps {
  children: ReactNode;
}

export function ErrorProvider({ children }: TabProviderProps) {
  const addError = (error: string) => {};

  return (
    <ErrorContext.Provider
      value={{
        addError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
}
