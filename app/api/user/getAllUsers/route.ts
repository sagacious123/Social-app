import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const getAllUsers = await prisma.user.findMany({
      include: {
        companies: true,
      },
    });
    if (getAllUsers && getAllUsers.length) {
      return NextResponse.json({
        success: true,
        data: getAllUsers,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch users. Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
