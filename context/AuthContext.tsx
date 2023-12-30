"use client";

import React, { FC, ReactNode } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "@/utils/firebaseConfig";
import Spinner from "@/components/Spinner";

interface AuthContextProps {
  user: any;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const auth = getAuth(app);

const initialValues = {
  user: {},
};

export const AuthContext = React.createContext<AuthContextProps>(initialValues);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};
