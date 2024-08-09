import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as signOutUser, User} from 'firebase/auth';

type AuthContextProps = {
  user: User | null, 
  signUp: (email: string, password: string) => Promise<void>,
  signIn: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>
};

type AuthProviderProps = {
  children: React.ReactNode
};

const AuthContext = createContext<AuthContextProps>(
  {
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    signOut: async () => {},
  }
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);


  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await signOutUser(auth);
  };

  const value: AuthContextProps = {
    user,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};