import { Dispatch, createContext, useContext, useState } from "react";

interface providerProps {
  children: JSX.Element;
}

type atAddContext = {
  atAdd: boolean;
  setAtAdd: Dispatch<React.SetStateAction<boolean>>;
};

const Context = createContext<atAddContext>(null!);

export const AtAddProvider = ({ children }: providerProps) => {
  const [atAdd, setAtAdd] = useState<boolean>(false);

  return (
    <Context.Provider value={{ atAdd, setAtAdd }}>{children}</Context.Provider>
  );
};

export const useAtAdd = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("hook used outside of its provider");
  }

  return context;
};
