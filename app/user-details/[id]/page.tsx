"use client";

import React, { useEffect, useMemo, useState } from "react";
// import { getUserDetails } from "../../services/userService"; // Function to fetch user details from the database
import { useParams, useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { useAuthContext } from "@/context/AuthContext";
import { BsArrowLeft, BsPencil } from "react-icons/bs";
import Image from "next/image";
import { app } from "@/utils/firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { usePageNotificationProvider } from "@/providers/notificationProvider";
import Spinner from "@/components/Spinner";
import Link from "next/link";
// import UserIcon from "../../../public/user.svg";

const stroage = getStorage(app, "gs://social-app-60d6d.appspot.com");

function createUniqueFileName(fileName: string) {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);

  return `${fileName}-${timeStamp}-${randomString}`;
}

async function handleImageSaveToFireBase(file: any) {
  const extractUniqueFileName = createUniqueFileName(file?.name);
  const stroageRef = ref(stroage, `user/${extractUniqueFileName}`);
  const uploadImg = uploadBytesResumable(stroageRef, file);

  return new Promise((resolve, reject) => {
    uploadImg.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadImg.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      }
    );
  });
}

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  //   const { handleGetUserById } = useUserContext();
  const { userSession } = useAuthContext();
  const { user } = useUserContext();
  const { initNotification } = usePageNotificationProvider();
  const [viewedUser, setViewedUser] = useState<any>({});
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const profileImage =
    viewedUser.userImage ?? "https://freesvg.org/img/abstract-user-flat-1.png";

  //   const user = useMemo(() => {
  //     return handleGetUserById(id);
  //   }, []);

  async function handleBlogImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!event.target.files) return;
    setImageLoading(true);
    const saveImageToFirebase: any = await handleImageSaveToFireBase(
      event.target.files[0]
    );

    if (saveImageToFirebase !== "") {
      setImageLoading(false);
      handleSaveCompany({
        name: viewedUser.name,
        email: viewedUser.email,
        userImage: saveImageToFirebase,
      });
    }
  }

  async function handleSaveCompany(payload: {
    name?: any;
    email?: any;
    userImage?: any;
    success?: any;
    message?: any;
  }) {
    setLoading(true);

    const res = await fetch(`/api/user/updateUser?id=${viewedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSession}`,
      },
      body: JSON.stringify({
        ...payload,
        // userId: 1,
        // userimage: session?.user?.image,
        // comments: [],
      }),
    });

    const data = await res.json();
    setLoading(false);
    if (data.success) {
      initNotification({
        message: data.message,
        scheme: "success",
      });
      setTimeout(() => {
        setFormData({});
      }, 2000);
      return;
    }

    initNotification({
      message: data.message,
      scheme: "error",
    });
  }

  useEffect(() => {
    async function handleGetUserById(id: any) {
      // setLoading(true);
      const res = await fetch(`/api/user/getUserById/?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userSession}`,
        },
      });

      const data = await res.json();

      setViewedUser(data.data);
      return data.data;
    }

    handleGetUserById(id);
  }, []);

  useEffect(() => {
    if (userSession === "") router.push("/");
  }, [userSession]);

  if (user.role !== "admin") {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className="container mx-auto p-4 py-10 relative">
      {(loading || imageLoading) && <Spinner />}
      <Link
        href={"/admin"}
        className="mb-5 text-grey-500 flex items-center gap-2"
      >
        <BsArrowLeft /> Back
      </Link>
      <div className="flex items-center gap-4 mb-7">
        <div className="profile-avatar relative">
          <div className="h-20 w-20 rounded-full">
            <Image
              src={profileImage}
              alt={viewedUser?.Name ?? "Avatar item"}
              className="img-fluid avatar rounded-full h-full w-full"
              width={80}
              height={80}
            />
          </div>
          <label
            htmlFor="file"
            className="avatar-upload-btn cursor-pointer absolute bottom-0 right-0 text-primary-600 bg-primary-50 hover-bg-primary-100 transition-2 flex items-center justify-center h-7 w-7 border-none rounded-full fw-600"
          >
            <BsPencil />
            <input
              id="file"
              accept="image/*"
              max={1000000}
              onChange={handleBlogImageChange}
              type="file"
              className="hidden w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
            />
          </label>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{`${viewedUser.name}`}</h1>
          <p className="mb-0 text-grey-500 text-capitalize fs-15">
            {viewedUser.email}
          </p>
          <p className="mb-0 text-grey-500 text-capitalize fs-14">
            {viewedUser?.role}
          </p>
        </div>
      </div>

      <h2 className="text-xl mt-5 mb-3 font-semibold">Companies</h2>
      <ul>
        {viewedUser.companies?.map((company: any) => (
          <li
            key={company.id}
            className="p-5 shadow-md rounded-md bg-white mb-5"
          >
            <p className="mb-3">
              <strong>Company Name:</strong> {company.companyName}
            </p>
            <p className="mb-3">
              <strong>Number of users:</strong> {company.numUsers}
            </p>
            <p className="mb-3">
              <strong>Number of products:</strong> {company.numProducts}
            </p>
            <p className="mb-3">
              <strong>Percentage:</strong> {company.percentage}%
            </p>
            {/* Display more company details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailsPage;
