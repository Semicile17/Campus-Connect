import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ensure this path matches your setup

// GET all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: { subjects: true },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// POST new course
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, durationYears, department, totalSemesters } = body;

    if (!name || !durationYears || !department || !totalSemesters) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newCourse = await prisma.course.create({
      data: { name, durationYears: Number(durationYears), department, totalSemesters: Number(totalSemesters) },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
