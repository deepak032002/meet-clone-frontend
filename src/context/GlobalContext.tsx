"use client";

import {
  PropsWithChildren,
  createContext,
  FC,
  useContext,
  useState,
} from "react";

type AnyObject = Record<string, any>;
interface GlobalContextProps {
  data: AnyObject;
  setData: React.Dispatch<React.SetStateAction<AnyObject>>;
}

const GlobalContext = createContext<GlobalContextProps>(
  {} as GlobalContextProps
);

export const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<AnyObject>({});

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
