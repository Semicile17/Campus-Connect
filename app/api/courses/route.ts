/* eslint-disable @typescript-eslint/no-unused-vars */
// /app/api/courses/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany();
    return Response.json(courses);
  } catch (err) {
    return new Response("Error fetching courses", { status: 500 });
  }
}
