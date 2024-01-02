import { auth } from "@/utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //   const authorization = headers().get("Authorization");

  try {
    const data = await request.json();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const { uid } = userCredential.user;

    if (userCredential) {
      return NextResponse.json({
        success: true,
        message: "Log in successful",
        data: userCredential,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again",
      });
    }
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
