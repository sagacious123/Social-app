"use client";

import React, { FC, ReactNode } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "@/utils/firebaseConfig";
import Spinner from "@/components/Spinner";
import { usePageNotificationProvider } from "@/providers/notificationProvider";

interface AuthContextProps {
  userSession: any;
  setUserSession: any;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const initialValues = {
  userSession: {},
  setUserSession: () => {},
};

export const AuthContext = React.createContext<AuthContextProps>(initialValues);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [userSession, setUserSession] = React.useState<any>(
    (typeof window !== "undefined" && localStorage.getItem("access_token")) ||
      ""
  );
  const [loading, setLoading] = React.useState(false);
  const { initNotification } = usePageNotificationProvider();

  React.useEffect(() => {
    setUserSession(
      typeof window !== "undefined" && localStorage.getItem("access_token")
    );
  }, []);

  return (
    <AuthContext.Provider value={{ userSession, setUserSession }}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};
