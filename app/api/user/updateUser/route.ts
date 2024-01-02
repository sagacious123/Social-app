import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";
const admin = require("firebase-admin");

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const extractUserData = await request.json();
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        ...extractUserData,
      },
    });

    if (updatedUser) {
      return NextResponse.json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again",
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
