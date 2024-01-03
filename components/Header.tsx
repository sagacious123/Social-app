"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { usePageNotificationProvider } from "@/providers/notificationProvider";
import { signOut } from "firebase/auth";
import { PrimaryButton } from "./Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";

const Header: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initNotification } = usePageNotificationProvider();
  const { userSession, setUserSession } = useAuthContext();
  const { user } = useUserContext();
  const [session, setSession] = useState<string | boolean | null>("");
  const router = useRouter();
  const profileImage =
    user?.userImage ?? "https://freesvg.org/img/abstract-user-flat-1.png";
  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    setSession(
      userSession ??
        (typeof window !== "undefined" && localStorage.getItem("access_token"))
    );
  }, [userSession]);

  // const session =
  //   userSession ??
  //   (typeof window !== "undefined" && localStorage.getItem("access_token"));

  async function handleLogout() {
    setLoading(true);

    setUserSession("");
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    // window.location.reload();
    setLoading(false);
  }

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Social App</h3>
        <nav>
          {session ? (
            <div className="flex items-center gap-5">
              <PrimaryButton
                value="Logout"
                onClick={handleLogout}
                className="primary-btn btn-sm"
              />
              <div className="flex items-center justify-center gap-3">
                <div className="h-14 w-14 rounded-full">
                  <Image
                    src={profileImage}
                    alt={user?.name ?? "Avatar item"}
                    className="img-fluid avatar rounded-full h-full w-full filter"
                    width={80}
                    height={80}
                    style={{
                      filter: profileImage.includes("freesvg")
                        ? "invert(0.7)"
                        : "unset",
                    }}
                  />
                </div>
                <div className="mb-0 me-3 leading-5">
                  <div className="text-gray-400 fs-[14px] fw-500">
                    {user?.name}
                  </div>
                  <small className="text-gray-500 text-capitalize fs-[14px]">
                    {user?.role}
                  </small>
                </div>
              </div>
            </div>
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
