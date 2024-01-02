import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    const userDetails = await prisma.user.findUnique({
      where: {
        email: decodeURIComponent(email!),
      },
      include: {
        companies: true,
      },
    });

    console.log(userDetails);

    if (userDetails) {
      return NextResponse.json({
        success: true,
        data: userDetails,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch the user details! Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
