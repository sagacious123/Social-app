// import { PrimaryButton } from "@/app/components/Button";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">

//     </main>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "../components/Button";
import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";

const Home = () => {
  const { userSession } = useAuthContext();
  const { user } = useUserContext();
  const router = useRouter();

  const session = userSession ?? window.localStorage.getItem("access_token");

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  const handleNavigateToCompanyForm = () => {
    router.push(`/user/${user?.email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Social App</h1>
        {session ? (
          <>
            <p className="text-lg mb-8">Want to create another company?</p>
            <PrimaryButton
              value="Create Company"
              onClick={handleNavigateToCompanyForm}
              className="primary-btn btn-lg"
            />
          </>
        ) : (
          <>
            <p className="text-lg mb-8">Please login to continue.</p>
            <PrimaryButton
              value="Login"
              onClick={handleNavigateToLogin}
              className="primary-btn btn-lg"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
