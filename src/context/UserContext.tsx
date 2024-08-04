"use client";

import {
  PropsWithChildren,
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
} from "react";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

interface UserContextProviderProps extends PropsWithChildren {
  userData: User | null;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
  userData,
}) => {
  const [user, setUser] = useState<User | null>(userData);

  useEffect(() => {
    if (!userData) return;
    setUser(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
