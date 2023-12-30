"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { roles } from "@/utils/auth/login";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PrimaryButton } from "@/components/Button";
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [percentage, setPercentage] = useState<number>(0);

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company name is required"),
    numUsers: Yup.number()
      .min(0, "Number of users must be a positive number")
      .required("Number of users is required"),
    numProducts: Yup.number()
      .min(0, "Number of products must be a positive number")
      .required("Number of products is required"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      numUsers: 0,
      numProducts: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Submit form data to the database (PostgreSQL) using API requests
      console.log("Form submitted:", values);
    },
  });

  const handlePercentageCalculation = () => {
    const { numUsers, numProducts } = formik.values;
    const calculatedPercentage = (numUsers / numProducts) * 100;
    if (calculatedPercentage) setPercentage(calculatedPercentage);
    console.log(calculatedPercentage);
  };

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return user.email === roles.userA || user.email === roles.userB ? (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[500px] w-[95%] mx-auto p-4 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-sm font-bold mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
          />
          {formik.touched.companyName && formik.errors.companyName ? (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.companyName}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.numUsers}
          />
          {formik.touched.numUsers && formik.errors.numUsers ? (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.numUsers}
            </div>
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.numProducts}
          />
          {formik.touched.numProducts && formik.errors.numProducts ? (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.numProducts}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={handlePercentageCalculation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Calculate Percentage
          </button>
          <p className="text-sm mt-2">Percentage: {percentage}%</p>
        </div>
        <div>
          <PrimaryButton
            //   isLoading={loading}
            value="Submit"
            type="submit"
            className="primary-btn"
          />
        </div>
      </form>
    </div>
  ) : (
    router.push("/admin")
  );
}

export default Page;
