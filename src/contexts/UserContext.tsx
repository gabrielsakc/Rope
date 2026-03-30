import { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types';

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('dogsfeels_user');
    return saved ? JSON.parse(saved) : null;
  });

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      const newUser = prev ? { ...prev, ...data } : { ...data } as UserProfile;
      localStorage.setItem('dogsfeels_user', JSON.stringify(newUser));
      return newUser;
    });
  };

  const handleSetUser = (newUser: UserProfile | null) => {
    if (newUser) {
      localStorage.setItem('dogsfeels_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('dogsfeels_user');
    }
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, updateProfile }}>
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
