import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import authTokenStorage from '@/storage/authTokenStorage';

interface User {
  userId: string;
  email: string;
  // Add other user properties as needed
}

interface UserContextType {
  user: User | null;
  setUser: (token: string | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const token = authTokenStorage.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserState({
          userId: decodedToken.id,
          email: decodedToken.email,
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
        authTokenStorage.removeToken();
      }
    }
  }, []);

  const setUser = (token: string | null) => {
    if (token) {
      authTokenStorage.setToken(token);
      try {
        const decodedToken: any = jwtDecode(token);
        setUserState({
          userId: decodedToken.id,
          email: decodedToken.email,
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
        authTokenStorage.removeToken();
        setUserState(null);
      }
    } else {
      authTokenStorage.removeToken();
      setUserState(null);
    }
  };

  const clearUser = () => {
    authTokenStorage.removeToken();
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
