"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { roles } from "@/utils/auth/login";
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return user.email === roles.admin ? (
    <h1>Only user C can view this page</h1>
  ) : (
    router.push(`/user/${user.email}`)
  );
}

export default Page;
