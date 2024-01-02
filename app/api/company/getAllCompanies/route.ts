import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const getAllCompanies = await prisma.company.findMany({
      include: {
        user: true,
      },
    });
    if (getAllCompanies && getAllCompanies.length) {
      return NextResponse.json({
        success: true,
        data: getAllCompanies,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch companies. Please try again",
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
