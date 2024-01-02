"use client";

import { PrimaryButton } from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Success: React.FC = () => {
  const router = useRouter();
  const handleNavigateHome = () => {
    router.push("/"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md flex items-center flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4">
          Company Created Successfully!
        </h1>
        <p className="text-gray-700">
          Your company has been created. Congratulations!
        </p>
        <PrimaryButton
          value="Go home"
          onClick={handleNavigateHome}
          className="primary-btn btn-md mt-4"
        />
      </div>
    </div>
  );
};

export default Success;
