import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  username: string;
  balance: number;
  setUsername: (name: string) => void;
  setBalance: (balance: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);

  return (
    <UserContext.Provider value={{ username, balance, setUsername, setBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
