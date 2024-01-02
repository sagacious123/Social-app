import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";
const admin = require("firebase-admin");

export async function POST(request: NextRequest) {
  try {
    const extractCompanyData = await request.json();
    const newlyCreatedCompany = await prisma.company.create({
      data: {
        ...extractCompanyData,
        // user: {
        //   connect: { id: extractCompanyData.userId },
        // },
      },
    });

    if (newlyCreatedCompany) {
      return NextResponse.json({
        success: true,
        message: "New company added successfully",
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
