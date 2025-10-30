import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
      enrollmentNo,
      course,
      year,
      semester,
      cgpa,
      photoUrl,
    } = await req.json();

    if (!name || !email || !password || !enrollmentNo || !course || !year || !semester) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json({ message: "User already exists" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "student",
        student: {
          create: {
            enrollmentNo,
            course,
            year,
            semester,
            cgpa,
            photoUrl,
          },
        },
      },
      include: { student: true },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (err) {
    console.error("Error adding student:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
