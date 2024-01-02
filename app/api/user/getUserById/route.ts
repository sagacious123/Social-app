import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const userDetails = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        companies: true,
      },
    });

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
