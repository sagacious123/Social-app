"use client";

import React, { FC, ReactNode } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "@/utils/firebaseConfig";
import Spinner from "@/components/Spinner";
import { usePageNotificationProvider } from "@/providers/notificationProvider";
import { useParams } from "next/navigation";

interface CompanyContextProps {
  company: any;
  setCompany: any;
  allCompanies: any;
  setAllCompanies: any;
}

interface CompanyContextProviderProps {
  children: ReactNode;
}

const initialValues = {
  company: {},
  setCompany: () => {},
  allCompanies: {},
  setAllCompanies: () => {},
};

export const CompanyContext =
  React.createContext<CompanyContextProps>(initialValues);

export const useCompanyContext = () => React.useContext(CompanyContext);

export const CompanyContextProvider: FC<CompanyContextProviderProps> = ({
  children,
}) => {
  const { id } = useParams();
  const [user, setUser] = React.useState<any>(
    JSON.parse(localStorage.getItem("user")!) || {}
  );
  const [company, setCompany] = React.useState<any>({});
  const [allCompanies, setAllCompanies] = React.useState([]);
  const [token, setToken] = React.useState<any>(
    localStorage.getItem("access_token") || ""
  );
  const [loading, setLoading] = React.useState(false);
  const { initNotification } = usePageNotificationProvider();

  React.useEffect(() => {
    async function handleGetCompany(id: any) {
      setLoading(true);
      const res = await fetch(`/api/company/getSingleCompany?companyID=${id}`, {
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
      setCompany(data.data);
    }
    // if (id) {
    //   handleGetCompany(id);
    // }
  }, [token, id]);

  React.useEffect(() => {
    async function handleGetCompanies() {
      const res = await fetch("/api/company/getAllCompanies", {
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
      setAllCompanies(data.data);
    }

    if (user.role === "admin") {
      handleGetCompanies();
    }
  }, [token, user.role]);

  return (
    <CompanyContext.Provider
      value={{ company, setCompany, allCompanies, setAllCompanies }}
    >
      {loading ? <Spinner /> : children}
    </CompanyContext.Provider>
  );
};
