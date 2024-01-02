import { auth } from "@/utils/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { customInitApp } from "@/utils/firebaseAdminConfig";

export async function POST(request: NextRequest) {
  //   const authorization = headers().get("Authorization");

  await signOut(auth)
    .then(() => {
      return NextResponse.json({
        success: true,
        message: "Log out successful",
      });
    })
    .catch((error) => {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again",
      });
    });
}
