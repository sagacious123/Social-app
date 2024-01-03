/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import Spinner from "@/components/Spinner";
import { usePageNotificationProvider } from "@/providers/notificationProvider";
import { useParams } from "next/navigation";
import { Company, CompanyWithUser, User } from "@/utils/types";

interface CompanyContextProps {
  company: Company | null;
  setCompany: Dispatch<Company>;
  allCompanies: CompanyWithUser[];
  setAllCompanies: Dispatch<SetStateAction<never[]>>;
}

interface CompanyContextProviderProps {
  children: ReactNode;
}

const initialValues = {
  company: {} as Company,
  setCompany: () => {},
  allCompanies: [] as CompanyWithUser[],
  setAllCompanies: () => {},
};

export const CompanyContext =
  React.createContext<CompanyContextProps>(initialValues);

export const useCompanyContext = () => React.useContext(CompanyContext);

export const CompanyContextProvider: FC<CompanyContextProviderProps> = ({
  children,
}) => {
  const { id } = useParams();
  const [user, setUser] = React.useState<User>(
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("user")!)) ||
      {}
  );
  const [company, setCompany] = React.useState<Company>({} as Company);
  const [allCompanies, setAllCompanies] = React.useState([]);
  const [token, setToken] = React.useState<string | null>(
    (typeof window !== "undefined" && localStorage.getItem("access_token")) ||
      ""
  );
  const [loading, setLoading] = React.useState(false);
  const { initNotification } = usePageNotificationProvider();

  React.useEffect(() => {
    async function handleGetCompany(id: string) {
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
