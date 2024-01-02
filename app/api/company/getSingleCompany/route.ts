import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const companyID = url.searchParams.get("companyID");

    const companyDetails = await prisma.company.findUnique({
      where: {
        id: Number(companyID),
      },
      include: {
        user: true,
      },
    });

    if (companyDetails) {
      return NextResponse.json({
        success: true,
        data: companyDetails,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch the company details ! Please try again",
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
