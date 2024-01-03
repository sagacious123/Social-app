/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { PrimaryButton } from "@/components/Button";
import { User } from "@/utils/types";
function Admin() {
  const { userSession } = useAuthContext();
  const { user, allUsers } = useUserContext();
  const router = useRouter();

  React.useEffect(() => {
    if (userSession === "") router.push("/");
  }, [user.role, userSession]);

  // if (user.role !== "admin") {
  //   return <p>You do not have permission to view this page.</p>;
  // }

  const handleCompare = () => {
    router.push("/compare");
  };

  return (
    <div className="container mx-auto p-4 py-6">
      <div className="flex justify-between align-center mb-5">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        <PrimaryButton
          value="Compare"
          type="button"
          className="primary-btn btn-sm"
          onClick={handleCompare}
        />
      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers
            .filter((u: User) => u.role === "user")
            .map((user: User) => (
              <tr key={user.id}>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">
                  <Link
                    className="text-blue-500 hover:underline"
                    href={`/user-details/${user.id}`}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
