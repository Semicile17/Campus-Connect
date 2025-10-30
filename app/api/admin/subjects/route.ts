import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all subjects
export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        course: true,
        faculty: true,
      },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 });
  }
}

// POST new subject
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, code, semester, courseId, facultyId } = body;

    if (!name || !code || !semester || !courseId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newSubject = await prisma.subject.create({
      data: {
        name,
        code,
        semester: Number(semester),
        courseId,
        facultyId: facultyId || null,
      },
    });

    return NextResponse.json(newSubject, { status: 201 });
  } catch (error) {
    console.error("Error creating subject:", error);
    return NextResponse.json({ error: "Failed to create subject" }, { status: 500 });
  }
}
