import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust import if needed

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: { role: "student" }, // or whatever your filter is
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
