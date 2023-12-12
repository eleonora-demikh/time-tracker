import React, { useState } from "react";
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

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
