import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all faculties
export async function GET() {
  try {
    const faculties = await prisma.faculty.findMany({
      select: {
        id: true,
        department: true,
        designation: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(faculties);
  } catch (error) {
    console.error("Error fetching faculties:", error);
    return NextResponse.json({ error: "Failed to fetch faculties" }, { status: 500 });
  }
}
