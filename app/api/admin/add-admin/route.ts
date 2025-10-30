import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, designation } = await req.json();

    if (!name || !email || !password || !designation)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json({ message: "User already exists" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "admin",
        admin: {
          create: {
            designation,
          },
        },
      },
      include: { admin: true },
    });

    return NextResponse.json(admin, { status: 201 });
  } catch (err) {
    console.error("Error adding admin:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
