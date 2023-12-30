"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { PrimaryButton } from "../../components/Button";
import { usePageNotificationProvider } from "../../providers/notificationProvider";
import signIn, { roles } from "@/utils/auth/login";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { initNotification } = usePageNotificationProvider();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const { result, error } = await signIn(values.email, values.password);

      if (error) {
        setLoading(false);
        initNotification({
          message: "Invalid email or password",
          scheme: "error",
        });
        return console.log(error);
      }
      setLoading(false);
      console.log(result);
      if (result?.user.email === roles.admin) {
        router.push("/admin");
      } else {
        router.push(`/user/${result?.user.email}`);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 py-8 pt-8 max-w-[500px] w-[90%] "
      >
        <h1 className="text-3xl mb-4 text-center">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...formik.getFieldProps("email")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...formik.getFieldProps("password")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.password}
            </p>
          )}
        </div>
        <PrimaryButton
          isLoading={loading}
          value="Login"
          type="submit"
          className="primary-btn btn-lg"
        />
        {error && <p className="text-red-500 mt-2 text-xs italic">{error}</p>}
      </form>
    </div>
  );
};

export default Login;