/* eslint-disable react-hooks/exhaustive-deps */
"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PrimaryButton } from "@/components/Button";
import { usePageNotificationProvider } from "@/providers/notificationProvider";
import { useUserContext } from "@/context/UserContext";

function Page() {
  const { userSession } = useAuthContext();
  const { user } = useUserContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { initNotification } = usePageNotificationProvider();

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company name is required"),
    numUsers: Yup.number()
      .min(0, "Number of users must be a positive number")
      .required("Number of users is required"),
    numProducts: Yup.number()
      .min(0, "Number of products must be a positive number")
      .required("Number of products is required"),
  });

  const {
    handleChange,
    handleBlur,
    values,
    setValues,
    errors,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: {
      companyName: "",
      numUsers: 0,
      numProducts: 0,
      percentage: 0,
    },
    validationSchema: validationSchema,
    onSubmit: () => handleSaveCompany(),
  });

  useEffect(() => {
    const handlePercentageCalculation = () => {
      const { numUsers, numProducts } = values;
      const calculatedPercentage = (numUsers / numProducts) * 100;
      if (calculatedPercentage)
        setValues((prev) => {
          return { ...prev, percentage: calculatedPercentage };
        });
    };

    handlePercentageCalculation();
  }, [values.numUsers, values.numProducts]);

  async function handleSaveCompany() {
    setLoading(true);

    const res = await fetch("/api/company/addCompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSession}`,
      },
      body: JSON.stringify({
        ...values,
        userId: user?.id,
        // userId: 1,
        // userimage: session?.user?.image,
        // comments: [],
      }),
    });

    const data = await res.json();
    setLoading(false);
    if (data.success) {
      router.push("/success");
      setTimeout(() => {
        setValues({
          companyName: "",
          numUsers: 0,
          numProducts: 0,
          percentage: 0,
        });
      }, 2000);
      return;
    }

    initNotification({
      message: data.message,
      scheme: "error",
    });
  }

  React.useEffect(() => {
    if (userSession === "") router.push("/");
  }, [userSession]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-[500px] w-[95%] mx-auto p-4 bg-white rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6">Create Company</h1>
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-sm font-bold mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.companyName}
          />
          {touched.companyName && errors.companyName ? (
            <div className="text-red-500 text-xs mt-1">
              {errors.companyName}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="numUsers" className="block text-sm font-bold mb-2">
            Number of Users
          </label>
          <input
            type="number"
            id="numUsers"
            name="numUsers"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.numUsers}
          />
          {touched.numUsers && errors.numUsers ? (
            <div className="text-red-500 text-xs mt-1">{errors.numUsers}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="numProducts" className="block text-sm font-bold mb-2">
            Number of Products
          </label>
          <input
            type="number"
            id="numProducts"
            name="numProducts"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.numProducts}
          />
          {touched.numProducts && errors.numProducts ? (
            <div className="text-red-500 text-xs mt-1">
              {errors.numProducts}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="percentage" className="block text-sm font-bold mb-2">
            Percentage
          </label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.percentage}
            readOnly={true}
          />
          {touched.percentage && errors.percentage ? (
            <div className="text-red-500 text-xs mt-1">{errors.percentage}</div>
          ) : null}
        </div>
        {/* <div className="mb-4">
          <button
            type="button"
            onClick={handlePercentageCalculation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Calculate Percentage
          </button>
          <p className="text-sm mt-2">Percentage: {percentage}%</p>
        </div> */}
        <div>
          <PrimaryButton
            isLoading={loading}
            value="Submit"
            type="submit"
            className="primary-btn mt-3"
          />
        </div>
      </form>
    </div>
  );
}

export default Page;
