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

const Home = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Social App</h1>
        <p className="text-lg mb-8">Please login to continue.</p>
        <PrimaryButton
          value="Login"
          onClick={handleLogin}
          className="primary-btn btn-lg"
        />
      </div>
    </div>
  );
};

export default Home;
