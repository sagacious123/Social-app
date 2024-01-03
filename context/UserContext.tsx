/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "@/utils/firebaseConfig";
import Spinner from "@/components/Spinner";
import { usePageNotificationProvider } from "@/providers/notificationProvider";
import { useParams } from "next/navigation";
import { User } from "@/utils/types";

interface UserContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  allUsers: User[];
  setAllUsers: Dispatch<SetStateAction<never[]>>;
  handleGetUserById: any;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const initialValues = {
  user: {} as User,
  setUser: () => {},
  allUsers: {} as User[],
  setAllUsers: () => {},
  handleGetUserById: () => {},
};

export const UserContext = React.createContext<UserContextProps>(initialValues);

export const useUserContext = () => React.useContext(UserContext);

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User>(
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("user")!)) ||
      {}
  );
  const [allUsers, setAllUsers] = React.useState([]);
  const [token, setToken] = React.useState<string>(
    (typeof window !== "undefined" && localStorage.getItem("access_token")) ||
      ""
  );
  const [loading, setLoading] = React.useState(false);
  const { initNotification } = usePageNotificationProvider();

  React.useEffect(() => {
    async function handleGetUserByEmail(email: string) {
      setLoading(true);
      const res = await fetch(`/api/user/getUserByEmail/?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        initNotification({
          message: data.message,
          scheme: "error",
        });
        return;
      }
      setUser(data.data);
    }
    if (user?.email) {
      handleGetUserByEmail(user?.email);
    }
  }, [token, user?.email]);

  //   React.useEffect(() => {
  async function handleGetUserById(id: string) {
    setLoading(true);
    const res = await fetch(`/api/user/getUserById/?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setLoading(false);
    if (!data.success) {
      initNotification({
        message: data.message,
        scheme: "error",
      });
      return;
    }
    return data.data;
  }
  // if (user?.email) {
  //   handleGetUserById(user?.email);
  // }
  //   }, [token, user?.email]);

  React.useEffect(() => {
    async function handleGetUsers() {
      setLoading(true);
      const res = await fetch("/api/user/getAllUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        initNotification({
          message: data.message,
          scheme: "error",
        });
        return;
      }
      setAllUsers(data.data);
    }

    if (user.role === "admin") {
      handleGetUsers();
    }
  }, [token, user.role]);

  return (
    <UserContext.Provider
      value={{ user, setUser, allUsers, setAllUsers, handleGetUserById }}
    >
      {loading ? <Spinner /> : children}
    </UserContext.Provider>
  );
};
