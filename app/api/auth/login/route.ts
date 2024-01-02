import { auth } from "@/utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { customInitApp } from "@/utils/firebaseAdminConfig";

// export default async function handler(
//   req: { body: { email: any; password: any } },
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: { (arg0: { message: string; error?: any }): void; new (): any };
//     };
//   }
// ) {
//   const { email, password } = req.body;

//   try {
//     // Firebase user creation
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const { uid } = userCredential.user;

//     res.status(200).json({ message: "Signed in successfully" });
//   } catch (error: any) {
//     res.status(500).json({ message: "Error signing in", error: error.message });
//   }
// }

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
