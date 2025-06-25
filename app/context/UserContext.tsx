'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  previousNames: string[];
  undoNameChange: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('Guest');
  const [previousNames, setPreviousNames] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Handle initial client-side hydration
  useEffect(() => {
    setIsClient(true);
    const savedName = localStorage.getItem('userName');
    const savedPreviousNames = localStorage.getItem('previousNames');
    
    if (savedName) {
      setUserName(savedName);
    }
    if (savedPreviousNames) {
      setPreviousNames(JSON.parse(savedPreviousNames));
    }
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('userName', userName);
      localStorage.setItem('previousNames', JSON.stringify(previousNames));
    }
  }, [userName, previousNames, isClient]);

  const handleSetUserName = (newName: string) => {
    setPreviousNames(prev => [...prev, userName]);
    setUserName(newName);
  };

  const undoNameChange = () => {
    if (previousNames.length > 0) {
      const previousName = previousNames[previousNames.length - 1];
      setPreviousNames(prev => prev.slice(0, -1));
      setUserName(previousName);
    }
  };

  return (
    <UserContext.Provider value={{ 
      userName, 
      setUserName: handleSetUserName,
      previousNames,
      undoNameChange
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 