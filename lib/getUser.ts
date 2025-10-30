"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function getUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        student: true,
        faculty: true,
        admin: true,
      },
    });

    // ✅ Convert to a serializable plain object
    return user 
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
}
