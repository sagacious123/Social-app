"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { usePageNotificationProvider } from "@/providers/notificationProvider";
import { signOut } from "firebase/auth";
import { PrimaryButton } from "./Button";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initNotification } = usePageNotificationProvider();
  const { userSession, setUserSession } = useAuthContext();
  const router = useRouter();
  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  const session = userSession ?? localStorage.getItem("access_token");

  async function handleLogout() {
    setLoading(true);

    setUserSession("");
    localStorage.clear();
    // window.location.reload();
    setLoading(false);
  }

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Social App</h3>
        <nav>
          {session ? (
            <PrimaryButton
              value="Logout"
              onClick={handleLogout}
              className="primary-btn btn-sm"
            />
          ) : (
            <PrimaryButton
              value="Login"
              onClick={handleNavigateToLogin}
              className="primary-btn btn-sm"
            />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
