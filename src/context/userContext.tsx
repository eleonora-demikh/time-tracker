import React, { useEffect, useState } from "react";
import { User } from '../types/User';

type Props = {
  user: User | null;
  updateUser: (a: User) => void;
};

export const UserContext = React.createContext<Props>({
  user: null,
  updateUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        const storedUser = event.newValue ? JSON.parse(event.newValue) : null;
        setUser(storedUser);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
