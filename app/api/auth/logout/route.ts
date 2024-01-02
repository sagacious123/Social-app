import { auth } from "@/utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

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
