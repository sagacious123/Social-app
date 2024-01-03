"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useCompanyContext } from "@/context/CompanyContext";
import { useUserContext } from "@/context/UserContext";
import React from "react";

interface Company {
  _id: string;
  name: string;
  numUsers: number;
  numProducts: number;
  percentage: number;
}

const CompareCompanies = () => {
  //   const { userSession } = useAuthContext();
  const { allCompanies } = useCompanyContext();

  const companies = allCompanies.filter(
    (company: { user: { role: string } }) => company.user.role === "user"
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Compare Companies</h1>
      <div className="flex justify-between">
        <div className="w-1/2 p-4 border border-gray-200 rounded">
          <h2 className="text-lg font-bold mb-2">{companies[0]?.name}</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2">Company name:</td>
                <td className="py-2">{companies[0]?.companyName}</td>
              </tr>
              <tr>
                <td className="py-2">Number of Users:</td>
                <td className="py-2">{companies[0]?.numUsers}</td>
              </tr>
              <tr>
                <td className="py-2">Number of Products:</td>
                <td className="py-2">{companies[0]?.numProducts}</td>
              </tr>
              <tr>
                <td className="py-2">Percentage:</td>
                <td className="py-2">{companies[0]?.percentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/2 p-4 border border-gray-200 rounded">
          <h2 className="text-lg font-bold mb-2">{companies[1]?.name}</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2">Company name:</td>
                <td className="py-2">{companies[1]?.companyName}</td>
              </tr>
              <tr>
                <td className="py-2">Number of Users:</td>
                <td className="py-2">{companies[1]?.numUsers}</td>
              </tr>
              <tr>
                <td className="py-2">Number of Products:</td>
                <td className="py-2">{companies[1]?.numProducts}</td>
              </tr>
              <tr>
                <td className="py-2">Percentage:</td>
                <td className="py-2">{companies[1]?.percentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareCompanies;
